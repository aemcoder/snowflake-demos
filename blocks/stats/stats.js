/* eslint-disable max-len */
import { renderTemplate, initCountup } from '../../scripts/template-block.js';

/*
 * Stats block — dark section with yellow/black hazard stripe at top.
 * 2 leading fields: h2 heading (with yellow-highlighted word), intro paragraph.
 * 7 data-groups; slots per group: number, label.
 * Numbers use Barlow Condensed at large size with count-up animation.
 * DA rows: 2 leading (heading | paragraph) + 7 groups (number | label).
 */
const TEMPLATE = `
<div class="stats-stripe"></div>
<div class="stats-wrap">
  <div class="stats-grid">
    <div class="stats-item stats-intro">
      <h2 class="cond" data-field>Built On <span style="color:var(--yellow)">Iron</span> &amp; Trust</h2>
      <p data-field>Three generations of keeping the West's heavy equipment in the dirt and on the job.</p>
    </div>
    <div class="stats-item" data-group>
      <div class="stats-num" data-slot>75</div>
      <div class="stats-lab" data-slot>Years in Business</div>
    </div>
    <div class="stats-item" data-group>
      <div class="stats-num" data-slot>18</div>
      <div class="stats-lab" data-slot>Branch Locations</div>
    </div>
    <div class="stats-item" data-group>
      <div class="stats-num" data-slot>150K</div>
      <div class="stats-lab" data-slot>Sq Ft of Shop Space</div>
    </div>
    <div class="stats-item" data-group>
      <div class="stats-num" data-slot>400</div>
      <div class="stats-lab" data-slot>Service Technicians</div>
    </div>
    <div class="stats-item" data-group>
      <div class="stats-num" data-slot>62K</div>
      <div class="stats-lab" data-slot>Part Numbers in Stock</div>
    </div>
    <div class="stats-item" data-group>
      <div class="stats-num" data-slot>90</div>
      <div class="stats-lab" data-slot>Field Service Trucks</div>
    </div>
    <div class="stats-item" data-group>
      <div class="stats-num" data-slot>24/7</div>
      <div class="stats-lab" data-slot>Machine Monitoring</div>
    </div>
  </div>
</div>
`;

/**
 * Parse a stat value like "150K" or "24/7" into countup-friendly parts.
 * Returns { target, prefix, suffix } or null if not purely numeric.
 */
function parseStatValue(text) {
  const t = text.trim();
  const m = t.match(/^([^\d]*)(\d[\d,]*)(\D*)$/);
  if (!m) return null;
  return { prefix: m[1], target: parseInt(m[2].replace(/,/g, ''), 10), suffix: m[3] };
}

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);

  block.querySelectorAll('.stats-num').forEach((el) => {
    const parsed = parseStatValue(el.textContent);
    if (parsed) {
      el.dataset.countup = parsed.target;
      if (parsed.prefix) el.dataset.prefix = parsed.prefix;
      if (parsed.suffix) el.dataset.suffix = parsed.suffix;
    }
  });

  initCountup(block);
}
