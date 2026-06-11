/* eslint-disable max-len */
import { renderTemplate, initCountup } from '../../scripts/template-block.js';

const TEMPLATE = `
<div class="stats-inner">
  <div class="stripe"></div>
  <div class="wrap">
    <div class="stats-grid">
      <div class="item intro reveal">
        <h2 class="cond" data-field>Built On <em>Iron</em> &amp; Trust</h2>
        <p data-field>Three generations of keeping the West's heavy equipment in the dirt and on the job.</p>
      </div>
      <div class="item reveal" data-repeat>
        <div class="num" data-slot>75</div>
        <div class="lab" data-slot>Years in Business</div>
      </div>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  block.querySelectorAll('.num').forEach((el) => {
    const raw = el.textContent.trim();
    const m = raw.match(/^(\D*)(\d+)(\D*)$/);
    if (m) {
      const [, pre, num, suf] = m;
      el.dataset.countup = num;
      if (pre) el.dataset.prefix = pre;
      if (suf) el.dataset.suffix = suf;
    }
  });
  initCountup(block);
}
