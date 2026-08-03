# Tokenade — what's new

## 1.1.5

- Asking how many symbols match now answers with how many match. The count was reporting the display limit instead, so a search with thousands of hits gave the same number as one with exactly that few — the one place where a truncated answer looks identical to a complete one. Path and outline listings now say when they are only part of the answer.
- Recovered output is now proven to be what was actually captured. A repository could leave behind entries that tokenade adopted on their filename alone, so asking to recover a folded output could have returned text no command ever produced. Genuine entries are unaffected.
- When a command produces more output than tokenade can hold, you now still see the end of it, not only the beginning. A build that printed gigabytes and then failed had its reason cut off — the one line that mattered was always the one past the limit.
- The health report now tells you when a repository ships compactors you have not approved, and how to approve them. They correctly do nothing until you do, but nothing said so, so a filter your team committed on purpose looked simply broken.
- A compactor shipped inside a repository no longer rewrites your command output before you approve it. Repositories kept under your home directory — which is nearly all of them — were treated as your own configuration, so cloning one was enough for its filter to take effect. Approving it with the trust command still works as documented, and your own compactors are unaffected.
- A custom compactor you installed can no longer hide why a command failed. Filters are written for the success case, so one that summarised a command to a single line erased the error on a failing run. Successful runs still get your summary.
- Passing something that was never a ref hash now says so, instead of suggesting it may have expired. A typo sent you looking for a retention problem you did not have. A real hash that is genuinely gone still explains the expiry.
- Typing a format name as a command explains itself the same way however you type it. `csv` said "csv is a format, use read", but `csv --help` answered "did you mean ask?" — the least helpful reply on the route where you were asking for help.
- `tokenade exec-compact <cmd>` works. The project rules tokenade writes for you, and the guidance it gives subagents, both told you to run it — and the command did not exist, so following the instructions failed on the first noisy command you tried.
- A command split across several lines with a trailing backslash now runs exactly as written. The continuation could be handed to the program as a literal argument, so a search continued onto the next line searched for the wrong thing.
- A command you commented out stays commented out. When a shell comment sat before a `&&` or `;`, the disabled half of the line could still run. Commands without comments are unaffected, and a `#` that is part of a URL or a word still is.
- Handing a command's output straight to tokenade by path now works. `tokenade read <(git diff)` and other stream-shaped inputs came back empty, because the format detection consumed the stream before anything could read it. Files are unaffected.
- An input with no end — a device file, an endless pipe — is now refused with an explanation instead of being read until the machine runs out of memory. It was consuming several gigabytes per second until the system killed it.
- Asking what depends on a directory is now an error that says so, instead of a confident "nothing depends on this". Pointing the dependents check at a module folder used to report zero symbols and zero dependents and report success, which is the same answer a genuinely unused file gives.
- Symbol lookups and repository maps now tell you when the list you are reading is only part of the answer, and how many matches there really were. A search that matched thousands of symbols used to show a first slice with nothing to signal the rest existed, so a symbol whose file sorted late looked exactly like a symbol that did not exist. Machine-readable output carries the real total too. Answers that were already complete are unchanged.
- Projects set up before this release now receive corrected project rules instead of keeping the first copy they were given. Two corrections were sitting undelivered, including one about how your commands are intercepted that said the opposite of what actually happens.
- The formats tokenade can read are now stated in full where an agent actually reads them. Rich Text, FictionBook, OpenDocument drawings, macro-enabled and template Office files, and the netpbm image variants all opened before and still do — but nothing said so, so nobody tried them. A capability that is never mentioned is one your agent does not have.
- The rule that a credential never reaches you in clear is now checked against where it sits in a large output, not only against its shape. Folding and truncation cannot expose one by cutting around it.
- A credential typed as a command argument is masked like one written as an assignment. The half of an AWS credential that actually matters was travelling in clear when it was passed on a command line, and so were `--password` and `--client-secret` values. Documentation placeholders and shell variables stay readable.
- Typing a format name as if it were a command now points you straight at the command that handles it. Before, `csv` suggested `ask` and `logs` suggested `login` — a log file answered with a login prompt.
- Naming a path that does not exist is now reported as the error it is, instead of coming back as "nothing found" with a success code. An empty directory still succeeds, because that is a real answer.
- Packing a single file works: naming one file used to be answered with "no files in scope", for a path you had just typed.
- Commands asked for machine-readable output always answer in it, including when the answer is empty. Two of them printed nothing at all, which a program reads as a broken response rather than an empty one.
- A piped image in the netpbm family is recognised by its content, not just its file name, so it no longer arrives as broken text when it comes through a pipe. The rule that no input is ever handed back as its own bytes is now guarded in both directions rather than assumed.
- Piping something that is not text into tokenade now gets you a one-line description of it. An image piped in used to come back as more than twice its own size in broken characters.
- Reading any file that is not text — an archive, a database, a compiled object, a font — now names it instead of printing its bytes, at every size. Small ones used to slip through and arrive as broken characters.
- Reading an image file from the command line now tells you what it is instead of printing its bytes as broken text. A small image came back as pages of mojibake; a large one was already handled, which is why it went unnoticed.
- The project rules tokenade writes no longer tell you to avoid absolute paths for commands. On an agent with hooks installed the two forms are handled identically, and the rule cost you a habit for nothing.
- The advice to fetch or search several things at once now says what it actually buys — one round-trip instead of several, and a context that is never re-sent — rather than promising a smaller reply. The reply is not smaller; the saving is real and sits elsewhere.
- Asking several questions in one call tells you when your commas were read as a single question instead, and what the rule is. The batched form was advertised everywhere; the one condition it has was not.
- Search over a large repository now indexes the same files every time it is rebuilt. On a repository big enough to reach the index ceiling, which files were covered — and therefore what search could find at all — used to vary between rebuilds.
- Cost totals and the per-model breakdown are now identical across runs on identical data, down to the last digit and the ordering of the list.
- The cost figures no longer depend on which run you are looking at. When two models are level in a session, the one used to price it was picked arbitrarily and could differ between runs on identical data.
- When tokenade cannot set aside the full bytes behind a folded result, the reason is now recorded instead of the recovery pointer simply not appearing. A failure you can explain is one that gets fixed.
- A long directory listing costs a third less again: the permission column, identical on nearly every line of a source folder, is stated once instead of repeated — and every line that differs from it, a directory or a symlink or something executable, still shows its own.
- A command that prints nothing now comes back as nothing, instead of a blank line.
- Asking a recovered blob a question that fits every line of it now gets you the answer — the whole thing, folded to its shape and count — instead of being told nothing matched and being left with a raw dump as the only way forward.
- Asking a short document a question it cannot answer no longer costs more than reading it outright: the note that says so is reserved for sources long enough for it to matter.
- Reading a document off disk is no longer counted as a web fetch, so you stop being advised to batch network calls you never made. The advice that does fire now counts in plain English.
- Search results no longer carry the engine's own "searches related to…" and "people also ask" blocks inside a result's description. Those described the query rather than the page, and because they made a description longer they were winning over the clean one when two engines returned the same result.
- The price table behind every savings figure tokenade reports is now pinned bucket by bucket, so a number can no longer drift quietly away from what it claims to measure.
- Savings from batched calls are now valued at the price those tokens are actually billed at, so the totals mean what they say. This lowers the reported figure for that category; nothing about what tokenade saves has changed, only what we claim for it.
- A steer you have already declined comes back less and less often instead of at a fixed rate, and starts fresh after a long enough pause.
- Asking what depends on a file no longer lists modules whose name merely ends the same way. A module called `console_logs` was being reported as a dependent of `logs`.
- Asking what depends on a file now finds callers that reach into it without an import statement, which in most codebases is most of them. Cross-language false hits are excluded, so the list stays one you can act on.
- Asking for one file's outline now returns the whole outline. It was being rationed as though you had asked for eight at once, so on a typical source tree nearly half of all outlines came back cut short, pointing you at the full file read the command exists to avoid. Asking for several files at once costs exactly what it did before.
- Machine-readable output that repeats itself — structured logs, uniform tables — now comes back several times smaller, showing the shape and how many rows had it. When the rows genuinely differ, the previous summary is kept: the shorter answer only wins when it is also the truer one.
- A web search no longer mixes pages that answer your question with pages that merely came up. Sources with nothing to say are held back, and if none of them answer, you are told that plainly instead of being handed openings that look like findings.
- Asking a document a question it cannot answer now says so, instead of returning passages that look like an answer. Questions the source does answer are unaffected.
- The steer that suggests batching your commands now states what an extra turn actually costs, at the price class those tokens are really billed on. It used to quote a figure ten times larger than the stake.
- The suggestion to write your own compactor for a recurring command now only appears when that exact command really has no route of its own, and it names the subcommand rather than the program. It used to point at programs that were already among the best covered in the product.
- Output that says the same thing thousands of times now folds all the way down instead of being cut back to a partial slice. You get the shape plus how many times it occurred, where before you got the first few hundred lines and no idea how many followed.
- When your session hits its context limit, dead weight is pruned right then: file reads the session has since edited, commands it has since re-run — and now the calls that produced them, not only their output. Resuming that session afterwards costs less, and the pruning itself is free because the context is being rebuilt at that moment anyway.
- A long inline script or generated query stops costing you twice. When a session supersedes a call, the call's own text is now reclaimed alongside its output — short commands are left readable, since folding those would cost more than it saves.
- Asking a command for verbose output now reliably gets you every byte of it, and that rule is guarded rather than assumed.
- Repetition is now recognised in build and compile logs too, not just where the numbers happen to stand alone. A file name like `f412.cpp.o` hid its number from the folding, so six hundred near-identical build lines each looked unique and none of them collapsed.
- Any command that does the same thing many times now reports it once. Package installs, database migrations and build steps print one receipt per unit of work; those lines are collapsed to a single line saying how many there were, and anything that is not one of them — every error, every warning — comes through untouched.
- Running a SQL script through a database client reports how many statements went through, and the error that stopped it in full. Every statement used to acknowledge itself in its own line.
- `bundle install` comes back as what changed, not as the list of everything already in place.
- Applying a directory of Kubernetes manifests reports the resources that went in as a count, and anything the server rejected in full. A few hundred confirmations used to arrive whole, with the rejection among them.
- A rejected `git push` is not buried under the server's progress counters any more. The locally-printed counters were folded; the same counters echoed back from the server were not.
- A `pip install` that fails to resolve comes back as the conflict, not the catalogue. One line per package while resolving is most of what a large requirements file prints, and the explanation sat underneath it.
- A failing `docker build` comes back with the reason instead of the log. A build that dies installing packages had its two explanatory lines folded away as noise while nine hundred lines of step outline were kept — the exact inverse. The same output is now a quarter of a kilobyte and says what broke.
- A failing `go test` now tells you why, not just that. The line naming the failure was kept while the line underneath it — the file, the line number, the expected and actual values — was dropped, so the only way to learn anything was to run the tests again.
- A pytest run reports what failed instead of what passed. Its ordinary progress output — one line per file, all distinct — used to fill most of what came back; a 400-file run with a single failure now arrives about fifteen times smaller, with the traceback untouched. A file whose line shows a failure is never folded: that line is the answer.
- When the recovery cache has to make room, it drops what you can get back another way before what you cannot. The limit is still a limit, but the last copy of something is now the last thing sacrificed, not the first one an older timestamp happened to select.
- A block folded out of a session keeps its recoverable copy for as long as the session can be resumed. Ordinary folds still expire after a week — their source is still on your disk — but a block whose bytes were replaced has no other copy, and losing it left a pointer to nothing.
- A folded block can no longer lose its only copy. The recovery pointer left in a compacted session is now protected from cache eviction like every other, so `expand-ref` still works after a long session.
- A row of ordinary numbers is no longer mistaken for a payment card. A table of counts or measurements could come back with two of its rows masked, which silently changed the data you were reading. Real card numbers are still masked.
- Reading code and documentation no longer loses the line you were reading. Any assignment whose left side ended in `_token`, `_key` or `_secret` had its right side masked as though it were a credential — a page of Django docs came back saying `primary_key=<redacted>`, and source came back with the call gone. Environment variables still lose their values.
- The same protection now looks at what it is about to hide. A field type, a function call or a namespaced path on the right of `password`, `token`, `secret` or `key` is code, and code is left intact — `let secret = derive(seed)` and `password: String` come back whole. Anything that could actually be a credential is still masked.
- The same search now returns the same page every time, on web content and on saved results pages too.
- An MCP tool result that folded hard now carries a way back to the full payload. These calls are the ones you often cannot simply repeat — a paginated fetch, a search over data that has moved on, a report about a change already made — so the folded copy used to be the only one. The result itself is unchanged; the pointer just rides along.
- Piping content in — a log, a JSON dump, a saved results page, an accessibility tree — no longer costs you the original. These fold the hardest of anything we handle, sometimes to a thousandth of the input, and there is no file to go back to; now there is a pointer that returns every byte. Reading a named file is unchanged: the path you typed is already the way back.
- A release can no longer take a platform away. If a build had covered fewer platforms than the release already online, the users left out would have lost both the new version and the one they were running, because the old files are cleared once the new ones are up.
- A release can no longer go out with only some platforms built. The published package promises a binary for every supported platform, and if one had been skipped, installing on that platform would simply have failed — for those users only, with nothing in the release reporting it.
- A release can no longer publish documentation older than what is already online. The public page could be replaced by a stale copy without anything reporting it.
- Asking a question of a folded search result or log now answers with the matching lines, near the top, for a fraction of what it used to return. The old answer buried the one line you wanted under sixty lines of its neighbours — which, in a search result, belong to unrelated files.
- Recovering a folded blob now suggests the way in that actually fits it. Over a search result or a log, asking a question in words retrieves poorly — neighbouring lines are unrelated, so there is no passage to find — and matching a pattern is both exact and cheaper. Over prose it stays the other way round.
- A fold that told you how to recover it now hands you what you need to do so. Some views named the recovery command without ever printing the reference it asks for, so the instruction pointed at nothing — and those were precisely the views that went without one.
- Whatever a command's output loses to folding can now be recovered. Until now the pointer appeared only when what remained was still large; a search folded from 14 000 matches down to two hundred lines left no way back to the rest but re-running the command — which is not always possible, and never free.
- A recursive `grep` over a whole tree now says where the matches are — how many per file, most-hit first — before showing the excerpt. A few thousand hits used to arrive as two hundred arbitrary lines.
- `grep -r pattern dir/` without `-n` gets the same repeated-path folding as the `-n` form. That is the shape agents type most, and it was the one shape being missed.
- Listing a repository — `git ls-files`, `ls-tree`, `rev-list`, `worktree`, `submodule`, `lfs ls-files` — now comes back as a directory summary instead of thousands of paths. On a mid-size repo that is one of the largest single outputs an agent ever reads.
- Reading a big slice of a source file with `sed -n`, `head` or `tail` now costs what the same read through `Read` costs. Short slices are left byte-for-byte alone, because those are edit targets.
- A command run under `timeout`, `nice`, `stdbuf` or a similar wrapper is compacted by the tool it actually runs. `timeout 300 cargo test` was being treated as a program named `300`, so it fell back to generic compaction and its savings were filed under the wrong name.
- Asking several questions in one call now says so when the batch is longer than one call can answer. Previously the reply came back numbered and looked complete, so a question that was never searched for was indistinguishable from one the document had no answer to.
- `impact` now lists what a file declares in the order the file declares it. Only the first names of each kind are shown, and alphabetical order handed that space to whatever sorted first — on a test-heavy source file that meant a list of unit tests with the entire public interface hidden behind the overflow count.
- `query` no longer claims a file declares a trait it merely implements. Asking where `Drop`, `Default` or `Display` is defined used to return a list of every file that implements it, with the real declaration nowhere in sight. Implementations are now reported under the type they extend, and shown as such.
- Improvements to symbol extraction now reach repositories you already indexed. A cached index was only ever refreshed for files whose contents changed, so a file nobody touched kept the symbols it was first parsed with — indefinitely, across upgrades.
- `skeleton` no longer spends most of its output on a file's test module. On a well-tested source file the tests were the majority of the signatures returned, so the question "what does this file offer?" came back answered mostly by its proofs. The module still appears, with the folded line count, and tests remain findable by name.
- `semantic` results now carry a score that actually tells them apart. Every result of every query used to come back at the same value, so the number said nothing about which match was strong — and a query that matched almost nothing looked as certain as one that matched exactly. Results are no longer labelled as reranked by a stage that does no reranking.
- `map` stays a cheap overview on a large repository. Its directory listing had no upper bound, so on a big codebase the command meant to save you from reading files cost more than reading several of them — and most of what you paid for were directories holding a single file. The densest directories are kept, the count of what was trimmed is stated, and `--json` still returns everything. Small repositories are unchanged.
- `impact` answers "what does this affect?" without printing every last leaf. On a widely-imported module the reply ran to hundreds of paths, well past the point anyone reads, and the useful part was already at the top. The most-affected files are listed, the number left out is stated, the count still reports the true total, and `--json` still returns the complete list.
- The suggestion to write your own compactor for a recurring command now only appears when there is something left to gain. It was triggered by how much output a command produced, not by how much still reached the model afterwards, so it fired on commands tokenade had already reduced to almost nothing — and advice that arrives when it is not warranted stops being read when it is.
- `map` now says how many files its ranked list left out. The heading read as though those were the files that mattered in the repository, when it was showing a fixed handful of the densest ones out of possibly thousands.
- You can now ask far more questions in a single `--prompt` call. The ceiling was low enough that a deliberate batch hit it, which is the opposite of what batching is for.
- YAML that is not a Kubernetes manifest keeps its own fields. A list of names that are pure bookkeeping under kubectl — `uid`, `creationTimestamp`, `resourceVersion` and friends — was being applied to every YAML file, so an ordinary application config lost real values.
- `semantic --output-mode count` now answers something about your repository instead of repeating the size of its own result window, which was the same number for every query ever asked. A `--limit` flag sets how deep the search goes, and a count that fills the search's candidate pool is marked as a floor rather than passed off as a total.
- `wrap` can keep stdout and stderr apart with `--split-streams`. By default the two are merged, which is what an agent wants; a script that redirects output was getting error text written into its data file.
- On Windows, `map` now shows your repository's directories instead of a single line for the whole tree. Paths were stored with the platform separator while everything that reads them expects `/`, so every file was grouped under one directory.

## 1.1.4

- The same search returns the same results every time. Two files of equal relevance could swap places between runs, which changed what you were actually shown.
- A bug report no longer carries a private key. If a collected log or transcript held an SSH or PGP key, its body went into the archive in clear.
- A secret at the very end of a very large command output is redacted like any other.
- A command that failed keeps its output when you resume a session. The error that explains everything you did next is no longer dropped.
- Stale file reads are recognised whether the path was written relative or absolute, and smaller ones are reclaimed too.
- Searching files no longer buries you in `node_modules/`, `target/` and the like — and it tells you how many paths it left out and how to see them.
- Asking for several skeletons at once: a file that no longer fits your budget shrinks to a one-line summary instead of disappearing.
- A large spreadsheet reads as a column profile — types, ranges, how much is missing — instead of thousands of rows.
- Environment variables are held to one list of what counts as a secret, so the same variable is treated the same way everywhere.

<!-- Every release must add a `## <version>` section here; the release script
     refuses to publish without one. (Dev-level detail lives in CHANGELOG.md.)

     IMPORTANT — the source is proprietary and the implementation IS the value.
     Notes must stay OUTCOME-ONLY. State only: bigger savings, lower overhead,
     reliability/platform/language fixes, which agents are supported, plans, and
     user-visible dashboard/UI changes. NEVER describe a specific capability or
     lever, nor any mechanism, threshold, technique, file name, or exact
     command/flag — a competitor must not be able to infer what's worth copying. -->

## 1.1.3

- The dollar amounts on your dashboard are the real price of each model you used. Every model in the current lineup was priced wrong, and the newest ones counted as nothing at all. Prices now stay current on their own, so a model released tomorrow is priced correctly too.
- Your usage is no longer counted several times over. On Claude Code a single answer could be reported up to three times, inflating both your dashboard and your quota.
- Bigger savings on web pages, short ones included.
- A page that comes back as an error is reported as a failed fetch, instead of being passed on as though it were the content you asked for.
- Antigravity is supported: its usage is counted along with every other agent.
- Bigger savings in long sessions that keep coming back to the same files and commands.
- Token counts are accurate on text that mixes Chinese, Japanese or Korean with Latin script.

## 1.1.2

- A machine that was offline long enough to be paused now comes back on its own once the connection is back. Nothing to run, nothing to re-authorize.
- If your machine is not signed in yet, the message you get says so and points at the one step that fixes it, instead of blaming the network.
- The health report re-tests the connection while you watch, so its verdict is the current state of your machine, not an older one.
- Leftovers from a much older version can no longer wedge the commands that clear them: the clean-up now happens and your command still runs.

## 1.1.1

- Anything an earlier version left on your `PATH` is now cleared the moment it gets in the way, without you having to run anything. Commands your editor and agents depend on keep working, and when a restart is still needed you are told which app to restart.
- Coming back after time away: signing in again takes effect straight away. A machine idle long enough to fall out of sync no longer stays paused after a sign-in that reported success.

## 1.1.0

- Broader language coverage: work driven through PHP, Node, Deno and Ruby now comes back compacted for what it actually is, and their test runs report like every other test suite.
- More of what a shell command prints is compacted instead of passed through at full price.
- Windows: a command is recognised consistently however it is invoked, so it no longer misses the compaction its counterparts get on other platforms.

## 1.0.1

- Tokenade now ships a native build for Windows on ARM (ARM64) machines.
- Results from your MCP tools' searches and lookups come back in full more often, instead of being set aside for you to fetch separately.

## 0.10.0

- More of the web comes back whole. Text that used to stop partway through a sentence now arrives complete, and pages that stated their own heading twice state it once.
- Documents that were already plain or already formatted keep the shape they came in, instead of being reflowed into one undifferentiated block.
- Documents laid out in columns are read in the order a person reads them, so sentences no longer interleave and words are no longer welded together out of two of them.
- Tables are reported only where a document genuinely has one.
- Long documents split for search stay readable in the middle, not just at the top.
- Pages built with extreme nesting, which could previously occupy a request far longer than any page should, now return promptly.
- Sites that turn automated readers away are identified more accurately, and are never attributed to the wrong provider.
- Wider coverage of file types and written languages when preparing documents for search.
- Anything an earlier version left on your `PATH` now says so plainly rather than quietly standing in for a command; updating clears it.

## 0.9.9

- Reading a web page is roughly twice as fast, and pages that used to be the slow ones are no longer slow. Nothing about what you get back changed — the same page reads the same, it just arrives sooner.
- Pages that browsers render fine but that used to come back mangled — unusual or malformed markup, complex tables, merged cells — now read correctly.
- Video content linked inside a page is surfaced instead of silently dropped.
- Documents with merged table cells keep their columns lined up.
- Fixes for two rare cases where part of a page could go missing without any sign that it had.

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
