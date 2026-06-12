import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<section class="used sec-pad" id="used">
  <div class="wrap">
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
          <span class="badge" data-slot>Certified Used</span>
          <span class="fav" role="button" aria-label="Save"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5C19 15.4 12 20 12 20z"/></svg></span>
          <img data-slot alt="" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="body">
          <h3 data-slot>2021 Cat® 320 Hydraulic Excavator</h3>
          <div class="specs">
            <span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> <span data-slot>2,450 hrs</span></span>
            <span><svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg> <span data-slot>Salt Lake City, UT</span></span>
          </div>
          <div class="foot">
            <div class="price"><span data-slot>$189,500</span><small>Or finance available</small></div>
            <span class="view">Details <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </div>
        </div>
      </a>
    </div>

    <div class="used-foot">
      <a href="#" class="btn btn-dark" data-field>Browse Full Inventory
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // Wire filter chip toggle behavior (visual only)
  block.querySelectorAll('.filters .chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      block.querySelector('.filters .chip.active')?.classList.remove('active');
      chip.classList.add('active');
    });
  });
}
