/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * News-cards block — section heading as default content.
 * 4 data-groups; slots per group: image / category / read-time / title / excerpt.
 * The first card gets `data-feature` to span 2 columns with horizontal layout.
 * `<image-slot>` replaced by `<img data-slot>` — EDS serves responsive images.
 */
const TEMPLATE = `
<div class="news-grid reveal">
  <a href="#" class="news-card news-card--feature" data-group>
    <div class="news-img"><img data-slot alt=""></div>
    <div class="news-body news-body--feature">
      <div class="news-meta"><span class="news-cat" data-slot>Category</span><span class="news-dot"></span><span class="news-read" data-slot>5 min</span></div>
      <h3 class="news-title" data-slot>Title</h3>
      <p class="news-excerpt" data-slot>Excerpt</p>
      <span class="news-cta">Read story →</span>
    </div>
  </a>
  <a href="#" class="news-card" data-group>
    <div class="news-img news-img--sm"><img data-slot alt=""></div>
    <div class="news-body">
      <div class="news-meta"><span class="news-cat" data-slot>Category</span><span class="news-dot"></span><span class="news-read" data-slot>5 min</span></div>
      <h3 class="news-title news-title--sm" data-slot>Title</h3>
      <p class="news-excerpt news-excerpt--sm" data-slot>Excerpt</p>
      <span class="news-cta">Read story →</span>
    </div>
  </a>
  <a href="#" class="news-card" data-group>
    <div class="news-img news-img--sm"><img data-slot alt=""></div>
    <div class="news-body">
      <div class="news-meta"><span class="news-cat" data-slot>Category</span><span class="news-dot"></span><span class="news-read" data-slot>5 min</span></div>
      <h3 class="news-title news-title--sm" data-slot>Title</h3>
      <p class="news-excerpt news-excerpt--sm" data-slot>Excerpt</p>
      <span class="news-cta">Read story →</span>
    </div>
  </a>
  <a href="#" class="news-card" data-group>
    <div class="news-img news-img--sm"><img data-slot alt=""></div>
    <div class="news-body">
      <div class="news-meta"><span class="news-cat" data-slot>Category</span><span class="news-dot"></span><span class="news-read" data-slot>5 min</span></div>
      <h3 class="news-title news-title--sm" data-slot>Title</h3>
      <p class="news-excerpt news-excerpt--sm" data-slot>Excerpt</p>
      <span class="news-cta">Read story →</span>
    </div>
  </a>
</div>
`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
