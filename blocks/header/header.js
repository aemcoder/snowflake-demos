import { getMetadata } from '../../scripts/aem.js';

/**
 * Static-fragment header loader with scroll-opacity behavior.
 * Ports the React Nav component's useEffect scroll listener to vanilla JS.
 */
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

  // scroll-based transparency (ports React Nav's useEffect)
  const nav = block.querySelector('.wc-nav');
  if (!nav) return;
  const onScroll = () => {
    const scrolled = window.scrollY > 24;
    nav.style.background = scrolled ? 'rgba(10,10,10,0.82)' : 'transparent';
    nav.style.backdropFilter = scrolled ? 'blur(14px) saturate(1.1)' : 'none';
    nav.style.borderBottomColor = scrolled ? 'var(--line)' : 'transparent';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
