# Methodology — project override

This repo is a **demos collection**: each snowflake run produces one
self-contained demo, kept entirely on its own branch. Main stays
vanilla so every new run can start from a clean boilerplate.

This file overrides specific steps in the bundled
`<SKILL_DIR>/knowledge/methodology.md`. Bundled rules not contradicted
here still apply.

## Branch model

- **`main`** = vanilla AEM boilerplate + this override + `demos.md`
  index. No substrate, no per-run artifacts.
- **`snowflake-<NNN>`** = main + substrate + run NNN's artifacts. Each
  run branch is independent of every other.
- After close, branches are kept indefinitely (they ARE the demo).

## Phase 5 — Production round-trip

Publish on the run's own branch, NOT on main:

```bash
# Preview (already in the bundled methodology — branch URL)
curl -X POST -H "Authorization: Bearer $TOKEN" \
  "https://admin.hlx.page/preview/<owner>/<repo>/<branch>/<da-root>/<page>"

# Live — branch URL, not main
curl -X POST -H "Authorization: Bearer $TOKEN" \
  "https://admin.hlx.page/live/<owner>/<repo>/<branch>/<da-root>/<page>"
```

Canonical demo URL is then:

```
https://<branch>--<repo>--<owner>.aem.live/<da-root>/<page>
```

Do NOT POST live on `main` — main has no substrate code, so the page
would render as raw post-pipeline HTML with no overlay.

## Phase 6 — Close (NO trunk merge)

Closing a run tags the branch and pushes. It does NOT fast-forward
main.

```bash
git checkout "$BRANCH"
git tag "$TAG"
git push origin "$BRANCH"
git push origin "$TAG"
```

DO NOT:
- `git checkout main`
- `git merge --ff-only "$BRANCH"`
- `git push origin main`

After tagging, switch to main and add a row to `demos.md` for the
closed run. That update is the only thing committed to main.

```bash
git checkout main
# edit demos.md — append a row for this run
git add demos.md
git commit -m "demos: add #<NNN> <slug>"
git push origin main
```

## Batch mode

When the user asks to convert multiple URLs in one go, follow this protocol
instead of the standard single-run flow.

### Invocation

Accept either format:

**Inline text** (one run per line):
```
Run snowflake batch:
- https://example.com/page-1  branch=sd-foo-a  da=/foo/a
- https://example.com/page-2  branch=sd-bar-a  da=/bar/a
```

**JSON array:**
```json
[
  { "url": "https://...", "branch": "sd-foo-a", "daPath": "/foo/a" },
  { "url": "https://...", "branch": "sd-bar-a", "daPath": "/bar/a" }
]
```

### Step 1 — Worktree setup (run sequentially in main repo)

```bash
git checkout main
node tools/snowflake-batch.mjs '<json-input>'
```

The script creates one worktree per run from `main` and copies the DA token.
It prints a JSON array of `{ url, branch, daPath, worktreePath }`.

### Step 2 — Parallel Agent dispatch

Send one message with N `Agent` tool calls (one per run). Each sub-agent prompt:

```
You are in git worktree at <worktreePath> on branch <branch>.

Convert <url> to an EDS overlay page using the snowflake skill.
- DA path: <daPath>
- DA token: .hlx/.da-token.json (already present)
- Skip local round-trip — go straight to production:
    push branch → DA PUT → POST preview on <branch> → POST live on <branch>
- Stop after Phase 6 reflect. Do NOT close the run or update demos.md.

These operations are pre-approved — proceed without asking:
  substrate install --force, git push to <branch> only,
  DA admin API calls (PUT, POST preview, POST live).

Return exactly this JSON on completion:
{ "branch": "<branch>", "productionUrl": "<url>", "slotCount": N,
  "sectionCount": N, "ok": true/false, "error": null/<message> }
```

### Step 3 — Result aggregation

After all agents complete, present:

```
| Branch   | Sections | Slots | Status | Demo URL |
|----------|----------|-------|--------|----------|
| sd-foo-a | 9        | 80    | ✓      | https://sd-foo-a--... |
| sd-bar-a | —        | —     | ✗      | <error> |
```

### Constraints

- Never POST live or preview on `main` — branch-only publishing.
- Never merge worktree branches to `main` — user closes manually.
- If a run fails, continue the others — report failure in the result table.
- If DA token is expired, all runs will fail — surface the shared cause.

## Side-by-side comparison

After any round-trip (single run or batch), create a side-by-side PNG comparing the
original source page and the converted EDS production page.

### Take screenshots

```
playwright-cli open <source-url>
playwright-cli resize 1280 800
# wait 2–3s for fonts / overlay to settle
playwright-cli screenshot --filename original.png
playwright-cli goto <production-url>
# wait 3s for overlay engine to apply
playwright-cli screenshot --filename converted.png
playwright-cli close
```

### Composite

```bash
node tools/compare-pages.mjs original.png converted.png \
  .snowflake/projects/<NNN>-<slug>/diff/comparison.png
```

The script detects the available backend (ImageMagick or ffmpeg) automatically.
Output is a side-by-side PNG: original on the left, EDS overlay on the right,
with a thin grey divider. Both sides are scaled to 720 px wide.

Save the comparison PNG to the project's `diff/` folder and commit it with the
reflect commit so it's part of the run record.

## Refresh — re-running a demo from scratch (mode B: snapshot-by-clone)

This repo uses the **snapshot-by-clone** refresh strategy (see bundled
methodology §"Refresh mode" option B). Each refresh creates an immutable
dated snapshot AND refreshes the active branch in place, so both versions
stay live at their own URLs.

### Naming convention

- **Active/latest:** branch `<branch>`, DA `<da-path>` (no suffix).
- **Snapshot (immutable):** branch `<branch>-YYYY-MM-DD`, DA `<da-path>-YYYY-MM-DD`.
- **Same-day collisions:** append `-N` starting at 2 (e.g. `<branch>-2026-05-19-2`).
- **No close tag on snapshots** — the dated branch name IS the close marker.
- **Close tag on active branch only:** `<branch>-close`, force-moved on each refresh.

### Workflow per demo

Given a demo to refresh (e.g. `sd-foo-a` / `/foo/a`):

1. **Compute snapshot suffix.** Today's date `YYYY-MM-DD`; if
   `git ls-remote origin 'refs/heads/<branch>-YYYY-MM-DD*'` shows
   collisions, find the lowest free `-N` starting at 2.

2. **Clone branch to snapshot.**
   ```bash
   git fetch origin <branch>
   git push origin refs/remotes/origin/<branch>:refs/heads/<branch>-<date>
   ```

3. **Copy DA content to dated path.**
   ```bash
   TOKEN=$(jq -r .access_token .hlx/.da-token.json)
   curl -sS -H "Authorization: Bearer $TOKEN" \
     "https://admin.da.live/source/<owner>/<repo>/<da-path>.html" \
     -o /tmp/da-snapshot.html
   curl -sS -X PUT -H "Authorization: Bearer $TOKEN" \
     -F "data=@/tmp/da-snapshot.html;type=text/html" \
     "https://admin.da.live/source/<owner>/<repo>/<da-path>-<date>.html"
   ```

4. **Publish the snapshot (preview + live on the snapshot branch).**
   ```bash
   curl -sS -X POST -H "Authorization: Bearer $TOKEN" \
     "https://admin.hlx.page/preview/<owner>/<repo>/<branch>-<date>/<da-path>-<date>"
   curl -sS -X POST -H "Authorization: Bearer $TOKEN" \
     "https://admin.hlx.page/live/<owner>/<repo>/<branch>-<date>/<da-path>-<date>"
   ```
   The snapshot demo URL: `https://<branch>-<date>--<repo>--<owner>.aem.live/<da-path>-<date>`

5. **Rename the close tag** (archive prior close).
   ```bash
   git tag <branch>-<date>-close <branch>-close
   git tag -d <branch>-close
   git push origin <branch>-<date>-close :<branch>-close
   ```

6. **Reset the active branch tip to vanilla main** (in the worktree).
   ```bash
   cd <worktree-path-for-branch>
   git fetch origin main
   git reset --hard origin/main
   # Clean leftover artifacts from prior run (none should be tracked, but be safe)
   trash .snowflake/.backup .snowflake/projects 2>/dev/null || true
   ```

7. **Run snowflake phases 0–6 in the worktree** (autonomous, no prompts).
   The bundled Phase 5.2.2a will create a labeled DA snapshot
   automatically before the PUT, in addition to what we did in step 3.

8. **Force-push the refreshed active branch** (it diverged from origin).
   ```bash
   git push --force-with-lease origin <branch>
   ```

9. **Re-tag the new close.**
   ```bash
   git tag <branch>-close
   git push origin <branch>-close
   ```

10. **Update `demos.md` on main.** Add the snapshot to the demo's history
    section (or column). Active row is unchanged — same branch, same URL.

### Demos.md row format with history

Each demo row gets an inline history column listing all snapshot URLs:

```
| # | Source | Latest | History |
|---|---|---|---|
| 011 | [Oatly proposed-A](...) | <https://sd-oatly-a--…/oatly/a> | <https://sd-oatly-a-2026-05-19--…/oatly/a-2026-05-19> |
```

If history grows beyond ~3 entries per row, switch to a separate
`history/<demo-slug>.md` file linked from the row.

### Refresh invocation

Tell Claude: **"refresh sd-foo-a"** (or multiple: "refresh sd-foo-a sd-bar-a").
Claude executes steps 1–9 per branch (parallel where independent) and updates
demos.md on main once all are done.

### Vanilla refresh contract

**A refresh is a regression test of the current skill against the source URL,
not a contextual replay.** The goal is to surface how a clean conversion
performs today — which means neither the orchestrator nor the conversion
sub-agent may peek at the prior run's findings.

#### Orchestrator (parent) rules

When dispatching the conversion sub-agent for refresh step 7, the prompt must
include ONLY:

- Source URL, branch, DA path, page slug
- Owner/repo, substrate version (already installed by step 6)
- DA token location, project folder path
- Procedural notes that are state-of-the-worktree, not state-of-the-prior-run
  (e.g. "force-push is required because origin still has the prior closed
  run tip" — fine, because it's about the current worktree vs origin
  divergence, not about WHAT the prior run did)
- A pointer to the bundled skill knowledge (substrate, learnings,
  methodology) and the project methodology override

The prompt must NOT include:

- Page-specific hints derived from prior runs (e.g. "watch for the X
  collision the prior run hit", "the inline `<style>` had a quirk here",
  "section foo was renamed to foo-section last time")
- Names of branch-level fixes that were applied previously
- Pre-emptive renamings, scopings, or workarounds for this specific page
- Any mention of what the prior closed run looked like (commit messages,
  notes excerpts, decisions.json snippets)

Cross-page knowledge from the bundled `learnings.md` IS allowed (e.g.
"check for `<span class=...>` patterns" — that's a generalized rule
codified for ALL pages, not a hint about THIS page's prior conversion).

#### Sub-agent rules

The conversion sub-agent operating in the refreshed worktree must NOT:

- Run `git log`, `git show`, `git diff`, or `git reflog` against the
  branch's history to discover prior conversion commits. The branch tip
  on origin still has them, but they are off-limits.
- Read any surviving `.snowflake/projects/<NNN>-<slug>/` content from a
  prior run (if leftover files weren't fully cleaned, treat as if absent —
  do not consult notes.md, decisions.json, learnings.md, output/ files
  from prior runs)
- Diff the current source HTML against any cached/archived prior version
  to see what changed

The sub-agent MAY:

- Read `<SKILL_DIR>/knowledge/{methodology,architecture,learnings}.md`
  (bundled skill knowledge — these are intentional cross-run knowledge)
- Read `.snowflake/knowledge/{methodology,learnings}.md` (project-level
  override — conventions and project-wide learnings, not page-specific)
- Fetch and analyze the source URL fresh
- Look at the current substrate code to understand pipeline behavior
- Run `git status`, `git rev-parse HEAD`, `git remote -v` etc. — these
  are about the current worktree state, not the prior run's findings

#### Why this matters

Without this contract:
- The orchestrator subconsciously back-references "what the prior run did"
  and includes hints that pre-solve the page's quirks
- The sub-agent sees prior conversion commit messages like "fix(foo):
  scoped section padding leak" and applies the same fix without
  rediscovering whether it's still needed under the current substrate
- The refresh becomes "did anything regress against the prior fix-set"
  rather than "what does today's skill produce for this URL"
- Substrate gaps that have since been fixed don't get re-validated, and
  substrate gaps that have NEWLY appeared (or new patterns from changed
  source) don't get surfaced

With it, every refresh is a fair test. If the skill (substrate, learnings,
phases) has improved enough that a previously-needed branch-level fix is
no longer necessary, the refresh will produce a cleaner output and we'll
notice. If a new pattern needs codifying, the sub-agent will discover it
organically and report it as a substrate gap — the same way a fresh,
first-time run would.
