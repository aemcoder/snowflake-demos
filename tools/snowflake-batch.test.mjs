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
