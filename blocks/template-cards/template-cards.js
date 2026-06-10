/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Template-cards — verbatim source markup (the 105-card listing grid).
 * One leading data-field (the count line), then a variable-length collection:
 * one data-repeat card with [image, title, description] slots. The card root
 * is an <a>; the engine fills slots only, so decorate() hoists the authored
 * title link's href onto the card anchor and unwraps it (no nested links).
 * The media div holds a real <img> slot instead of the source's inline
 * background-image (authorable, and EDS serves responsive <picture>).
 */
const TEMPLATE = `
<div class="wrap"><div class="lgroup-head"><span class="muted" data-field>105 app templates</span></div><div class="lcards"><a class="lcard lcard--media reveal" href="#" data-repeat><div class="lcard-media"><img data-slot alt=""></div><div class="lcard-body"><b data-slot>Template name</b><p data-slot>Template description</p><span class="go">View template →</span></div></a></div></div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
  block.querySelectorAll('.lcard').forEach((card) => {
    const link = card.querySelector('.lcard-body b a');
    if (!link) return;
    card.setAttribute('href', link.getAttribute('href') ?? '#');
    link.replaceWith(...link.childNodes);
  });
}
