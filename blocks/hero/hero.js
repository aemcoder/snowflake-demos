export default function decorate(block) {
  const rows = [...block.children];
  const logoCell = rows[0];
  const titleCell = rows[1];
  const ctasCell = rows[2];
  const storyRows = rows.slice(3);

  const logoImg = logoCell?.querySelector('img');
  const logoLabelEl = logoCell?.querySelector('p:last-of-type') || logoCell?.querySelector('p');
  const logoLabel = (logoLabelEl?.textContent || 'Adobe Express').trim();
  const title = titleCell?.textContent?.trim();
  const ctas = [...(ctasCell?.querySelectorAll('a') || [])];

  block.textContent = '';
  block.classList.add('hero--split', 'hero--split-noimage');

  const container = document.createElement('div');
  container.className = 'container';
  const split = document.createElement('div');
  split.className = 'hero-split';
  const copy = document.createElement('div');
  copy.className = 'hero-split__copy';

  const logoDiv = document.createElement('div');
  logoDiv.className = 'hero-split__logo';
  if (logoImg) logoDiv.append(logoImg);
  const labelSpan = document.createElement('span');
  labelSpan.textContent = logoLabel;
  logoDiv.append(labelSpan);
  copy.append(logoDiv);

  if (title) {
    const h1 = document.createElement('h1');
    h1.className = 'hero-split__title';
    h1.textContent = title;
    copy.append(h1);
  }

  if (ctas.length) {
    const actions = document.createElement('div');
    actions.className = 'hero-split__actions';
    ctas.forEach((a, i) => {
      a.className = `btn ${i === 0 ? 'btn--primary' : 'btn--outline'}`;
      actions.append(a);
    });
    copy.append(actions);
  }

  split.append(copy);
  container.append(split);
  block.append(container);

  if (!storyRows.length) return;

  const storiesDiv = document.createElement('div');
  storiesDiv.className = 'stories is-compound-sibling';
  const viewport = document.createElement('div');
  viewport.className = 'stories__viewport';
  const track = document.createElement('div');
  track.className = 'stories__track';

  storyRows.forEach((row) => {
    const img = row.querySelector('img');
    const cardTitle = row.querySelector('p')?.textContent?.trim() || '';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'story-card';

    const photo = document.createElement('div');
    photo.className = 'story-card__photo';
    if (img) photo.style.backgroundImage = `url('${img.src}')`;

    const gradient = document.createElement('div');
    gradient.className = 'story-card__gradient';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'story-card__icon';
    const iconImg = document.createElement('img');
    iconImg.src = 'https://www.adobe.com/content/dam/cc/icons/adobe-express.svg';
    iconImg.alt = '';
    iconDiv.append(iconImg);

    const footer = document.createElement('div');
    footer.className = 'story-card__footer';
    const p = document.createElement('p');
    p.className = 'story-card__title';
    p.textContent = cardTitle;
    footer.append(p);

    btn.append(photo, gradient, iconDiv, footer);
    track.append(btn);
  });

  viewport.append(track);
  storiesDiv.append(viewport);
  block.after(storiesDiv);

  viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const t = (e.clientX - rect.left) / rect.width;
    const overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
    if (overflow <= 0) return;
    const range = overflow / 2;
    track.style.transform = `translateX(${(range - 2 * range * t).toFixed(1)}px)`;
  });
  viewport.addEventListener('mouseleave', () => { track.style.transform = ''; });
}
