import { renderTemplate } from '../../scripts/template-block.js';

/**
 * Quick Actions block — 5 fixed icon+text action links.
 *
 * No default content, no leading/trailing fields.
 * 5 data-group items; each group has 2 data-slot children:
 *   slot 0 — title (<b>)
 *   slot 1 — subtitle (<span>)
 * SVG icons are baked template chrome (unique per item).
 * Href links are baked as "#" — authors don't change them.
 *
 * DA collection rows (5 rows, 2 cells each):
 *   row N, cell 0 → title
 *   row N, cell 1 → subtitle
 */

const SVG_ATTRS = 'viewBox="0 0 24 24" width="26" height="26" fill="none" '
  + 'stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" '
  + 'aria-hidden="true"';

const TEMPLATE = `
<div class="qa-grid">

  <a href="#" class="qa-item" data-group>
    <span class="qa-ico">
      <svg ${SVG_ATTRS}>
        <path d="M3 21h18M5 21v-7l5-2 2-5 3 1-1 4 4 2v7"/>
        <circle cx="8" cy="21" r="0.3"/>
      </svg>
    </span>
    <span class="qa-txt">
      <b data-slot></b>
      <span data-slot></span>
    </span>
  </a>

  <a href="#" class="qa-item" data-group>
    <span class="qa-ico">
      <svg ${SVG_ATTRS}>
        <circle cx="11" cy="11" r="7"/>
        <path d="m20 20-3.2-3.2"/>
      </svg>
    </span>
    <span class="qa-txt">
      <b data-slot></b>
      <span data-slot></span>
    </span>
  </a>

  <a href="#" class="qa-item" data-group>
    <span class="qa-ico">
      <svg ${SVG_ATTRS}>
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>
      </svg>
    </span>
    <span class="qa-txt">
      <b data-slot></b>
      <span data-slot></span>
    </span>
  </a>

  <a href="#" class="qa-item" data-group>
    <span class="qa-ico">
      <svg ${SVG_ATTRS}>
        <path d="M12 2a4 4 0 0 1 4 4c0 1.4-.7 2.6-1.8 3.3L16 21H8l1.8-11.7A4 4 0 0 1 8 6a4 4 0 0 1 4-4z"/>
        <path d="M9 9h6"/>
      </svg>
    </span>
    <span class="qa-txt">
      <b data-slot></b>
      <span data-slot></span>
    </span>
  </a>

  <a href="#" class="qa-item" data-group>
    <span class="qa-ico">
      <svg ${SVG_ATTRS}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18v3h3l6.4-6.3a4 4 0 0 0 5.3-5.4l-2.5 2.5-2.1-2.1z"/>
      </svg>
    </span>
    <span class="qa-txt">
      <b data-slot></b>
      <span data-slot></span>
    </span>
  </a>

</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
