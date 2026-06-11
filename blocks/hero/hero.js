/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Hero — world-cup-26 hero section (hero exception: heading + countdown panel
 * are a single composition). Three leading data-fields:
 *   1. kicker text (e.g. "The 2026 World Cup")
 *   2. h1 — authored with <em> for the lime-coloured phrase
 *   3. sub paragraph
 * Baked: ambient glow div, countdown clock, venue info, CTA buttons.
 * Countdown reimplemented in vanilla JS (replaces React useCountdown).
 */
const TEMPLATE = `
<section id="top" style="position:relative;padding-top:120px;padding-bottom:80px;overflow:hidden">
  <div aria-hidden class="hero-glow"></div>
  <div class="wrap" style="position:relative">
    <div class="hero-meta">
      <span class="kicker" data-field>The 2026 World Cup</span>
      <span class="hero-line"></span>
      <span class="kicker kicker--muted">USA · CAN · MEX</span>
    </div>
    <h1 class="display hero-h1" data-field>The world<br><span class="lime">shows up.</span></h1>
    <p class="hero-sub" data-field>48 nations. 16 host cities. One summer. Your home base for the teams, the stories, and the watch parties that turn the whole continent into one stadium.</p>
    <div class="hero-panel">
      <div>
        <div class="kicker" style="margin-bottom:18px">Kickoff in</div>
        <div class="countdown">
          <div class="count-unit"><div class="count-digit" id="wc-days">00</div><div class="kicker kicker--muted count-label">Days</div></div>
          <div class="count-sep">:</div>
          <div class="count-unit"><div class="count-digit" id="wc-hours">00</div><div class="kicker kicker--muted count-label">Hrs</div></div>
          <div class="count-sep">:</div>
          <div class="count-unit"><div class="count-digit" id="wc-mins">00</div><div class="kicker kicker--muted count-label">Min</div></div>
          <div class="count-sep">:</div>
          <div class="count-unit"><div class="count-digit" id="wc-secs">00</div><div class="kicker kicker--muted count-label">Sec</div></div>
        </div>
      </div>
      <div class="hero-venue">
        <div class="hero-venue-text">Opening match<br><strong>Estadio · Mexico City</strong><br>June 11, 2026</div>
        <div class="hero-ctas">
          <a href="#watch" class="btn btn--lime">Find a watch party</a>
          <a href="#teams" class="btn btn--ghost">Explore teams</a>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const KICKOFF = new Date('2026-06-11T19:00:00Z');

function pad2(n) { return String(n).padStart(2, '0'); }

function startCountdown(block) {
  const days = block.querySelector('#wc-days');
  const hours = block.querySelector('#wc-hours');
  const mins = block.querySelector('#wc-mins');
  const secs = block.querySelector('#wc-secs');
  const countdown = block.querySelector('.countdown');
  if (!days) return;

  function tick() {
    const diff = Math.max(0, KICKOFF.getTime() - Date.now());
    if (diff === 0) {
      if (countdown) countdown.innerHTML = '<span class="display" style="font-size:clamp(40px,8vw,90px)">Live now</span>';
      return;
    }
    const s = Math.floor(diff / 1000);
    if (days) days.textContent = pad2(Math.floor(s / 86400));
    if (hours) hours.textContent = pad2(Math.floor((s % 86400) / 3600));
    if (mins) mins.textContent = pad2(Math.floor((s % 3600) / 60));
    if (secs) secs.textContent = pad2(s % 60);
  }
  tick();
  setInterval(tick, 1000);
}

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  startCountdown(block);
}
