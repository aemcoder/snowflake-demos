/**
 * Loads the Aman header from a static fragment and wires the scroll-state listener.
 * @param {Element} block
 */
export default async function decorate(block) {
  const resp = await fetch('/fragments/aman/header.html');
  if (!resp.ok) return;
  block.innerHTML = await resp.text();

  const hdr = block.querySelector('#siteHeader');
  if (!hdr) return;

  const threshold = window.innerHeight * 0.85;
  function onScroll() {
    hdr.dataset.scrolled = window.scrollY > threshold ? 'true' : 'false';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
