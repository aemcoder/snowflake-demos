/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `

  <div class="stripe"></div>
  <div class="wrap">
    <div class="grid">
      <div class="item intro">
        <h2 data-field="" class="cond">Built On <span style="color:var(--yellow)">Iron</span> &amp; Trust</h2>
        <p data-field="">Three generations of keeping the West's heavy equipment in the dirt and on the job.</p>
      </div>
      <div data-repeat="" class="item">
        <div data-slot="" class="num">75</div>
        <div data-slot="" class="lab">Years in Business</div>
      </div>
      <div class="item">
        <div class="num">18</div>
        <div class="lab">Branch Locations</div>
      </div>
      <div class="item">
        <div class="num">150K</div>
        <div class="lab">Sq Ft of Shop Space</div>
      </div>
      <div class="item">
        <div class="num">400</div>
        <div class="lab">Service Technicians</div>
      </div>
      <div class="item">
        <div class="num">62K</div>
        <div class="lab">Part Numbers in Stock</div>
      </div>
      <div class="item">
        <div class="num">90</div>
        <div class="lab">Field Service Trucks</div>
      </div>
      <div class="item">
        <div class="num">24/7</div>
        <div class="lab">Machine Monitoring</div>
      </div>
    </div>
  </div>

`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
