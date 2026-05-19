import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdirSync,
  existsSync,
  writeFileSync,
  mkdtempSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join as pathJoin, basename } from 'node:path';
import { parseBatchInput, setupWorktrees } from './snowflake-batch.mjs';

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

test('parseBatchInput: throws on missing url', () => {
  assert.throws(
    () => parseBatchInput('[{"branch":"sd-x","daPath":"/x"}]'),
    /url/,
  );
});

test('setupWorktrees: creates worktree dir and copies token', () => {
  const repoRoot = mkdtempSync(pathJoin(tmpdir(), 'snowflake-test-'));
  const hlxDir = pathJoin(repoRoot, '.hlx');
  mkdirSync(hlxDir, { recursive: true });
  writeFileSync(pathJoin(hlxDir, '.da-token.json'), '{"access_token":"test"}');

  const branch = `sd-test-${Date.now()}`;
  const expectedWorktreePath = pathJoin(repoRoot, '..', `${basename(repoRoot)}-${branch}`);

  const run = { url: 'https://x.com', branch, daPath: '/x' };
  const results = setupWorktrees([run], repoRoot, {
    execSync: () => { mkdirSync(expectedWorktreePath, { recursive: true }); },
  });

  assert.equal(results.length, 1);
  assert.equal(results[0].worktreePath, expectedWorktreePath);
  assert.ok(
    existsSync(pathJoin(expectedWorktreePath, '.hlx', '.da-token.json')),
    'token should be copied into worktree',
  );

  rmSync(repoRoot, { recursive: true, force: true });
  rmSync(expectedWorktreePath, { recursive: true, force: true });
});

test('setupWorktrees: uses existing branch without -b flag', () => {
  const repoRoot = mkdtempSync(pathJoin(tmpdir(), 'snowflake-test-'));
  mkdirSync(pathJoin(repoRoot, '.hlx'), { recursive: true });
  writeFileSync(pathJoin(repoRoot, '.hlx', '.da-token.json'), '{"access_token":"test"}');

  const branch = `sd-branch-exists-${Date.now()}`;
  const worktreePath = pathJoin(repoRoot, '..', `${basename(repoRoot)}-${branch}`);

  const capturedCmds = [];
  const run = { url: 'https://z.com', branch, daPath: '/z' };

  // First call: rev-parse returns success (branch "exists"), second: worktree add
  let callCount = 0;
  setupWorktrees([run], repoRoot, {
    execSync: (cmd) => {
      capturedCmds.push(cmd);
      callCount += 1;
      if (callCount === 1) return ''; // rev-parse succeeds = branch exists
      mkdirSync(worktreePath, { recursive: true }); // simulate worktree add
      return undefined;
    },
  });

  assert.ok(capturedCmds.some((c) => c.includes('rev-parse')), 'should check branch existence');
  assert.ok(
    capturedCmds.some((c) => c.includes('worktree add') && !c.includes('-b ')),
    'should use worktree add WITHOUT -b when branch exists',
  );

  rmSync(repoRoot, { recursive: true, force: true });
  rmSync(worktreePath, { recursive: true, force: true });
});

test('setupWorktrees: skips git command when worktree already exists', () => {
  const repoRoot = mkdtempSync(pathJoin(tmpdir(), 'snowflake-test-'));
  mkdirSync(pathJoin(repoRoot, '.hlx'), { recursive: true });
  writeFileSync(pathJoin(repoRoot, '.hlx', '.da-token.json'), '{"access_token":"test"}');

  const branch = `sd-exists-${Date.now()}`;
  const worktreePath = pathJoin(repoRoot, '..', `${basename(repoRoot)}-${branch}`);
  mkdirSync(worktreePath, { recursive: true });

  let execCalled = false;
  const run = { url: 'https://y.com', branch, daPath: '/y' };
  setupWorktrees([run], repoRoot, {
    execSync: () => { execCalled = true; },
  });

  assert.equal(execCalled, false, 'execSync should not be called for existing worktree');

  rmSync(repoRoot, { recursive: true, force: true });
  rmSync(worktreePath, { recursive: true, force: true });
});
