/**
 * Aman twin-features block — two-card editorial split.
 *
 * Content model (2 item rows, 5 cells each):
 *   image | eyebrow | h3 heading | body text | CTA link
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container twin';

  rows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const eyebrowCell = cells[1];
    const headingCell = cells[2];
    const bodyCell = cells[3];
    const ctaCell = cells[4];

    const img = imgCell?.querySelector('img');
    const imgHref = imgCell?.querySelector('a')?.href ?? '#';
    const eyebrowText = eyebrowCell?.textContent.trim() ?? '';
    const headingEl = headingCell?.querySelector('h1, h2, h3, h4');
    const headingHTML = headingEl?.innerHTML ?? headingCell?.textContent.trim() ?? '';
    const bodyText = bodyCell?.textContent.trim() ?? '';
    const ctaLink = ctaCell?.querySelector('a');
    const ctaHref = ctaLink?.href ?? '#';
    const ctaText = ctaLink?.textContent.trim() ?? '';

    const article = document.createElement('article');
    article.className = 'twin-card';

    const mediaLink = document.createElement('a');
    mediaLink.className = 'twin-media';
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
      eb.innerHTML = eyebrowText;
      article.append(eb);
    }

    if (headingHTML) {
      const h3 = document.createElement('h3');
      h3.className = 'lyon lyon-h-lg';
      h3.innerHTML = headingHTML;
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

    container.append(article);
  });

  block.append(container);
}
