/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<div class="grid">
  <div class="copy">
    <span class="kicker eyebrow" data-field>Maintenance &amp; Repair</span>
    <h2 class="cond" data-field>Maintain Your Cat® Equipment With Utah's Best</h2>
    <p data-field>You depend on your heavy equipment every day. Trust Wheeler to keep your excavators, dozers, motor graders and other essential machines on the job — with field service, shop rebuilds, and 24-hour support across Utah, Wyoming &amp; Nevada.</p>
    <div class="cta-row">
      <a href="#" class="btn btn-y" data-field>Request Service <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
      <a href="#" class="btn btn-ghost" data-field>Service Options</a>
    </div>
  </div>
  <div class="gallery">
    <div class="g1"><img data-field alt=""></div>
    <div class="g2"><img data-field alt=""></div>
    <div class="badge-yrs">
      <b class="cond" data-field>3,300</b>
      <span data-field>Combined years of tech experience</span>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
