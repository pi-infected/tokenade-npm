#!/usr/bin/env node
/**
 * postinstall — download the prebuilt Tokenade binary for this platform from
 * the signed release manifest, verify its SHA-256, and drop `tokenade`
 * into ./vendor. The bin shim in ./bin execs it.
 *
 * Closed-source commercial binary, distributed via the npm registry (the trust
 * anchor) — same pattern as esbuild/biome/swc. Nothing is executed blindly:
 * the checksum comes from downloads.tokenade.net/manifest.json.
 *
 * Network robustness (why this file is more than a one-liner): a postinstall
 * runs on whatever machine `npm install` runs on — corporate laptops behind a
 * proxy, CI with flaky egress, Alpine containers. The three things that break a
 * "can't download" install in the field, in order: (1) an HTTPS proxy that
 * node:https does NOT honour on its own, (2) no timeout so a black-holed socket
 * hangs forever, (3) no retry so one blip is fatal. We handle all three, and on
 * failure we print enough context (platform, target, url, proxy, http status)
 * that the cause is obvious instead of a bare "ECONNREFUSED".
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const http = require("node:http");
const https = require("node:https");
const crypto = require("node:crypto");
const { URL } = require("node:url");

const DOWNLOADS_BASE =
	process.env.TOKENADE_DOWNLOADS_BASE || "https://downloads.tokenade.net";
const MANIFEST_URL = `${DOWNLOADS_BASE}/manifest.json`;
const VENDOR = path.join(__dirname, "vendor");

// Per-request wall clock. A download that stalls past this is treated as a
// network error and retried, rather than hanging the whole `npm install`.
const REQUEST_TIMEOUT_MS = Number(process.env.TOKENADE_HTTP_TIMEOUT_MS) || 30000;
const MAX_ATTEMPTS = 4;

// Is this Linux userland musl (Alpine, Void-musl, …) rather than glibc?
// A glibc node reports its runtime glibc version in the process report header;
// a musl node does not. We fall back to looking for the musl loader on disk.
// When genuinely unsure we return false (glibc) — that preserves the historical
// x86_64-gnu mapping for the overwhelming glibc majority, so a detection miss is
// never worse than the status quo.
function isMuslLinux() {
	if (process.platform !== "linux") return false;
	try {
		const header = process.report && process.report.getReport().header;
		if (header && typeof header.glibcVersionRuntime === "string") return false;
		if (header && "glibcVersionRuntime" in header) {
			// key present but not a string ⇒ no glibc runtime ⇒ musl
			return true;
		}
	} catch {
		// fall through to the on-disk probe
	}
	try {
		return fs
			.readdirSync("/lib")
			.some((f) => f.startsWith("ld-musl-"));
	} catch {
		return false;
	}
}

function rustTarget() {
	const p = process.platform;
	const a = process.arch;
	if (p === "darwin")
		return a === "arm64" ? "aarch64-apple-darwin" : "x86_64-apple-darwin";
	if (p === "linux") {
		if (a === "arm64") return "aarch64-unknown-linux-musl";
		// x86_64: a fully-static musl build runs on glibc too, but musl's DNS
		// resolver ignores /etc/nsswitch.conf — so we only hand musl to machines
		// whose libc is already musl (Alpine et al.), and keep the proven glibc
		// build as the default everywhere else.
		return isMuslLinux()
			? "x86_64-unknown-linux-musl"
			: "x86_64-unknown-linux-gnu";
	}
	if (p === "win32") return "x86_64-pc-windows-gnu";
	throw new Error(`unsupported platform: ${p}/${a}`);
}

// Resolve the proxy that applies to `targetUrl`, honouring the standard
// HTTPS_PROXY / HTTP_PROXY / ALL_PROXY and NO_PROXY env vars (both cases).
// Returns null when no proxy applies — including when NO_PROXY matches.
function proxyFor(targetUrl) {
	const u = new URL(targetUrl);
	const noProxy = process.env.NO_PROXY || process.env.no_proxy || "";
	for (const raw of noProxy.split(",").map((s) => s.trim()).filter(Boolean)) {
		if (raw === "*") return null;
		const entry = raw.replace(/^\./, "").toLowerCase();
		const host = u.hostname.toLowerCase();
		if (host === entry || host.endsWith(`.${entry}`)) return null;
	}
	const isHttps = u.protocol === "https:";
	const proxy =
		(isHttps
			? process.env.HTTPS_PROXY || process.env.https_proxy
			: process.env.HTTP_PROXY || process.env.http_proxy) ||
		process.env.ALL_PROXY ||
		process.env.all_proxy;
	return proxy || null;
}

// Never echo proxy credentials back to the terminal in a diagnostic.
function redact(proxyUrl) {
	try {
		const u = new URL(proxyUrl);
		if (u.username || u.password) {
			u.username = "***";
			u.password = "";
		}
		return u.toString();
	} catch {
		return proxyUrl;
	}
}

// One HTTP(S) GET, following redirects, optionally tunnelled through a proxy
// via CONNECT. Resolves to the live response stream (status 200).
function get(targetUrl, redirects = 0) {
	return new Promise((resolve, reject) => {
		if (redirects > 5) return reject(new Error("too many redirects"));

		const onResponse = (res) => {
			const code = res.statusCode || 0;
			if (code >= 300 && code < 400 && res.headers.location) {
				res.resume();
				const next = new URL(res.headers.location, targetUrl).toString();
				return resolve(get(next, redirects + 1));
			}
			if (code !== 200) {
				res.resume();
				const err = new Error(`GET ${targetUrl} → HTTP ${code}`);
				err.httpStatus = code;
				return reject(err);
			}
			resolve(res);
		};

		const proxy = proxyFor(targetUrl);
		let req;
		if (proxy) {
			const t = new URL(targetUrl);
			const p = new URL(proxy);
			const port = t.port || (t.protocol === "https:" ? 443 : 80);
			const headers = { host: `${t.hostname}:${port}` };
			if (p.username || p.password) {
				const auth = Buffer.from(
					`${decodeURIComponent(p.username)}:${decodeURIComponent(p.password)}`,
				).toString("base64");
				headers["proxy-authorization"] = `Basic ${auth}`;
			}
			const connectReq = http.request({
				host: p.hostname,
				port: p.port || 80,
				method: "CONNECT",
				path: `${t.hostname}:${port}`,
				headers,
			});
			connectReq.on("connect", (res, socket) => {
				if (res.statusCode !== 200) {
					socket.destroy();
					const err = new Error(
						`proxy CONNECT ${redact(proxy)} → HTTP ${res.statusCode}`,
					);
					err.httpStatus = res.statusCode;
					return reject(err);
				}
				const tunneled = https.get(
					{
						host: t.hostname,
						port,
						path: `${t.pathname}${t.search}`,
						socket,
						agent: false,
						servername: t.hostname,
					},
					onResponse,
				);
				tunneled.on("error", reject);
				// The outer setTimeout only guards the CONNECT request — a
				// stall AFTER the tunnel is established used to hang the
				// attempt until the OS TCP timeout.
				tunneled.setTimeout(REQUEST_TIMEOUT_MS, () => {
					tunneled.destroy(new Error(`timeout after ${REQUEST_TIMEOUT_MS}ms (tunneled)`));
				});
			});
			req = connectReq;
		} else {
			req = https.get(targetUrl, onResponse);
		}
		req.on("error", reject);
		req.setTimeout(REQUEST_TIMEOUT_MS, () => {
			req.destroy(new Error(`timeout after ${REQUEST_TIMEOUT_MS}ms`));
		});
		if (req !== undefined && typeof req.end === "function" && proxy) req.end();
	});
}

// A network error is worth retrying; an HTTP 4xx (other than 429) or a bad
// checksum is not — those won't fix themselves on a second attempt.
function isRetryable(err) {
	if (err && typeof err.httpStatus === "number") {
		return err.httpStatus === 429 || err.httpStatus >= 500;
	}
	return true; // ECONNRESET / ETIMEDOUT / ENOTFOUND / EAI_AGAIN / timeout / proxy
}

function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}

async function withRetry(label, fn) {
	let lastErr;
	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		try {
			return await fn();
		} catch (err) {
			lastErr = err;
			if (attempt === MAX_ATTEMPTS || !isRetryable(err)) break;
			const backoff = 500 * 2 ** (attempt - 1);
			console.error(
				`  ${label} failed (${err.message}) — retrying in ${backoff}ms (${attempt}/${MAX_ATTEMPTS - 1})`,
			);
			await sleep(backoff);
		}
	}
	throw lastErr;
}

async function fetchJson(url) {
	return withRetry("manifest fetch", async () => {
		const res = await get(url);
		const chunks = [];
		for await (const c of res) chunks.push(c);
		return JSON.parse(Buffer.concat(chunks).toString("utf8"));
	});
}

async function downloadTo(url, dest) {
	return withRetry("download", async () => {
		const res = await get(url);
		const hash = crypto.createHash("sha256");
		await new Promise((resolve, reject) => {
			const out = fs.createWriteStream(dest);
			res.on("data", (d) => hash.update(d));
			res.on("error", reject);
			res.pipe(out);
			out.on("finish", resolve);
			out.on("error", reject);
		});
		return hash.digest("hex");
	});
}

async function main() {
	const target = rustTarget();
	const manifest = await fetchJson(MANIFEST_URL);
	const entry = manifest.targets && manifest.targets[target];
	if (!entry || !entry.url || !entry.sha256) {
		throw new Error(`no published build for ${target}`);
	}

	// Derive the temp filename from the URL's path only. The download URL
	// carries a cache-buster query string (…tar.gz?b=<hash>); `?` and the
	// rest are legal in a URL but ILLEGAL in a Windows filename, so leaving
	// them in the basename makes fs.createWriteStream fail with ENOENT on
	// win32 (passes silently on POSIX where `?` is a valid char). Strip the
	// query/fragment, then sanitize any remaining hostile chars defensively.
	const urlPath = entry.url.split(/[?#]/, 1)[0];
	const safeBase =
		(path.basename(urlPath) || "tokenade-build.tar.gz").replace(
			/[^A-Za-z0-9._-]/g,
			"_",
		);
	const tmp = path.join(os.tmpdir(), `tokenade-${process.pid}-${safeBase}`);
	const got = await downloadTo(entry.url, tmp);
	if (got !== entry.sha256) {
		fs.rmSync(tmp, { force: true });
		throw new Error(
			`checksum mismatch for ${target}\n  expected ${entry.sha256}\n  got      ${got}`,
		);
	}

	// require("tar") lazily: a missing/half-installed dep should surface its own
	// clear error here, not masquerade as a download failure at module load.
	let tar;
	try {
		tar = require("tar");
	} catch (e) {
		fs.rmSync(tmp, { force: true });
		throw new Error(
			`download succeeded but the 'tar' dependency is missing (${e.message}); ` +
				"reinstall without --ignore-scripts / --no-optional",
		);
	}

	fs.rmSync(VENDOR, { recursive: true, force: true });
	fs.mkdirSync(VENDOR, { recursive: true });
	await tar.x({ file: tmp, cwd: VENDOR });
	fs.rmSync(tmp, { force: true });

	if (process.platform !== "win32") {
		for (const name of ["tokenade"]) {
			const f = path.join(VENDOR, name);
			if (fs.existsSync(f)) fs.chmodSync(f, 0o755);
		}
	}

	console.log(`✓ tokenade ${manifest.version} installed (${target})`);
	console.log("  Next: run `tokenade install` — that's it, savings start immediately.");
	console.log(
		"  10M free tokens included, no account needed. `tokenade healthcheck` verifies the wiring.",
	);
}

main().catch((err) => {
	let target;
	try {
		target = rustTarget();
	} catch {
		target = `${process.platform}/${process.arch}`;
	}
	console.error(`✗ tokenade install failed: ${err.message}`);
	console.error(
		`  platform ${process.platform}/${process.arch} (target ${target}), node ${process.version}`,
	);
	const proxy = proxyFor(MANIFEST_URL);
	if (proxy) console.error(`  via proxy ${redact(proxy)}`);
	console.error(`  manifest ${MANIFEST_URL}`);
	console.error(
		"  Retry; if you're behind a corporate proxy set HTTPS_PROXY, or download manually from https://downloads.tokenade.net",
	);
	process.exit(1);
});
