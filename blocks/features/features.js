/**
 * Features block — sec-head + card grid.
 *
 * Content model (authored rows):
 *   Row 0: H2 heading
 *   Row 1: Body paragraph (sec-head description)
 *   Rows 2–N: One row per card — image | title | CTA link
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows[0]?.querySelector('h1, h2, h3');
  const bodyText = rows[1]?.textContent.trim();

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container';

  // Section heading
  const secHead = document.createElement('div');
  secHead.className = 'sec-head';
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    secHead.append(h2);
  }
  if (bodyText) {
    const p = document.createElement('p');
    p.className = 'sec-head__body';
    p.textContent = bodyText;
    secHead.append(p);
  }
  container.append(secHead);

  // Cards grid
  const grid = document.createElement('div');
  grid.className = 'acrobat-cards parallax-stagger-ltr three-up';

  const cardRows = rows.slice(2);
  cardRows.forEach((row) => {
    const cells = [...row.children];
    const img = cells[0]?.querySelector('img');
    const title = cells[1]?.textContent.trim();
    const ctaLink = cells[2]?.querySelector('a');

    const article = document.createElement('article');
    article.className = 'acrobat-card';

    // Asset
    const asset = document.createElement('div');
    asset.className = 'acrobat-card__asset';
    if (img) asset.append(img.cloneNode(true));
    article.append(asset);

    // Copy
    const copy = document.createElement('div');
    copy.className = 'acrobat-card__copy';

    const text = document.createElement('div');
    text.className = 'acrobat-card__text';
    const h3 = document.createElement('h3');
    h3.className = 'acrobat-card__title';
    h3.textContent = title || '';
    text.append(h3);
    copy.append(text);

    if (ctaLink) {
      const cta = document.createElement('a');
      cta.className = 'acrobat-cta';
      cta.href = ctaLink.href;
      cta.textContent = ctaLink.textContent.trim();
      cta.insertAdjacentHTML(
        'beforeend',
        '<svg viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.6">'
        + '<path d="M1 1l4 4-4 4"></path></svg>',
      );
      copy.append(cta);
    }

    article.append(copy);
    grid.append(article);
  });

  container.append(grid);
  block.append(container);
}
