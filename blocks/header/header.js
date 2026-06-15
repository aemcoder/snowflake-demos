/**
 * Loads the template-specific header fragment from the code bus.
 * Each overlay-controlled page sets main.dataset.overlay = <template>
 * during loadEager; we read it here to pick the right fragment.
 * Fragments live at /fragments/<template>/header.html.
 */
export default async function decorate(block) {
  const template = document.querySelector('main')?.dataset?.overlay;
  if (!template) return;
  const path = `/fragments/${template}/header.html`;
  const resp = await fetch(`${window.hlx.codeBasePath}${path}`);
  if (!resp.ok) {
    // eslint-disable-next-line no-console
    console.warn(`[header] fragment not found at ${path}`);
    return;
  }
  block.innerHTML = await resp.text();

  // header shadow on scroll
  const siteHeader = block.querySelector('#siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });
  }

  // mobile menu open/close
  const mnav = block.querySelector('#mnav');
  const menuOpen = block.querySelector('#menuOpen');
  const menuClose = block.querySelector('#menuClose');

  if (mnav && menuOpen) {
    menuOpen.addEventListener('click', () => mnav.classList.add('open'));
  }
  if (mnav && menuClose) {
    menuClose.addEventListener('click', () => mnav.classList.remove('open'));
  }
  if (mnav) {
    mnav.addEventListener('click', (e) => {
      if (e.target === mnav) mnav.classList.remove('open');
    });
    mnav.querySelectorAll('a.ml').forEach((a) => {
      a.addEventListener('click', () => mnav.classList.remove('open'));
    });
  }
}
