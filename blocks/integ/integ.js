import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Integrations — brand-gradient band with placeholder badge circles and a CTA.
 *
 * No default content above (all authored content is inside the block).
 * No collection — 3 leading data-fields (the CTA link appears after the baked
 * circles in the DOM but the engine treats all fields as leading when there is
 * no collection, filling them in DOM order from rows 1→3).
 *
 * DA block table — 3 rows (1 cell each):
 *   Row 1: h2 heading
 *   Row 2: intro paragraph
 *   Row 3: CTA link (href + text)
 *
 * Integration badge circles are placeholder/illustrative — baked in the template.
 */
const TEMPLATE = `
<section class="integ-sec" data-section="integ">
  <div class="wrap">
    <div class="integ-header">
      <h2 data-field>Move beyond patchwork integrations</h2>
      <p data-field>Connect the tools you already use — Knack is the secure system of record at the center.</p>
    </div>
    <div class="integ-logos" aria-hidden="true">
      <div><div>Z</div></div>
      <div><div>S</div></div>
      <div><div>G</div></div>
      <div><div>M</div></div>
      <div><div>St</div></div>
      <div><div>Q</div></div>
      <div><div>Tw</div></div>
      <div><div>Hb</div></div>
    </div>
    <div class="integ-cta">
      <a href="#" class="btn btn-primary" data-field>See All Integrations</a>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
