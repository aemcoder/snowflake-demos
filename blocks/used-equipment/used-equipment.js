import { renderTemplate } from '../../scripts/template-block.js';

/* eslint-disable max-len */
const clock = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const pin = '<svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';
const heart = '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5C19 15.4 12 20 12 20z"/></svg>';
const arrow = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const machines = [
  {
    y: '2021',
    m: 'Cat® 320 Hydraulic Excavator',
    cat: 'Excavator',
    hrs: '2,450',
    loc: 'Salt Lake City, UT',
    price: '$189,500',
    badge: 'Certified Used',
  },
  {
    y: '2019',
    m: 'Cat® D6 Track-Type Dozer',
    cat: 'Dozer',
    hrs: '3,820',
    loc: 'Ogden, UT',
    price: '$245,000',
    badge: 'Certified Used',
  },
  {
    y: '2022',
    m: 'Cat® 950 GC Wheel Loader',
    cat: 'Loader',
    hrs: '1,180',
    loc: 'St. George, UT',
    price: '$228,900',
    badge: 'Low Hours',
  },
  {
    y: '2020',
    m: 'Cat® 259D3 Compact Track Loader',
    cat: 'Compact',
    hrs: '980',
    loc: 'Vernal, UT',
    price: '$64,500',
    badge: 'Certified Used',
  },
  {
    y: '2018',
    m: 'Cat® 140 Motor Grader',
    cat: 'Grader',
    hrs: '4,100',
    loc: 'Elko, NV',
    price: '$198,000',
    badge: 'Priced to Sell',
  },
  {
    y: '2021',
    m: 'Cat® 305 CR Mini Excavator',
    cat: 'Compact',
    hrs: '740',
    loc: 'Rock Springs, WY',
    price: '$72,900',
    badge: 'Low Hours',
  },
];

function buildCards() {
  return machines.map((x) => `
    <a href="#" class="card">
      <div class="ph">
        <span class="badge">${x.badge}</span>
        <span class="fav" role="button" aria-label="Save">${heart}</span>
        <img src="" alt="${x.cat} photo" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div class="body">
        <h3>${x.y} ${x.m}</h3>
        <div class="specs">
          <span>${clock} ${x.hrs} hrs</span>
          <span>${pin} ${x.loc}</span>
        </div>
        <div class="foot">
          <div class="price">${x.price}<small>Or finance available</small></div>
          <span class="view">Details ${arrow}</span>
        </div>
      </div>
    </a>`).join('');
}
/* eslint-enable max-len */

const TEMPLATE = `
<div class="used-equipment">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="kicker eyebrow" data-field>Certified Used Inventory</span>
        <h2 class="cond" data-field>Shop Used Equipment</h2>
        <p data-field>Inspected, serviced, and backed by Wheeler. Browse machines ready to work — financing and Cat® Customer Value Agreements available.</p>
      </div>
      <a href="#" class="link" data-field>View all 3,100 machines
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
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
    <div class="cards">${buildCards()}</div>
    <div class="used-foot">
      <a href="#" class="btn btn-dark" data-field>Browse Full Inventory
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  // wire filter chip toggling
  block.querySelectorAll('.filters .chip').forEach((c) => {
    c.addEventListener('click', () => {
      block.querySelector('.filters .chip.active')?.classList.remove('active');
      c.classList.add('active');
    });
  });
}
