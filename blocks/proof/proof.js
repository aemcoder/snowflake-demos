import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (1 positional field row):
 *   | proof |
 *   | Trusted by 100,000+ users across the world |  (tagline)
 *
 * Logo names are baked into the template (change rarely).
 */
const TEMPLATE = `
<div class="wrap">
  <p data-field></p>
  <div class="logos">
    <span>Panasonic</span><span>Honda</span><span>Intel</span>
    <span>HarperCollins</span><span>Spotify</span><span>Zillow</span>
    <span>Capital One</span>
  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
