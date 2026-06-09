import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Proof — "Trusted by" intro line + placeholder brand-name logo strip.
 *
 * DA block table — 1 row (1 cell):
 *   Row 1: intro paragraph (e.g. "Trusted by 100,000+ users across the world")
 *
 * Brand names are placeholder/illustrative — baked in the template.
 */
const TEMPLATE = `
<section class="proof" data-section="proof">
  <div class="wrap">
    <div class="proof-intro">
      <p data-field>Trusted by 100,000+ users across the world</p>
    </div>
    <div class="logos" aria-hidden="true">
      <span>Panasonic</span>
      <span>Honda</span>
      <span>Intel</span>
      <span>HarperCollins</span>
      <span>Spotify</span>
      <span>Zillow</span>
      <span>Capital One</span>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
