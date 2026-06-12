import { renderTemplate } from '../../scripts/template-block.js';

const ARROW = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const TEMPLATE = `
<div class="hero">
  <div class="hero-img"><img data-field alt="Hero background"></div>
  <div class="scrim"></div>
  <div class="wrap">
    <div class="promo-ribbon">
      <span class="tag">Demo Days '26</span>
      <a href="#" class="body"><b>June 11–12 · Salt Lake City</b> — Hands-on demos of the full Cat® lineup. <span class="go">Details
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></a>
    </div>
    <h1 class="cond" data-field>We Keep <em>Utah</em><br>Working.</h1>
    <p class="lede" data-field>New &amp; used Cat® equipment, rentals, genuine parts, and 24-hour service across Utah, Wyoming &amp; Nevada — backed by 75 years and 18 branches.</p>
    <div class="cta-row">
      <a href="#used" class="btn btn-y" data-field>Shop Used Equipment ${ARROW}</a>
      <a href="#service" class="btn btn-ghost-light" data-field>Request Service</a>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
