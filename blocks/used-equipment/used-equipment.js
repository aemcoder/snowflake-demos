import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<section class="used">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="kicker eyebrow" data-field>Certified Used Inventory</span>
        <h2 class="cond" data-field>Shop Used Equipment</h2>
        <p data-field>Inspected, serviced, and backed by Wheeler.</p>
      </div>
      <a href="#" class="link" data-field>View all 3,100 machines
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
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

    <div class="cards" id="cardGrid">
    <a href="#" class="card" data-repeat>
      <div class="ph">
        <span class="badge" data-slot>Certified Used</span>
        <span class="fav" role="button" aria-label="Save"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5C19 15.4 12 20 12 20z"></path></svg></span>
        <img data-slot style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="body">
        <h3 data-slot>2021 Cat® 320 Hydraulic Excavator</h3>
        <div class="specs">
          <span><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg> <span data-slot>2,450 hrs</span></span>
          <span><svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"></path><circle cx="12" cy="10" r="2.4"></circle></svg> <span data-slot>Salt Lake City, UT</span></span>
        </div>
        <div class="foot">
          <div class="price" data-slot>$189,500<small>Or finance available</small></div>
          <span class="view">Details <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span>
        </div>
      </div>
    </a>
    </div>

    <div class="used-foot">
      <a href="#" class="btn btn-dark" data-field>Browse Full Inventory
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>
    </div>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  // Hoist card link hrefs from inner slots
  block.querySelectorAll('.card').forEach((card) => {
    const inner = card.querySelector('h3 a');
    if (inner) {
      card.href = inner.getAttribute('href') || '#';
      inner.replaceWith(...inner.childNodes);
    }
  });
}
