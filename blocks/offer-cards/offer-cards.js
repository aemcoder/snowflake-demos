import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Offer Cards block — "All offers" link + variable repeat of offer cards.
 *
 * DEFAULT CONTENT (Pattern A) — authored above the block table in DA, rendered
 * by EDS as section default content (not inside this block):
 *   h6  — eyebrow (e.g. "Limited Time")
 *   h2  — section heading
 *
 * DA row order (inside the block table):
 *   1. (leading data-field) "All offers" link
 *   2..N. (data-repeat rows) Each offer card — 3 cells:
 *         cell 1: card image
 *         cell 2: tag label text
 *         cell 3: offer title h3
 */

const CHEVRON_SVG = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none"
  stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>`;

const TEMPLATE = `
<div class="wrap">
  <div class="sec-head">
    <a href="#" class="link" data-field>All offers ${CHEVRON_SVG}</a>
  </div>
  <div class="offer-grid">
    <div class="offer" data-repeat>
      <img data-slot class="offer-img" alt="">
      <div class="ov" aria-hidden="true"></div>
      <div class="c">
        <span class="tag" data-slot></span>
        <h3 data-slot></h3>
        <span class="more">View offer ${CHEVRON_SVG}</span>
      </div>
    </div>
  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
