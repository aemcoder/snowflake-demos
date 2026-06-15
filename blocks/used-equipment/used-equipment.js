/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const ARROW = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CLOCK = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const PIN = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
const HEART = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5C19 15.4 12 20 12 20z"/></svg>';

const TEMPLATE = `
<div class="sec-head">
  <a href="#" class="link" data-field>View all 3,100 machines ${ARROW}</a>
</div>
<div class="filters">
  <button class="chip active">All</button>
  <button class="chip">Excavators</button>
  <button class="chip">Dozers</button>
  <button class="chip">Wheel Loaders</button>
  <button class="chip">Compact</button>
  <button class="chip">Motor Graders</button>
  <button class="chip">Certified Used</button>
</div>
<div class="cards">
  <a href="#" class="card" data-repeat>
    <div class="ph">
      <img data-slot alt="">
      <span class="badge" data-slot>Badge</span>
      <span class="fav" role="button" aria-label="Save">${HEART}</span>
    </div>
    <div class="body">
      <h3 data-slot>Title</h3>
      <div class="specs">
        <span class="spec-hours">${CLOCK} <span data-slot>Hours</span></span>
        <span class="spec-loc">${PIN} <span data-slot>Location</span></span>
      </div>
      <div class="foot">
        <div class="price" data-slot>$0<small>Or finance available</small></div>
        <span class="view">Details ${ARROW}</span>
      </div>
    </div>
  </a>
</div>
<div class="used-foot">
  <a href="#" class="btn btn-dark" data-field>Browse Full Inventory <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
</div>
`;

function wireFilters(block) {
  block.querySelectorAll('.filters .chip').forEach((c) => {
    c.addEventListener('click', () => {
      block.querySelector('.filters .chip.active')?.classList.remove('active');
      c.classList.add('active');
    });
  });
}

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  wireFilters(block);
}
