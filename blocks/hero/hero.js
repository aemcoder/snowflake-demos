/* eslint-disable max-len */
import { renderTemplate, cascadeRows, initCountup } from '../../scripts/template-block.js';

/*
 * Hero — verbatim source markup (solutions/work-orders). All-in-block (hero
 * exception): the heading column is structurally interleaved with the live-app
 * visual in a 2-column grid. Six leading data-fields:
 *   breadcrumb / eyebrow / h1 / sub / primary CTA / secondary CTA
 * The trust line and the entire animated app mock are baked chrome.
 */
const TEMPLATE = `
<div class="wrap hero-grid"><div><p class="breadcrumb" data-field><a href="/solutions/index.html">Solutions</a> › Work Orders</p>
  <p class="eyebrow" data-field>Solution</p>
  <h1 style="margin-top:10px" data-field>Build Work Order Management Software with No-Code</h1>
  <p class="sub" data-field>Streamline your operations with our Work Order Management Software. Create a customizable work order app in minutes—no coding required!</p>
  <div class="hero-cta"><a href="#" class="btn btn-primary" data-field>Start Building For Free</a><a href="#" class="link-sec" data-field>Book a demo →</a></div>
      <div class="trust"><span class="stars">★★★★★</span> Trusted by <b>100,000+</b> teams worldwide</div></div>
      <div class="app build-anim"><div class="app-bar"><span class="d"></span><span class="d"></span><span class="d"></span><span class="title">Work Orders · Live App</span><span class="live"><span class="pulse-dot"></span> Live</span></div>
    <div class="app-body"><div class="sweep"></div><div class="kpis"><div class="kpi"><div class="l">Open records</div><div class="v mag" data-countup="248">248</div></div><div class="kpi"><div class="l">Active users</div><div class="v " data-countup="36">36</div></div><div class="kpi"><div class="l">Uptime</div><div class="v pink" data-countup="99" data-suffix="%">99%</div><div class="bar"><i style="width:99%" data-fill="99%"></i></div></div></div>
    <table class="rows"><thead><tr><th>Record</th><th>Owner</th><th>Status</th></tr></thead><tbody><tr class="row"><td><span class="rowdot"></span>REC-1043</td><td>A. Chen</td><td><span class="pill-s s-live">Live</span></td></tr><tr class="row"><td>REC-1044</td><td>R. Diaz</td><td><span class="pill-s s-build">Building</span></td></tr><tr class="row"><td>REC-1045</td><td>M. Osei</td><td><span class="pill-s s-queue">Queued</span></td></tr></tbody></table></div></div>
    </div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  cascadeRows(block);
  initCountup(block);
}
