import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<div class="brands-block">
  <div class="wrap">
    <h2 class="cond" data-field>We Offer the Industry's Best Brands</h2>
    <p data-field>Proud to support the ones who build our world.</p>
    <div class="brand-row">
      <div class="brand-tile" data-group><span data-slot>Cat®</span></div>
      <div class="brand-tile" data-group><span data-slot>SITECH</span></div>
      <div class="brand-tile" data-group><span data-slot>Weiler</span></div>
      <div class="brand-tile" data-group><span data-slot>Allied</span></div>
      <div class="brand-tile" data-group><span data-slot>Sullair</span></div>
      <div class="brand-tile" data-group><span data-slot>Trimble</span></div>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
