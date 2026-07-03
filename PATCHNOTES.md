# Tokenade — what's new

<!-- Every release must add a `## <version>` section here; the release script
     refuses to publish without one. (Dev-level detail lives in CHANGELOG.md.)

     IMPORTANT — the source is proprietary and the implementation IS the value.
     Notes must stay OUTCOME-ONLY. State only: bigger savings, lower overhead,
     reliability/platform/language fixes, which agents are supported, plans, and
     user-visible dashboard/UI changes. NEVER describe a specific capability or
     lever, nor any mechanism, threshold, technique, file name, or exact
     command/flag — a competitor must not be able to infer what's worth copying. -->

## 0.7.5

- **Re-reading a file you just edited is now dramatically cheaper.** Agents
  that iterate on the same files (edit, re-read, edit again) see only what
  changed instead of paying for the whole file every time — on big files this
  routinely saves over 90% of the re-read.
- **Writes get smarter guidance.** When an agent is about to rewrite a whole
  existing file for a small change, Tokenade steers it toward a targeted edit —
  output tokens are the most expensive kind, and this trims exactly those.
- **Better on Windows.** PowerShell file dumps and searches (`Get-Content`,
  `Select-String` and their aliases) now get the same compaction as their
  Unix counterparts.
- **Remote work is covered.** Output from commands run inside containers
  (`docker exec`, `docker compose exec`, `kubectl exec`) is now compacted
  like the same command run locally.
- **Screenshots from connected tools are downscaled** before they reach your
  agent — full resolution stays recoverable on request.
- **Web pages fetch more reliably**, with an automatic second attempt when a
  site refuses the first one.
- **Large code files stay fully navigable.** Structural views of big source
  files now always list every symbol.
- **Your stats now tell one story everywhere.** The terminal dashboard, the
  local web dashboard and tokenade.net now count savings the same way, split
  by token type (input / cache / output) with a consistent dollar value —
  including netting out Tokenade's own small prompt cost.
- Dozens of robustness fixes across compactors, hooks and installers, backed
  by a new always-on quality harness.

## 0.7.4

- **Works with more of your agents.** Tokenade now sets itself up for more
  coding tools out of the box, including Cursor and Kilo — same automatic
  savings, no extra steps.
- **Knows when it's on.** Your dashboard now shows at a glance whether Tokenade
  is active for any of your agents (not just one), and highlights where you're
  saving the most.
- **Savings in real dollars.** The dashboard now values what you've saved in
  actual money, at each model's current prices.
- **Smoother on Windows.** Commands run through Tokenade now behave correctly in
  more Windows setups.
- **Cleaner reads, less noise.** Long web pages keep a recoverable tail instead
  of cutting off, noisy machine-generated diffs and more compiler output fold
  away on their own, and connected tools announce themselves more compactly.
- A large internal cleanup for long-term reliability.

## 0.7.3

- **Reads images for less.** Tokenade now shrinks oversized images before your
  agent looks at them — far fewer tokens for the same content, with the full-
  resolution copy kept in case it's needed.
- **Teach it new tricks.** You can now add your own compactor for a command
  Tokenade doesn't already fold.
- **Leaner answers.** Refined guidance keeps agent responses tight and on-point
  — lower output cost without losing substance, and it carries through to the
  sub-tasks they spawn.
- **Smarter trimming.** Long command output and stack traces fold more
  intelligently, and important warnings and constraints are never dropped along
  the way.
- **More accurate** savings figures on your dashboard.
- Lighter install.

## 0.7.2

- **Broader agent support.** Codex, Qwen Code, and Grok now work with Tokenade
  out of the box, and your dashboard now also counts Kilo Code, Grok, and
  OpenClaw. (Retired the discontinued Roo Code.)
- **Bigger savings** across more of your day-to-day work.
- **Dashboard:** every figure now follows the time window you choose, and the
  headline better reflects how well Tokenade is working for you.
- Reliability and polish fixes.

## 0.7.1

- More reliable on Windows and Linux.
- Bigger savings across your workflow.
- A calmer, language-aware experience (English / French), with clearer
  plan-related messaging.

## 0.7.0

- **Broader agent support.** Beyond Claude Code, Tokenade now works with
  **Hermes, Pi, OpenCode, OpenClaw, and Gemini CLI** — set up automatically the
  moment it detects the agent on your machine.
- **More accurate savings** on your dashboard.
- **New, simpler plans:** Free (10M tokens/month, unlimited machines), Pro (100M
  tokens/month, unlimited machines — $19.90/mo), and Enterprise (unlimited).
- Smoother on Windows, and better support for non-English content.

## 0.6.3

- More reliable installs and updates, on more platforms.

## 0.6.2

- Bigger savings and a leaner product.

## 0.6.0

- Lighter and faster, with less overhead each session.

## 0.5.6

- A slimmer, quicker setup.

## 0.5.5

- Less overhead and a faster start.

## 0.5.3

- More reliable installs, with a graceful fallback that stays out of your way.

## 0.5.2

- Fixed crashes and garbled output on non-English content, and improved search
  across languages.

## 0.5.1

- Dashboard improvements and additional savings.

## 0.5.0

- Reliable setup on Windows.
