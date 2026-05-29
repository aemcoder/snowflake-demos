export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows[0]?.querySelector('h2')?.textContent?.trim();
  const cardRows = rows.slice(1);

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container';

  if (heading) {
    const secHead = document.createElement('div');
    secHead.className = 'sec-head';
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    secHead.append(h2);
    container.append(secHead);
  }

  const grid = document.createElement('div');
  grid.className = 'acrobat-cards parallax-stagger-ltr three-up';

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const img = cells[0]?.querySelector('img');
    const title = cells[1]?.querySelector('h3')?.textContent?.trim()
      || cells[1]?.querySelector('strong')?.textContent?.trim();
    const body = cells[2]?.textContent?.trim();
    const cta = cells[3]?.querySelector('a');

    const article = document.createElement('article');
    article.className = 'acrobat-card';

    const asset = document.createElement('div');
    asset.className = 'acrobat-card__asset';
    if (img) asset.append(img);

    const copy = document.createElement('div');
    copy.className = 'acrobat-card__copy';

    const text = document.createElement('div');
    text.className = 'acrobat-card__text';

    if (title) {
      const h3 = document.createElement('h3');
      h3.className = 'acrobat-card__title';
      h3.textContent = title;
      text.append(h3);
    }

    if (body) {
      const p = document.createElement('p');
      p.className = 'acrobat-card__body';
      p.textContent = body;
      text.append(p);
    }

    copy.append(text);

    if (cta) {
      const a = document.createElement('a');
      a.className = 'acrobat-cta';
      a.href = cta.href;
      a.innerHTML = `${cta.textContent}<svg viewBox="0 0 6 10" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 1l4 4-4 4"></path></svg>`;
      copy.append(a);
    }

    article.append(asset, copy);
    grid.append(article);
  });

  container.append(grid);
  block.append(container);

  // Scroll-driven card entrance (rAF, matches source behavior)
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
