import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (repeating item rows, 2 cells each):
 *   | faq |
 *   | Question text | Answer text |                       (item 1)
 * The section heading is default content above the block.
 *   | Question text | Answer text |                       (item 2)
 *   …
 *
 * The first <details> is opened automatically to match the source design.
 */
const TEMPLATE = `
<section class="wrap">
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
