/**
 * Converts a DA cell element into the styled .hero__supporting <p>.
 * DA authoring convention:
 *   <strong>text</strong>  → <span class="hero__sup-accent">text</span>
 *   <em>…</em>             → <em class="hero__sup-italic">…</em>
 *   (nested <strong> inside <em> also gets hero__sup-accent)
 */
function buildSupporting(cell) {
  const p = document.createElement('p');
  p.className = 'hero__supporting';

  if (!cell) return p;

  const clone = cell.cloneNode(true);

  function remap(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.cloneNode();
    if (node.nodeName === 'STRONG') {
      const span = document.createElement('span');
      span.className = 'hero__sup-accent';
      node.childNodes.forEach((child) => span.append(remap(child)));
      return span;
    }
    if (node.nodeName === 'EM') {
      const em = document.createElement('em');
      em.className = 'hero__sup-italic';
      node.childNodes.forEach((child) => em.append(remap(child)));
      return em;
    }
    const out = node.cloneNode(false);
    node.childNodes.forEach((child) => out.append(remap(child)));
    return out;
  }

  clone.childNodes.forEach((child) => p.append(remap(child)));
  return p;
}

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: background image
  const bgImg = rows[0]?.querySelector('img');
  const bgSrc = bgImg?.src || '';

  // Row 1: eyebrow text
  const eyebrow = rows[1]?.textContent.trim() || '';

  // Row 2: headline accent line (yellow)
  const headlineAccent = rows[2]?.textContent.trim() || '';

  // Row 3: headline main line (white)
  const headlineMain = rows[3]?.textContent.trim() || '';

  // Row 4: supporting paragraph (<strong> → yellow accent, <em> → italic)
  const supportingCell = rows[4]?.querySelector('p') || rows[4]?.children[0];
  const supportingP = buildSupporting(supportingCell);

  // Row 5: CTA link
  const ctaLink = rows[5]?.querySelector('a');
  const ctaHref = ctaLink?.href || '#';
  const ctaText = ctaLink?.textContent.trim() || '';

  block.textContent = '';

  if (bgSrc) {
    block.style.setProperty('--hero-bg', `url('${bgSrc}')`);
  }

  const inner = document.createElement('div');
  inner.className = 'container hero__inner';
  inner.innerHTML = `
    <span class="label hero__eyebrow">${eyebrow}</span>
    <h1 class="display hero__headline">
      <span class="hero__headline-line hero__headline-line--accent">${headlineAccent}</span>
      <span class="hero__headline-line">${headlineMain}</span>
    </h1>
    <div class="hero__actions">
      <a class="btn btn-pill-light" href="${ctaHref}">${ctaText}</a>
    </div>
  `;

  inner.insertBefore(supportingP, inner.querySelector('.hero__actions'));
  block.append(inner);
}
