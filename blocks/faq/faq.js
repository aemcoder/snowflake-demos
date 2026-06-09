import { renderTemplate } from '../../scripts/template-block.js';

/**
 * FAQ accordion — variable-length list of native <details> items.
 *
 * DA block table (N rows, 2 cells each — all collection, heading is default content above):
 *   Each row: one FAQ item. Cells:
 *     0: question (summary text)
 *     1: answer (paragraph content, may contain links)
 *
 * Native <details> / <summary> accordion — no JS required.
 * The first item is open by default (baked into the data-repeat template).
 */
const TEMPLATE = `
<section data-section="faq">
  <div class="wrap">
    <div class="faq">
      <details open data-repeat>
        <summary data-slot>Question text</summary>
        <p data-slot>Answer text.</p>
      </details>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // Only the first item should be open by default; remove 'open' from all others.
  block.querySelectorAll('details').forEach((d, i) => {
    if (i > 0) d.removeAttribute('open');
  });
}
