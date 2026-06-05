import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (slot-keyed; qa rows repeat once per accordion item):
 *   | faq     |                                   |
 *   | heading | FAQs                              |
 *   | qa      | Question text | Answer text        |
 *   | qa      | Question text | Answer text        |
 *   …
 *
 * The first <details> is opened automatically to match the source design.
 */
const TEMPLATE = `
<section class="wrap">
  <div class="center"><h2 data-slot="heading"></h2></div>
  <details data-repeat="qa">
    <summary data-slot="q"></summary>
    <p data-slot="a"></p>
  </details>
</section>`;

export default function decorate(block) {
  renderTemplate(block, TEMPLATE);
  const first = block.querySelector('details');
  if (first) first.open = true;
}
