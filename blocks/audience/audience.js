/**
 * Audience block — section heading + elastic cards (Teams/Enterprise/Students).
 * Content model (DA rows):
 *   Row 0: <h2> heading
 *   Row 1: <p> description
 *   Rows 2-N: One row per card with 2 cells:
 *     cell 0 = background image <img>
 *     cell 1 = <h3> title + <p> description + optional link
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const expressIcon = 'https://www.adobe.com/content/dam/cc/icons/adobe-express.svg';

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
    if (p) {
      p.className = 'sec-head__body';
      secHead.appendChild(p);
    }
  }

  block.appendChild(secHead);

  // Cards container
  const cards = document.createElement('div');
  cards.className = 'elastic-cards parallax-stagger-ltr three-up';

  rows.forEach((row) => {
    const cells = [...row.children];
    const imgCell = cells[0];
    const textCell = cells[1];

    const card = document.createElement('a');
    card.className = 'elastic-card';
    card.href = '#';

    // Extract link href from text cell if present
    const link = textCell?.querySelector('a');
    if (link) card.href = link.href;

    // Header with icon
    const header = document.createElement('div');
    header.className = 'elastic-card__header';
    const iconImg = document.createElement('img');
    iconImg.src = expressIcon;
    iconImg.alt = '';
    header.appendChild(iconImg);
    card.appendChild(header);

    // Media background
    const media = document.createElement('div');
    media.className = 'elastic-card__media';
    const bgImg = imgCell?.querySelector('img');
    if (bgImg) {
      media.style.backgroundImage = `url(${bgImg.src})`;
    }
    card.appendChild(media);

    // Footer text
    const footer = document.createElement('div');
    footer.className = 'elastic-card__footer';

    if (textCell) {
      const h3 = textCell.querySelector('h3');
      if (h3) footer.appendChild(h3);
      const p = textCell.querySelector('p');
      if (p) footer.appendChild(p);
    }
    card.appendChild(footer);

    cards.appendChild(card);
  });

  block.appendChild(cards);
}
