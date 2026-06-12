/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ARROW_SM = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const TEMPLATE = `
<div class="wrap">
  <div class="sec-head">
    <a href="#" class="link" data-field>All offers ${ARROW}</a>
  </div>
  <div class="offer-grid">
    <a href="#" class="offer" data-repeat>
      <img class="offer-bg" src="" alt="" style="aspect-ratio:4/3;" loading="lazy">
      <div class="ov"></div>
      <div class="c">
        <span class="tag" data-slot>Finance</span>
        <h3 data-slot>0% for 60 Months</h3>
        <span class="more">View offer ${ARROW_SM}</span>
      </div>
    </a>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
