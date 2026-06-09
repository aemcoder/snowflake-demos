import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Pricing hero — eyebrow / headline / sub-copy + baked billing toggle + trust line.
 *
 * DA block table (3 rows, 1 cell each — no collection):
 *   Row 1: eyebrow text  (e.g. "Plans & Pricing")
 *   Row 2: h1 markup     (e.g. paragraph; <strong> becomes the bold accent word)
 *   Row 3: sub-copy paragraph
 *
 * The billing toggle (Monthly / Annual) and trust line are baked chrome.
 */
const TEMPLATE = `
<section class="hero" data-section="hero">
  <div class="wrap">
    <span class="eyebrow" data-field></span>
    <h1 data-field></h1>
    <p class="sub" data-field></p>
    <div class="billing" role="group" aria-label="Billing period">
      <button type="button" aria-pressed="false">Monthly</button>
      <button type="button" aria-pressed="true">Annual <span class="save">Save 17%</span></button>
    </div>
    <div class="trust">
      <span class="stars" aria-hidden="true">★★★★★</span>
      Trusted by <b>100,000+</b> users worldwide
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // Wire billing toggle (visual state only — no monthly price data in this prototype)
  block.querySelectorAll('.billing button').forEach((btn) => {
    btn.addEventListener('click', () => {
      block.querySelectorAll('.billing button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
    });
  });
}
