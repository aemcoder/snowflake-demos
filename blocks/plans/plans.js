import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Pricing plan rail — 4 plan cards + 2 enterprise-note callouts.
 *
 * DA block table (6 rows, multi-cell — all collection rows, no leading/trailing fields):
 *
 *   Row 1–4: one plan card each. Cells (positional, 12 slots):
 *     0: plan name
 *     1: "for whom" tagline
 *     2: price amount text (e.g. "$49" or "Custom")
 *     3: price period (e.g. "/mo" — leave empty for Enterprise)
 *     4: price note (e.g. "Billed annually.")
 *     5: CTA link (href + text — button class is baked per card)
 *     6: plan meta note
 *     7: feature section heading (e.g. "Core capabilities")
 *     8: feature item 1 text
 *     9: feature item 2 text
 *    10: feature item 3 text
 *    11: feature item 4 text
 *
 *   Row 5–6: enterprise note callouts. Cells (2 slots):
 *     0: callout text
 *     1: link (href + text)
 *
 * SVG check icons and feature list chrome are baked in the template.
 */
const SVG_CHECK = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2"
  aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg>`;

const PLAN_FEAT = (n) => `
  <li>
    ${SVG_CHECK}
    <span data-slot>${n}</span>
  </li>`;

const PLAN = (extraClass, badgeHTML, btnClass) => `
<article class="plan${extraClass}" data-group>
  ${badgeHTML}
  <h2 class="plan-name" data-slot></h2>
  <p class="plan-for" data-slot></p>
  <div class="plan-price">
    <span class="amt" data-slot></span>
    <span class="per" data-slot></span>
  </div>
  <p class="plan-note" data-slot></p>
  <a href="#" class="btn ${btnClass}" data-slot>Start free trial</a>
  <p class="plan-meta" data-slot></p>
  <p class="feat-head" data-slot>Core capabilities</p>
  <ul class="feats">
    ${PLAN_FEAT(1)}
    ${PLAN_FEAT(2)}
    ${PLAN_FEAT(3)}
    ${PLAN_FEAT(4)}
  </ul>
</article>`;

const TEMPLATE = `
<section class="plans-sec" data-section="plans">
  <div class="wrap">
    <div class="plans">
      ${PLAN('', '', 'btn-ghost')}
      ${PLAN(' featured', '<span class="plan-badge">Most popular</span>', 'btn-primary')}
      ${PLAN('', '', 'btn-ghost')}
      ${PLAN('', '', 'btn-ghost')}
    </div>
    <div class="enterprise-notes">
      <div class="enote" data-group>
        <p data-slot></p>
        <a href="#" class="link-sec" data-slot>Learn more</a>
      </div>
      <div class="enote" data-group>
        <p data-slot></p>
        <a href="#" class="link-sec" data-slot>See Agency Plan</a>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
