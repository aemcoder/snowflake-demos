import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

function normalise(raw) {
  const { url } = raw;
  const b = raw.branch ?? raw.git_branch; // accept git_branch alias (stardust manifest format)
  const d = raw.daPath ?? raw.da_path; // accept da_path alias
  if (!url) throw new Error('Each run must have a url');
  if (!b) throw new Error('Each run must have a branch');
  if (!d) throw new Error('Each run must have a daPath (or da=)');
  return { url, branch: b, daPath: d };
}

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
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch {
      throw new Error(`Invalid JSON batch input: ${trimmed.slice(0, 60)}`);
    }
    return (Array.isArray(parsed) ? parsed : [parsed]).map(normalise);
  }
  return trimmed
    .split('\n')
    .map((l) => l.trim().replace(/^[-*]\s*/, ''))
    .filter((l) => l.startsWith('http'))
    .map((l) => {
      const parts = l.trim().split(/\s+/);
      const url = parts[0];
      const params = Object.fromEntries(
        parts.slice(1)
          .filter((p) => p.includes('='))
          .map((p) => { const eq = p.indexOf('='); return [p.slice(0, eq), p.slice(eq + 1)]; }),
      );
      return normalise({ url, branch: params.branch, daPath: params.da ?? params.daPath });
    });
}

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

  function branchExists(branch) {
    try {
      exec(`git -C "${repoRoot}" rev-parse --verify "refs/heads/${branch}"`, { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  }

  return runs.map((run) => {
    // Worktrees are created as siblings of the repo dir: /parent/repo-name-branch
    const worktreePath = join(repoRoot, '..', `${basename(repoRoot)}-${run.branch}`);
    if (!existsSync(worktreePath)) {
      const cmd = branchExists(run.branch)
        ? `git -C "${repoRoot}" worktree add "${worktreePath}" "${run.branch}"`
        : `git -C "${repoRoot}" worktree add -b "${run.branch}" "${worktreePath}" main`;
      exec(cmd, { stdio: 'inherit' });
    }
    mkdirSync(join(worktreePath, '.hlx'), { recursive: true });
    copyFileSync(
      join(repoRoot, '.hlx', '.da-token.json'),
      join(worktreePath, '.hlx', '.da-token.json'),
    );
    return { ...run, worktreePath };
  });
}

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
  process.stdout.write(`${JSON.stringify(worktrees, null, 2)}\n`);
}
