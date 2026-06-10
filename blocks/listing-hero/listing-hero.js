/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Listing hero — verbatim source markup (templates listing page). Three
 * leading data-fields: eyebrow / h1 / lead. The search box (icon + input) is
 * baked chrome. The h1's gradient phrase is authored as <em> (the pipeline
 * strips <span class>); theme.css styles `.listing-hero h1 em` as .grad-text.
 */
const TEMPLATE = `
<div class="wrap">
  <p class="eyebrow" data-field>App Templates</p>
  <h1 data-field>Install a head start, <span class="grad-text">then make it yours</span></h1>
  <p class="lead" data-field>Pre-built apps you can install in one click and customize to how your team works.</p>
  <label class="lsearch"><svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg><input type="search" placeholder="Search templates (e.g. inventory, CRM, scheduling)…" aria-label="Search"></label>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
