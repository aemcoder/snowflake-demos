import { renderTemplate, observeReveals } from '../../scripts/template-block.js';

/**
 * Components — 6-card enterprise component grid with baked Lucide SVG icons.
 *
 * Default content above: h2 heading (no eyebrow).
 *
 * DA block table — 6 rows (2 cells each):
 *   Cell 0: h3 card title
 *   Cell 1: card description paragraph
 *
 * Icon SVGs are baked in the template.
 */

const SVG_DB = '<svg class="lucide lucide-database" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>';

const SVG_PALETTE = '<svg class="lucide lucide-palette" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>';

const SVG_SHIELD = '<svg class="lucide lucide-shield-check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>';

const SVG_SETTINGS = '<svg class="lucide lucide-settings" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>';

const SVG_CHART = '<svg class="lucide lucide-line-chart" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>';

const SVG_SPARKLES = '<svg class="lucide lucide-sparkles" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>';

const TEMPLATE = `
<section class="components-sec" data-section="components">
  <div class="wrap">
    <div class="grid6">
      <div class="ccard reveal" data-group>
        <div class="ic">${SVG_DB}</div>
        <h3 data-slot>Scalable database core</h3>
        <p data-slot>Relational data that scales without breaking.</p>
      </div>
      <div class="ccard reveal" data-group>
        <div class="ic">${SVG_PALETTE}</div>
        <h3 data-slot>Modern UI/UX components</h3>
        <p data-slot>Forms, tables, charts, dashboards.</p>
      </div>
      <div class="ccard reveal" data-group>
        <div class="ic">${SVG_SHIELD}</div>
        <h3 data-slot>User management &amp; security</h3>
        <p data-slot>Granular roles and access control.</p>
      </div>
      <div class="ccard reveal" data-group>
        <div class="ic">${SVG_SETTINGS}</div>
        <h3 data-slot>Workflow automation</h3>
        <p data-slot>Event-driven logic, no glue code.</p>
      </div>
      <div class="ccard reveal" data-group>
        <div class="ic">${SVG_CHART}</div>
        <h3 data-slot>Analytics &amp; reporting</h3>
        <p data-slot>Live dashboards on your data.</p>
      </div>
      <div class="ccard reveal" data-group>
        <div class="ic">${SVG_SPARKLES}</div>
        <h3 data-slot>Business logic engine</h3>
        <p data-slot>Rules and calculations built in.</p>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  observeReveals(block);
}
