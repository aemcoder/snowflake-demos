/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const ARROW = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const TEMPLATE = `
<div class="hero-inner">
  <div class="hero-bg"></div>
  <div class="scrim"></div>
  <div class="wrap">
    <div class="promo-ribbon reveal">
      <span class="tag" data-field>Demo Days '26</span>
      <a href="#" class="ribbon-body">
        <span class="ribbon-text" data-field>June 11–12 · Salt Lake City — Hands-on demos of the full Cat® lineup.</span>
        <span class="go">Details ${ARROW}</span>
      </a>
    </div>
    <h1 class="cond" data-field>We Keep Utah Working.</h1>
    <p class="lede" data-field>New &amp; used Cat® equipment, rentals, genuine parts, and 24-hour service.</p>
    <div class="cta-row">
      <a href="#" class="btn btn-y" data-field>Shop Used Equipment</a>
      <a href="#" class="btn btn-ghost-light" data-field>Request Service</a>
    </div>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  const primary = block.querySelector('.btn-y');
  if (primary) primary.insertAdjacentHTML('beforeend', ` ${ARROW}`);
}
