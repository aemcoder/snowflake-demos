export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows[0]?.querySelector('h2')?.textContent?.trim();
  const subhead = rows[0]?.querySelector('p')?.textContent?.trim();
  const cardRows = rows.slice(1);

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container parallax-move-up';

  if (heading || subhead) {
    const secHead = document.createElement('div');
    secHead.className = 'sec-head';
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading;
      secHead.append(h2);
    }
    if (subhead) {
      const p = document.createElement('p');
      p.textContent = subhead;
      secHead.append(p);
    }
    container.append(secHead);
  }

  const cards = document.createElement('div');
  cards.className = 'elastic-cards parallax-stagger-ltr three-up';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const img = cells[0]?.querySelector('img');
    const imgSrc = img?.src;
    const link = cells[1]?.querySelector('a');
    const title = cells[1]?.querySelector('h3, p')?.textContent?.trim()
      || cells[1]?.textContent?.trim();
    const desc = cells[2]?.textContent?.trim();

    const a = document.createElement('a');
    a.className = 'elastic-card';
    a.href = link?.href || '#';

    const header = document.createElement('div');
    header.className = 'elastic-card__header';
    const iconImg = document.createElement('img');
    iconImg.src = 'https://www.adobe.com/content/dam/cc/icons/adobe-express.svg';
    iconImg.alt = '';
    header.append(iconImg);

    const media = document.createElement('div');
    media.className = 'elastic-card__media';
    if (imgSrc) media.style.backgroundImage = `url('${imgSrc}')`;

    const footer = document.createElement('div');
    footer.className = 'elastic-card__footer';
    const h3 = document.createElement('h3');
    h3.textContent = title || '';
    const p = document.createElement('p');
    p.textContent = desc || '';
    footer.append(h3, p);

    a.append(header, media, footer);
    cards.append(a);
  });

  container.append(cards);
  block.append(container);
}
