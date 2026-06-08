import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (1 leading field + repeating item rows, 2 cells each):
 *   | faq |
 *   | FAQs |                                              (heading)
 *   | Question text | Answer text |                       (item 1)
 *   | Question text | Answer text |                       (item 2)
 *   …
 *
 * The first <details> is opened automatically to match the source design.
 */
const TEMPLATE = `
<section class="wrap">
  <div class="center"><h2 data-field></h2></div>
  <details data-repeat>
    <summary data-slot></summary>
    <p data-slot></p>
  </details>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  const first = block.querySelector('details');
  if (first) first.open = true;
}
