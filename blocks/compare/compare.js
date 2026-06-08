import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (3 item rows, 3 cells each: vs-label | h3 | <ul>):
 *   | compare |
 *   | vs. Coding tools | Lovable, Bolt, Replit       | <ul>…</ul> |         (col 1)
 * Eyebrow and heading are default content above the block in the same section.
 *   | Knack            | Secure by default           | <ul>…</ul> |         (col 2 — Knack)
 *   | vs. No-code tools| Airtable, Bubble, Quickbase | <ul>…</ul> |         (col 3)
 *
 * The three columns (including the highlighted center "Knack" column) are
 * baked into the template structure.
 */
const TEMPLATE = `
<section class="compare">
  <div class="wrap">
    <div class="cmp-grid">
      <div class="cmp" data-group>
        <div class="vs" data-slot></div>
        <h3 data-slot></h3>
        <ul data-slot></ul>
      </div>
      <div class="cmp knack" data-group>
        <div class="vs" data-slot></div>
        <h3 data-slot></h3>
        <ul data-slot></ul>
      </div>
      <div class="cmp" data-group>
        <div class="vs" data-slot></div>
        <h3 data-slot></h3>
        <ul data-slot></ul>
      </div>
    </div>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
