// Build template + fragments + DA doc for nvidia-a (run 001).
// One-shot script; not a reusable tool yet.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname; // .snowflake/projects/001-nvidia-a/
const INPUT = resolve(ROOT, 'input/index.html');
const OUT = resolve(ROOT, 'output');

const html = readFileSync(INPUT, 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

// Theme section first-class remapping. Original class list stays
// after the discriminator so theme-section/variant-X/surface-Y CSS
// rules continue to match.
const themeSectionDiscriminators = new Map([
  ['hero', 'hero-carousel'],
  ['theme-ai', 'theme-ai'],
  ['theme-design-sim', 'theme-design-sim'],
  ['theme-hpc', 'theme-hpc'],
  ['theme-gaming-creating', 'theme-gaming-creating'],
  ['theme-automotive', 'theme-automotive'],
  ['theme-robotics-edge', 'theme-robotics-edge'],
  ['theme-data-center-cloud', 'theme-data-center-cloud'],
  ['theme-about-nvidia', 'theme-about-nvidia'],
]);

// ─── Build the template main ─────────────────────────────────────────
const main = doc.querySelector('main#main');
if (!main) throw new Error('No <main> in source');

// Per-section transformations:
const sections = Array.from(main.querySelectorAll(':scope > section'));
console.log(`Found ${sections.length} sections in <main>`);

for (const section of sections) {
  const dataSection = section.getAttribute('data-section');
  const firstClass = themeSectionDiscriminators.get(dataSection);
  if (!firstClass) {
    console.warn(`Section data-section="${dataSection}" not in map — skipping rename`);
    continue;
  }
  // Move the discriminator to be the first class while preserving the
  // original class list (so .theme-section / .variant-X / .surface-Y
  // selectors still match).
  const currentClasses = section.className.trim().split(/\s+/);
  if (currentClasses[0] !== firstClass) {
    const without = currentClasses.filter((c) => c !== firstClass);
    section.className = [firstClass, ...without].join(' ');
  }
}

// ─── Slot annotation: HERO ──────────────────────────────────────────
const hero = main.querySelector('section.hero-carousel');
const slides = Array.from(hero.querySelectorAll('.hero-slide'));
slides.forEach((slide, i) => {
  const n = i + 1;
  const picture = slide.querySelector('picture.hero-photo');
  if (picture) picture.setAttribute('data-slot', `slide-${n}.picture`);
  const eyebrow = slide.querySelector('.hero-eyebrow');
  if (eyebrow) eyebrow.setAttribute('data-slot', `slide-${n}.eyebrow`);
  const headline = slide.querySelector('.hero-headline');
  if (headline) headline.setAttribute('data-slot', `slide-${n}.headline`);
  const description = slide.querySelector('.hero-description');
  if (description) description.setAttribute('data-slot', `slide-${n}.description`);
  const cta = slide.querySelector('.hero-cta-row a.btn');
  if (cta) cta.setAttribute('data-slot', `slide-${n}.cta`);
});

const tabs = Array.from(hero.querySelectorAll('.hero-tabs .hero-tab'));
tabs.forEach((tab, i) => {
  const n = i + 1;
  const eyebrow = tab.querySelector('.hero-tab-eyebrow');
  if (eyebrow) eyebrow.setAttribute('data-slot', `tab-${n}.eyebrow`);
  const title = tab.querySelector('.hero-tab-title');
  if (title) title.setAttribute('data-slot', `tab-${n}.title`);
});

// ─── Slot annotation: THEME SECTIONS ────────────────────────────────
const themeSections = sections.filter((s) => s.getAttribute('data-section')?.startsWith('theme-'));

for (const section of themeSections) {
  // Title (h2)
  const h2 = section.querySelector('.theme-header > h2');
  if (h2) h2.setAttribute('data-slot', 'title');

  // Description
  const desc = section.querySelector('.theme-description');
  if (desc) desc.setAttribute('data-slot', 'description');

  // Quicklinks
  const quicklinks = Array.from(section.querySelectorAll('.theme-quicklinks .quicklink'));
  quicklinks.forEach((a, i) => {
    a.setAttribute('data-slot', `quicklink-${i + 1}`);
  });

  // Tiles — depending on variant, the inner structure differs slightly.
  // We slot the inner <img>, the eyebrow element, and the <h3>. The
  // outer <a href> stays static.
  const tiles = Array.from(section.querySelectorAll('.theme-carousel-track > a[class^="tile-"]'));
  tiles.forEach((tile, i) => {
    const n = i + 1;
    // The <img>. tile-a/c have direct child <img>; tile-e/g have <img>
    // wrapped in a photo div. Either way, querySelector('img') gets the
    // first one.
    const img = tile.querySelector('img');
    if (img) img.setAttribute('data-slot', `tile-${n}.image`);

    // Eyebrow — class names differ by variant
    const eyebrow = tile.querySelector(
      '.tile-a-eyebrow, .tile-c-eyebrow, .tile-e-tag, .tile-g-eyebrow',
    );
    if (eyebrow) eyebrow.setAttribute('data-slot', `tile-${n}.eyebrow`);

    // Title <h3>
    const h3 = tile.querySelector('h3');
    if (h3) h3.setAttribute('data-slot', `tile-${n}.title`);
  });
}

// ─── Write template HTML ────────────────────────────────────────────
// The template file contains only what the substrate engine consumes:
// optional top-level <link>s + <main>...</main>. The substrate's
// applyTemplateOverlay parses this file, picks out
// document.querySelector('main'), and replaces the page's main with it.
// Note: the source's <noscript><style> safety belt is not carried over —
// the overlay engine only lifts <main>'s innerHTML into the live DOM.
// In overlay context JS is always on, so the safety belt would never
// fire; dropping it costs nothing visually.

const templateHtml = `${main.outerHTML}\n`;
mkdirSync(resolve(OUT, 'templates'), { recursive: true });
writeFileSync(resolve(OUT, 'templates/nvidia-a.html'), templateHtml);
console.log(`templates/nvidia-a.html — ${templateHtml.length} bytes`);

// ─── Build header fragment ──────────────────────────────────────────
// Everything from <body> start until <main> start. Per source structure,
// that's:
//   <a class="skip-link">…</a>
//   <header class="site-header">…</header>
//   <aside class="geo-banner">…</aside>
const body = doc.body;
const headerNodes = [];
for (const node of body.childNodes) {
  if (node.nodeType === 1 && node.tagName === 'MAIN') break;
  headerNodes.push(node);
}
const headerHtml = headerNodes.map((n) => (n.outerHTML ?? n.textContent ?? '')).join('').trim() + '\n';
mkdirSync(resolve(OUT, 'fragments/nvidia-a'), { recursive: true });
writeFileSync(resolve(OUT, 'fragments/nvidia-a/header.html'), headerHtml);
console.log(`fragments/nvidia-a/header.html — ${headerHtml.length} bytes`);

// ─── Build footer fragment ──────────────────────────────────────────
// Everything from </main> end to </body>, minus <script> tags. Per
// source: just <footer class="site-footer">. Inline <script>s are
// extracted to nvidia-a-animations.js separately.
const footerNodes = [];
let seenMain = false;
for (const node of body.childNodes) {
  if (!seenMain) {
    if (node.nodeType === 1 && node.tagName === 'MAIN') seenMain = true;
    continue;
  }
  if (node.nodeType === 1 && node.tagName === 'SCRIPT') continue;
  footerNodes.push(node);
}
const footerHtml = footerNodes.map((n) => (n.outerHTML ?? n.textContent ?? '')).join('').trim() + '\n';
writeFileSync(resolve(OUT, 'fragments/nvidia-a/footer.html'), footerHtml);
console.log(`fragments/nvidia-a/footer.html — ${footerHtml.length} bytes`);

// ─── Build DA doc (divs-with-class shape) ───────────────────────────
// One outer div per section, containing one inner div with the section
// class, containing rows: each row is two paired divs: <slot-name> | <value>.
// Plus a metadata block as the last section.
//
// Slot values follow the EDS pipeline preserve list (architecture +
// learnings 2026-05-18 + 2026-05-20):
//   keep: <strong>, <em>, <a>, <img>, <picture>, <h1>-<h6>, <p>
//   strip: <span class="...">, <b>, <i>, <u>, <mark>, <br>
// We escape & < > as needed.
function escapeText(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function row(name, value) {
  // value is already-emitted HTML or escaped text
  return `      <div><div>${name}</div><div>${value}</div></div>`;
}

// Helper: extract text content while keeping preserved inline tags
function innerHtmlPreserve(el) {
  // For most slot writers we just want the innerHTML as-is. EDS pipeline
  // will strip non-preserved tags; we don't pre-strip here (cleaner DA
  // representation).
  return el.innerHTML.trim();
}

const sectionBlocks = [];

// ─── Hero block ─────────────────────────────────────────────────────
const heroRows = [];
slides.forEach((slide, i) => {
  const n = i + 1;
  const picture = slide.querySelector('picture.hero-photo');
  const eyebrow = slide.querySelector('.hero-eyebrow');
  const headline = slide.querySelector('.hero-headline');
  const description = slide.querySelector('.hero-description');
  const cta = slide.querySelector('.hero-cta-row a.btn');
  // For picture slots, emit the full <picture> markup. The substrate
  // picture writer replaces the template element entirely with this.
  if (picture) {
    const clone = picture.cloneNode(true);
    clone.removeAttribute('data-slot');
    heroRows.push(row(`slide-${n}.picture`, clone.outerHTML));
  }
  if (eyebrow) heroRows.push(row(`slide-${n}.eyebrow`, eyebrow.textContent.trim()));
  if (headline) heroRows.push(row(`slide-${n}.headline`, headline.textContent.trim()));
  if (description) heroRows.push(row(`slide-${n}.description`, description.textContent.trim()));
  if (cta) {
    const clone = cta.cloneNode(true);
    clone.removeAttribute('data-slot');
    heroRows.push(row(`slide-${n}.cta`, clone.outerHTML));
  }
});
tabs.forEach((tab, i) => {
  const n = i + 1;
  const eyebrow = tab.querySelector('.hero-tab-eyebrow');
  const title = tab.querySelector('.hero-tab-title');
  if (eyebrow) heroRows.push(row(`tab-${n}.eyebrow`, eyebrow.textContent.trim()));
  if (title) heroRows.push(row(`tab-${n}.title`, title.textContent.trim()));
});
sectionBlocks.push({ name: 'hero-carousel', rows: heroRows });

// ─── Theme section blocks ───────────────────────────────────────────
for (const section of themeSections) {
  const dataSection = section.getAttribute('data-section');
  const firstClass = themeSectionDiscriminators.get(dataSection);
  const rows = [];

  const h2 = section.querySelector('.theme-header > h2');
  if (h2) rows.push(row('title', h2.textContent.trim()));

  const desc = section.querySelector('.theme-description');
  if (desc) rows.push(row('description', desc.textContent.trim()));

  const quicklinks = Array.from(section.querySelectorAll('.theme-quicklinks .quicklink'));
  quicklinks.forEach((a, i) => {
    const clone = a.cloneNode(true);
    clone.removeAttribute('data-slot');
    rows.push(row(`quicklink-${i + 1}`, clone.outerHTML));
  });

  const tiles = Array.from(section.querySelectorAll('.theme-carousel-track > a[class^="tile-"]'));
  tiles.forEach((tile, i) => {
    const n = i + 1;
    const img = tile.querySelector('img');
    const eyebrow = tile.querySelector(
      '.tile-a-eyebrow, .tile-c-eyebrow, .tile-e-tag, .tile-g-eyebrow',
    );
    const h3 = tile.querySelector('h3');
    if (img) {
      // Clean clone: strip data-slot attribute we added; remove loading/decoding
      // which the EDS pipeline rewrites anyway.
      const clone = img.cloneNode(true);
      clone.removeAttribute('data-slot');
      rows.push(row(`tile-${n}.image`, clone.outerHTML));
    }
    if (eyebrow) rows.push(row(`tile-${n}.eyebrow`, eyebrow.textContent.trim()));
    if (h3) rows.push(row(`tile-${n}.title`, h3.textContent.trim()));
  });

  sectionBlocks.push({ name: firstClass, rows });
}

// ─── Metadata block ─────────────────────────────────────────────────
const pageTitle = doc.querySelector('title')?.textContent.trim() ?? 'NVIDIA';
const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
const metadataRows = [
  row('template', 'nvidia-a'),
  row('title', escapeText(pageTitle)),
  row('description', escapeText(metaDescription)),
];
sectionBlocks.push({ name: 'metadata', rows: metadataRows });

// ─── Assemble DA HTML ───────────────────────────────────────────────
function blockDiv({ name, rows }) {
  return `  <div>
    <div class="${name}">
${rows.join('\n')}
    </div>
  </div>`;
}

const daHtml = `<body>
  <header></header>
  <main>
${sectionBlocks.map(blockDiv).join('\n')}
  </main>
  <footer></footer>
</body>
`;

mkdirSync(resolve(OUT, 'da'), { recursive: true });
writeFileSync(resolve(OUT, 'da/a.html'), daHtml);
console.log(`da/a.html — ${daHtml.length} bytes`);

// ─── Report counts ──────────────────────────────────────────────────
const templateDom = new JSDOM(templateHtml);
const slotCount = templateDom.window.document.querySelectorAll('[data-slot]').length;
const sectionCount = templateDom.window.document.querySelectorAll('main > section[class]').length;
console.log(`\nTemplate has ${slotCount} [data-slot] markers across ${sectionCount} sections.`);

// Report block sizes
console.log('\nDA blocks:');
for (const b of sectionBlocks) {
  console.log(`  ${b.name}: ${b.rows.length} rows`);
}
