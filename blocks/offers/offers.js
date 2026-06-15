/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Offers block — section heading as default content (Pattern A):
 *   h6 eyebrow "Limited Time", h2 "Financing Deals & Special Offers".
 * 1 leading field: "All offers" link.
 * data-repeat cards with 4 slots: image, tag-text, title, link.
 * Cards have aspect-ratio 4/3 with gradient scrim overlay.
 * DA rows: 1 leading (link) + N repeat rows (image | tag | title | link).
 */
const TEMPLATE = `
<div class="offers-wrap">
  <div class="offers-head">
    <a href="#" class="offers-viewall" data-field>All offers</a>
  </div>
  <div class="offers-grid">
    <a href="#" class="offers-card" data-repeat>
      <img data-slot alt="">
      <div class="offers-ov"></div>
      <div class="offers-c">
        <span class="offers-tag" data-slot>Finance</span>
        <h3 class="offers-title" data-slot>Offer title</h3>
        <span class="offers-more" data-slot>View offer</span>
      </div>
    </a>
  </div>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  const viewall = block.querySelector('.offers-viewall');
  if (viewall) {
    const inner = viewall.querySelector('a');
    if (inner) {
      viewall.href = inner.getAttribute('href') || '#';
      viewall.textContent = inner.textContent;
    }
  }

  block.querySelectorAll('.offers-card').forEach((card) => {
    const moreLink = card.querySelector('.offers-more a') || card.querySelector('.offers-more');
    if (moreLink && moreLink.tagName === 'A') {
      card.href = moreLink.getAttribute('href') || '#';
    }
  });
}
