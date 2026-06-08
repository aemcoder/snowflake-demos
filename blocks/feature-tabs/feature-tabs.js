import { renderTemplate, initTabs } from '../../scripts/template-block.js';

/**
 * DA block table (6 item rows, 4 cells each: eyebrow | h3 | body | img):
 *   | feature-tabs |
 *   | Scalable core | A real relational… | Model records… | <img> |  (panel 1)
 * Eyebrow, heading, and intro are default content above the block in the same section.
 *   | AI builder    | Describe it…       | Generate…      | <img> |  (panel 2)
 *   | Workflow engine | Automate…        | Trigger…       | <img> |  (panel 3)
 *   | UI components | Pages that…        | Drag in…       | <img> |  (panel 4)
 *   | Security      | Granular users…    | Define…        | <img> |  (panel 5)
 *   | Go live       | Publish a live app.| Ship…          | <img> |  (panel 6)
 *
 * Tab button labels are baked into the template.
 */
const TEMPLATE = `
<section class="wrap">
  <div class="switch-tabs" role="tablist">
    <button class="tab" role="tab" aria-selected="true"  data-p="database">Build a Database</button>
    <button class="tab" role="tab" aria-selected="false" data-p="ai">Edit with AI</button>
    <button class="tab" role="tab" aria-selected="false" data-p="automate">Automate Workflows</button>
    <button class="tab" role="tab" aria-selected="false" data-p="pages">Create Pages</button>
    <button class="tab" role="tab" aria-selected="false" data-p="users">Users &amp; Roles</button>
    <button class="tab" role="tab" aria-selected="false" data-p="publish">Publish Live</button>
  </div>
  <div class="panel on" id="p-database" data-group>
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-ai" data-group>
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-automate" data-group>
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-pages" data-group>
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-users" data-group>
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-publish" data-group>
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  initTabs(block);
}
