import { renderTemplate } from '../../scripts/template-block.js';

/**
 * DA block table (left/knack/right rows fill positionally: vs-label | h3 | <ul>):
 *   | compare |                        |
 *   | eyebrow | The honest comparison  |
 *   | heading | How Knack stands apart |
 *   | left    | vs. Coding tools | Lovable, Bolt, Replit          | <ul>…</ul> |
 *   | knack   | Knack            | Secure by default              | <ul>…</ul> |
 *   | right   | vs. No-code tools| Airtable, Bubble, Quickbase    | <ul>…</ul> |
 *
 * The three columns (including the highlighted center "Knack" column) are
 * baked into the template structure.
 */
const TEMPLATE = `
<section class="compare">
  <div class="wrap">
    <div class="center">
      <p class="eyebrow" data-slot="eyebrow"></p>
      <h2 data-slot="heading"></h2>
    </div>
    <div class="cmp-grid">
      <div class="cmp" data-group="left">
        <div class="vs" data-slot="vs"></div>
        <h3 data-slot="title"></h3>
        <ul data-slot="bullets"></ul>
      </div>
      <div class="cmp knack" data-group="knack">
        <div class="vs" data-slot="vs"></div>
        <h3 data-slot="title"></h3>
        <ul data-slot="bullets"></ul>
      </div>
      <div class="cmp" data-group="right">
        <div class="vs" data-slot="vs"></div>
        <h3 data-slot="title"></h3>
        <ul data-slot="bullets"></ul>
      </div>
    </div>
  </div>
</section>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
