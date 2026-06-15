/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Locations block — yellow background with 2-column layout.
 * 4 leading fields: eyebrow, heading, paragraph, cta-link.
 * data-repeat items: city name text (1 slot each).
 * Decorative circle ring is template chrome.
 * DA rows: 4 leading (eyebrow | heading | paragraph | link) + N repeat (city name).
 */
const TEMPLATE = `
<div class="locations-wrap">
  <div class="locations-copy">
    <span class="locations-eyebrow" data-field>18 Branches &middot; 3 States</span>
    <h2 class="cond locations-heading" data-field>A Branch Near Every Jobsite</h2>
    <p class="locations-desc" data-field>From the Wasatch Front to the oilfields — parts, rentals and service are never far away.</p>
    <a href="#" class="btn btn-dark locations-cta" data-field>Find Your Nearest Branch</a>
  </div>
  <div class="locations-cities">
    <span class="locations-city" data-repeat><span data-slot>City Name</span></span>
  </div>
</div>
<div class="locations-ring"></div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
