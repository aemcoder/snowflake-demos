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

function normalise({ url, branch, daPath }) {
  if (!url) throw new Error('Each run must have a url');
  if (!branch) throw new Error('Each run must have a branch');
  if (!daPath) throw new Error('Each run must have a daPath (or da=)');
  return { url, branch, daPath };
}
