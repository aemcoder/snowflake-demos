import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (3 positional field rows):
 *   | final |
 *   | Get started in 30 seconds. |  (heading)
 *   | No credit card required.   |  (sub)
 *   | <a href="…">Label</a>      |  (cta)
 */
const TEMPLATE = `
<section class="final">
  <div class="wrap">
    <h2 data-field></h2>
    <p data-field></p>
    <a href="#" class="btn btn-primary" data-field></a>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
