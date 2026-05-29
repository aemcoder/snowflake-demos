const ARROW_SVG = '<svg viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 1l4 4-4 4"></path></svg>';

function buildCard(row) {
  const [imgCell, textCell, ctaCell] = [...row.children];

  const article = document.createElement('article');
  article.className = 'acrobat-card';

  // Asset
  const asset = document.createElement('div');
  asset.className = 'acrobat-card__asset';
  const img = imgCell?.querySelector('img, picture');
  if (img) asset.append(img);
  article.append(asset);

  // Copy wrapper
  const copy = document.createElement('div');
  copy.className = 'acrobat-card__copy';

  // Text (h3 + p)
  const text = document.createElement('div');
  text.className = 'acrobat-card__text';
  const h3 = textCell?.querySelector('h3');
  const p = textCell?.querySelector('p');
  if (h3) {
    h3.className = 'acrobat-card__title';
    text.append(h3);
  }
  if (p) {
    p.className = 'acrobat-card__body';
    text.append(p);
  }
  copy.append(text);

  // CTA link with arrow
  const link = ctaCell?.querySelector('a');
  if (link) {
    link.className = 'acrobat-cta';
    link.insertAdjacentHTML('beforeend', ARROW_SVG);
    copy.append(link);
  }

  article.append(copy);
  return article;
}

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: section heading
  const headingRow = rows.shift();
  const heading = headingRow?.querySelector('h2');

  const secHead = document.createElement('div');
  secHead.className = 'sec-head';
  if (heading) secHead.append(heading);

  // Remaining rows: cards
  const grid = document.createElement('div');
  grid.className = 'acrobat-cards three-up';
  rows.forEach((row) => grid.append(buildCard(row)));

  block.textContent = '';
  block.append(secHead, grid);
}
