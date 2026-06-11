/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Watch-party block — section heading as default content.
 * 6 data-groups; slots: venue / city / match / time / going / cap.
 * Progress bar and RSVP toggle baked in vanilla JS.
 * Search input is baked chrome (filters the rendered cards).
 */
const TEMPLATE = `
<div class="wp-controls reveal">
  <input class="wp-search" type="search" placeholder="Search by city or venue…" aria-label="Search watch parties">
  <button class="btn btn--ghost wp-host-btn">+ Host a watch party</button>
</div>
<div class="wp-grid reveal">
  <div class="party-card" data-group>
    <div class="party-top">
      <div>
        <div class="party-venue" data-slot>Venue</div>
        <div class="party-city" data-slot>City</div>
      </div>
      <span class="party-time" data-slot>Time</span>
    </div>
    <div class="party-match" data-slot>Match</div>
    <div class="party-bar-wrap">
      <div class="party-bar"><div class="party-bar-fill" data-going="" data-cap=""></div></div>
      <div class="party-bar-label"></div>
    </div>
    <button class="btn party-rsvp" data-going-count="" data-cap-count="">RSVP</button>
  </div>
  <div class="party-card" data-group>
    <div class="party-top"><div><div class="party-venue" data-slot>Venue</div><div class="party-city" data-slot>City</div></div><span class="party-time" data-slot>Time</span></div>
    <div class="party-match" data-slot>Match</div>
    <div class="party-bar-wrap"><div class="party-bar"><div class="party-bar-fill" data-going="" data-cap=""></div></div><div class="party-bar-label"></div></div>
    <button class="btn party-rsvp" data-going-count="" data-cap-count="">RSVP</button>
  </div>
  <div class="party-card" data-group>
    <div class="party-top"><div><div class="party-venue" data-slot>Venue</div><div class="party-city" data-slot>City</div></div><span class="party-time" data-slot>Time</span></div>
    <div class="party-match" data-slot>Match</div>
    <div class="party-bar-wrap"><div class="party-bar"><div class="party-bar-fill" data-going="" data-cap=""></div></div><div class="party-bar-label"></div></div>
    <button class="btn party-rsvp" data-going-count="" data-cap-count="">RSVP</button>
  </div>
  <div class="party-card" data-group>
    <div class="party-top"><div><div class="party-venue" data-slot>Venue</div><div class="party-city" data-slot>City</div></div><span class="party-time" data-slot>Time</span></div>
    <div class="party-match" data-slot>Match</div>
    <div class="party-bar-wrap"><div class="party-bar"><div class="party-bar-fill" data-going="" data-cap=""></div></div><div class="party-bar-label"></div></div>
    <button class="btn party-rsvp" data-going-count="" data-cap-count="">RSVP</button>
  </div>
  <div class="party-card" data-group>
    <div class="party-top"><div><div class="party-venue" data-slot>Venue</div><div class="party-city" data-slot>City</div></div><span class="party-time" data-slot>Time</span></div>
    <div class="party-match" data-slot>Match</div>
    <div class="party-bar-wrap"><div class="party-bar"><div class="party-bar-fill" data-going="" data-cap=""></div></div><div class="party-bar-label"></div></div>
    <button class="btn party-rsvp" data-going-count="" data-cap-count="">RSVP</button>
  </div>
  <div class="party-card" data-group>
    <div class="party-top"><div><div class="party-venue" data-slot>Venue</div><div class="party-city" data-slot>City</div></div><span class="party-time" data-slot>Time</span></div>
    <div class="party-match" data-slot>Match</div>
    <div class="party-bar-wrap"><div class="party-bar"><div class="party-bar-fill" data-going="" data-cap=""></div></div><div class="party-bar-label"></div></div>
    <button class="btn party-rsvp" data-going-count="" data-cap-count="">RSVP</button>
  </div>
</div>
`;

function initParties(block) {
  // wire going/cap from authored data onto progress bars
  block.querySelectorAll('.party-card').forEach((card) => {
    const goingEl = card.querySelector('[data-going-count]');
    const capEl = card.querySelector('[data-cap-count]');
    const going = parseInt(goingEl?.dataset.goingCount ?? '0', 10);
    const cap = parseInt(capEl?.dataset.capCount ?? '1', 10);
    const fill = card.querySelector('.party-bar-fill');
    const label = card.querySelector('.party-bar-label');
    if (!fill || !label) return;
    const pct = Math.min(100, Math.round((going / cap) * 100));
    const full = pct >= 95;
    fill.style.width = `${pct}%`;
    fill.style.background = full ? 'var(--muted)' : 'var(--lime)';
    label.textContent = `${going.toLocaleString()} going · ${full ? 'Almost full' : `${cap - going} spots left`}`;
  });

  // RSVP toggle
  block.querySelectorAll('.party-rsvp').forEach((btn) => {
    btn.addEventListener('click', () => {
      const active = btn.classList.toggle('rsvp-on');
      btn.textContent = active ? '✓ You\'re going' : 'RSVP';
      btn.style.background = active ? 'transparent' : 'var(--lime)';
      btn.style.color = active ? 'var(--lime)' : 'var(--ink)';
    });
    btn.style.background = 'var(--lime)';
    btn.style.color = 'var(--ink)';
  });

  // city/venue search
  const search = block.querySelector('.wp-search');
  const cards = [...block.querySelectorAll('.party-card')];
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim().toLowerCase();
      cards.forEach((c) => {
        const venue = c.querySelector('.party-venue')?.textContent.toLowerCase() ?? '';
        const city = c.querySelector('.party-city')?.textContent.toLowerCase() ?? '';
        c.style.display = (!q || venue.includes(q) || city.includes(q)) ? '' : 'none';
      });
    });
  }
}

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // transfer going/cap from authored slot content to data attrs on the bar
  block.querySelectorAll('.party-card').forEach((card) => {
    const slots = card.querySelectorAll('[data-going-count],[data-cap-count]');
    const going = parseInt(card.querySelectorAll('.party-match ~ *')[0]?.textContent ?? '0', 10);
    const cap = parseInt(card.querySelectorAll('.party-match ~ *')[1]?.textContent ?? '1', 10);
    const btn = card.querySelector('.party-rsvp');
    if (btn) { btn.dataset.goingCount = going; btn.dataset.capCount = cap; }
    // Remove the raw going/cap text nodes (they were transferred)
    slots.forEach((el) => { el.remove(); });
  });

  initParties(block);
}
