<div align="center">

# ⚡ Tokenade

### The #1 tool to cut your AI agent's token bill.

**Ranked #1 on the [Token-Harness Optimizer Leaderboard](https://pi-infected.github.io/token-harness-optimizer-leaderboard/) — zero config.**

**Tokenade is the simplest way to slash what your coding agent sends to the model.**
Set it up once, save on every prompt — same results, a fraction of the tokens.

**Freemium** — start free (10M tokens/month, no credit card), upgrade only when you scale.

[![npm](https://img.shields.io/npm/v/@tokenade/cli?color=8b5cf6&label=%40tokenade%2Fcli&logo=npm)](https://www.npmjs.com/package/@tokenade/cli)
[![platforms](https://img.shields.io/badge/platforms-Linux%20%C2%B7%20macOS%20%C2%B7%20Windows-2563eb)](https://tokenade.net)
[![node](https://img.shields.io/badge/node-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![free plan](https://img.shields.io/badge/free-10M%20tokens%2Fmo%2C%20no%20card-22c55e)](https://tokenade.net/signup)

[**🚀 Start free**](https://tokenade.net/signup) &nbsp;·&nbsp; [**💸 Pricing**](https://tokenade.net/pricing) &nbsp;·&nbsp; [**📊 Dashboard**](https://tokenade.net/dashboard) &nbsp;·&nbsp; [**🐛 Report an issue**](https://github.com/pi-infected/tokenade-npm/issues)

</div>

---

```sh
npm install -g @tokenade/cli
tokenade login      # opens your browser to authorize this machine — no key to type
tokenade install    # wires Tokenade into your coding agent automatically
```

That's it. Tokenade now trims tokens on **every prompt**, in the background. No config, nothing to remember.

---

## Benchmark — Token-Harness Optimizer Leaderboard

Mean cost reduction on long sessions (> 200k tokens), real end-to-end Claude Code runs:

| # | Optimizer | mean cost reduction | adoption | input tokens | output tokens | cache tokens |
|---|-----------|--------------------:|----------|-------------:|--------------:|-------------:|
| 1 | tokenade 0.7.3 | +26.70% | 25/60 | 16.21k | 3.74k | 232.71k |
| 2 | caveman v1.9.0 | +12.00% | N/A | 18.90k | 4.59k | 268.02k |
| 3 | claude-token-efficient b32fa8b | +1.80% | N/A | 20.30k | 5.64k | 329.71k |
| 4 | code-review-graph 2.3.6 | +0.00%\* | 0/54 | 21.03k | 6.05k | 331.07k |
| 5 | graphify 0.8.49 | +0.00%\* | 0/60 | 18.91k | 5.53k | 293.90k |
| 6 | lean-ctx 3.8.4 | +0.00%\* | 0/54 | 19.60k | 5.09k | 317.41k |
| 7 | serena v1.5.3 | +0.00%\* | 0/54 | 21.07k | 6.25k | 324.87k |
| 8 | control baseline | +0.00% | — | 21.12k | 5.76k | 347.01k |
| 9 | squeez 1.22.1 | −0.60% | 1/54 | 20.33k | 5.58k | 388.05k |
| 10 | codegraph 0.9.9 | −2.00% | 1/54 | 20.85k | 5.64k | 340.65k |
| 11 | ponytail main | −5.40% | N/A | 21.87k | 6.14k | 340.07k |
| 12 | rtk v0.42.3 | −10.80% | N/A | 24.11k | 7.60k | 368.46k |
| 13 | headroom 0.27.0 | −17.50% | N/A | 32.43k | 4.89k | 324.68k |

\* Opt-in tool the agent never chose to use across its runs — scored at the control baseline.

## Why Tokenade

Your coding agent burns tokens on things the model never needed to see — whole files when one function mattered, 2,000-line build logs, every MCP tool definition on every turn. Tokenade strips that waste **before it reaches the model**, locally, automatically.

> **Less tokens, same results — automatically, on every prompt.**

## ✨ What it does

| | Feature | What you get |
|---|---|---|
| 🔎 | **Semantic code search** | Finds the right files by *meaning*, so your agent reads only what matters — not your whole project. |
| 🧹 | **Command optimization** | Trims long command outputs (logs, builds, tests) down to what counts before your agent ever sees them. |
| 🧩 | **MCP optimization** | Loads only the MCP tools your agent actually needs, on demand — instead of every tool, every time. |
| 📊 | **Token dashboard** | See exactly how many tokens Tokenade saved you — clear numbers, no guesswork. |
| 🛟 | **Free to start** | Save up to **10M tokens/month** on the free plan — unlimited machines, no credit card. |
| ⚙️ | **One-command install** | Ready in seconds. Connects to your agent automatically, with zero configuration. |

## 🤝 Works with the agents you already use

**Claude Code** · **Cursor** · **Codex** · **GitHub Copilot** · **Gemini CLI** · **Qwen Code** · **Windsurf** · **Cline** · **Kilo Code** · **OpenCode** · **Aider** · **Hermes** · **OpenClaw** · **Antigravity** · **Grok**

## 📦 Install

```sh
npm install -g @tokenade/cli
```

The `postinstall` step downloads the prebuilt binary for your platform from the **signed release manifest** (`downloads.tokenade.net/manifest.json`) and verifies its **SHA‑256**. Nothing is run blindly — and the launcher in [`bin/tokenade.js`](bin/tokenade.js) and the installer in [`install.js`](install.js) are right here in this repo for you to inspect.

**Supported:** Linux · macOS · Windows · x64 & arm64 · Node ≥ 18.

## 🔓 Activate (browser — no key to type)

```sh
tokenade login      # opens tokenade.net so you (logged into your dashboard) approve this device
tokenade install    # registers the hooks with your coding agent
```

**Free** and **Pro** include **unlimited machines**; **Enterprise** includes 3 (plus paid extra seats). Manage them anytime at [tokenade.net/dashboard](https://tokenade.net/dashboard).

## 🔒 What leaves your machine

**Nothing**, except anonymous token-savings counts and an update check. Tokenade runs **locally**; its agent hooks live in your editor/agent config — **inspectable and reversible**.

## 💸 Pricing

| | **Free** | **Pro** | **Enterprise** |
|---|---|---|---|
| Token savings | Up to **10M / mo** | Up to **100M / mo** | **Unlimited** |
| Machines | **Unlimited** | **Unlimited** | 3 (+ paid seats) |
| All reduction features | ✅ | ✅ | ✅ |
| Token-savings dashboard | ✅ | ✅ | ✅ |
| Priority support | — | ✅ | ✅ |
| Price | **$0** — no card | **$19.90/mo** — flat, no per-token billing | **$2,990/yr** — 3 seats incl. |
| | [Start free →](https://tokenade.net/signup) | [Go Pro →](https://tokenade.net/pricing) | [Go Enterprise →](https://tokenade.net/pricing) |

## 🐛 Found a bug? Tell us!

Tokenade is in **active beta** and your reports make it better — fast.

- **Open an issue:** https://github.com/pi-infected/tokenade-npm/issues
- **Join the beta testers on WhatsApp:** https://chat.whatsapp.com/JmBZxT41XB6AtQWgW9oNif

When reporting, please include your OS, `tokenade --version`, your coding agent, and what you expected vs. what happened. The more detail, the faster we fix it. 🙏

---

## 🧰 CLI reference — every command

> **You rarely need any of these by hand.** After `tokenade install`, Tokenade works automatically through your agent's hooks. The CLI below is for power users, scripting, and inspection. Run `tokenade help` for the live list, and `tokenade <command> --help` where available.

### Setup & account

| Command | What it does |
|---|---|
| `install` | Register Tokenade with your detected agent (hooks). Flags: `--only <agent>`, `--with-hook`, `--with-claude-md`, `--with-lsp-enforcement-hook`, `--with-brevity-skill`, `--dry-run`. |
| `uninstall [aliases]` | Remove the integration. `uninstall aliases` removes only the shell proxy. `--dry-run` to preview. |
| `login` | Activate via browser device-flow — no key to type. |
| `activate <key>` | Link this machine to a tokenade.net license (free or paid) with a key. |
| `upgrade` | Self-update in place (aliases: `self-update`). `--on`/`--off` toggles the 24h background updater. |
| `healthcheck` | Diagnose the install (aliases: `health`, `doctor`). |
| `detect` | Print the detected AI agent. |
| `discover` | Scan `~/.claude` logs, surface top tools + install suggestions. |
| `hooks <status\|tail [N]>` | Show installed hooks + recent activity / live tail. |
| `statusline` | One-line summary for `~/.claude/settings.json` `statusLine`. |
| `incompatibilities` | Check for other token tools that conflict with Tokenade and propose fixes (aliases: `competitors`, `scan`). |

### Code intelligence — read less, find faster

| Command | What it does |
|---|---|
| `map` | Print a compact codebase structure map. |
| `skeleton <file>` | Signatures-only skeleton of a file. |
| `query <symbol>` | Locate a symbol without reading files. |
| `impact <file>` | Refactor impact radius (dependents + symbols). |
| `semantic <query>` | Hybrid BM25 + dense, framework-aware search (aliases: `ask`, `sem`). |
| `file-search <path> <query>` | Per-file embedder lookup (`--k=N`). |
| `index` | Build & cache the codebase symbol index. |
| `watch` | Keep the index fresh: incremental reindex on every save. |
| `measure` | Report agent-loaded-file startup-token cost. |
| `review-context` | Token-budgeted code-review context (`--budget N`, `--base ref`). |
| `pack` | Budget-bounded repo export, one fenced bundle (`--budget N`, `--diff`, `--out FILE`). |
| `semantic-status` | Per-project state of `~/.tokenade/semantic.db`. |

### Run commands through compaction

| Command | What it does |
|---|---|
| `wrap <cmd>` | Run a command through the auto-detected compactor (default for noisy commands). |
| `proxy <cmd...>` | Run a command and emit compressed output (logs savings). |
| `raw <cmd...>` | Run a command **without** compaction (aliases: `bypass`, `noproxy`). |
| `filter <cmd...>` | Filter stdin as if it were produced by `<cmd>`. |
| `execute --lang L --script CODE` | Sandboxed "think-in-code" runner (bash/python/node/jq/awk/ruby/perl) — returns only stdout, redacted + compacted, keeps raw data out of context. |
| `shell-init` | Print the shell proxy fragment for your shell (`--shell …`, `--all`). |
| `shellwrap` | TTY-aware alias target for csh/tcsh + cmd.exe. |

### Format compactors

`auto <file|->` auto-detects the format and dispatches to the right compactor — **the one to call** if unsure. Or target a format directly (all read `<file>` or `-` for stdin):

| Domain | Commands |
|---|---|
| **Data & config** | `json` · `csv` · `tsv` · `yaml` · `ndjson` · `lock` · `sql` · `env` · `md` · `openapi` · `graphql` · `sourcemap` |
| **Logs & traces** | `logs` · `access` · `journal` · `container-logs` · `ghactions` · `stack` · `strace` · `tcpdump` · `metrics` |
| **Build / VCS / infra** | `diff` · `gitlog` · `archive` · `cargo-bench` · `jvmbuild` (aliases `mvn`/`gradle`/`sbt`) · `pkginstall` · `terraform` · `ansible` · `k8s-manifest` · `describe` · `systemd` |
| **System & network** | `table` · `disk` · `netstat` · `dns` · `vmstat` · `filelist` · `grep` |
| **Web & docs** | `web` · `serp` (aliases `google`/`bing`/`ddg`) · `snapshot` · `stealth` · `curl` · `docs` · `pdf` · `notebook` |

### Savings, receipts & reporting

| Command | What it does |
|---|---|
| `gain` | Cumulative token savings (`--json`, `--history`, `--by-source`). |
| `dashboard` | Screenshot-ready savings overview (aliases: `dash`, `stats`; `--html`/`--json`). |
| `receipt` | Signed, tamper-evident savings receipt over the local ledger (`--verify <file>`). |
| `cache-note` | Prompt-cache-aware framing of savings (net vs gross). |
| `mcp-stats` | MCP manifest rollup (servers/wrapped) + token-aware skills index. |
| `report` | Share redacted Tokenade + agent logs (consent-gated, typed phrase) to improve compression (`--dry-run`, `--message`, `--accept`). |

### Recovery & disclosure — get folded bytes back

| Command | What it does |
|---|---|
| `expand-ref <hash>` | Re-emit the verbatim bytes a compactor folded, by hash (alias: `xref`). |
| `add-compactor --file <rules.toml>` | Teach Tokenade to fold output from a command it doesn't cover yet (alias: `add-filter`); `--list` shows yours, `--help` prints the file format. |
| `trust-filters [--list]` | Approve a repo's bundled `.tokenade/filters` — project filters run only once trusted. |
| `expand-fold <id>` | Expand a folded log run back to its raw lines (alias: `xfold`). |
| `disclose <stash\|read\|search>` | Progressive disclosure: stash a big blob to a file, read/search by hash. |
| `search-stash <hash> <query>` | Fuzzy / natural-language recall within a stashed blob (BM25). |
| `turn-summary` | Extractive summary of a conversation turn (`--max N`). |

### Security & maintenance

| Command | What it does |
|---|---|
| `scrub-secret <substring>` | **Emergency:** purge a leaked credential from all Tokenade-owned files + caches (`--dry-run`). |
| `scrub-cache` | Re-apply built-in redaction patterns to every persisted byte (use after upgrade). |
| `redact <file…>` | Redact secret-shaped values to `<redacted>` in any file (`--in-place`, `--dry-run`). Streams line-by-line, idempotent. |
| `evict-stale` | Prune 7-day-stale cache rows + zero-saved noise, then VACUUM to reclaim disk. |
| `mistake <list\|add\|from-revert>` | Persistent "bad direction" memory (records git reverts). |
| `audit-claude-md [DIR]` | Audit the `CLAUDE.md` cascade for bloat + cross-file dupes (alias: `claudemd`). |

### Agent integration & config

| Command | What it does |
|---|---|
| `style <chat\|coding\|off>` | Response-style preamble injected before each prompt. |
| `read-mode` | Show the active fold read-mode ladder (`TOKENADE_READ_MODE`). |
| `unwrap-mcps` | Restore wrapped MCP servers to their original form (idempotent). |
| `mcp-proxy <bin>` | Transparent JSON-RPC proxy in front of an MCP server (written by `install`; internal). |
| `--version` | Print the installed version. |

> **User presets:** drop TOML files in `~/.config/tokenade/presets/` to add command-rewrite rules for your own CLIs (helm, ansible, internal scripts).

---

## 🧪 Examples & recipes

Real commands, real (trimmed) output — so both humans **and coding agents** know exactly what each command does and when to reach for it. Every compactor reads a file **or `-` for stdin**, so you can pipe: `some-noisy-cmd | tokenade auto -`.

### Setup & account

**`install`** — wire Tokenade into your agent (run once).
```text
$ tokenade install
✓ detected agent: claude-code
✓ hooks registered in ~/.claude/settings.json (Bash|Read + Edit/Write)
✓ shell proxy added to ~/.zshrc
── Incompatible tools — suggested fixes ──   # only if any are found
✓ install complete — token savings start on your next prompt.
```

**`login`** — authorize this machine in your browser (no key to paste).
```text
$ tokenade login
→ opening https://tokenade.net/device?code=ABCD-1234 …
✓ this machine is now linked to your account (plan: free).
```

**`activate <key>`** — link a machine with a license key instead of the browser.
```text
$ tokenade activate tk_live_xxx
✓ activated — plan: pro · unlimited machines.
```

**`healthcheck`** (aliases `health`, `doctor`) — confirm everything is wired.
```text
$ tokenade healthcheck
─── tokenade healthcheck ───
  OK  binary at ~/.local/bin/tokenade  (0.6.2)
  OK  gain ledger writable at ~/.tokenade/gain.jsonl
  OK  license active — plan: pro
  OK  agent detected: claude-code
  OK  hookwrap found in ~/.claude/settings.json
  all checks passed
```

**`detect`** — print the detected agent. **`discover`** — scan your logs and suggest installs. **`hooks status`** — show installed hooks. **`statusline`** — one line for your editor status bar. **`upgrade`** — self-update; **`uninstall`** — remove cleanly.
```text
$ tokenade detect
claude-code
```

**`incompatibilities`** (aliases `competitors`, `scan`) — find other token tools that conflict with Tokenade and propose fixes.
```text
$ tokenade incompatibilities
── Found 1 potentially incompatible tool(s) ──

[redundant] rtk
  Output-filtering CLI proxy (filters/compresses bash output)
  → binary at ~/.cargo/bin/rtk
  fix: Tokenade subsumes rtk: `tokenade proxy <cmd>` does the same AND
       auto-detects 48 formats — usually with better savings.

Run `tokenade install` to interactively migrate & fix the [redundant] /
[overlapping] tools (the fix-up pass is on by default; opt out with `--no-cleanup`).
```

### Code intelligence — read less, find faster

**`map`** — get the lay of the land without reading anything.
```text
$ tokenade map
4722 files, 49898 symbols indexed
by directory:
  crates/tokenade-core/src/        140 files, 4802 symbols
  crates/tokenade-core/src/cmd/    2637 files, 25741 symbols
  crates/tokenade-cli/src/          12 files, 1188 symbols
```

**`skeleton <file>`** — see a file's shape (signatures only), not its body.
```text
$ tokenade skeleton crates/tokenade-core/src/redact.rs
use regex::Regex;
    // … 3 lines …
pub fn redact(s: &str) -> String {
    // … 8 lines …
pub fn redact_argv(argv: &[String]) -> Vec<String> {
struct PatternSet {
```

**`query <symbol>`** — jump straight to where a symbol is defined.
```text
$ tokenade query redact
module redact — crates/tokenade-core/src/lib.rs:137
fn redact     — crates/tokenade-core/src/redact.rs:28
fn redact_argv — crates/tokenade-core/src/redact.rs:38
```

**`impact <file>`** — before a refactor, see what depends on it.
```text
$ tokenade impact crates/tokenade-core/src/redact.rs
crates/tokenade-core/src/redact.rs declares (47 symbols): fn redact, redact_argv, …
dependents (3):
  crates/tokenade-core/src/debug_log.rs
  crates/tokenade-core/src/sandbox.rs
  crates/tokenade-core/tests/proptest_compactors.rs
```

**`semantic "<query>"`** (aliases `ask`, `sem`) — find code by meaning, not by string match.
```text
$ tokenade semantic "where do we redact secrets before logging"
1. crates/tokenade-core/src/redact.rs:28   fn redact — applies all secret patterns
2. crates/tokenade-core/src/gain.rs:231    record_inner — redacts label before write
```

**`measure`** — see the per-session token cost of your agent-loaded files (CLAUDE.md, etc.).
```text
$ tokenade measure
file                               tokens
CLAUDE.md                             642
AGENTS.md                             385
PER SESSION (one agent loads one)     642
```

Also: **`index`** (build the cache up front) · **`watch`** (keep it fresh on save) · **`file-search <path> <query>`** (search within one file) · **`review-context --base main`** (budget-bounded diff context for reviews) · **`pack --budget 8000`** (export a repo slice as one bundle) · **`semantic-status`** (index state).

### Run commands through compaction

**`wrap <cmd>`** — the default: run any noisy command, get the compacted output.
```text
$ tokenade wrap 'kubectl get pods -A'
NAMESPACE  NAME        READY  STATUS   RESTARTS  AGE
default    web-xx      1/1    Running  0         2h
… 47 rows · grouped by status: Running=46, Pending=1
```

**`execute --lang <L> --script <code>`** — "think in code": run a snippet in a sandbox, get **only stdout** back (raw data never enters your context).
```text
$ tokenade execute --lang python --script 'print(sum(range(101)))'
5050
```

**`proxy <cmd…>`** — like `wrap`, logs savings to your ledger. **`raw <cmd…>`** — run *without* compaction (escape hatch). **`filter <cmd…>`** — treat stdin as if produced by `<cmd>`. **`shell-init`** — print the shell fragment that auto-wraps noisy commands:
```text
$ eval "$(tokenade shell-init)"   # add to ~/.zshrc — git/cargo/kubectl/… auto-compact
```

### Format & output compactors

Tokenade includes a family of format-aware compactors — the full list is in
the [CLI reference](#-cli-reference--every-command) above. Each reads a file or
`-` (stdin); when unsure, let Tokenade pick:

```sh
tokenade auto <file>      # auto-detect and compact
some-noisy-cmd | tokenade auto -   # …or pipe stdin
```

### Savings, receipts & reporting

**`gain`** — how many tokens you've saved.
```text
$ tokenade gain
operations: 136
tokens: 1,333,261 → 99,204
saved:  1,234,057 (92.6%)
by op:  auto:json 9× −36% · auto-compact 4× −96% · …
```

**`dashboard`** (aliases `dash`, `stats`) — the big-picture banner (`--html` / `--json`).
```text
$ tokenade dashboard
   25.5M  measured  ·  97.9%  ·  1571 ops
```

**`receipt`** — a signed, tamper-evident savings receipt (`--verify <file>` to check one). **`cache-note --saved N`** — frames savings honestly (net vs gross of prompt-cache). **`mcp-stats`** — rollup of your MCP servers + skills index.

**`report`** — share redacted logs (consent-gated) so we can improve compression. A typed-phrase contract is required before anything leaves your machine; `--dry-run` packs locally and uploads nothing.
```text
$ tokenade report --dry-run
  collected 42 transcripts since install · redacted 17 secrets
  wrote ~/.tokenade/last-report.zip (4.2 MB) — nothing uploaded
```

### Recovery & disclosure — get folded bytes back

Compaction is never lossy-by-surprise: every fold is recoverable.
```text
$ tokenade expand-ref 927a921273b2     # re-emit the exact bytes a banner folded
$ tokenade add-compactor --file my.toml # teach Tokenade a new compactor
$ tokenade trust-filters                # approve a repo's bundled filters
$ tokenade expand-fold app-3f2a          # expand one folded log run to raw lines
$ tokenade disclose read <hash>          # read a stashed big blob
$ tokenade search-stash <hash> "timeout" # fuzzy recall inside a stash
$ tokenade turn-summary --max 5 chat.txt # top-5 salient sentences of a turn
```

### Security & maintenance

```text
$ tokenade scrub-secret 'ak_98_leakedkey' --dry-run   # purge a leaked credential everywhere
$ tokenade scrub-cache            # re-apply redaction to all persisted bytes (after upgrade)
$ tokenade redact secrets.log --dry-run   # count secret-shaped values in a file; write nothing
$ tokenade evict-stale            # prune 7-day-stale cache rows + VACUUM
$ tokenade audit-claude-md        # find bloat + dupes across your CLAUDE.md cascade
$ tokenade mistake from-revert    # record a 'bad direction' from a git revert
```

### Agent integration & config

**`read-mode`** — show (and tune via `TOKENADE_READ_MODE`) how aggressively file reads are folded.
```text
$ tokenade read-mode
  active: task (default)
  ladder: aggressive 0.4× · → task 1.0× · reference 3.0× · entropy
```

**`style <chat|coding|off>`** — inject a response-style preamble before each prompt. **`unwrap-mcps`** — restore wrapped MCP servers. **`--version`** — print the version.
```text
$ tokenade style coding   # terse, code-first replies
current style: coding
```

> **User-defined presets:** drop TOML files in `~/.config/tokenade/presets/` to teach Tokenade your own CLIs (helm, ansible, internal scripts) — same compaction, your commands.

---

<div align="center">

**[tokenade.net](https://tokenade.net)** · Made for people who'd rather spend tokens on shipping than on overhead.

</div>
