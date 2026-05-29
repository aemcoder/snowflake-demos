export default function decorate(block) {
  const rows = [...block.children];
  const headerRow = rows[0];
  const headerCells = [...(headerRow?.children || [])];
  const heading = headerCells[0]?.querySelector('h1, h2, h3')?.textContent
    || headerCells[0]?.textContent?.trim() || '';
  const subtitle = headerCells[1]?.textContent?.trim() || '';

  const cardRows = rows.slice(1);

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container';

  const head = document.createElement('div');
  head.className = 'sec-head';
  const h2 = document.createElement('h2');
  h2.textContent = heading;
  head.append(h2);
  if (subtitle) {
    const p = document.createElement('p');
    p.className = 'sec-head__body';
    p.textContent = subtitle;
    head.append(p);
  }
  container.append(head);

  const grid = document.createElement('div');
  grid.className = 'acrobat-cards parallax-stagger-ltr three-up';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const img = cells[0]?.querySelector('img, picture');
    const title = cells[1]?.textContent?.trim() || '';
    const ctaEl = cells[2]?.querySelector('a');
    const ctaText = ctaEl?.textContent?.trim()
      || cells[2]?.textContent?.trim() || '';
    const ctaHref = ctaEl?.href || '';

    const article = document.createElement('article');
    article.className = 'acrobat-card';

    const asset = document.createElement('div');
    asset.className = 'acrobat-card__asset';
    if (img) asset.append(img.cloneNode(true));
    article.append(asset);

    const copy = document.createElement('div');
    copy.className = 'acrobat-card__copy';
    const text = document.createElement('div');
    text.className = 'acrobat-card__text';
    const h3 = document.createElement('h3');
    h3.className = 'acrobat-card__title';
    h3.textContent = title;
    text.append(h3);
    copy.append(text);

    if (ctaHref) {
      const cta = document.createElement('a');
      cta.className = 'acrobat-cta';
      cta.href = ctaHref;
      cta.innerHTML = `${ctaText}<svg viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 1l4 4-4 4"></path></svg>`;
      copy.append(cta);
    }

    article.append(copy);
    grid.append(article);
  });

  container.append(grid);
  block.append(container);
}
