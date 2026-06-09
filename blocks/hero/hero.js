import { renderTemplate, cascadeRows, initCountup } from '../../scripts/template-block.js';

/**
 * Hero — two-column grid: authored left column + baked live-app mock right column.
 *
 * Hero exception: heading is structurally interleaved with the app visual in a
 * 2-column grid, so ALL authored content stays in-block (no default content above).
 *
 * DA block table — 5 leading rows (1 cell each):
 *   Row 1: eyebrow text
 *   Row 2: h1 markup (use <strong> for the accent span "Watch it build.")
 *   Row 3: sub-copy paragraph
 *   Row 4: primary CTA link (href + text)
 *   Row 5: secondary link (href + text)
 *
 * Trust line, KPI countup values, row-cascade table, and sweep animation are baked.
 */
const TEMPLATE = `
<section class="hero" data-section="hero">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow" data-field></p>
      <h1 data-field></h1>
      <p class="sub" data-field></p>
      <div class="hero-cta">
        <a href="#" class="btn btn-primary" data-field>Start Building For Free</a>
        <a href="#" class="link-sec" data-field>Talk to sales →</a>
      </div>
      <div class="trust">
        <span class="stars" aria-hidden="true">★★★★★</span>
        Trusted by <b>100,000+</b> users worldwide
      </div>
    </div>
    <div class="app build-anim" id="app" aria-hidden="true">
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
          <thead>
            <tr>
              <th>Record</th><th>Owner</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row">
              <td><span class="rowdot"></span>WO-1043 · HVAC</td>
              <td>A. Chen</td>
              <td><span class="pill-s s-live">Live</span></td>
            </tr>
            <tr class="row">
              <td>WO-1044 · Electrical</td>
              <td>R. Diaz</td>
              <td><span class="pill-s s-build">Building</span></td>
            </tr>
            <tr class="row">
              <td>WO-1045 · Plumbing</td>
              <td>M. Osei</td>
              <td><span class="pill-s s-queue">Queued</span></td>
            </tr>
            <tr class="row">
              <td>WO-1046 · Inspection</td>
              <td>J. Park</td>
              <td><span class="pill-s s-live">Live</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  cascadeRows(block);
  initCountup(block);
}
