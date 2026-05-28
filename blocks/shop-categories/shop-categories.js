/**
 * Shop Categories block — heading row + 5-card grid.
 * Row 0: eyebrow | heading. Rows 1..N: card image | title-link | catalog-line.
 * @param {Element} block The shop-categories block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [headerRow, ...cardRows] = rows;

  const container = document.createElement('div');
  container.className = 'container';

  // header row
  const headerCells = [...(headerRow?.children || [])];
  const headerWrap = document.createElement('div');
  headerWrap.className = 'header-row';
  const eyebrowText = headerCells[0]?.textContent.trim() || '';
  if (eyebrowText) {
    const eb = document.createElement('span');
    eb.className = 'eyebrow';
    eb.textContent = eyebrowText;
    headerWrap.append(eb);
  }
  const headingText = headerCells[1]?.textContent.trim() || '';
  if (headingText) {
    const h2 = document.createElement('h2');
    h2.textContent = headingText;
    headerWrap.append(h2);
  }
  container.append(headerWrap);

  // card grid
  const grid = document.createElement('div');
  grid.className = 'grid';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // picture, img — keep the Media Bus <picture> (optimized sources) on production
    const media = cells[0]?.querySelector('picture, img');
    const titleLink = cells[1]?.querySelector('a');
    const title = (titleLink || cells[1])?.textContent.trim() || '';
    const href = titleLink?.getAttribute('href') || '#';
    const catalog = cells[2]?.textContent.trim() || '';

    const card = document.createElement('a');
    card.className = 'category-card';
    card.href = href;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'img-wrap';
    if (media) imgWrap.append(media.tagName === 'IMG' ? (media.closest('picture') || media) : media);
    card.append(imgWrap);

    const cardTitle = document.createElement('span');
    cardTitle.className = 'card-title';
    cardTitle.textContent = title;
    card.append(cardTitle);

    const catalogLine = document.createElement('span');
    catalogLine.className = 'catalog-line';
    catalogLine.textContent = catalog;
    card.append(catalogLine);

    grid.append(card);
  });

  container.append(grid);

  block.textContent = '';
  block.append(container);
}
