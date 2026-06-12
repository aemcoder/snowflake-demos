import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<section class="brands">
  <div class="wrap">
    <h2 class="cond" data-field>We Offer the Industry's Best Brands</h2>
    <p data-field>Proud to support the ones who build our world.</p>
    <div class="brand-row">
      <div class="brand-tile" data-repeat><span data-slot>Cat®</span></div>
    </div>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
