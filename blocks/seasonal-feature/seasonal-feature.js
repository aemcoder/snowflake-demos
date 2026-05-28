/**
 * Aman seasonal-feature block — centered single-column editorial section.
 *
 * Content model (4 rows):
 *   0: eyebrow text
 *   1: heading (h2)
 *   2: body paragraph
 *   3: CTA link (em = secondary)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const eyebrowText = rows[0]?.textContent.trim() ?? '';
  const headingEl = rows[1]?.querySelector('h1, h2, h3');
  const headingText = headingEl?.innerHTML ?? rows[1]?.textContent.trim() ?? '';
  const bodyText = rows[2]?.textContent.trim() ?? '';

  const ctaLink = rows[3]?.querySelector('a')
    ?? rows[3]?.querySelector('a.button');
  const ctaHref = ctaLink?.href ?? '#';
  const ctaText = ctaLink?.textContent.trim() ?? '';

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container seasonal';

  if (eyebrowText) {
    const eb = document.createElement('p');
    eb.className = 'eyebrow';
    eb.textContent = eyebrowText;
    container.append(eb);
  }

  if (headingText) {
    const h2 = document.createElement('h2');
    h2.className = 'lyon lyon-h-xl';
    h2.innerHTML = headingText;
    container.append(h2);
  }

  if (bodyText) {
    const p = document.createElement('p');
    p.textContent = bodyText;
    container.append(p);
  }

  if (ctaText) {
    const a = document.createElement('a');
    a.className = 'btn-secondary';
    a.href = ctaHref;
    a.textContent = ctaText;
    container.append(a);
  }

  block.append(container);
}
