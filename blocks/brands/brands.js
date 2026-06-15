/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `

  <div class="wrap">
    <h2 class="cond">We Offer the Industry's Best Brands</h2>
    <p>Proud to support the ones who build our world.</p>
    <div class="brand-row">
      <div data-repeat="" class="brand-tile">Cat®</div>
      <div class="brand-tile">SITECH</div>
      <div class="brand-tile">Weiler</div>
      <div class="brand-tile">Allied</div>
      <div class="brand-tile">Sullair</div>
      <div class="brand-tile">Trimble</div>
    </div>
  </div>

`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
