import { renderTemplate, initCountup } from '../../scripts/template-block.js';

/**
 * Stats Bar block — intro column + 7 stat counters in a grid.
 *
 * No default content (the intro heading is interleaved in the grid).
 * No leading or trailing fields — all content is in the collection.
 *
 * DA collection rows (8 rows, 2 cells each):
 *   row 0 (intro group) — cell 0: heading, cell 1: description
 *   rows 1–7 (stat groups) — cell 0: number, cell 1: label
 *
 * The hazard stripe is baked template chrome.
 * Numbers animate via initCountup (reads data-countup attribute).
 */

const TEMPLATE = `
<div class="sb-stripe" aria-hidden="true"></div>
<div class="sb-wrap">
  <div class="sb-grid">

    <div class="sb-item sb-intro" data-group>
      <h2 class="sb-intro-heading cond" data-slot></h2>
      <p class="sb-intro-desc" data-slot></p>
    </div>

    <div class="sb-item" data-group>
      <div class="sb-num" data-slot></div>
      <div class="sb-lab" data-slot></div>
    </div>

    <div class="sb-item" data-group>
      <div class="sb-num" data-slot></div>
      <div class="sb-lab" data-slot></div>
    </div>

    <div class="sb-item" data-group>
      <div class="sb-num" data-slot></div>
      <div class="sb-lab" data-slot></div>
    </div>

    <div class="sb-item" data-group>
      <div class="sb-num" data-slot></div>
      <div class="sb-lab" data-slot></div>
    </div>

    <div class="sb-item" data-group>
      <div class="sb-num" data-slot></div>
      <div class="sb-lab" data-slot></div>
    </div>

    <div class="sb-item" data-group>
      <div class="sb-num" data-slot></div>
      <div class="sb-lab" data-slot></div>
    </div>

    <div class="sb-item" data-group>
      <div class="sb-num" data-slot></div>
      <div class="sb-lab" data-slot></div>
    </div>

  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // Wire countup animation on stat numbers
  block.querySelectorAll('.sb-num').forEach((el) => {
    const raw = el.textContent.trim();
    // Extract numeric prefix (e.g. "75", "150K", "24/7")
    const match = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
    if (match) {
      const [, num, suffix] = match;
      el.dataset.countup = num;
      if (suffix) el.dataset.suffix = suffix;
    }
  });
  initCountup(block);
}
