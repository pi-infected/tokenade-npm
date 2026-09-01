#!/usr/bin/env node
/**
 * preuninstall — run tokenade's own cleanup BEFORE npm deletes the package
 * files, so that `npm uninstall -g @tokenade/cli` actually restores the
 * machine (unwraps MCPs, strips hooks/CLAUDE.md/shell-proxy, and wipes
 * ~/.tokenade + ~/.cache/tokenade) instead of orphaning integration that then
 * spawns a missing binary on every tool call.
 *
 * We locate the SAME vendored binary that install.js (postinstall) dropped in
 * ./vendor and invoke it as `tokenade uninstall --headless`:
 *   --headless → no banner, no next-step guidance, and it does NOT touch the
 *                binary itself (npm removes ./vendor right after this script).
 *
 * FAIL-OPEN by construction: every failure path (missing binary, spawn error,
 * timeout, non-zero exit) is swallowed and we ALWAYS `process.exit(0)`. A
 * cleanup that can't run must never block `npm uninstall` or leave the user
 * unable to remove the package.
 *
 * npm lifecycle note: `preuninstall` runs on `npm uninstall` / `npm rm` /
 * `npm remove` (local AND `-g`), and fires while the package files still
 * exist. Caveats we accept: it is skipped when the user passes
 * `--ignore-scripts` (or sets that config), and yarn/pnpm do not guarantee it.
 * In those cases the binary is simply gone and its self-heal / a future
 * `tokenade uninstall` covers the leftover integration.
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

// Bound the child so a wedged cleanup can never hang `npm uninstall`.
const CLEANUP_TIMEOUT_MS =
	Number(process.env.TOKENADE_UNINSTALL_TIMEOUT_MS) || 20000;

function binaryPath() {
	const name = process.platform === "win32" ? "tokenade.exe" : "tokenade";
	return path.join(__dirname, "vendor", name);
}

function main() {
	const bin = binaryPath();
	// Missing binary (never installed, --ignore-scripts, half-install) → nothing
	// to run; npm still removes the package. Not an error.
	if (!fs.existsSync(bin)) {
		return;
	}
	try {
		const res = spawnSync(bin, ["uninstall", "--headless"], {
			stdio: "inherit",
			timeout: CLEANUP_TIMEOUT_MS,
			// A cleanup crash must not surface as a throw here.
			windowsHide: true,
		});
		if (res.error) {
			console.error(
				`  tokenade cleanup skipped (${res.error.message}); ` +
					"run `tokenade uninstall` manually if any integration lingers.",
			);
		}
	} catch (e) {
		console.error(`  tokenade cleanup skipped (${e && e.message});`);
	}
}

try {
	main();
} catch (e) {
	// Absolute backstop — nothing above should throw, but never let it matter.
	try {
		console.error(`  tokenade cleanup skipped (${e && e.message});`);
	} catch {}
}
// ALWAYS succeed: npm must be free to remove the package.
process.exit(0);
