import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table:
 *   | integ   |                                              |
 *   | heading | Move beyond patchwork integrations           |
 *   | sub     | Connect the tools you already use…           |
 *   | cta     | <a href="…">See All Integrations</a>         |
 *
 * Integration logo tiles are baked into the template.
 */
const TEMPLATE = `
<section class="integ">
  <div class="wrap">
    <div class="center">
      <h2 style="color:#fff" data-slot="heading"></h2>
      <p data-slot="sub"></p>
    </div>
    <div class="integ-logos">
      <div>Z</div><div>S</div><div>G</div><div>M</div>
      <div>St</div><div>Q</div><div>Tw</div><div>Hb</div>
    </div>
    <div style="text-align:center">
      <a href="#" class="btn btn-primary" data-slot="cta"></a>
    </div>
  </div>
</section>`;

export default function decorate(block) {
  renderTemplate(block, TEMPLATE);
}
