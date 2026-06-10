/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Check-cards — verbatim source markup (the "How does work order software
 * work?" card grid). The section heading + lead are default content above the
 * block. Variable-length collection: one data-repeat card, one slot (the card
 * text). The ✓ tick chrome is baked.
 */
const TEMPLATE = `
<div class="wrap"><div class="cards3"><div class="card reveal" data-repeat><div class="featrow" style="border:0;padding:0"><span class="tick">✓</span><div data-slot>Capture Requests – Accept submissions through online forms, mobile devices, or embedded widgets.</div></div></div></div></div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
