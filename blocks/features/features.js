/**
 * Features block — section heading + acrobat-card grid.
 * Content model (DA rows):
 *   Row 0: <h2> heading
 *   Rows 1-N: One row per card with 2 cells:
 *     cell 0 = <img> card asset
 *     cell 1 = <h3> title + <p> body + link (CTA with arrow)
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  // Section heading
  const secHead = document.createElement('div');
  secHead.className = 'sec-head';
  const headingRow = rows.shift();
  if (headingRow) {
    const h2 = headingRow.querySelector('h2');
    if (h2) secHead.appendChild(h2);
  }
  block.appendChild(secHead);

  // Cards grid
  const grid = document.createElement('div');
  grid.className = 'acrobat-cards parallax-stagger-ltr three-up';

  const arrowSvg = '<svg viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 1l4 4-4 4"></path></svg>';

  rows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const textCell = cells[1];

    const card = document.createElement('article');
    card.className = 'acrobat-card';

    // Asset
    const asset = document.createElement('div');
    asset.className = 'acrobat-card__asset';
    const img = imgCell?.querySelector('img');
    if (img) {
      img.loading = 'lazy';
      asset.appendChild(img);
    }
    card.appendChild(asset);

    // Copy
    const copy = document.createElement('div');
    copy.className = 'acrobat-card__copy';

    const text = document.createElement('div');
    text.className = 'acrobat-card__text';

    if (textCell) {
      const h3 = textCell.querySelector('h3');
      if (h3) {
        h3.className = 'acrobat-card__title';
        text.appendChild(h3);
      }
      const p = textCell.querySelector('p');
      if (p) {
        p.className = 'acrobat-card__body';
        text.appendChild(p);
      }
    }
    copy.appendChild(text);

    // CTA link
    if (textCell) {
      const link = textCell.querySelector('a');
      if (link) {
        link.className = 'acrobat-cta';
        link.innerHTML = `${link.textContent}${arrowSvg}`;
        copy.appendChild(link);
      }
    }

    card.appendChild(copy);
    grid.appendChild(card);
  });

  block.appendChild(grid);
}
