/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `

  <div class="wrap">
    <div class="grid">
      <div class="copy">
        <span data-field="" class="kicker eyebrow" style="color:var(--yellow-deep);display:inline-flex;align-items:center;gap:12px;">Maintenance &amp; Repair</span>
        <h2 data-field="" class="cond">Maintain Your Cat® Equipment With Utah's Best</h2>
        <p data-field="">You depend on your heavy equipment every day. Trust Wheeler to keep your excavators, dozers, motor graders and other essential machines on the job — with field service, shop rebuilds, and 24-hour support across Utah, Wyoming &amp; Nevada.</p>
        <div class="cta-row">
          <a data-field="" href="#" class="btn btn-y">Request Service
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
          <a data-field="" href="#" class="btn btn-ghost">Service Options</a>
        </div>
      </div>
      <div class="gallery">
        <image-slot data-field="" id="svc-1" class="g1" radius="6" placeholder="Technician at work"></image-slot>
        <image-slot data-field="" id="svc-2" class="g2" radius="6" placeholder="Shop / engine rebuild"></image-slot>
        <div class="badge-yrs">
          <b data-field="" class="cond">3,300</b>
          <span data-field="">Combined years of tech experience</span>
        </div>
      </div>
    </div>
  </div>

`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
