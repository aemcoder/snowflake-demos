import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Locations CTA block — 2-column: copy + CTA left, city grid right.
 *
 * DA row order (all data-field, no collection):
 *   1. Eyebrow text (e.g. "18 Branches · 3 States")
 *   2. Heading h2
 *   3. Description paragraph
 *   4. CTA button link
 *
 * City grid is baked template chrome — city names are not authored.
 */

const PIN_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none"
  stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">
  <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/>
  <circle cx="12" cy="10" r="2.6"/>
</svg>`;

const TEMPLATE = `
<div class="wrap">
  <div class="copy">
    <span class="eyebrow" data-field></span>
    <h2 class="cond" data-field></h2>
    <p data-field></p>
    <a href="#" class="btn btn-dark" data-field>Find Your Nearest Branch ${PIN_SVG}</a>
  </div>
  <div class="city-grid" aria-label="Branch locations">
    <span class="city">Salt Lake City</span>
    <span class="city">Ogden</span>
    <span class="city">St. George</span>
    <span class="city">Vernal</span>
    <span class="city">Cedar City</span>
    <span class="city">Price</span>
    <span class="city">Hurricane</span>
    <span class="city">Rock Springs, WY</span>
    <span class="city">Casper, WY</span>
    <span class="city">Elko, NV</span>
    <span class="city">Ely, NV</span>
    <span class="city">+ 7 more</span>
  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
