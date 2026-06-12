import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<section class="stats sec-pad">
  <div class="stripe"></div>
  <div class="wrap">
    <div class="grid">
      <div class="item intro">
        <h2 class="cond" data-field>Built On <em>Iron</em> &amp; Trust</h2>
        <p data-field>Three generations of keeping the West's heavy equipment in the dirt and on the job.</p>
      </div>
      <div class="item" data-group>
        <div class="num" data-slot>75</div>
        <div class="lab" data-slot>Years in Business</div>
      </div>
      <div class="item" data-group>
        <div class="num" data-slot>18</div>
        <div class="lab" data-slot>Branch Locations</div>
      </div>
      <div class="item" data-group>
        <div class="num" data-slot>150K</div>
        <div class="lab" data-slot>Sq Ft of Shop Space</div>
      </div>
      <div class="item" data-group>
        <div class="num" data-slot>400</div>
        <div class="lab" data-slot>Service Technicians</div>
      </div>
      <div class="item" data-group>
        <div class="num" data-slot>62K</div>
        <div class="lab" data-slot>Part Numbers in Stock</div>
      </div>
      <div class="item" data-group>
        <div class="num" data-slot>90</div>
        <div class="lab" data-slot>Field Service Trucks</div>
      </div>
      <div class="item" data-group>
        <div class="num" data-slot>24/7</div>
        <div class="lab" data-slot>Machine Monitoring</div>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
