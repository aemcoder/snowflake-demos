/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Teams block — section heading is default content (h6/h2/p above block).
 * Collection: data-repeat card with 5 slots: code / name / conf / group / host-badge.
 * Confederation filter buttons are baked. Vanilla JS filter replaces React state.
 * DA rows: code | name | conf | group | "host" (or empty)
 */
const CONFEDS = ['All', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

const filterBtns = CONFEDS.map((c) => `<button class="conf-btn${c === 'All' ? ' active' : ''}" data-conf="${c}">${c}</button>`).join('');

const TEMPLATE = `
<div class="wrap">
  <div class="teams-filters reveal">${filterBtns}</div>
  <div class="teams-grid reveal">
    <div class="team-card" data-repeat data-conf-val="">
      <div class="team-accent"></div>
      <div class="team-top">
        <div class="team-mono" data-slot>ARG</div>
        <span class="team-host-badge" data-slot></span>
      </div>
      <div class="team-name" data-slot>Argentina</div>
      <div class="team-meta">
        <span data-slot>A</span>
        <span class="team-dot"></span>
        <span data-slot>CONMEBOL</span>
      </div>
    </div>
  </div>
</div>
`;

const CONF_HUE = {
  UEFA: 215, CONMEBOL: 145, CONCACAF: 25, CAF: 90, AFC: 320, OFC: 265,
};

function initFilter(block) {
  const btns = [...block.querySelectorAll('.conf-btn')];
  const cards = [...block.querySelectorAll('.team-card')];

  // apply per-card accent colour from conf hue
  cards.forEach((card) => {
    const conf = card.dataset.confVal;
    const hue = CONF_HUE[conf] ?? 80;
    card.querySelector('.team-accent').style.background = `oklch(0.85 0.16 ${hue})`;
    card.querySelector('.team-mono').style.setProperty('--team-hue', hue);
    card.querySelector('.team-mono').style.background = `oklch(0.85 0.16 ${hue} / 0.14)`;
    card.querySelector('.team-mono').style.color = `oklch(0.85 0.16 ${hue})`;
  });

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const sel = btn.dataset.conf;
      cards.forEach((c) => {
        c.style.display = (sel === 'All' || c.dataset.confVal === sel) ? '' : 'none';
      });
    });
  });
}

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // store conf on each card from the 5th slot content (conf cell)
  block.querySelectorAll('.team-card').forEach((card) => {
    const confEl = card.querySelectorAll('.team-meta span')[2];
    if (confEl) {
      card.dataset.confVal = confEl.textContent.trim();
      // hide host badge if empty
      const badge = card.querySelector('.team-host-badge');
      if (badge && !badge.textContent.trim()) badge.style.display = 'none';
    }
  });

  initFilter(block);
}
