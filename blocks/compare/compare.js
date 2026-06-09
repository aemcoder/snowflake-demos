import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Compare — 3-column comparison grid (vs coding tools / Knack / vs no-code tools).
 *
 * Default content above: h6 eyebrow + h2 heading.
 *
 * DA block table — 3 rows (up to 6 cells each):
 *   Cell 0: vs-label (e.g. "vs. Coding tools" / "Knack" / "vs. No-code tools")
 *   Cell 1: h3 column title
 *   Cell 2–5: list items (Knack column has 4; others have 3 — engine skips empty cells)
 *
 * ✕/✓ markers come from CSS (::before pseudo-element). `.cmp.knack` is baked on middle column.
 */
const TEMPLATE = `
<section class="compare-sec" data-section="compare">
  <div class="wrap">
    <div class="cmp-grid">
      <div class="cmp" data-group>
        <div class="vs" data-slot>vs. Coding tools</div>
        <h3 data-slot>Lovable, Bolt, Replit</h3>
        <ul class="cmp-list">
          <li data-slot>Insecure, throwaway output</li>
          <li data-slot>Breaks at real scale</li>
          <li data-slot>You own the maintenance</li>
          <li data-slot></li>
        </ul>
      </div>
      <div class="cmp knack" data-group>
        <div class="vs" data-slot>Knack</div>
        <h3 data-slot>Secure by default</h3>
        <ul class="cmp-list">
          <li data-slot>Enterprise-grade security</li>
          <li data-slot>Scales to millions of rows</li>
          <li data-slot>Hosted &amp; maintained for you</li>
          <li data-slot>No code required</li>
        </ul>
      </div>
      <div class="cmp" data-group>
        <div class="vs" data-slot>vs. No-code tools</div>
        <h3 data-slot>Airtable, Bubble, Quickbase</h3>
        <ul class="cmp-list">
          <li data-slot>Spreadsheet, not a database</li>
          <li data-slot>Permissions bolted on</li>
          <li data-slot>Hits a complexity ceiling</li>
          <li data-slot></li>
        </ul>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  // Hide empty list items (engine leaves slot element empty when DA cell is absent)
  block.querySelectorAll('.cmp-list li:empty').forEach((li) => li.remove());
}
