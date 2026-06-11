/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const ARROW = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const TEMPLATE = `
<div class="wrap">
  <div class="sec-head reveal">
    <div>
      <span class="kicker eyebrow" data-field>Limited Time</span>
      <h2 class="cond" data-field>Financing Deals &amp; Special Offers</h2>
    </div>
    <a href="#" class="sec-link" data-field>All offers</a>
  </div>
  <div class="offer-grid">
    <a href="#" class="offer" data-group>
      <div class="offer-bg bg-1"></div>
      <div class="ov"></div>
      <div class="c">
        <span class="otag" data-slot>Finance</span>
        <h3 data-slot>0% for 60 Months + $500 Toward a CVA</h3>
        <span class="more">View offer ${ARROW}</span>
      </div>
    </a>
    <a href="#" class="offer" data-group>
      <div class="offer-bg bg-2"></div>
      <div class="ov"></div>
      <div class="c">
        <span class="otag" data-slot>Fuel</span>
        <h3 data-slot>Financing &amp; Fuel Payback Offers</h3>
        <span class="more">View offer ${ARROW}</span>
      </div>
    </a>
    <a href="#" class="offer" data-group>
      <div class="offer-bg bg-3"></div>
      <div class="ov"></div>
      <div class="c">
        <span class="otag" data-slot>Cat® Card</span>
        <h3 data-slot>The Cat® Card Is Now a Commercial Account</h3>
        <span class="more">View offer ${ARROW}</span>
      </div>
    </a>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  const link = block.querySelector('.sec-link');
  if (link) link.insertAdjacentHTML('beforeend', ` ${ARROW}`);
}
