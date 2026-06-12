/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const ARROW = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const TEMPLATE = `
<div class="wrap">
  <div class="grid">
    <div class="copy">
      <div class="cta-row">
        <a href="#" class="btn btn-y" data-field>Request Service ${ARROW}</a>
        <a href="#" class="btn btn-ghost" data-field>Service Options</a>
      </div>
    </div>
    <div class="gallery">
      <img class="g1" src="" alt="Technician at work" style="aspect-ratio:4/3;object-fit:cover" loading="lazy">
      <img class="g2" src="" alt="Shop / engine rebuild" style="aspect-ratio:4/3;object-fit:cover" loading="lazy">
      <div class="badge-yrs">
        <b class="cond">3,300</b>
        <span>Combined years of tech experience</span>
      </div>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
