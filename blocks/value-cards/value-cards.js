import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (3 item rows, 2 cells each: title | body):
 *   | value-cards |
 *   | Business-ready from day one  | Security, permissions…   (card 1)
 *   | Minutes to production…       | Idea to a live app…      (card 2)
 *   | Break free from sheets       | Replace fragile…         (card 3)
 *
 * The section heading is default content above the block in the same section.
 *
 * SVG icons are baked into the template (Lucide zap / clock / bar-chart-3).
 * Authors control only the heading, card titles, and card body text.
 */
const TEMPLATE = `
<section class="wrap">
  <div class="cards3">
    <div class="vcard reveal" data-group>
      <div class="ic">
        <svg class="lucide lucide-zap" xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
        </svg>
      </div>
      <h3 data-slot="title"></h3>
      <p data-slot="body"></p>
    </div>
    <div class="vcard reveal" data-group>
      <div class="ic">
        <svg class="lucide lucide-clock" xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>
      <h3 data-slot="title"></h3>
      <p data-slot="body"></p>
    </div>
    <div class="vcard reveal" data-group>
      <div class="ic">
        <svg class="lucide lucide-bar-chart-3" xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
          <path d="M18 17V9"/>
          <path d="M13 17V5"/>
          <path d="M8 17v-3"/>
        </svg>
      </div>
      <h3 data-slot="title"></h3>
      <p data-slot="body"></p>
    </div>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
