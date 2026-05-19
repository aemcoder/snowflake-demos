# Snowflake Batch Orchestration — Design Spec

Date: 2026-05-19

## Problem

Converting multiple static pages to EDS one at a time requires repeated human
prompting. Each snowflake run is independent (own branch, own DA path), which
makes parallel execution possible — but the current workflow is sequential and
requires the user to kick off each run manually.

## Goal

Let the user give Claude a list of URLs in a single message and get all
conversions running in parallel, with no further human involvement until the
runs are ready-to-close.

## Non-goals

- Auto-close (tagging + demos.md update) — user closes manually per run.
- Local round-trip (`aem up`) — skipped in batch mode to avoid port conflicts.
- A manifest file or new script — pure in-conversation orchestration only.

## Invocation

The user pastes a list of runs in any readable format — inline text or JSON.
Example:

```
Run snowflake batch:
- https://example.com/page-1  branch=sd-foo-a  da=/foo/a
- https://example.com/page-2  branch=sd-bar-a  da=/bar/a
```

Or:

```json
[
  { "url": "https://...", "branch": "sd-foo-a", "daPath": "/foo/a" },
  { "url": "https://...", "branch": "sd-bar-a", "daPath": "/bar/a" }
]
```

Claude parses whichever format is provided.

## Architecture

### Step 1 — Worktree setup (sequential, ~1s per run)

Claude runs in the main repo:

1. `git checkout main` — ensures we start from vanilla.
2. For each run: `git worktree add -b <branch> ../snowflake-demos-<branch> main`
3. Copy `.hlx/.da-token.json` from the main repo into each worktree's `.hlx/`
   directory so agents can authenticate to DA without user involvement.

All worktrees are created before any agent starts. If a worktree already exists
for a branch, skip it (idempotent).

### Step 2 — Parallel Agent dispatch (single message, N agents)

Claude sends one message containing N `Agent` tool calls, all firing
simultaneously. Each sub-agent is a self-contained snowflake conversion:

**Sub-agent prompt template:**

```
You are in git worktree at <worktreePath> on branch <branch>.

Convert <url> to an EDS overlay page using the snowflake skill.
Parameters:
- DA path: <daPath>
- DA token: available at .hlx/.da-token.json
- Skip local round-trip (no aem up) — go straight to production:
    push branch → DA PUT → POST preview on <branch> → POST live on <branch>
- Stop after Phase 6 (reflect). Do NOT close the run or update demos.md.

These operations are pre-approved — proceed without asking:
  substrate install with --force, git push to <branch> only,
  DA admin API calls (PUT, POST preview, POST live).

Return a JSON summary: { branch, productionUrl, slotCount, sectionCount,
                          ok: true/false, error: string|null }
```

Each agent runs the full snowflake skill phases 0–6 in its isolated worktree.
No shared state between agents.

### Step 3 — Result aggregation

After all agents complete, Claude presents a summary table:

```
| Branch   | Sections | Slots | Status | Demo URL |
|----------|----------|-------|--------|----------|
| sd-foo-a | 9        | 80    | ✓      | https://sd-foo-a--... |
| sd-bar-a | —        | —     | ✗      | substrate install failed |
```

Failed runs include a one-line error. Worktrees remain on disk.
User closes runs and updates demos.md manually, as with single runs.

## Constraints & decisions

| Decision | Rationale |
|---|---|
| Skip local round-trip | Port 3000 conflicts across parallel agents; production IS the verification. |
| Pre-approve destructive ops in prompt | Avoids harness prompts blocking autonomous agents. |
| Worktrees created sequentially before agents start | Prevents race conditions in git worktree creation. |
| Stop before close | User wants to review live pages before tagging. |
| No manifest file | Pure in-conversation; no new tooling to maintain. |

## Error handling

- If a worktree branch already exists: skip creation, reuse existing worktree.
- If DA token is expired: agent reports the error; other runs continue.
- If any individual run fails (substrate, lint, DA upload, etc.): it returns
  `ok: false` with a reason; other runs are unaffected.
- If all runs fail: Claude surfaces the common error (likely token or network).

## Success criteria

1. Giving Claude 3 URLs produces 3 live demo pages with no further human input.
2. A failed individual run does not block the others.
3. The result table gives enough information to know what to close and what to
   investigate.
