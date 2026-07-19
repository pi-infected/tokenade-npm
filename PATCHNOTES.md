# Tokenade — what's new

<!-- Every release must add a `## <version>` section here; the release script
     refuses to publish without one. (Dev-level detail lives in CHANGELOG.md.)

     IMPORTANT — the source is proprietary and the implementation IS the value.
     Notes must stay OUTCOME-ONLY. State only: bigger savings, lower overhead,
     reliability/platform/language fixes, which agents are supported, plans, and
     user-visible dashboard/UI changes. NEVER describe a specific capability or
     lever, nor any mechanism, threshold, technique, file name, or exact
     command/flag — a competitor must not be able to infer what's worth copying. -->

## 0.9.8

- Tokenade now ships its full licence terms, and the package declares them properly. No functional changes — this release behaves exactly like 0.9.7.

## 0.9.7

- Tokenade now reads far more of the web. Pages that used to come back empty, truncated, or as a wall of scaffolding — documentation and knowledge bases, code-hosting and collaboration sites, model and dataset hubs, feeds, shop product pages — read properly, at a fraction of what the raw page would cost.
- Many sites that refused tokenade outright now answer normally.
- When a page genuinely has no readable content, tokenade tells you instead of quietly handing back nothing.
- A page that failed once is retried later in the session rather than staying broken until you restart.
- More accurate savings reporting for web reading. Some earlier figures were overstated; the numbers you see now are the honest ones.
- Lower memory use, and reliability fixes across the web path — including pages in non-Western languages, unusual or malformed pages, and several cases where a page could appear to be read successfully while returning nothing useful.
- Piping tokenade's output into another command no longer prints an error when that command stops reading early.

## 0.9.6

- Tokenade now reads far more of what you actually have on disk: many more document types (including older Office files and several formats that previously came back unreadable), a much wider range of image formats, and audio and video files. Reading any of them costs a fraction of what it used to.
- Ask a document a question and get just the parts that answer it — and you can ask several questions in one go.
- Media files no longer flood your session: they now cost a small, predictable amount instead of an enormous one.
- More accurate savings reporting. Some earlier figures were overstated; the numbers you see now are the honest ones.
- Reliability fixes across document, image and media handling, including files in non-Western languages, damaged or unusual files, and several cases where a file could appear to be read successfully while returning nothing useful.
- Caches created while reading media are now cleaned up on schedule instead of growing quietly.

## 0.9.5

- Tokenade no longer touches your `PATH` or your shell aliases at all. Updating removes anything earlier versions put there, and repairs shell startup files a previous cleanup could leave in a broken state — a fix worth updating for even if you never noticed a problem.
- Uninstalling and updating are now crash-safe: an interruption can no longer leave a shell profile or an agent's settings file half-written.
- Disk hygiene now actually runs on its own schedule, so caches stay within their intended budget instead of growing quietly, and the project you're working on is never evicted.
- Reliability fixes for unusual environments (CI runners, service accounts, sandboxes) where tokenade could previously misidentify your home directory.

## 0.9.4

- Safer installs and upgrades: a stronger integrity check means a corrupted or mismatched download can never leave you with a broken setup, and updating now tidies away leftovers from older versions automatically.
- More accurate, less confusing usage reporting.

## 0.9.3

- Fixed a rare slowdown on long or resumed sessions that could make Claude Code report a hook timeout — prompts stay responsive again.
- Tokenade no longer piles up settings backups in your Claude config folder; older copies are tidied away automatically, leaving just the most recent.

## 0.9.2

- More of your coding agents now get the full treatment: command output is compacted across more of the supported tools, on every platform.
- More reliable on Codex — its usage and savings are now captured correctly.
- Clearer compatibility: the docs now spell out which features work with each agent, so you know exactly what to expect.
- Release hardening.

## 0.9.1

- Cleaner behavior at your plan's monthly limit: once you reach it, Tokenade pauses its optimizations and tells you, then resumes automatically the moment your allowance renews or you move up a plan — nothing to re-configure. Works the same across every supported agent, shell, and operating system, and a Tokenade update never changes that state on its own.
- Reliability: sharper handling of how Tokenade passes your everyday system commands straight through, so their output always shows up exactly as the tool intended.

## 0.9.0

- Smarter session pick-ups: Tokenade now times its history trimming to each session's actual reuse pattern — a quick return comes back instantly, and a long break still gets the lighter, cheaper rebuild. Full original content stays recoverable on demand, and active sessions are never touched.
- Tokenade now spots when a coding session re-bills its entire context without benefit — the measurement layer behind upcoming automatic cache savings, at zero overhead in your sessions.

## 0.8.15

- Returning to a session pays off sooner: the cheaper trimmed-history rebuild now kicks in after a short break, not only after a long one — so more of your resumed sessions start out lighter. Full original content stays recoverable on demand, and active sessions are never touched.
- A calmer status bar: it stays out of the way until there's a saving to show, and the running total refreshes more promptly.
- Tidier setup: the project rule files Tokenade maintains stay clean and free of duplication across updates.

## 0.8.14

- Resuming a past session is now cheaper: long-idle conversations are rebuilt from a trimmed history, so picking a session back up after a break re-sends far less. The full original content stays recoverable on demand, and active sessions are never touched.
- Your disk stays clean: Tokenade now clears out its own temporary working data — cached page reads, downscaled images, scratch files — automatically once it's no longer needed, so nothing piles up over time.
- Sharper code navigation: `tokenade query`, `tokenade impact` and symbol lookups now surface the most central, most-depended-on results first, so the match you want tends to be at the top.
- Even more faithful savings on web research: the reported token and cost figures now track the real cost of web searches and page reads more closely still.

## 0.8.13

- Web research just got much cheaper: assistant web searches are now streamlined on the fly — repeated or already-seen results stop costing you twice, and long research sessions keep far more of your context window free. Full original results remain recoverable on demand, as always.
- Better answers from link-heavy pages: on directories, indexes and other link-dense pages, fetches now surface more of the entries that matter while sending less. Regular articles and docs read exactly as before.
- Cleaner reads on research-heavy sites: discussion threads, Q&A pages, package registries and reference docs come back as focused, readable content, and structured API specs keep their shape — so the answer you asked for is right there.
- Videos and social posts are readable too: fetching a video surfaces its details and, when available, its transcript for summarizing; posts from major social and community platforms come back as the post together with its discussion.
- Web page reading picks the passages that answer your question more reliably, and asks for a summary or a full transcript now return the whole thing instead of a fragment.
- Gemini CLI: web activity is now covered too (on current Gemini CLI versions), with the same savings guarantees as elsewhere.
- New supported agent: Reasonix.
- Installs now work in restricted networks: the npm package is fully self-contained, corporate/sandbox proxies are honored on every connection Tokenade makes, and optional components download reliably even when one source is unreachable.
- Tokenade adapts to what your assistant supports: each integration is validated at install and update time, and picks the best available integration path per agent and version automatically.

## 0.8.12

- Clean uninstall: `tokenade uninstall` now fully removes Tokenade — it restores every config and setting it ever touched, clears its own data, and takes care of the binary. Removing the package the normal way (e.g. `npm uninstall -g @tokenade/cli`) triggers the same cleanup automatically, so nothing is left behind on your machine.
- Consistency: the in-editor guidance always points at the current commands.

## 0.8.11

- Leaner CLI: one command — `tokenade read <file|->` — compacts any content and auto-detects the format, replacing the ~40 per-format commands. Noisy shell commands still go through `tokenade wrap`, now faster for simple ones.
- Smarter web fetching: Tokenade steps aside when your assistant's own fetch already answers the question directly, and steps in where the native tool falls short (PDFs, very large pages) — fewer wasted turns to get the real answer.
- More faithful savings: the reported token/cost figures now track much more closely what a run would actually have cost without Tokenade.

## 0.8.10

- Windows: no more console windows flashing open and shut in the background while you work — Tokenade and everything it runs now stay fully hidden.
- More resilient integration: if the Tokenade binary is ever moved, mid-update, or otherwise unavailable, your assistant's prompt submission no longer surfaces a hook error — it just carries on.
- macOS (Apple Silicon): installs and automatic updates are now reliably runnable straight away, with no manual step to get Tokenade going again.

## 0.8.9

- Your custom status line is now left untouched: Tokenade detects a status line you set up yourself and never overwrites it — it only adds its savings ticker alongside, once.
- New: turn the status line addition off entirely with `tokenade statusline off` (and back on with `tokenade statusline on`). Your choice sticks across updates.

## 0.8.8

- Reliability: upgrading now automatically cleans up an older shell-integration leftover that could, in rare setups, break chained commands — no manual step needed.

## 0.8.7

- Reliability: automatic updates and usage sync now finish far more often in the background, even when the terminal closes or the session ends mid-task.
- Fixes a rare shell-integration hiccup on chained commands for some older setups; upgrading cleans up any leftover from those installs.

## 0.8.6

- Bigger savings on long coding sessions — measured on debug-heavy Python benchmarks, output is leaner turn over turn.
- Broader coverage for agents without native hooks: command output those agents used to miss now gets compacted too, and upgrading cleanly retires the older setup.
- MCP output folds automatically once wired — one command wraps every configured MCP server (and undoes it), with a per-tool breakdown of what each one costs.
- Sharper code exploration: results favor real source over tests/docs and return complete blocks instead of clipped windows; new output modes return just the file list, a count, or signatures when that's all you need.
- Prove it on your own repo: a new benchmark command runs your prompts with and without Tokenade and reports the real token and dollar difference.
- Faster, lighter installs and builds.

## 0.8.5

- Reliability: fixed a rare case where updating could leave the integration hooks pointing at a temporary file; updates now self-heal, so hooks keep working across upgrades with no manual step.

## 0.8.4

- Reliability: on some machines, usage stats could stop syncing to your dashboard while savings kept accruing locally. Syncing is now much more robust, and any backlog uploads automatically on first run — nothing is lost.
- Estimated savings are now more conservative and closer to reality on long sessions.

## 0.8.3

- Share your savings: turn your dashboard into a public page and a ready-to-post image, so recommending Tokenade takes one click — with your referral link baked in.
- Invite friends by email straight from your account: they get a bigger free grant, and you become their sponsor automatically.
- Status line: the referral, GitHub-star and review invitations now take you straight to the right page.
- Your saved-tokens figure now reads the same across the status line, dashboard, shareable page and emails.

## 0.8.2

- Status line: the rotation now also invites happy users to leave a review (hidden once submitted).

## 0.8.1

- Status line: situation-aware nudges — trial machines see the free-account offer (10M tokens/month), connected accounts rotate between the referral program and a GitHub star.
- `--dry-run` is now guaranteed side-effect free.

## 0.8.0

- Referral program is live end to end: refer Tokenade, earn 20% of your referees' saved tokens (free plans) or a monthly revenue share (paid plans). Track everyone you referred — from install to account — right in your dashboard.
- Referred installs get their bigger free grant automatically.

## 0.7.10

- Referred installs get their bigger free grant right away: the install command from a referral link now carries the code (`tokenade install --ref <code>`).

## 0.7.9

- Referral program: earn 20% of the tokens your referees save — free-plan referees raise your monthly limits, paying referees earn you a monthly revenue share. Manage everything from your dashboard's new Affiliate tab.
- Referred users get +20% on their plan limits, forever.
- The status line now surfaces the program (and our GitHub) when there's room.

## 0.7.8

- Start saving in two commands — `npm install -g @tokenade/cli` then `tokenade install`. No account needed: every machine starts with 10M free tokens.
- The status line now shows your remaining free tokens, and the next step whenever a limit is reached.
- Pro can now unlock savings beyond the monthly cap with pay-as-you-save (0,20 € TTC / $0.20 excl. tax per million tokens saved).

## 0.7.7

- **Full savings across sub-agents.** When your agent spawns sub-agents,
  each one gets its own accurate savings context and keeps compacting at
  full strength throughout.
- **Test failures always reach you.** Summary and tally lines from test
  runners (the passed/failed counts printed at the end of a run) are
  preserved verbatim in every compaction.
- **More secrets stay out of transcripts.** Redaction now covers more
  credential shapes across command lines, headers, config files and key
  material.
- **Self-monitoring got teeth.** `tokenade doctor` now flags savings
  features that stopped firing on your machine, and warns loudly if
  another tool wipes the agent-hook wiring.
- **Sturdier detection on unusual output.** Several format detectors are
  more conservative on mixed or ambiguous content — structured rewrites
  only happen when the whole body agrees, so odd documents pass through
  untouched.
- **One honest headline number.** Dashboards (terminal, HTML, tokenade.net)
  now headline a single "tokens" figure weighted at real price ratios —
  output tokens count for what they actually cost relative to input and
  cache reads. A legend under the number explains the weighting; the raw
  split and per-model $ stay visible.
- **Dollar values are the real thing.** Every saved token is now valued at
  the actual price of the model that produced it — across all the models
  you've used, not a single blended guess — and the same figure shows up
  everywhere: your statusline, the terminal and web dashboards, and your
  account page. Works for every agent whose model usage Tokenade can read.
- **Live savings in your status bar.** Claude Code's and Qwen Code's
  statusline now shows your current session's savings as they happen — and
  if you already have a custom statusline, tokenade keeps your text and
  appends its ticker to the same line. Opt out anytime.
- **T3 Code supported.** Sessions driven through T3 Code inherit the
  full Tokenade coverage of the agents it fronts (Claude Code hooks load
  natively); the installer recognizes T3 and wires accordingly.
- **Repeat-poll costs drop.** Re-running the same status/poll command in a
  loop gets progressively cheaper, and identical images pasted twice are
  served from cache.
- **Hermes support.** Tokenade now compacts large tool results inside
  NousResearch Hermes and reports Hermes usage on your dashboard.
- **More agents covered.** Pi, OpenCode, OpenClaw and Kilo now get their
  large tool results compacted the same way Claude Code already did.
- **Repetitive logs collapse.** Long, near-identical log output (the same
  line pattern repeated hundreds of times) now folds to a compact summary
  while every distinct line — errors included — is kept verbatim.
- **Rock-solid install and update.** Installing or uninstalling preserves
  your existing agent configs in every case, updates are health-checked
  before they replace the running binary, and the npm install path now
  verifies a cryptographic signature.
- **Snappier hooks.** Per-prompt and per-edit overhead was removed, so
  Tokenade stays invisible on the hot path even in long sessions.
- **Verifiable accounting.** The savings figure is a true net — Tokenade
  counts its own footprint against it — and lifetime totals carry over
  intact when upgrading from any earlier version. A new `tokenade
  audit-gains` command lets you check the books yourself.

## 0.7.6

- **Works on Debian 12 and older distros again.** The Linux binary no longer
  requires a recent glibc — anything from Debian 11 / Ubuntu 20.04 onward runs.
- **Error lines can no longer be lost.** In mixed command output, an error
  message that lands in the middle of tabular or structured noise is now
  always preserved verbatim, never summarized away.
- **Unchanged commands stop re-billing.** Re-running a read-only command
  (git status, ls, …) whose result provably didn't change now costs a few
  dozen tokens instead of a full re-execution and re-delivery.
- **Recovery after context compaction.** When the agent's context gets
  compacted, Tokenade re-offers the freshest folded outputs so nothing has
  to be re-run to get back to work.
- **Savings are now priced at your real models.** The dashboard and
  tokenade.net price every saved token at the rates of the model that was
  actually in use — not a flat estimate.
- **Cleaner web pages.** Fetched pages drop navigation, share bars, cookie
  banners and related-links clutter more aggressively while keeping the
  article intact — noticeably fewer tokens per page.
- **OpenTofu support.** `tofu` output is compacted like `terraform`.
- **Hardened install.** `tokenade doctor` now verifies the installed hooks
  haven't been tampered with, and project-local filters require a one-time
  trust confirmation before they run.
- Fewer repeated-output loops, better batching guidance, and assorted
  robustness fixes.

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
