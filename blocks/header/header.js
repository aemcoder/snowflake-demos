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
 * The source's megamenu behavior shipped as an inline <script> in the header
 * markup; innerHTML never executes scripts, so it is ported below verbatim.
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

  // megamenu toggle — ported from the source header's inline script
  const h = block.querySelector('header.nav') ?? block;
  const btns = h.querySelectorAll('.mm-btn');
  const pans = h.querySelectorAll('.megamenu');
  const wide = () => window.matchMedia('(min-width:901px)').matches;

  function closeAll() {
    pans.forEach((p) => p.classList.remove('open'));
    btns.forEach((b) => b.setAttribute('aria-expanded', 'false'));
  }

  btns.forEach((b) => {
    const p = h.querySelector(`#mm-${b.dataset.mm}`);
    if (!p) return;
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = p.classList.contains('open');
      closeAll();
      if (wide() || !isOpen) {
        p.classList.add('open');
        b.setAttribute('aria-expanded', 'true');
      }
    });
    b.parentElement.addEventListener('mouseenter', () => {
      if (wide()) {
        closeAll();
        p.classList.add('open');
        b.setAttribute('aria-expanded', 'true');
      }
    });
  });
  h.addEventListener('mouseleave', () => {
    if (wide()) closeAll();
  });
  document.addEventListener('click', (e) => {
    if (!h.contains(e.target)) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });
}
