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
  const menuOpen = block.querySelector('#menuOpen');
  const mnav = block.querySelector('#mnav');
  if (menuOpen && mnav) {
    menuOpen.addEventListener('click', () => mnav.classList.add('open'));
    const closeBtn = mnav.querySelector('.x');
    if (closeBtn) closeBtn.addEventListener('click', () => mnav.classList.remove('open'));
    mnav.addEventListener('click', (e) => {
      if (e.target === mnav) mnav.classList.remove('open');
    });
  }
}
