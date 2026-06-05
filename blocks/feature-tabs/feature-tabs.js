import { renderTemplate, initTabs } from '../../scripts/template-block.js';

/**
 * DA block table (panel-* rows fill positionally: eyebrow | h3 | body | img):
 *   | feature-tabs      |                                    |
 *   | eyebrow           | See it work                        |
 *   | heading           | Create, deploy & scale custom…     |
 *   | intro             | Flip through what you'll build…    |
 *   | panel-database    | Scalable core | A real relational… | Model records… | <img src="…"> |
 *   | panel-ai          | AI builder    | Describe it…       | Generate…      | <img src="…"> |
 *   | panel-automate    | …             | …                  | …              | <img src="…"> |
 *   | panel-pages       | …             | …                  | …              | <img src="…"> |
 *   | panel-users       | …             | …                  | …              | <img src="…"> |
 *   | panel-publish     | …             | …                  | …              | <img src="…"> |
 *
 * Tab button labels are baked into the template.
 */
const TEMPLATE = `
<section class="wrap">
  <div class="center">
    <p class="eyebrow" data-slot="eyebrow"></p>
    <h2 data-slot="heading"></h2>
    <p style="margin-top:14px;font-size:1.1rem" data-slot="intro"></p>
  </div>
  <div class="switch-tabs" role="tablist">
    <button class="tab" role="tab" aria-selected="true"  data-p="database">Build a Database</button>
    <button class="tab" role="tab" aria-selected="false" data-p="ai">Edit with AI</button>
    <button class="tab" role="tab" aria-selected="false" data-p="automate">Automate Workflows</button>
    <button class="tab" role="tab" aria-selected="false" data-p="pages">Create Pages</button>
    <button class="tab" role="tab" aria-selected="false" data-p="users">Users &amp; Roles</button>
    <button class="tab" role="tab" aria-selected="false" data-p="publish">Publish Live</button>
  </div>
  <div class="panel on" id="p-database" data-group="panel-database">
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-ai" data-group="panel-ai">
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-automate" data-group="panel-automate">
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-pages" data-group="panel-pages">
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-users" data-group="panel-users">
    <div>
      <p class="eyebrow" data-slot="tab-eyebrow"></p>
      <h3 data-slot="tab-h3"></h3>
      <p data-slot="tab-body"></p>
    </div>
    <img data-slot="tab-img" src="" alt="">
  </div>
  <div class="panel" id="p-publish" data-group="panel-publish">
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
