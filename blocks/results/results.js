import { renderTemplate, initCountup } from '../../scripts/template-block.js';

/**
 * DA block table (2 leading fields + 3 stat rows (1 cell each) + 2 trailing fields):
 *   | results |
 *   | Results                                    |  (eyebrow — leading)
 *   | Real outcomes, measured.                   |  (heading — leading)
 *   | saved per year                             |  (stat 1 label)
 *   | customer retention rate                    |  (stat 2 label)
 *   | faster program administration              |  (stat 3 label)
 *   | "We replaced four…"                        |  (quote — trailing)
 *   | <a href="…">Read the story →</a>           |  (story-link — trailing)
 *
 * Count-up target values ($250k+, 92%, 10x) are baked into the template.
 */
const TEMPLATE = `
<section class="wrap">
  <div class="center">
    <p class="eyebrow" data-field></p>
    <h2 data-field></h2>
  </div>
  <div class="stats">
    <div class="stat" data-group>
      <div class="n" data-countup="250" data-prefix="$" data-suffix="k+">$250k+</div>
      <p data-slot="label"></p>
    </div>
    <div class="stat" data-group>
      <div class="n" data-countup="92" data-suffix="%">92%</div>
      <p data-slot="label"></p>
    </div>
    <div class="stat" data-group>
      <div class="n" data-countup="10" data-suffix="x">10x</div>
      <p data-slot="label"></p>
    </div>
  </div>
  <div class="story reveal">
    <blockquote data-field></blockquote>
    <a href="#" class="link-sec" data-field></a>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  initCountup(block);
}
