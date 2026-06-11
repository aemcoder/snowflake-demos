/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const ARROW = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const TEMPLATE = `
<div class="wrap">
  <div class="svc-grid">
    <div class="copy reveal">
      <span class="kicker eyebrow" data-field>Maintenance &amp; Repair</span>
      <h2 class="cond" data-field>Maintain Your Cat® Equipment With Utah's Best</h2>
      <p data-field>You depend on your heavy equipment every day.</p>
      <div class="cta-row">
        <a href="#" class="btn btn-y" data-field>Request Service</a>
        <a href="#" class="btn btn-ghost" data-field>Service Options</a>
      </div>
    </div>
    <div class="gallery reveal">
      <div class="g1"></div>
      <div class="g2"></div>
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
  const primary = block.querySelector('.btn-y');
  if (primary) primary.insertAdjacentHTML('beforeend', ` ${ARROW}`);
}
