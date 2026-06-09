import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Final CTA band — coral gradient strip with headline, sub-copy, button, note.
 *
 * DA block table (4 rows, 1 cell each — all leading fields, no collection):
 *   Row 1: h2 heading
 *   Row 2: sub-copy paragraph
 *   Row 3: CTA button link (href + text)
 *   Row 4: fine-print note
 */
const TEMPLATE = `
<section class="final" data-section="cta">
  <div class="wrap">
    <h2 data-field></h2>
    <p data-field></p>
    <a href="#" class="btn btn-primary" data-field>Start Building For Free</a>
    <p class="sub-note" data-field></p>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
