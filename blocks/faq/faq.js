import { renderTemplate } from '../../scripts/template-block.js';

/**
 * FAQ accordion — variable-length list of native <details> items.
 *
 * Default content above: h2 "FAQs".
 *
 * DA block table — N rows (2 cells each):
 *   Cell 0: question (summary text)
 *   Cell 1: answer paragraph (may contain links)
 *
 * Native <details>/<summary> — no JS required.
 * First item is open by default; subsequent items have 'open' removed after render.
 */
const TEMPLATE = `
<section class="faq-sec" data-section="faq">
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
  block.querySelectorAll('details').forEach((d, i) => {
    if (i > 0) d.removeAttribute('open');
  });
}
