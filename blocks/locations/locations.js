/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const MAP_PIN = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>';

const TEMPLATE = `
<div class="wrap loc-grid">
  <div class="loc-copy reveal">
    <span class="eyebrow" data-field>18 Branches · 3 States</span>
    <h2 class="cond" data-field>A Branch Near Every Jobsite</h2>
    <p data-field>From the Wasatch Front to the oilfields — parts, rentals and service are never far away.</p>
    <a href="#" class="btn btn-dark" data-field>Find Your Nearest Branch</a>
  </div>
  <div class="city-grid">
    <span class="city" data-repeat>
      <span data-slot>Salt Lake City</span>
    </span>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  const cta = block.querySelector('.btn-dark');
  if (cta) cta.insertAdjacentHTML('beforeend', ` ${MAP_PIN}`);
}
