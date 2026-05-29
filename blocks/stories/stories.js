function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/**
 * Build a single story card with photo background, gradient,
 * icon (structural chrome), and title.
 */
function buildCard(imageCell, titleCell) {
  const card = el('button', 'story-card');
  card.type = 'button';

  // Background photo from authored <img>
  const photo = el('div', 'story-card__photo');
  const img = imageCell?.querySelector('img');
  if (img) {
    photo.style.backgroundImage = `url(${img.src})`;
  }
  card.append(photo);

  // Gradient overlay
  card.append(el('div', 'story-card__gradient'));

  // Icon — structural chrome (Adobe Express logo)
  const icon = el('div', 'story-card__icon');
  const iconImg = document.createElement('img');
  iconImg.src = 'https://www.adobe.com/content/dam/cc/icons/adobe-express.svg';
  iconImg.alt = '';
  icon.append(iconImg);
  card.append(icon);

  // Footer with title
  const footer = el('div', 'story-card__footer');
  const title = document.createElement('p');
  title.className = 'story-card__title';
  title.textContent = titleCell?.textContent?.trim() ?? '';
  footer.append(title);
  card.append(footer);

  return card;
}

/**
 * Stories block — horizontal card strip (compound sibling to hero).
 *
 * Content model (DA rows — multi-column):
 *   Row 0: 4 cells, each containing <img> (background photo)
 *   Row 1: 4 cells, each containing card title text
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const titleRow = rows[1];

  const imageCells = imageRow ? [...imageRow.children] : [];
  const titleCells = titleRow ? [...titleRow.children] : [];
  const count = Math.max(imageCells.length, titleCells.length);

  block.textContent = '';

  const viewport = el('div', 'stories__viewport');
  const track = el('div', 'stories__track');

  for (let i = 0; i < count; i += 1) {
    const card = buildCard(imageCells[i], titleCells[i]);
    track.append(card);
  }

  viewport.append(track);
  block.append(viewport);
}
