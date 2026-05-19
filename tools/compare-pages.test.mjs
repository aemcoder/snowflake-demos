import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectBackend } from './compare-pages.mjs';

test('detectBackend: returns a string or null', () => {
  const result = detectBackend();
  assert.ok(result === null || typeof result === 'string', 'should be string or null');
});

test('detectBackend: returns a known backend name when tools are present', () => {
  const result = detectBackend();
  if (result !== null) {
    assert.ok(
      ['magick', 'convert', 'ffmpeg'].includes(result),
      `expected known backend, got: ${result}`,
    );
  }
});
