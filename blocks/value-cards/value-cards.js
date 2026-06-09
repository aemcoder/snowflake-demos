import { renderTemplate, observeReveals } from '../../scripts/template-block.js';

/**
 * Value cards — 3 value-proposition cards with baked Lucide SVG icons.
 *
 * Default content above: h2 heading (no eyebrow).
 *
 * DA block table — 3 rows (2 cells each):
 *   Cell 0: h3 card title
 *   Cell 1: card description paragraph
 *
 * Icon SVGs are baked in the template.
 */

const SVG_ZAP = `<svg class="lucide lucide-zap" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
</svg>`;

const SVG_CLOCK = `<svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
</svg>`;

const SVG_CHART = `<svg class="lucide lucide-bar-chart-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
</svg>`;

const TEMPLATE = `
<section class="value-props-sec" data-section="value-props">
  <div class="wrap">
    <div class="cards3">
      <div class="vcard reveal" data-group>
        <div class="ic">${SVG_ZAP}</div>
        <h3 data-slot>Business-ready from day one</h3>
        <p data-slot>Security, permissions, and scale are the foundation every Knack app starts on.</p>
      </div>
      <div class="vcard reveal" data-group>
        <div class="ic">${SVG_CLOCK}</div>
        <h3 data-slot>Minutes to production, not months</h3>
        <p data-slot>Idea to a live, hosted application in an afternoon — then iterate freely.</p>
      </div>
      <div class="vcard reveal" data-group>
        <div class="ic">${SVG_CHART}</div>
        <h3 data-slot>Break free from spreadsheets</h3>
        <p data-slot>Replace fragile spreadsheets with real applications your team can trust.</p>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  observeReveals(block);
}
