function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/**
 * Build a single elastic card from a DA row.
 * Cells: [bg image, title, description]
 */
function buildCard(row) {
  const cells = [...row.children];
  const imgEl = cells[0]?.querySelector('img');
  const titleEl = cells[1]?.querySelector('h3')
    ?? cells[1]?.firstElementChild;
  const descText = cells[2]?.textContent?.trim() ?? '';

  const card = document.createElement('a');
  card.className = 'elastic-card';
  card.href = '#';

  // Header with structural icon
  const header = el('div', 'elastic-card__header');
  const icon = document.createElement('img');
  icon.src = 'https://www.adobe.com/content/dam/cc/icons/adobe-express.svg';
  icon.alt = '';
  header.append(icon);
  card.append(header);

  // Media (background-image)
  const media = el('div', 'elastic-card__media');
  if (imgEl) {
    media.style.backgroundImage = `url(${imgEl.src})`;
  }
  card.append(media);

  // Footer
  const footer = el('div', 'elastic-card__footer');
  const h3 = document.createElement('h3');
  h3.textContent = titleEl?.textContent?.trim() ?? '';
  footer.append(h3);
  if (descText) {
    const p = document.createElement('p');
    p.textContent = descText;
    footer.append(p);
  }
  card.append(footer);

  return card;
}

/**
 * Audience block — elastic card grid (Teams / Enterprise / Students).
 *
 * Content model (DA rows):
 *   Row 0: <h2> section heading (single cell)
 *   Row 1: <p> section description (single cell)
 *   Rows 2-4: One row per card — 3 cells each:
 *     cell 0: <img> (card background image)
 *     cell 1: <h3> card title
 *     cell 2: card description text
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const headingRow = rows[0];
  const descRow = rows[1];
  const cardRows = rows.slice(2);

  block.textContent = '';

  // Section heading
  const secHead = el('div', 'sec-head');
  const h2 = headingRow?.querySelector('h2');
  if (h2) secHead.append(h2);
  const desc = descRow?.querySelector('p')
    ?? descRow?.firstElementChild;
  if (desc) {
    const p = document.createElement('p');
    p.textContent = desc.textContent;
    secHead.append(p);
  }
  block.append(secHead);

  // Elastic cards grid
  const grid = el('div', 'elastic-cards three-up');
  cardRows.forEach((row) => {
    const card = buildCard(row);
    grid.append(card);
  });
  block.append(grid);
}
