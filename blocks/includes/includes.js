import { renderTemplate, observeReveals } from '../../scripts/template-block.js';

/**
 * "Every plan includes" feature grid — 6 feature cards with baked gradient icons.
 *
 * DA block table (6 rows, 2 cells each — all collection, heading is default content above):
 *   Row 1–6: one icard each. Cells:
 *     0: h3 card title
 *     1: p card description
 *
 * The gradient icon SVGs are baked into the template (one per card group).
 */
const TEMPLATE = `
<section class="includes" data-section="includes">
  <div class="wrap">
    <div class="grid6">
      <div class="icard reveal" data-group>
        <div class="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <ellipse cx="12" cy="6" rx="8" ry="3"/>
            <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/>
            <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>
          </svg>
        </div>
        <h3 data-slot>No-code database</h3>
        <p data-slot>A true relational database with connections and roll-ups, no SQL required.</p>
      </div>
      <div class="icard reveal" data-group>
        <div class="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h3 data-slot>Unlimited users &amp; roles</h3>
        <p data-slot>Add every teammate and customer who needs access. You are never billed per seat.</p>
      </div>
      <div class="icard reveal" data-group>
        <div class="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>
        <h3 data-slot>Security &amp; compliance</h3>
        <p data-slot>Granular permissions, encryption, and audit logging built into the foundation.</p>
      </div>
      <div class="icard reveal" data-group>
        <div class="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2L19 19M19 5l-2.8 2.8M7.8 16.2L5 19"/>
          </svg>
        </div>
        <h3 data-slot>Workflow automation</h3>
        <p data-slot>Trigger emails, updates, and approvals on any event with Knack Flows.</p>
      </div>
      <div class="icard reveal" data-group>
        <div class="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 17l5-5 4 4 7-7"/>
            <path d="M14 8h6v6"/>
          </svg>
        </div>
        <h3 data-slot>App builder logic</h3>
        <p data-slot>Conditional rules, calculations, and permissions you configure visually.</p>
      </div>
      <div class="icard reveal" data-group>
        <div class="ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 3v4M12 17v4M5 5l2.5 2.5M16.5 16.5L19 19M3 12h4M17 12h4"/>
            <circle cx="12" cy="12" r="3.2"/>
          </svg>
        </div>
        <h3 data-slot>AI app building</h3>
        <p data-slot>Describe what you need in plain language and refine the result by hand.</p>
      </div>
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  observeReveals(block);
}
