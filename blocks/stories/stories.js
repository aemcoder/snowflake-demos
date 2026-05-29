/**
 * Stories block — horizontal row of portrait story cards with background photos.
 * Content model (DA rows):
 *   Rows 0-N: One row per card. Each row contains an <img> and text (title).
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const viewport = document.createElement('div');
  viewport.className = 'stories__viewport';

  const track = document.createElement('div');
  track.className = 'stories__track';

  const expressIcon = 'https://www.adobe.com/content/dam/cc/icons/adobe-express.svg';

  rows.forEach((row) => {
    const img = row.querySelector('img');
    const title = row.textContent.trim();

    const card = document.createElement('button');
    card.className = 'story-card';
    card.type = 'button';

    // Photo background
    const photo = document.createElement('div');
    photo.className = 'story-card__photo';
    if (img) {
      photo.style.backgroundImage = `url(${img.src})`;
    }
    card.appendChild(photo);

    // Gradient overlay
    const gradient = document.createElement('div');
    gradient.className = 'story-card__gradient';
    card.appendChild(gradient);

    // Icon badge
    const icon = document.createElement('div');
    icon.className = 'story-card__icon';
    const iconImg = document.createElement('img');
    iconImg.src = expressIcon;
    iconImg.alt = '';
    icon.appendChild(iconImg);
    card.appendChild(icon);

    // Footer with title
    const footer = document.createElement('div');
    footer.className = 'story-card__footer';
    const p = document.createElement('p');
    p.className = 'story-card__title';
    p.textContent = title;
    footer.appendChild(p);
    card.appendChild(footer);

    track.appendChild(card);
  });

  viewport.appendChild(track);
  block.appendChild(viewport);
}
