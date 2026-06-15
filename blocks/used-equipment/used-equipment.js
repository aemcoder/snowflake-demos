/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `

  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="kicker eyebrow">Certified Used Inventory</span>
        <h2 class="cond">Shop Used Equipment</h2>
        <p data-field="">Inspected, serviced, and backed by Wheeler. Browse machines ready to work — financing and Cat® Customer Value Agreements available.</p>
      </div>
      <a data-field="" href="#" class="link">View all 3,100 machines
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
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

    <div class="cards" id="cardGrid"></div>

    <div class="used-foot">
      <a data-field="" href="#" class="btn btn-dark">Browse Full Inventory
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
    </div>
  </div>

`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
