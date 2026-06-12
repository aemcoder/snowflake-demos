import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Listing Hero block — background image, promo ribbon, h1, lede, 2 CTAs.
 *
 * DA row order (all data-field, no collection):
 *   1. Promo ribbon tag text
 *   2. Promo ribbon body link
 *   3. h1 heading
 *   4. Lede paragraph
 *   5. Primary CTA link (yellow button)
 *   6. Ghost CTA link
 *   7. Background image
 */

const ARROW_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none"
  stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const TEMPLATE = `
<div class="lh-inner">
  <img data-field class="lh-bg" alt="" aria-hidden="true">
  <div class="lh-scrim" aria-hidden="true"></div>
  <div class="lh-wrap">
    <div class="lh-ribbon">
      <span class="lh-tag" data-field></span>
      <a class="lh-ribbon-link" data-field href="#"></a>
    </div>
    <h1 class="lh-heading cond" data-field></h1>
    <p class="lh-lede" data-field></p>
    <div class="lh-cta-row">
      <a class="btn btn-y lh-cta-primary" data-field href="#">
        Shop Used Equipment ${ARROW_SVG}
      </a>
      <a class="btn btn-ghost-light lh-cta-ghost" data-field href="#"></a>
    </div>
  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
