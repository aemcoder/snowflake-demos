import { renderTemplate, runCountup, cascadeRows } from '../../scripts/template-block.js';

/**
 * DA block table (4 positional field rows, no key column):
 *   | hero |
 *   | No-code · AI · Enterprise-grade security      |  (eyebrow)
 *   | The most secure app & database builder…       |  (sub)
 *   | <a href="…">Start Building For Free</a>       |  (cta-primary)
 *   | <a href="…">Talk to sales →</a>               |  (cta-secondary)
 *
 * The h1, trust badge, and entire animated app mock are baked into the
 * template — they are structural chrome, not authored content.
 */
const TEMPLATE = `
<div class="wrap hero-grid">
  <div>
    <p class="eyebrow" data-field></p>
    <h1 style="margin-top:14px">Don't read about the app. <span>Watch it build.</span></h1>
    <p class="sub" data-field></p>
    <div class="hero-cta">
      <a href="#" class="btn btn-primary" data-field></a>
      <a href="#" class="link-sec" data-field></a>
    </div>
    <div class="trust"><span class="stars">★★★★★</span> Trusted by <b>100,000+</b> users worldwide</div>
  </div>
  <div class="app build-anim" id="app">
    <div class="app-bar">
      <span class="d"></span><span class="d"></span><span class="d"></span>
      <span class="title">Operations · Live App</span>
      <span class="live"><span class="pulse"></span> Live</span>
    </div>
    <div class="app-body">
      <div class="sweep"></div>
      <div class="kpis">
        <div class="kpi">
          <div class="l">Open work orders</div>
          <div class="v mag" data-countup="248">248</div>
        </div>
        <div class="kpi">
          <div class="l">Saved / yr</div>
          <div class="v pink" data-countup="250" data-prefix="$" data-suffix="k+">$250k+</div>
        </div>
        <div class="kpi">
          <div class="l">SLA met</div>
          <div class="v" data-countup="92" data-suffix="%">92%</div>
          <div class="bar"><i data-fill="92%"></i></div>
        </div>
      </div>
      <table class="rows">
        <thead><tr><th>Record</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>
          <tr class="row"><td><span class="rowdot"></span>WO-1043 · HVAC</td><td>A. Chen</td><td><span class="pill-s s-live">Live</span></td></tr>
          <tr class="row"><td>WO-1044 · Electrical</td><td>R. Diaz</td><td><span class="pill-s s-build">Building</span></td></tr>
          <tr class="row"><td>WO-1045 · Plumbing</td><td>M. Osei</td><td><span class="pill-s s-queue">Queued</span></td></tr>
          <tr class="row"><td>WO-1046 · Inspection</td><td>J. Park</td><td><span class="pill-s s-live">Live</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // Hero KPIs fire immediately rather than on scroll (matches source behavior)
  const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  block.querySelectorAll('[data-countup]').forEach((el) => {
    if (!reduce) {
      el.textContent = `${el.dataset.prefix || ''}0${el.dataset.suffix || ''}`;
      setTimeout(() => runCountup(el), 600);
    }
  });
  block.querySelectorAll('.bar i[data-fill]').forEach((el) => {
    if (!reduce) setTimeout(() => { el.style.transform = `scaleX(${parseFloat(el.dataset.fill) / 100})`; }, 700);
  });

  cascadeRows(block);
}
