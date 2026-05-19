# Snowflake Batch Orchestration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `tools/snowflake-batch.mjs` helper and batch protocol so Claude can orchestrate N parallel snowflake conversions from a single user message.

**Architecture:** The user gives Claude a list of `{url, branch, daPath}` entries (JSON or inline text). Claude runs `tools/snowflake-batch.mjs` to create git worktrees from `main` and copy the DA token, then dispatches one parallel sub-agent per worktree. Each sub-agent runs the full snowflake skill (phases 0–6, no local round-trip) and returns a JSON result. Claude presents a summary table. The batch protocol is documented in `.snowflake/knowledge/methodology.md` so future sessions know the pattern.

**Tech Stack:** Node.js 22 ESM, `node:child_process`, `node:fs`, `node:test` (built-in, zero extra deps), git worktrees.

---

### Task 1: Input parser — `parseBatchInput`

**Files:**
- Create: `tools/snowflake-batch.mjs`
- Create: `tools/snowflake-batch.test.mjs`
- Modify: `package.json` (add `test:batch` script)

- [ ] **Step 1: Add test script to package.json**

  Open `package.json`. Add `"test:batch": "node --test tools/snowflake-batch.test.mjs"` to `scripts`:

  ```json
  "scripts": {
    "lint:js": "eslint .",
    "lint:css": "stylelint \"blocks/**/*.css\" \"styles/*.css\"",
    "lint": "npm run lint:js && npm run lint:css",
    "lint:fix": "npm run lint:js -- --fix && npm run lint:css -- --fix",
    "test:batch": "node --test tools/snowflake-batch.test.mjs"
  },
  ```

- [ ] **Step 2: Write failing tests for `parseBatchInput`**

  Create `tools/snowflake-batch.test.mjs`:

  ```js
  import { test } from 'node:test';
  import assert from 'node:assert/strict';
  import { parseBatchInput } from './snowflake-batch.mjs';

  test('parseBatchInput: JSON array', () => {
    const input = '[{"url":"https://a.com/p","branch":"sd-a","daPath":"/a"}]';
    const runs = parseBatchInput(input);
    assert.equal(runs.length, 1);
    assert.equal(runs[0].url, 'https://a.com/p');
    assert.equal(runs[0].branch, 'sd-a');
    assert.equal(runs[0].daPath, '/a');
  });

  test('parseBatchInput: inline text with da= shorthand', () => {
    const input = [
      '- https://b.com/p1  branch=sd-b  da=/b',
      '- https://c.com/p2  branch=sd-c  da=/c',
    ].join('\n');
    const runs = parseBatchInput(input);
    assert.equal(runs.length, 2);
    assert.equal(runs[0].url, 'https://b.com/p1');
    assert.equal(runs[0].branch, 'sd-b');
    assert.equal(runs[0].daPath, '/b');
    assert.equal(runs[1].branch, 'sd-c');
  });

  test('parseBatchInput: inline text without list marker', () => {
    const input = 'https://d.com/p  branch=sd-d  da=/d';
    const runs = parseBatchInput(input);
    assert.equal(runs.length, 1);
    assert.equal(runs[0].branch, 'sd-d');
  });

  test('parseBatchInput: throws on missing branch', () => {
    assert.throws(
      () => parseBatchInput('[{"url":"https://a.com","daPath":"/a"}]'),
      /branch/,
    );
  });

  test('parseBatchInput: throws on missing daPath', () => {
    assert.throws(
      () => parseBatchInput('[{"url":"https://a.com","branch":"sd-x"}]'),
      /daPath/,
    );
  });

  test('parseBatchInput: single JSON object (not array)', () => {
    const input = '{"url":"https://e.com/p","branch":"sd-e","daPath":"/e"}';
    const runs = parseBatchInput(input);
    assert.equal(runs.length, 1);
    assert.equal(runs[0].branch, 'sd-e');
  });
  ```

- [ ] **Step 3: Run tests — expect failure**

  ```bash
  npm run test:batch
  ```

  Expected: `ERR_MODULE_NOT_FOUND` or similar (file doesn't exist yet).

- [ ] **Step 4: Implement `parseBatchInput` in `tools/snowflake-batch.mjs`**

  Create `tools/snowflake-batch.mjs`:

  ```js
  import { execSync } from 'node:child_process';
  import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
  import { basename, join } from 'node:path';
  import { fileURLToPath } from 'node:url';

  /**
   * Parse batch input — accepts a JSON array/object or inline text.
   *
   * Inline format (one run per line):
   *   - https://example.com/page  branch=sd-foo-a  da=/foo/a
   *
   * JSON format:
   *   [{"url":"...","branch":"...","daPath":"..."}]
   *
   * @param {string} input
   * @returns {{ url: string, branch: string, daPath: string }[]}
   */
  export function parseBatchInput(input) {
    const trimmed = input.trim();
    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      const parsed = JSON.parse(trimmed);
      return (Array.isArray(parsed) ? parsed : [parsed]).map(normalise);
    }
    return trimmed
      .split('\n')
      .map(l => l.trim().replace(/^[-*]\s*/, ''))
      .filter(l => l.startsWith('http'))
      .map(l => {
        const parts = l.trim().split(/\s+/);
        const url = parts[0];
        const params = Object.fromEntries(
          parts.slice(1)
            .filter(p => p.includes('='))
            .map(p => p.split('=')),
        );
        return normalise({ url, branch: params.branch, daPath: params.da ?? params.daPath });
      });
  }

  function normalise({ url, branch, daPath }) {
    if (!url) throw new Error('Each run must have a url');
    if (!branch) throw new Error('Each run must have a branch');
    if (!daPath) throw new Error('Each run must have a daPath (or da=)');
    return { url, branch, daPath };
  }
  ```

- [ ] **Step 5: Run tests — expect pass**

  ```bash
  npm run test:batch
  ```

  Expected: `6 pass, 0 fail`.

- [ ] **Step 6: Commit**

  ```bash
  git add tools/snowflake-batch.mjs tools/snowflake-batch.test.mjs package.json
  git commit -m "feat: add snowflake-batch input parser"
  ```

---

### Task 2: Worktree setup — `setupWorktrees`

**Files:**
- Modify: `tools/snowflake-batch.mjs` (add `setupWorktrees`)
- Modify: `tools/snowflake-batch.test.mjs` (add tests)

- [ ] **Step 1: Write failing tests for `setupWorktrees`**

  Append to `tools/snowflake-batch.test.mjs`:

  ```js
  import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
  import { tmpdir } from 'node:os';
  import { join as pathJoin } from 'node:path';
  import { setupWorktrees } from './snowflake-batch.mjs';

  test('setupWorktrees: creates worktree dir and copies token', () => {
    // Build a fake repo root with a .hlx/.da-token.json
    const repoRoot = mkdtempSync(pathJoin(tmpdir(), 'snowflake-test-'));
    const hlxDir = pathJoin(repoRoot, '.hlx');
    mkdirSync(hlxDir, { recursive: true });
    writeFileSync(pathJoin(hlxDir, '.da-token.json'), '{"access_token":"test"}');

    // Parent dir where worktrees land
    const parentDir = pathJoin(repoRoot, '..');
    const branch = `sd-test-${Date.now()}`;
    const expectedWorktreePath = pathJoin(parentDir, `${basename(repoRoot)}-${branch}`);

    // Stub execSync to simulate worktree creation (creates the dir)
    const run = { url: 'https://x.com', branch, daPath: '/x' };
    const results = setupWorktrees([run], repoRoot, {
      execSync: (_cmd) => { mkdirSync(expectedWorktreePath, { recursive: true }); },
    });

    assert.equal(results.length, 1);
    assert.equal(results[0].worktreePath, expectedWorktreePath);
    assert.ok(
      existsSync(pathJoin(expectedWorktreePath, '.hlx', '.da-token.json')),
      'token should be copied into worktree',
    );

    // Cleanup
    rmSync(repoRoot, { recursive: true, force: true });
    rmSync(expectedWorktreePath, { recursive: true, force: true });
  });

  test('setupWorktrees: skips git command when worktree already exists', () => {
    const repoRoot = mkdtempSync(pathJoin(tmpdir(), 'snowflake-test-'));
    mkdirSync(pathJoin(repoRoot, '.hlx'), { recursive: true });
    writeFileSync(pathJoin(repoRoot, '.hlx', '.da-token.json'), '{"access_token":"test"}');

    const branch = `sd-exists-${Date.now()}`;
    const worktreePath = pathJoin(repoRoot, '..', `${basename(repoRoot)}-${branch}`);
    mkdirSync(worktreePath, { recursive: true }); // pre-create

    let execCalled = false;
    const run = { url: 'https://y.com', branch, daPath: '/y' };
    setupWorktrees([run], repoRoot, {
      execSync: () => { execCalled = true; },
    });

    assert.equal(execCalled, false, 'execSync should not be called for existing worktree');

    rmSync(repoRoot, { recursive: true, force: true });
    rmSync(worktreePath, { recursive: true, force: true });
  });
  ```

- [ ] **Step 2: Run tests — expect failure**

  ```bash
  npm run test:batch
  ```

  Expected: `TypeError: setupWorktrees is not a function` (not yet exported).

- [ ] **Step 3: Implement `setupWorktrees` in `tools/snowflake-batch.mjs`**

  Append after the `normalise` function:

  ```js
  /**
   * Create git worktrees from main and copy the DA token into each one.
   * Idempotent — skips worktrees that already exist on disk.
   *
   * @param {{ url: string, branch: string, daPath: string }[]} runs
   * @param {string} repoRoot  absolute path to the main repo
   * @param {{ execSync?: Function }} [opts]  injectable for testing
   * @returns {{ url: string, branch: string, daPath: string, worktreePath: string }[]}
   */
  export function setupWorktrees(runs, repoRoot, opts = {}) {
    const exec = opts.execSync ?? execSync;
    return runs.map(run => {
      const worktreePath = join(repoRoot, '..', `${basename(repoRoot)}-${run.branch}`);
      if (!existsSync(worktreePath)) {
        exec(
          `git -C "${repoRoot}" worktree add -b "${run.branch}" "${worktreePath}" main`,
          { stdio: 'inherit' },
        );
      }
      mkdirSync(join(worktreePath, '.hlx'), { recursive: true });
      copyFileSync(
        join(repoRoot, '.hlx', '.da-token.json'),
        join(worktreePath, '.hlx', '.da-token.json'),
      );
      return { ...run, worktreePath };
    });
  }
  ```

- [ ] **Step 4: Run tests — expect pass**

  ```bash
  npm run test:batch
  ```

  Expected: `8 pass, 0 fail`.

- [ ] **Step 5: Commit**

  ```bash
  git add tools/snowflake-batch.mjs tools/snowflake-batch.test.mjs
  git commit -m "feat: add setupWorktrees with DA token copy"
  ```

---

### Task 3: CLI entry point + smoke test

**Files:**
- Modify: `tools/snowflake-batch.mjs` (add CLI block)

- [ ] **Step 1: Append CLI entry point to `tools/snowflake-batch.mjs`**

  Append at the bottom of the file:

  ```js
  // CLI — only runs when executed directly (not when imported by tests)
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const input = process.argv[2];
    if (!input) {
      process.stderr.write('Usage: node tools/snowflake-batch.mjs \'<json-or-inline>\'\n');
      process.exit(1);
    }
    const repoRoot = execSync('git rev-parse --show-toplevel').toString().trim();
    const runs = parseBatchInput(input);
    const worktrees = setupWorktrees(runs, repoRoot);
    process.stdout.write(JSON.stringify(worktrees, null, 2) + '\n');
  }
  ```

- [ ] **Step 2: Smoke test with a dry run (no real worktrees)**

  Run with a JSON input that you WON'T convert yet — just verify parsing and output shape:

  ```bash
  node tools/snowflake-batch.mjs \
    '[{"url":"https://example.com/test","branch":"sd-dry-run","daPath":"/test"}]' \
    2>&1 | head -20
  ```

  Expected: The command will attempt `git worktree add` for `sd-dry-run`.
  If you want to verify parsing only without touching git, pass an already-existing
  branch name — the script will skip `git worktree add` and proceed to token copy.

  To verify JSON parsing without side effects:

  ```bash
  node -e "
  import('./tools/snowflake-batch.mjs').then(m => {
    const runs = m.parseBatchInput('[{\"url\":\"https://x.com\",\"branch\":\"sd-x\",\"daPath\":\"/x\"}]');
    console.log(JSON.stringify(runs));
  });
  "
  ```

  Expected output: `[{"url":"https://x.com","branch":"sd-x","daPath":"/x"}]`

- [ ] **Step 3: Commit**

  ```bash
  git add tools/snowflake-batch.mjs
  git commit -m "feat: add snowflake-batch CLI entry point"
  ```

---

### Task 4: Document batch protocol in methodology override

**Files:**
- Modify: `.snowflake/knowledge/methodology.md`

- [ ] **Step 1: Append batch protocol section**

  Open `.snowflake/knowledge/methodology.md` and append:

  ```markdown
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
  ```

- [ ] **Step 2: Run lint to verify no regressions**

  ```bash
  npm run lint
  ```

  Expected: clean exit.

- [ ] **Step 3: Commit**

  ```bash
  git add .snowflake/knowledge/methodology.md
  git commit -m "docs: document snowflake batch protocol in methodology override"
  ```

---

### Task 5: End-to-end smoke test

This task verifies the whole pipeline works with a real URL. No code to write — just follow the steps and verify the output.

- [ ] **Step 1: Pick a test URL**

  Use any previously-converted stardust URL you already know renders correctly,
  with a fresh branch name to avoid conflicts:

  ```
  https://paolomoz.github.io/stardust-site/samples/heathrow/proposed-A.html
  branch=sd-batch-test-1  da=/batch-test/heathrow-a
  ```

- [ ] **Step 2: Run worktree setup**

  ```bash
  git checkout main
  node tools/snowflake-batch.mjs \
    '[{"url":"https://paolomoz.github.io/stardust-site/samples/heathrow/proposed-A.html","branch":"sd-batch-test-1","daPath":"/batch-test/heathrow-a"}]'
  ```

  Expected: JSON output showing `worktreePath` + no git error. Worktree exists at
  `../snowflake-demos-sd-batch-test-1`.

- [ ] **Step 3: Dispatch one agent**

  Use the `Agent` tool with the prompt from the batch protocol. Pass the
  `worktreePath` from Step 2's output.

  Verify the agent returns `{ ok: true, productionUrl: "https://sd-batch-test-1--...", ... }`.

- [ ] **Step 4: Verify live page**

  ```bash
  curl -sS -o /dev/null -w "%{http_code}" \
    "https://sd-batch-test-1--snowflake-demos--aemcoder.aem.live/batch-test/heathrow-a"
  ```

  Expected: `200`.

- [ ] **Step 5: Clean up test worktree**

  ```bash
  git worktree remove ../snowflake-demos-sd-batch-test-1 --force
  git branch -d sd-batch-test-1
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add docs/
  git commit -m "docs: add batch orchestration implementation plan"
  ```

---

## Self-review

**Spec coverage:**
- ✓ Invocation (inline + JSON) → Task 1 `parseBatchInput`
- ✓ Worktree setup + token copy → Task 2 `setupWorktrees`
- ✓ Idempotency → Task 2 test covers existing-worktree case
- ✓ Sub-agent prompt template → Task 4 methodology.md
- ✓ Result aggregation table → Task 4 methodology.md
- ✓ Error handling (token expired, run failures) → Task 4 methodology.md constraints
- ✓ End-to-end smoke test → Task 5

**Placeholder scan:** No TBDs. All code blocks complete.

**Type consistency:** `setupWorktrees` opts parameter uses `execSync` key in both
Task 2 step 1 (test) and Task 2 step 3 (implementation) — consistent. Return shape
`{ url, branch, daPath, worktreePath }` consistent across Tasks 2 and 3.
