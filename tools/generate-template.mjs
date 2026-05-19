#!/usr/bin/env node
/**
 * Generate the sd-nvidia-a template from the source HTML.
 * Reads input/index.html, applies slot markers, rewrites section first-classes.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dir, '..');
const src = readFileSync(join(repoRoot, '.snowflake/projects/001-sd-nvidia-a/input/index.html'), 'utf8');
const lines = src.split('\n');

// Extract lines 1068-2110 (0-indexed: 1067-2109)
const mainLines = lines.slice(1067, 2110);
let html = mainLines.join('\n');

// ── 1. Rewrite theme section first-class to data-section value ──────────────
// Each theme section has the pattern:
//   class="theme-section variant-X surface-Y"
//   data-section="theme-SLUG"
// We rewrite to: class="theme-SLUG theme-section variant-X surface-Y"
const themeSlugs = [
  'theme-ai', 'theme-design-sim', 'theme-hpc', 'theme-gaming-creating',
  'theme-automotive', 'theme-robotics-edge', 'theme-data-center-cloud', 'theme-about-nvidia',
];

for (const slug of themeSlugs) {
  // Find the section opening tag with this data-section and rewrite its class
  // The tag spans multiple lines so we target the specific class string
  // Strategy: find "  class="theme-section variant-X surface-Y"\n  data-section="${slug}""
  // and replace with "  class="${slug} theme-section variant-X surface-Y"\n  data-section="${slug}""
  html = html.replace(
    new RegExp(`(  class=")(theme-section )(variant-[A-Z] surface-[a-z]+)("\\n  data-section="${slug}")`, 'g'),
    `$1${slug} $2$3$4`,
  );
}

// Verify: check for sections that still have theme-section as first class
const remaining = html.match(/class="theme-section/g);
if (remaining) {
  console.warn(`WARNING: ${remaining.length} sections still have theme-section as first class`);
}

// ── 2. Add data-slot to hero slide picture elements ──────────────────────────
// Each picture.hero-photo appears once per slide article, in slide order
const pictureSlots = [
  'slide-1.photo', 'slide-2.photo', 'slide-3.photo',
  'slide-4.photo', 'slide-5.photo', 'slide-6.photo',
];
let pictureCount = 0;
html = html.replace(/<picture class="hero-photo">/g, () => {
  const slot = pictureSlots[pictureCount++] ?? 'slide-X.photo';
  return `<picture class="hero-photo" data-slot="${slot}">`;
});

// ── 3. Add data-slot to hero eyebrow, headline, description, CTA ─────────────
const eyebrowSlots = ['slide-1.eyebrow', 'slide-2.eyebrow', 'slide-3.eyebrow',
  'slide-4.eyebrow', 'slide-5.eyebrow', 'slide-6.eyebrow'];
let eyebrowCount = 0;
html = html.replace(/<p class="hero-eyebrow">/g, () => {
  const slot = eyebrowSlots[eyebrowCount++] ?? 'slide-X.eyebrow';
  return `<p class="hero-eyebrow" data-slot="${slot}">`;
});

// hero-headline can be h1 or h2
const headlineSlots = ['slide-1.headline', 'slide-2.headline', 'slide-3.headline',
  'slide-4.headline', 'slide-5.headline', 'slide-6.headline'];
let headlineCount = 0;
html = html.replace(/<(h[12]) class="hero-headline">/g, (_, tag) => {
  const slot = headlineSlots[headlineCount++] ?? 'slide-X.headline';
  return `<${tag} class="hero-headline" data-slot="${slot}">`;
});

const descSlots = ['slide-1.description', 'slide-2.description', 'slide-3.description',
  'slide-4.description', 'slide-5.description', 'slide-6.description'];
let descCount = 0;
html = html.replace(/<p class="hero-description">/g, () => {
  const slot = descSlots[descCount++] ?? 'slide-X.description';
  return `<p class="hero-description" data-slot="${slot}">`;
});

// CTA buttons — only the ones inside hero-cta-row
const ctaSlots = ['slide-1.cta', 'slide-2.cta', 'slide-3.cta',
  'slide-4.cta', 'slide-5.cta', 'slide-6.cta'];
let ctaCount = 0;
html = html.replace(/<a class="btn btn-primary" href="([^"]*)">/g, (_, href) => {
  const slot = ctaSlots[ctaCount++] ?? 'slide-X.cta';
  return `<a class="btn btn-primary" href="${href}" data-slot="${slot}">`;
});

// ── 4. Add data-slot to theme section title (h2) and description ─────────────
// Each theme section's h2 inside .theme-header is authorable
// The h2 titles are unique strings per section, so direct string replacement is reliable
const themeTitleMap = {
  'theme-ai': 'Artificial Intelligence',
  'theme-design-sim': 'Design and Simulation',
  'theme-hpc': 'High-Performance Computing',
  'theme-gaming-creating': 'Gaming and Creating',
  'theme-automotive': 'Automotive',
  'theme-robotics-edge': 'Robotics and Edge AI',
  'theme-data-center-cloud': 'Data Center and Cloud Computing',
  'theme-about-nvidia': 'About NVIDIA',
};

for (const [, title] of Object.entries(themeTitleMap)) {
  html = html.replace(
    `<h2>${title}</h2>`,
    `<h2 data-slot="title">${title}</h2>`,
  );
}

// Tag all <p class="theme-description"> — engine matches by containing section first-class
html = html.replace(/<p class="theme-description">/g, () =>
  '<p class="theme-description" data-slot="description">',
);

// ── 5. Write output ───────────────────────────────────────────────────────────
const outPath = join(repoRoot, '.snowflake/projects/001-sd-nvidia-a/output/templates/sd-nvidia-a.html');
writeFileSync(outPath, html, 'utf8');

const slotCount = (html.match(/data-slot="/g) || []).length;
const sectionCount = (html.match(/<section /g) || []).length;
console.log(`Template written to ${outPath}`);
console.log(`  data-slot markers: ${slotCount}`);
console.log(`  <section> elements: ${sectionCount}`);

// Verify first-class uniqueness
const firstClasses = [];
for (const m of html.matchAll(/<section class="([^"]+)"/g)) {
  firstClasses.push(m[1].split(' ')[0]);
}
const dupes = firstClasses.filter((c, i, a) => a.indexOf(c) !== i);
if (dupes.length > 0) {
  console.warn('  WARN: duplicate first-classes:', dupes);
} else {
  console.log(`  All ${firstClasses.length} section first-classes are unique`);
}
console.log('  First classes:', firstClasses.join(', '));
