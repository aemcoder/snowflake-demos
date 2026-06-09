import { renderTemplate, initCountup, observeReveals } from '../../scripts/template-block.js';

/**
 * Results — 3 animated stat tiles + testimonial quote.
 *
 * Default content above: h6 eyebrow + h2 heading.
 *
 * DA block table — 5 rows:
 *   Rows 1–3 (collection, 1 cell each): stat label text per stat
 *   Row 4 (trailing, 1 cell): blockquote text
 *   Row 5 (trailing, 1 cell): attribution link (href + text)
 *
 * Countup target values ($250k+, 92%, 10x) are baked as data-countup attrs.
 * The `.story.reveal` appears after the last data-group → detected as trailing region.
 */
const TEMPLATE = `
<section class="results-sec" data-section="results">
  <div class="wrap">
    <div class="stats">
      <div class="stat" data-group>
        <div class="n" data-countup="250" data-prefix="$" data-suffix="k+">$250k+</div>
        <p data-slot>saved per year</p>
      </div>
      <div class="stat" data-group>
        <div class="n" data-countup="92" data-suffix="%">92%</div>
        <p data-slot>customer retention rate</p>
      </div>
      <div class="stat" data-group>
        <div class="n" data-countup="10" data-suffix="x">10x</div>
        <p data-slot>faster program administration</p>
      </div>
    </div>
    <div class="story reveal">
      <blockquote data-field>"We replaced four disconnected systems with one Knack app — and cut administration time by 90%."</blockquote>
      <a href="#" class="link-sec" data-field>Read the story →</a>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  initCountup(block);
  observeReveals(block);
}
