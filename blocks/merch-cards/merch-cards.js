export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows[0]?.querySelector('h2')?.textContent?.trim();
  const subhead = rows[0]?.querySelector('p')?.textContent?.trim();
  const cardRows = rows.slice(1);

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container';

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

  const grid = document.createElement('div');
  grid.className = 'merch-cards three-up';

  cardRows.forEach((row, i) => {
    const cells = [...row.children];
    const name = cells[0]?.textContent?.trim();
    const desc = cells[1]?.textContent?.trim();
    const price = cells[2]?.textContent?.trim();
    const ctaLinks = [...(row.querySelectorAll('a') || [])];
    const isFeatured = row.dataset.featured === 'true' || i === 1;

    const article = document.createElement('article');
    article.className = `merch-card merch-card--light${isFeatured ? ' merch-card--featured' : ''}`;

    const inner = document.createElement('div');
    inner.className = 'merch-card__inner';

    const top = document.createElement('div');
    top.className = 'merch-card__top';

    const nameDesc = document.createElement('div');
    nameDesc.className = 'merch-card__name-desc';
    const h3 = document.createElement('h3');
    h3.className = 'merch-card__name';
    h3.textContent = name || '';
    const descP = document.createElement('p');
    descP.className = 'merch-card__desc';
    descP.textContent = desc || '';
    nameDesc.append(h3, descP);

    const pricing = document.createElement('div');
    pricing.className = 'merch-card__pricing';
    const priceArea = document.createElement('div');
    priceArea.className = 'merch-card__price-area';
    const priceP = document.createElement('p');
    priceP.className = 'merch-card__price';
    priceP.textContent = price || '';
    priceArea.append(priceP);
    pricing.append(priceArea);

    if (ctaLinks.length) {
      const ctas = document.createElement('div');
      ctas.className = 'merch-card__ctas';
      ctaLinks.forEach((link, j) => {
        link.className = `btn ${j === 0 ? 'btn--primary' : 'btn--outline'}`;
        ctas.append(link);
      });
      pricing.append(ctas);
    }

    top.append(nameDesc, pricing);
    inner.append(top);
    article.append(inner);
    grid.append(article);
  });

  container.append(grid);
  block.append(container);

  // Scroll-driven entrance (rAF)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const easeOut3 = (t) => 1 - (1 - t) ** 3;
  // eslint-disable-next-line no-nested-ternary
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  const cards = [...grid.children];
  const triggerTop = grid.getBoundingClientRect().top + window.scrollY;
  const vh = window.innerHeight;

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    const stagger = i * 0.1;

    const tick = () => {
      const raw = (window.scrollY + vh * 1.1 - triggerTop) / (vh * 0.5);
      const p = easeOut3(clamp(raw - stagger, 0, 1));
      card.style.opacity = String(p);
      card.style.transform = `translateY(${((1 - p) * 40).toFixed(2)}px)`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
