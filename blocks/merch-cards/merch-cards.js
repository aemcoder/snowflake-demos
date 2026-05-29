/**
 * Merch Cards block — pricing comparison cards.
 * Content model (DA rows):
 *   Row 0: <h2> heading
 *   Row 1: <p> description
 *   Rows 2-N: One row per pricing card with 3 cells:
 *     cell 0 = <h3> plan name
 *     cell 1 = <p> plan description
 *     cell 2 = <p> price + CTA link
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const lockSvg = '<svg class="merch-card__secure-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3.5 6V4a3.5 3.5 0 0 1 7 0v2M2.5 6h9v6.5h-9z" stroke="currentColor" stroke-width="1.2"></path></svg>';
  const pdfSvg = '<svg class="merch-card__section-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2h7l3 3v13H5V2z" stroke="currentColor" stroke-width="1.2"></path></svg>';

  // Section heading
  const secHead = document.createElement('div');
  secHead.className = 'sec-head';
  const headingRow = rows.shift();
  if (headingRow) {
    const h2 = headingRow.querySelector('h2');
    if (h2) secHead.appendChild(h2);
  }
  const descRow = rows.shift();
  if (descRow) {
    const p = descRow.querySelector('p');
    if (p) secHead.appendChild(p);
  }
  block.appendChild(secHead);

  // Cards grid
  const grid = document.createElement('div');
  grid.className = 'merch-cards three-up';

  rows.forEach((row) => {
    const cells = [...row.children];
    const nameCell = cells[0];
    const descCell = cells[1];
    const priceCell = cells[2];

    const card = document.createElement('article');
    card.className = 'merch-card merch-card--light';

    const inner = document.createElement('div');
    inner.className = 'merch-card__inner';

    // Top section
    const top = document.createElement('div');
    top.className = 'merch-card__top';

    // Mnemonic placeholder
    const mnemonic = document.createElement('div');
    mnemonic.className = 'merch-card__mnemonic';
    top.appendChild(mnemonic);

    // Name + desc
    const nameDesc = document.createElement('div');
    nameDesc.className = 'merch-card__name-desc';
    if (nameCell) {
      const h3 = nameCell.querySelector('h3');
      if (h3) {
        h3.className = 'merch-card__name';
        nameDesc.appendChild(h3);
      }
    }
    if (descCell) {
      const p = descCell.querySelector('p') || document.createElement('p');
      if (!descCell.querySelector('p')) p.textContent = descCell.textContent.trim();
      p.className = 'merch-card__desc';
      nameDesc.appendChild(p);
    }
    top.appendChild(nameDesc);

    // Pricing
    const pricing = document.createElement('div');
    pricing.className = 'merch-card__pricing';

    if (priceCell) {
      const priceArea = document.createElement('div');
      priceArea.className = 'merch-card__price-area';
      const priceText = priceCell.querySelector('p');
      if (priceText) {
        const priceP = document.createElement('p');
        priceP.className = 'merch-card__price';
        priceP.textContent = priceText.textContent;
        priceArea.appendChild(priceP);
      }
      pricing.appendChild(priceArea);

      // CTA
      const link = priceCell.querySelector('a');
      if (link) {
        const ctas = document.createElement('div');
        ctas.className = 'merch-card__ctas';
        const isStrong = link.closest('strong') || link.classList.contains('primary');
        link.classList.remove('button', 'primary', 'secondary');
        link.className = isStrong ? 'btn btn--primary' : 'btn btn--primary';
        ctas.appendChild(link);
        pricing.appendChild(ctas);
      }
    }
    top.appendChild(pricing);
    inner.appendChild(top);

    // Secure badge
    const secure = document.createElement('div');
    secure.className = 'merch-card__secure';
    secure.innerHTML = lockSvg;
    inner.appendChild(secure);

    card.appendChild(inner);

    // Bottom features section
    const bottom = document.createElement('div');
    bottom.className = 'merch-card__bottom';
    const features = document.createElement('div');
    features.className = 'merch-card__features';
    const featInner = document.createElement('div');
    featInner.className = 'merch-card__features-inner';
    const section = document.createElement('div');
    section.className = 'merch-card__section';
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'merch-card__section-title';
    sectionTitle.innerHTML = `${pdfSvg}<span>Basic PDF tools</span>`;
    section.appendChild(sectionTitle);
    const items = document.createElement('div');
    items.className = 'merch-card__items';
    const item = document.createElement('div');
    item.className = 'merch-card__item';
    item.textContent = 'View, print, and share PDFs';
    items.appendChild(item);
    section.appendChild(items);
    featInner.appendChild(section);
    features.appendChild(featInner);
    bottom.appendChild(features);
    card.appendChild(bottom);

    grid.appendChild(card);
  });

  block.appendChild(grid);
}
