import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table:
 *   | final   |                          |
 *   | heading | Get started in 30 seconds. |
 *   | sub     | No credit card required.   |
 *   | cta     | <a href="…">Label</a>      |
 */
const TEMPLATE = `
<section class="final">
  <div class="wrap">
    <h2 data-slot="heading"></h2>
    <p data-slot="sub"></p>
    <a href="#" class="btn btn-primary" data-slot="cta"></a>
  </div>
</section>`;

export default function decorate(block) {
  renderTemplate(block, TEMPLATE);
}
