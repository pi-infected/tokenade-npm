#!/usr/bin/env node
"use strict";
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");
const { platformPackageName, binaryName } = require("../platform.js");

// Resolve the binary, first hit wins (see platform.js for the two delivery
// paths): (1) the matching per-platform optionalDependency from the registry,
// (2) ./vendor, where install.js's download fallback drops it.
function resolveBinary() {
	const name = binaryName();
	// 1. Platform sub-package. A skipped optional dep throws MODULE_NOT_FOUND;
	//    resolve its package.json so we don't depend on a "main" entry.
	try {
		const pkgJson = require.resolve(`${platformPackageName()}/package.json`);
		const bin = path.join(path.dirname(pkgJson), name);
		if (fs.existsSync(bin)) return bin;
	} catch {
		// optional dep absent — fall through to the vendored copy.
	}
	// 2. Downloaded fallback.
	const vendored = path.join(__dirname, "..", "vendor", name);
	if (fs.existsSync(vendored)) return vendored;
	return null;
}

const bin = resolveBinary();
if (!bin) {
	console.error(
		"tokenade: binary not found. Re-run `npm install -g @tokenade/cli` " +
			"(the platform binary ships as an optional dependency; a postinstall " +
			"download is the fallback). If you installed with --no-optional or " +
			"--ignore-scripts, reinstall without them.",
	);
	process.exit(1);
}
const r = spawnSync(bin, process.argv.slice(2), { stdio: "inherit" });
if (r.error) {
	console.error(`tokenade: ${r.error.message}`);
	process.exit(1);
}
process.exit(r.status === null ? 1 : r.status);
