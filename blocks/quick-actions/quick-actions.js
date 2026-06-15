/* eslint-disable max-len */
import { renderTemplate } from '../../scripts/template-block.js';

const TEMPLATE = `

  <div class="grid">
    <a data-group="" href="#">
      <span class="ico"><svg viewBox="0 0 24 24"><path d="M3 21h18M5 21v-7l5-2 2-5 3 1-1 4 4 2v7" /><circle cx="8" cy="21" r="0.3" /></svg></span>
      <span class="txt"><b data-slot="">New Quote</b><span data-slot="">Spec &amp; price a machine</span></span>
    </a>
    <a data-group="" href="#used">
      <span class="ico"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg></span>
      <span class="txt"><b data-slot="">Shop Used</b><span data-slot="">3,100+ machines</span></span>
    </a>
    <a data-group="" href="#">
      <span class="ico"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></svg></span>
      <span class="txt"><b data-slot="">Rent Now</b><span data-slot="">By day, week, month</span></span>
    </a>
    <a data-group="" href="#">
      <span class="ico"><svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 6.6 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 4 13.4H3.9a2 2 0 1 1 0-4H4a1.6 1.6 0 0 0 1.5-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 11 4V3.9a2 2 0 1 1 4 0V4a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8z" /></svg></span>
      <span class="txt"><b data-slot="">Order Parts</b><span data-slot="">62,051 in stock</span></span>
    </a>
    <a data-group="" href="#service">
      <span class="ico"><svg viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.3L3 18v3h3l6.4-6.3a4 4 0 0 0 5.3-5.4l-2.5 2.5-2.1-2.1z" /></svg></span>
      <span class="txt"><b data-slot="">Request Service</b><span data-slot="">24-hour support</span></span>
    </a>
  </div>

`;

export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
