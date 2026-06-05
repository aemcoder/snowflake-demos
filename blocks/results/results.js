import { renderTemplate, initCountup } from '../../scripts/template-block.js';

/**
 * DA block table (stat-N rows fill positionally: label only — numbers are baked):
 *   | results    |                            |
 *   | eyebrow    | Results                    |
 *   | heading    | Real outcomes, measured.   |
 *   | stat-1     | saved per year             |
 *   | stat-2     | customer retention rate    |
 *   | stat-3     | faster program administration |
 *   | quote      | "We replaced four…"        |
 *   | story-link | <a href="…">Read the story →</a> |
 *
 * Count-up target values ($250k+, 92%, 10x) are baked into the template.
 */
const TEMPLATE = `
<section class="wrap">
  <div class="center">
    <p class="eyebrow" data-slot="eyebrow"></p>
    <h2 data-slot="heading"></h2>
  </div>
  <div class="stats">
    <div class="stat" data-group="stat-1">
      <div class="n" data-countup="250" data-prefix="$" data-suffix="k+">$250k+</div>
      <p data-slot="label"></p>
    </div>
    <div class="stat" data-group="stat-2">
      <div class="n" data-countup="92" data-suffix="%">92%</div>
      <p data-slot="label"></p>
    </div>
    <div class="stat" data-group="stat-3">
      <div class="n" data-countup="10" data-suffix="x">10x</div>
      <p data-slot="label"></p>
    </div>
  </div>
  <div class="story reveal">
    <blockquote data-slot="quote"></blockquote>
    <a href="#" class="link-sec" data-slot="story-link"></a>
  </div>
</section>`;

export default function decorate(block) {
  renderTemplate(block, TEMPLATE);
  initCountup(block);
}
