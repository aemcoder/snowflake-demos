import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Equipment Cards block — used-inventory card grid with filter chrome.
 *
 * DEFAULT CONTENT (Pattern A): eyebrow h6, heading h2, description p are
 * authored above the block in the DA document, NOT inside the block.
 *
 * DA block row layout:
 *   Leading field row 1 (1 cell) — "View all N machines" link
 *   Collection rows (variable) — one per card, 6 cells:
 *     cell 0 — badge text (e.g. "Certified Used")
 *     cell 1 — card image
 *     cell 2 — card title (year + model)
 *     cell 3 — hours spec
 *     cell 4 — location spec
 *     cell 5 — price
 *   Trailing field row (1 cell) — "Browse Full Inventory" CTA link
 *
 * Filter chips and icon SVGs are baked template chrome.
 */

const CLOCK_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none"
  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

const PIN_SVG = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none"
  stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z"/>
  <circle cx="12" cy="10" r="2.4"/></svg>`;

const HEART_SVG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none"
  stroke="currentColor" stroke-width="1.9" aria-hidden="true">
  <path d="M12 20s-7-4.6-9.2-9A4.6 4.6 0 0 1 12 6a4.6 4.6 0 0 1 9.2 5C19 15.4 12 20 12 20z"/></svg>`;

const ARROW_SVG = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none"
  stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const CHIP_LABELS = ['All', 'Excavators', 'Dozers', 'Wheel Loaders', 'Compact', 'Motor Graders', 'Certified Used'];

const FILTER_CHIPS = CHIP_LABELS
  .map((label, i) => `<button class="chip${i === 0 ? ' active' : ''}" type="button">${label}</button>`)
  .join('\n      ');

const TEMPLATE = `
<div class="ec-wrap">
  <div class="ec-sec-head">
    <a class="ec-view-all link" data-field href="#">
      View all machines ${ARROW_SVG}
    </a>
  </div>

  <div class="ec-filters">
    ${FILTER_CHIPS}
  </div>

  <a href="#" class="ec-card" data-repeat>
    <div class="ec-ph">
      <span class="ec-badge" data-slot></span>
      <span class="ec-fav" role="button" aria-label="Save">${HEART_SVG}</span>
      <img data-slot class="ec-img" alt="">
    </div>
    <div class="ec-body">
      <h3 class="ec-title" data-slot></h3>
      <div class="ec-specs">
        <span>${CLOCK_SVG} <span data-slot></span></span>
        <span>${PIN_SVG} <span data-slot></span></span>
      </div>
      <div class="ec-foot">
        <div class="ec-price">
          <span data-slot></span>
          <small>Or finance available</small>
        </div>
        <span class="ec-view">Details ${ARROW_SVG}</span>
      </div>
    </div>
  </a>

  <div class="ec-bottom">
    <a class="btn btn-dark ec-browse" data-field href="#">
      Browse Full Inventory ${ARROW_SVG}
    </a>
  </div>
</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  // Wire filter chip active state (visual chrome only)
  const chips = [...block.querySelectorAll('.ec-filters .chip')];
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}
