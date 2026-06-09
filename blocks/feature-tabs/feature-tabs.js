import { renderTemplate, initTabs } from '../../scripts/template-block.js';

/**
 * Feature tabs — 6 product-feature panels with a tab navigation strip.
 *
 * Default content above this block (in the section): h6 eyebrow + h2 heading + intro p.
 *
 * DA block table — 6 rows (3 cells each), one per panel:
 *   Cell 0: h3 panel heading
 *   Cell 1: panel description paragraph
 *   Cell 2: panel screenshot image (<img src="/assets/media/screenshot-xxx.webp" alt="…">)
 *
 * Tab button labels, panel eyebrows, panel IDs, and the initial `.on` state on the
 * first panel are baked chrome.
 */
const TEMPLATE = `
<section class="feature-tabs-sec" data-section="feature-tabs">
  <div class="wrap">
    <div class="switch-tabs" role="tablist">
      <button class="tab" role="tab" aria-selected="true"  data-p="database">Build a Database</button>
      <button class="tab" role="tab" aria-selected="false" data-p="ai">Edit with AI</button>
      <button class="tab" role="tab" aria-selected="false" data-p="automate">Automate Workflows</button>
      <button class="tab" role="tab" aria-selected="false" data-p="pages">Create Pages</button>
      <button class="tab" role="tab" aria-selected="false" data-p="users">Users &amp; Roles</button>
      <button class="tab" role="tab" aria-selected="false" data-p="publish">Publish Live</button>
    </div>
    <div class="panel on" id="p-database" data-group>
      <div class="panel-text">
        <p class="eyebrow">Scalable core</p>
        <h3 data-slot>A real relational database, visually.</h3>
        <p data-slot>Model records, connections, and roll-ups without SQL — structured and secure as you scale.</p>
      </div>
      <img data-slot src="/assets/media/screenshot-database-C8tkHKNi-5612.webp"
           alt="Database builder" loading="lazy" width="600" height="400">
    </div>
    <div class="panel" id="p-ai" data-group>
      <div class="panel-text">
        <p class="eyebrow">AI builder</p>
        <h3 data-slot>Describe it. Knack builds it.</h3>
        <p data-slot>Generate tables, pages, and logic from plain language — then refine by hand.</p>
      </div>
      <img data-slot src="/assets/media/screenshot-ai-IJ7IjnkO-3768.webp"
           alt="Edit with AI" loading="lazy" width="600" height="400">
    </div>
    <div class="panel" id="p-automate" data-group>
      <div class="panel-text">
        <p class="eyebrow">Workflow engine</p>
        <h3 data-slot>Automate the busywork.</h3>
        <p data-slot>Trigger emails, updates, and approvals on any event. No glue code.</p>
      </div>
      <img data-slot src="/assets/media/screenshot-automate-zD7X5tm--c3fc.webp"
           alt="Automate workflows" loading="lazy" width="600" height="400">
    </div>
    <div class="panel" id="p-pages" data-group>
      <div class="panel-text">
        <p class="eyebrow">UI components</p>
        <h3 data-slot>Pages that look designed.</h3>
        <p data-slot>Drag in forms, tables, charts, and dashboards — responsive and on-brand.</p>
      </div>
      <img data-slot src="/assets/media/screenshot-pages-BVcTJAC6-7647.webp"
           alt="Create pages" loading="lazy" width="600" height="400">
    </div>
    <div class="panel" id="p-users" data-group>
      <div class="panel-text">
        <p class="eyebrow">Security</p>
        <h3 data-slot>Granular users &amp; roles.</h3>
        <p data-slot>Define exactly who sees and edits what — enterprise-grade access control.</p>
      </div>
      <img data-slot src="/assets/media/screenshot-users-B_MvJKAs-ee5b.webp"
           alt="Configure users and roles" loading="lazy" width="600" height="400">
    </div>
    <div class="panel" id="p-publish" data-group>
      <div class="panel-text">
        <p class="eyebrow">Go live</p>
        <h3 data-slot>Publish a live app in minutes.</h3>
        <p data-slot>Ship a secure, hosted application — custom domain and white-label ready.</p>
      </div>
      <img data-slot src="/assets/media/screenshot-publish-DR61zeJY-6a58.webp"
           alt="Publish a live app" loading="lazy" width="600" height="400">
    </div>
  </div>
</section>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  initTabs(block);
}
