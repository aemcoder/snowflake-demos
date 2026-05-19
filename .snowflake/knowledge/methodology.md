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
