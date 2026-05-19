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
