#!/usr/bin/env node
"use strict";
const { spawnSync } = require("node:child_process");
const path = require("node:path");
const fs = require("node:fs");

const bin = path.join(
	__dirname,
	"..",
	"vendor",
	process.platform === "win32" ? "tokenade.exe" : "tokenade",
);
if (!fs.existsSync(bin)) {
	console.error(
		"tokenade: binary not found. Re-run `npm install -g @tokenade/cli` (the postinstall downloads it).",
	);
	process.exit(1);
}
const r = spawnSync(bin, process.argv.slice(2), { stdio: "inherit" });
if (r.error) {
	console.error(`tokenade: ${r.error.message}`);
	process.exit(1);
}
process.exit(r.status === null ? 1 : r.status);
