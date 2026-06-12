import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<section class="offers">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="kicker eyebrow" data-field>Limited Time</span>
        <h2 class="cond" data-field>Financing Deals &amp; Special Offers</h2>
      </div>
      <a href="#" class="link" data-field>All offers
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
    </div>
    <div class="offer-grid">
      <a href="#" class="offer" data-repeat>
        <img data-slot style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;">
        <div class="ov"></div>
        <div class="c">
          <span class="tag" data-slot>Finance</span>
          <h3 data-slot>0% for 60 Months</h3>
          <span class="more">View offer <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
        </div>
      </a>
    </div>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
