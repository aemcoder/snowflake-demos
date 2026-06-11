/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

/*
 * Host strip — scrolling marquee of host cities (fully baked, no authored content).
 * 16 cities doubled for seamless loop.
 */
const CITIES = ['New York', 'Los Angeles', 'Mexico City', 'Toronto', 'Dallas', 'Miami', 'Vancouver', 'Houston', 'Atlanta', 'Seattle', 'Boston', 'Guadalajara', 'Monterrey', 'Philadelphia', 'San Francisco', 'Kansas City'];

const items = [...CITIES, ...CITIES].map((c) => `<span class="strip-item">${c}<span class="strip-dot"></span></span>`).join('');

const TEMPLATE = `<div class="strip-inner">${items}</div>`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
