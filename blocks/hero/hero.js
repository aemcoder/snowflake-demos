/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `

  <image-slot data-field="" id="hero-bg" fit="cover" placeholder="Drop hero image — CAT machines on a Utah jobsite"></image-slot>
  <div class="scrim"></div>
  <div class="wrap">
    <div class="promo-ribbon">
      <span data-field="" class="tag">Demo Days '26</span>
      <a data-field="" href="#" class="body"><b>June 11–12 · Salt Lake City</b> — Hands-on demos of the full Cat® lineup. <span class="go">Details
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></a>
    </div>
    <h1 data-field="" class="cond">We Keep <span class="hl">Utah</span><br>Working.</h1>
    <p data-field="" class="lede">New &amp; used Cat® equipment, rentals, genuine parts, and 24-hour service across Utah, Wyoming &amp; Nevada — backed by 75 years and 18 branches.</p>
    <div class="cta-row">
      <a data-field="" href="#used" class="btn btn-y">Shop Used Equipment
        <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
      <a data-field="" href="#service" class="btn btn-ghost-light">Request Service</a>
    </div>
  </div>

`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
