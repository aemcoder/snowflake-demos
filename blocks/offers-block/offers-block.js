import { renderTemplate } from '../../scripts/template-block.js';

/* eslint-disable max-len */
const arrowSvg = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
/* eslint-enable max-len */

const TEMPLATE = `
<div class="offers-block">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="kicker eyebrow" data-field>Limited Time</span>
        <h2 class="cond" data-field>Financing Deals &amp; Special Offers</h2>
      </div>
      <a href="#" class="link" data-field>All offers ${arrowSvg}</a>
    </div>
    <div class="offer-grid">
      <a href="#" class="offer" data-group>
        <img data-slot src="" alt="Compact machine" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
        <div class="ov"></div>
        <div class="c">
          <span class="tag" data-slot>Finance</span>
          <h3 data-slot>0% for 60 Months + $500 Toward a CVA</h3>
          <span class="more">View offer ${arrowSvg}</span>
        </div>
      </a>
      <a href="#" class="offer" data-group>
        <img data-slot src="" alt="Excavator on jobsite" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
        <div class="ov"></div>
        <div class="c">
          <span class="tag" data-slot>Fuel</span>
          <h3 data-slot>Financing &amp; Fuel Payback Offers</h3>
          <span class="more">View offer ${arrowSvg}</span>
        </div>
      </a>
      <a href="#" class="offer" data-group>
        <img data-slot src="" alt="Cat Card / payment" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0">
        <div class="ov"></div>
        <div class="c">
          <span class="tag" data-slot>Cat® Card</span>
          <h3 data-slot>The Cat® Card Is Now a Commercial Account</h3>
          <span class="more">View offer ${arrowSvg}</span>
        </div>
      </a>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
