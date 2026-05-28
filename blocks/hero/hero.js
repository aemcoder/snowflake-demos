/**
 * Aman hero block — full-bleed atmospheric section with background image.
 *
 * Content model (2 rows):
 *   0: background image (img with absolute URL)
 *   1: scroll anchor label text (optional)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const bgImg = rows[0]?.querySelector('img');
  const bgSrc = bgImg?.src ?? '';
  const scrollLabel = rows[1]?.textContent.trim() ?? 'Scroll';

  block.textContent = '';

  if (bgSrc) {
    block.style.setProperty('--hero-bg', `url('${bgSrc}')`);
  }

  const anchor = document.createElement('span');
  anchor.className = 'hero-anchor';
  anchor.setAttribute('aria-hidden', 'true');
  anchor.textContent = scrollLabel;

  block.append(anchor);
}
