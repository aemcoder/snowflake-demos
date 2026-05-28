/**
 * Hero block — full-bleed photographic hero on Bay with gradient scrim.
 * Rows: 0 background image | 1 eyebrow | 2 h1 | 3 subhead | 4 primary CTA | 5 secondary CTA.
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // row 0 — background image → CSS custom property (keeps media-query gradients)
  const bgImg = rows[0]?.querySelector('img');
  if (bgImg) block.style.setProperty('--hero-bg', `url('${bgImg.src}')`);

  const eyebrow = rows[1]?.textContent.trim() || '';
  const h1 = rows[2]?.querySelector('h1');
  const subhead = rows[3]?.textContent.trim() || '';

  // CTAs — decorateButtons() already turned authored strong/em anchors into
  // a.button.primary / a.button.secondary; re-class to the source btn variants.
  const primary = rows[4]?.querySelector('a');
  if (primary) primary.className = 'btn btn-primary-on-bay';
  const secondary = rows[5]?.querySelector('a');
  if (secondary) secondary.className = 'btn btn-secondary';

  const content = document.createElement('div');
  content.className = 'content';

  if (eyebrow) {
    const eb = document.createElement('span');
    eb.className = 'eyebrow';
    eb.textContent = eyebrow;
    content.append(eb);
  }
  if (h1) content.append(h1);
  if (subhead) {
    const sh = document.createElement('p');
    sh.className = 'subhead';
    sh.textContent = subhead;
    content.append(sh);
  }
  if (primary || secondary) {
    const ctas = document.createElement('div');
    ctas.className = 'ctas';
    if (primary) ctas.append(primary);
    if (secondary) ctas.append(secondary);
    content.append(ctas);
  }

  const container = document.createElement('div');
  container.className = 'container';
  container.append(content);

  block.textContent = '';
  block.append(container);
}
