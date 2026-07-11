#!/usr/bin/env node
/**
 * platform.js — the ONE place that maps this machine to a Rust target and to
 * the matching per-platform npm package. Both bin/tokenade.js (runtime resolve)
 * and install.js (download fallback) require it, so the platform detection —
 * the musl probe especially — never drifts between the two.
 *
 * The per-platform packages (@tokenade/cli-<os>-<cpu>[-musl]) carry the actual
 * binary and are listed as optionalDependencies of @tokenade/cli. npm installs
 * ONLY the one whose os/cpu/libc match the host, straight from the registry —
 * the esbuild/swc/biome pattern. install.js's download is a fallback for when
 * those optional deps were skipped (--no-optional / --ignore-scripts) or the
 * registry didn't carry a matching build.
 */

"use strict";

const fs = require("node:fs");

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

// Rust target dir (in dist/) → the npm sub-package that carries its binary.
// Kept in lockstep with the six packages the release script publishes and the
// optionalDependencies in package.json — one source of truth for the mapping.
const PACKAGE_BY_TARGET = {
	"x86_64-unknown-linux-gnu": "@tokenade/cli-linux-x64",
	"x86_64-unknown-linux-musl": "@tokenade/cli-linux-x64-musl",
	"aarch64-unknown-linux-musl": "@tokenade/cli-linux-arm64-musl",
	"aarch64-apple-darwin": "@tokenade/cli-darwin-arm64",
	"x86_64-apple-darwin": "@tokenade/cli-darwin-x64",
	"x86_64-pc-windows-gnu": "@tokenade/cli-win32-x64",
};

// The per-platform sub-package name for the current host, or the given target.
function platformPackageName(target) {
	const t = target || rustTarget();
	const pkg = PACKAGE_BY_TARGET[t];
	if (!pkg) throw new Error(`no npm package mapped for target: ${t}`);
	return pkg;
}

// The binary filename inside a sub-package (and in ./vendor).
function binaryName() {
	return process.platform === "win32" ? "tokenade.exe" : "tokenade";
}

module.exports = {
	isMuslLinux,
	rustTarget,
	platformPackageName,
	binaryName,
	PACKAGE_BY_TARGET,
};
