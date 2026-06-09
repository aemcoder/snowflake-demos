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

  // Wire mobile hamburger toggle — reveals nav-links as a dropdown column.
  const toggle = block.querySelector('.nav-toggle');
  const navLinks = block.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      if (isOpen) {
        navLinks.style.display = '';
      } else {
        Object.assign(navLinks.style, {
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '72px',
          left: '0',
          right: '0',
          background: '#fff',
          padding: '16px 24px',
          borderBottom: '1px solid var(--border)',
          gap: '14px',
        });
      }
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }
}
