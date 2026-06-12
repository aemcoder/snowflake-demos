import { getMetadata } from '../../scripts/aem.js';

/**
 * Static-fragment header loader (replaces the boilerplate nav decorator).
 *
 * Hybrid conversions keep the header as committed static markup (code-managed
 * chrome, not DA-authored). The fragment is chosen by the page's `template`
 * metadata — the same value that drives body.<template> — and lives in the code
 * bus at /fragments/<template>/header.html (flat /fragments/header.html if no
 * template is set).
 *
 * If the source header is interactive (mobile menu toggle, sticky behavior),
 * wire that here after setting innerHTML.
 */
export default async function decorate(block) {
  const template = getMetadata('template');
  const path = template
    ? `/fragments/${template}/header.html`
    : '/fragments/header.html';
  const resp = await fetch(`${window.hlx.codeBasePath}${path}`);
  if (!resp.ok) {
    // eslint-disable-next-line no-console
    console.warn(`[header] fragment not found at ${path}`);
    return;
  }
  block.innerHTML = await resp.text();

  // Wire mobile menu toggle
  const mnav = block.querySelector('#mnav');
  if (mnav) {
    const openBtn = block.querySelector('#menuOpen');
    const closeBtn = block.querySelector('#menuClose');
    if (openBtn) openBtn.onclick = () => mnav.classList.add('open');
    if (closeBtn) closeBtn.onclick = () => mnav.classList.remove('open');
    mnav.onclick = (e) => { if (e.target === mnav) mnav.classList.remove('open'); };
    mnav.querySelectorAll('a.ml').forEach((a) => {
      a.addEventListener('click', () => mnav.classList.remove('open'));
    });
  }

  // Header shadow on scroll
  const hdr = block.querySelector('.site, header.site, [id="siteHeader"]');
  if (hdr) {
    window.addEventListener('scroll', () => {
      hdr.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }
}
