/**
 * Create a side-by-side comparison PNG of two screenshots.
 *
 * Usage:
 *   node tools/compare-pages.mjs <left.png> <right.png> [output.png]
 *
 * Requires ImageMagick (convert) or ffmpeg. Both are checked in order.
 *
 * In a snowflake session, Claude takes the screenshots with playwright-cli
 * then calls this script to produce the composite:
 *
 *   playwright-cli open <source-url>
 *   # wait for page load, then:
 *   playwright-cli screenshot --filename /tmp/original.png
 *   playwright-cli goto <prod-url>
 *   # wait 3s for overlay, then:
 *   playwright-cli screenshot --filename /tmp/converted.png
 *   playwright-cli close
 *   node tools/compare-pages.mjs /tmp/original.png /tmp/converted.png diff/comparison.png
 */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function detectBackend() {
  return ['magick', 'convert', 'ffmpeg'].find((cmd) => {
    try { execSync(`which ${cmd}`, { stdio: 'pipe' }); return true; } catch { return false; }
  }) ?? null;
}

function composite(left, right, output, cmd) {
  if (cmd === 'ffmpeg') {
    // Scale both to 720px wide, then stack horizontally with a 4px grey divider
    execSync(
      `${cmd} -y -i "${left}" -i "${right}" `
      + '-filter_complex "[0:v]scale=720:-1:flags=lanczos[l];[1:v]scale=720:-1:flags=lanczos[r];'
      + 'color=c=0x444444:s=4x720[d];[l][d][r]hstack=inputs=3" '
      + `"${output}"`,
      { stdio: 'pipe' },
    );
  } else {
    // ImageMagick: resize both to 720px wide, add a 4px grey divider, +append side by side
    execSync(
      `${cmd} `
      + `\\( "${left}" -resize 720x \\) `
      + '\\( -size 4x1 xc:"#444444" -resize 4x720! \\) '
      + `\\( "${right}" -resize 720x \\) `
      + `+append "${output}"`,
      { stdio: 'pipe' },
    );
  }
}

// CLI entry point
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [left, right, output = 'comparison.png'] = process.argv.slice(2);

  if (!left || !right) {
    process.stderr.write(
      'Usage: node tools/compare-pages.mjs <left.png> <right.png> [output.png]\n',
    );
    process.exit(1);
  }

  const missing = [left, right].find((f) => !existsSync(f));
  if (missing) {
    process.stderr.write(`File not found: ${missing}\n`);
    process.exit(1);
  }

  const backend = detectBackend();
  if (!backend) {
    process.stderr.write('No image compositor found. Install ImageMagick or ffmpeg.\n');
    process.exit(1);
  }

  composite(left, right, output, backend);
  process.stdout.write(`Comparison saved to: ${output}\n`);
}

export { composite, detectBackend };
