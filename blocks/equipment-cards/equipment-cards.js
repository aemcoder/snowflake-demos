/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const CLK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const PIN = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
const HEART = '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5C19 15.4 12 20 12 20z"/></svg>';
const ARROW = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const CHIPS = ['All', 'Excavators', 'Dozers', 'Wheel Loaders', 'Compact', 'Motor Graders', 'Certified Used'];
const chipHtml = CHIPS.map((c) => `<button class="chip${c === 'All' ? ' active' : ''}">${c}</button>`).join('');

const TEMPLATE = `
<div class="wrap">
  <div class="sec-head reveal">
    <div>
      <span class="kicker eyebrow" data-field>Certified Used Inventory</span>
      <h2 class="cond" data-field>Shop Used Equipment</h2>
      <p data-field>Inspected, serviced, and backed by Wheeler.</p>
    </div>
    <a href="#" class="sec-link" data-field>View all 3,100 machines</a>
  </div>
  <div class="filters">${chipHtml}</div>
  <div class="eq-cards">
    <a href="#" class="card" data-repeat>
      <div class="ph">
        <span class="badge" data-slot>Certified Used</span>
        <span class="fav" role="button" aria-label="Save">${HEART}</span>
        <div class="ph-bg"></div>
      </div>
      <div class="cbody">
        <h3 data-slot>2021 Cat® 320 Hydraulic Excavator</h3>
        <div class="specs">
          <span>${CLK} <span data-slot>2,450 hrs</span></span>
          <span>${PIN} <span data-slot>Salt Lake City, UT</span></span>
        </div>
        <div class="cfoot">
          <div class="price"><span data-slot>$189,500</span><small>Or finance available</small></div>
          <span class="view">Details ${ARROW}</span>
        </div>
      </div>
    </a>
  </div>
  <div class="used-foot">
    <a href="#" class="btn btn-dark" data-field>Browse Full Inventory</a>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  const cta = block.querySelector('.btn-dark');
  if (cta) cta.insertAdjacentHTML('beforeend', ` ${ARROW}`);

  const link = block.querySelector('.sec-link');
  if (link) link.insertAdjacentHTML('beforeend', ` ${ARROW}`);

  block.querySelectorAll('.filters .chip').forEach((c) => {
    c.addEventListener('click', () => {
      block.querySelector('.filters .chip.active')?.classList.remove('active');
      c.classList.add('active');
    });
  });
}
