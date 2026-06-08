import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (3 positional field rows):
 *   | integ |
 *   | Move beyond patchwork integrations           |  (heading)
 *   | Connect the tools you already use…           |  (sub)
 *   | <a href="…">See All Integrations</a>         |  (cta)
 *
 * Integration logo tiles are baked into the template.
 */
const TEMPLATE = `
<section class="integ">
  <div class="wrap">
    <div class="center">
      <h2 style="color:#fff" data-field></h2>
      <p data-field></p>
    </div>
    <div class="integ-logos">
      <div>Z</div><div>S</div><div>G</div><div>M</div>
      <div>St</div><div>Q</div><div>Tw</div><div>Hb</div>
    </div>
    <div style="text-align:center">
      <a href="#" class="btn btn-primary" data-field></a>
    </div>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
