/* eslint-disable max-len */
const LOCK_SVG = '<svg class="merch-card__secure-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3.5 6V4a3.5 3.5 0 0 1 7 0v2M2.5 6h9v6.5h-9z" stroke="currentColor" stroke-width="1.2"></path></svg>';
const SECTION_ICON_SVG = '<svg class="merch-card__section-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2h7l3 3v13H5V2z" stroke="currentColor" stroke-width="1.2"></path></svg>';
/* eslint-enable max-len */

function extractPrice(cell) {
  const text = cell?.textContent?.trim() || '';
  return text;
}

function extractCta(cell) {
  const link = cell?.querySelector('a');
  if (!link) return null;
  const strong = cell?.querySelector('strong');
  const isPrimary = !!strong;
  return { href: link.href, label: link.textContent, isPrimary };
}

function buildFeatureSection() {
  const section = document.createElement('div');
  section.className = 'merch-card__section';

  const title = document.createElement('div');
  title.className = 'merch-card__section-title';
  title.innerHTML = `${SECTION_ICON_SVG}<span>Basic PDF tools</span>`;
  section.append(title);

  const items = document.createElement('div');
  items.className = 'merch-card__items';
  const item = document.createElement('div');
  item.className = 'merch-card__item';
  item.textContent = 'View, print, and share PDFs';
  items.append(item);
  section.append(items);

  return section;
}

function buildCard(row) {
  const [nameCell, priceCell, ctaCell] = [...row.children];

  const article = document.createElement('article');
  article.className = 'merch-card merch-card--light';

  // Inner wrapper (white card body)
  const inner = document.createElement('div');
  inner.className = 'merch-card__inner';

  // Top section
  const top = document.createElement('div');
  top.className = 'merch-card__top';

  // Mnemonic placeholder
  const mnemonic = document.createElement('div');
  mnemonic.className = 'merch-card__mnemonic';
  top.append(mnemonic);

  // Name + description
  const nameDesc = document.createElement('div');
  nameDesc.className = 'merch-card__name-desc';
  const h3 = nameCell?.querySelector('h3');
  const desc = nameCell?.querySelector('p');
  if (h3) {
    h3.className = 'merch-card__name';
    nameDesc.append(h3);
  }
  if (desc) {
    desc.className = 'merch-card__desc';
    nameDesc.append(desc);
  }
  top.append(nameDesc);

  // Pricing area + CTA
  const pricing = document.createElement('div');
  pricing.className = 'merch-card__pricing';

  const priceArea = document.createElement('div');
  priceArea.className = 'merch-card__price-area';
  const priceP = document.createElement('p');
  priceP.className = 'merch-card__price';
  priceP.textContent = extractPrice(priceCell);
  priceArea.append(priceP);
  pricing.append(priceArea);

  const cta = extractCta(ctaCell);
  if (cta) {
    const ctasDiv = document.createElement('div');
    ctasDiv.className = 'merch-card__ctas';
    const btn = document.createElement('a');
    btn.className = 'btn btn--primary';
    btn.href = cta.href;
    btn.textContent = cta.label;
    ctasDiv.append(btn);
    pricing.append(ctasDiv);
  }
  top.append(pricing);
  inner.append(top);

  // Secure row
  const secure = document.createElement('div');
  secure.className = 'merch-card__secure';
  secure.innerHTML = LOCK_SVG;
  inner.append(secure);

  article.append(inner);

  // Bottom section — features list
  const bottom = document.createElement('div');
  bottom.className = 'merch-card__bottom';
  const features = document.createElement('div');
  features.className = 'merch-card__features';
  const featuresInner = document.createElement('div');
  featuresInner.className = 'merch-card__features-inner';
  featuresInner.append(buildFeatureSection());
  features.append(featuresInner);
  bottom.append(features);
  article.append(bottom);

  return article;
}

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: section heading
  const headingRow = rows.shift();
  const heading = headingRow?.querySelector('h2');

  // Row 1: section description
  const descRow = rows.shift();
  const desc = descRow?.querySelector('p');

  const secHead = document.createElement('div');
  secHead.className = 'sec-head';
  if (heading) secHead.append(heading);
  if (desc) secHead.append(desc);

  // Remaining rows: cards
  const grid = document.createElement('div');
  grid.className = 'merch-cards three-up';
  rows.forEach((row) => grid.append(buildCard(row)));

  block.textContent = '';
  block.append(secHead, grid);
}
