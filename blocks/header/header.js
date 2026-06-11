import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const template = getMetadata('template');
  const path = template ? `/fragments/${template}/header.html` : '/fragments/header.html';
  const resp = await fetch(`${window.hlx.codeBasePath}${path}`);
  if (!resp.ok) {
    // eslint-disable-next-line no-console
    console.warn(`[header] fragment not found at ${path}`);
    return;
  }
  block.innerHTML = await resp.text();

  // scroll shadow
  const siteHeader = block.querySelector('.site');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  // mobile menu
  const mnav = block.querySelector('#mnav');
  const openBtn = block.querySelector('#menuOpen');
  const closeBtn = block.querySelector('#menuClose');
  if (mnav && openBtn) {
    openBtn.addEventListener('click', () => mnav.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => mnav.classList.remove('open'));
    mnav.addEventListener('click', (e) => { if (e.target === mnav) mnav.classList.remove('open'); });
    mnav.querySelectorAll('a.ml').forEach((a) => {
      a.addEventListener('click', () => mnav.classList.remove('open'));
    });
  }
}
