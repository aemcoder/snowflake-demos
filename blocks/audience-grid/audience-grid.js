/**
 * Aman audience-grid block — 4-card grid for seasonal experiences.
 *
 * Content model:
 *   Row 0: h2 heading | body paragraph (section-head)
 *   Rows 1–4: image | eyebrow | h3 | body text | CTA link
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const headerRow = rows[0];
  const cardRows = rows.slice(1);

  const headingEl = headerRow?.children[0]?.querySelector('h1, h2, h3, h4');
  const headingHTML = headingEl?.innerHTML ?? headerRow?.children[0]?.textContent.trim() ?? '';
  const subText = headerRow?.children[1]?.textContent.trim() ?? '';

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container';

  if (headingHTML || subText) {
    const head = document.createElement('div');
    head.className = 'section-head';

    if (headingHTML) {
      const h2 = document.createElement('h2');
      h2.className = 'lyon lyon-h-xl';
      h2.innerHTML = headingHTML;
      head.append(h2);
    }

    if (subText) {
      const p = document.createElement('p');
      p.textContent = subText;
      head.append(p);
    }

    container.append(head);
  }

  const grid = document.createElement('div');
  grid.className = 'audience-grid';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const eyebrowCell = cells[1];
    const headCell = cells[2];
    const bodyCell = cells[3];
    const ctaCell = cells[4];

    const img = imgCell?.querySelector('img');
    const imgHref = imgCell?.querySelector('a')?.href ?? '#';
    const eyebrowText = eyebrowCell?.textContent.trim() ?? '';
    const cardHeadEl = headCell?.querySelector('h1, h2, h3, h4');
    const cardHeadHTML = cardHeadEl?.innerHTML ?? headCell?.textContent.trim() ?? '';
    const bodyText = bodyCell?.textContent.trim() ?? '';
    const ctaLink = ctaCell?.querySelector('a');
    const ctaHref = ctaLink?.href ?? '#';
    const ctaText = ctaLink?.textContent.trim() ?? '';

    const article = document.createElement('article');
    article.className = 'audience-card';

    const mediaLink = document.createElement('a');
    mediaLink.className = 'audience-media';
    mediaLink.href = imgHref;
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      mediaLink.append(newImg);
    }
    article.append(mediaLink);

    if (eyebrowText) {
      const eb = document.createElement('p');
      eb.className = 'eyebrow';
      eb.textContent = eyebrowText;
      article.append(eb);
    }

    if (cardHeadHTML) {
      const h3 = document.createElement('h3');
      h3.className = 'lyon lyon-h-md';
      h3.innerHTML = cardHeadHTML;
      article.append(h3);
    }

    if (bodyText) {
      const p = document.createElement('p');
      p.textContent = bodyText;
      article.append(p);
    }

    if (ctaText) {
      const a = document.createElement('a');
      a.className = 'btn-secondary';
      a.href = ctaHref;
      a.textContent = ctaText;
      article.append(a);
    }

    grid.append(article);
  });

  container.append(grid);
  block.append(container);
}
