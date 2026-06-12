import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `
<section class="service sec-pad" id="service">
  <div class="wrap">
    <div class="grid">
      <div class="copy">
        <span class="kicker eyebrow" style="color:var(--yellow-deep);display:inline-flex;align-items:center;gap:12px;" data-field>Maintenance &amp; Repair</span>
        <h2 class="cond" data-field>Maintain Your Cat® Equipment With Utah's Best</h2>
        <p data-field>You depend on your heavy equipment every day. Trust Wheeler to keep your excavators, dozers, motor graders and other essential machines on the job — with field service, shop rebuilds, and 24-hour support across Utah, Wyoming &amp; Nevada.</p>
        <div class="cta-row">
          <a href="#" class="btn btn-y" data-field>Request Service
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
          <a href="#" class="btn btn-ghost" data-field>Service Options</a>
        </div>
      </div>
      <div class="gallery">
        <img data-field class="g1" alt="" style="position:absolute;box-shadow:0 24px 50px rgba(0,0,0,.18);border:6px solid #fff;top:0;left:0;width:74%;height:300px;object-fit:cover;z-index:1;border-radius:6px;">
        <img data-field class="g2" alt="" style="position:absolute;box-shadow:0 24px 50px rgba(0,0,0,.18);border:6px solid #fff;bottom:0;right:0;width:60%;height:280px;object-fit:cover;z-index:2;border-radius:6px;">
        <div class="badge-yrs">
          <b class="cond">3,300</b>
          <span>Combined years of tech experience</span>
        </div>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
