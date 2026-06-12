import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Service Split block — 2-column layout: copy left, gallery right.
 *
 * DA row order (all data-field, no collection):
 *   1. Eyebrow text
 *   2. Heading h2
 *   3. Description paragraph
 *   4. Primary CTA link (yellow button)
 *   5. Ghost CTA link
 *   6. Gallery image 1
 *   7. Gallery image 2
 *   8. Badge stat number
 *   9. Badge description text
 */

const ARROW_SVG = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none"
  stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const TEMPLATE = `
<div class="wrap">
  <div class="grid">
    <div class="copy">
      <span class="kicker eyebrow" data-field></span>
      <h2 class="cond" data-field></h2>
      <p data-field></p>
      <div class="cta-row">
        <a href="#" class="btn btn-y" data-field>Request Service ${ARROW_SVG}</a>
        <a href="#" class="btn btn-ghost" data-field></a>
      </div>
    </div>
    <div class="gallery">
      <img data-field class="g1" alt="">
      <img data-field class="g2" alt="">
      <div class="badge-yrs">
        <b class="cond" data-field></b>
        <span data-field></span>
      </div>
    </div>
  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
