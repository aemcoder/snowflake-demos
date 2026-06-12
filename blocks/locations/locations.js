import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<section class="locations">
  <div class="wrap">
    <div>
      <span class="eyebrow" style="letter-spacing:.18em;" data-field>18 Branches · 3 States</span>
      <h2 class="cond" data-field>A Branch Near Every Jobsite</h2>
      <p data-field>From the Wasatch Front to the oilfields — parts, rentals and service are never far away.</p>
      <a href="#" class="btn btn-dark" data-field>Find Your Nearest Branch
        <svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"></path><circle cx="12" cy="10" r="2.6"></circle></svg></a>
    </div>
    <div class="city-grid">
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
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
