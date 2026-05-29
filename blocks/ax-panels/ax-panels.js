export default function decorate(block) {
  const rows = [...block.children];
  const tabs = [];
  let currentTab = null;

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1 && !cells[0].querySelector('img, picture')) {
      const text = cells[0].textContent.trim();
      if (!currentTab || currentTab.heading) {
        currentTab = { label: text, heading: '', cards: [] };
        tabs.push(currentTab);
      } else {
        currentTab.heading = text;
      }
    } else if (cells.length >= 2) {
      if (!currentTab) {
        currentTab = { label: 'Features', heading: '', cards: [] };
        tabs.push(currentTab);
      }
      const img = cells[0]?.querySelector('img, picture');
      const title = cells[1]?.textContent?.trim() || '';
      const body = cells[2]?.textContent?.trim() || '';
      currentTab.cards.push({ img, title, body });
    }
  });

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container parallax-move-up';

  // Tabs bar
  const tabsBar = document.createElement('div');
  tabsBar.className = 'ax-panels__tabs';
  tabsBar.setAttribute('role', 'tablist');

  tabs.forEach((tab, i) => {
    const slug = tab.label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '')
      .concat('-', i);
    tab.slug = slug;
    const btn = document.createElement('button');
    btn.className = 'ax-panels__tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.dataset.panel = slug;
    btn.innerHTML = `<svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true"><path d="M16.819,10.231l-.082-.034.481-1.122A1.962,1.962,0,0,0,15.727,6.36V5.091A4.1,4.1,0,0,0,11.636,1H7.265a2.435,2.435,0,0,0-1.735.719L1.718,5.529A2.443,2.443,0,0,0,1,7.265v6.008a4.1,4.1,0,0,0,4.091,4.091h5.727a.818.818,0,0,0,.319-.065,1.982,1.982,0,0,0,3.132.216l3.35-3.764a2.22,2.22,0,0,0-.8-3.523Z"></path></svg> ${tab.label}`;
    tabsBar.append(btn);
  });
  container.append(tabsBar);

  // Panels
  tabs.forEach((tab, i) => {
    const panel = document.createElement('div');
    panel.className = 'ax-panels__panel';
    panel.dataset.panel = tab.slug;
    if (i > 0) panel.hidden = true;

    const inner = document.createElement('div');
    inner.className = 'ax-panels__panel-inner';

    const section = document.createElement('div');
    section.className = 'features features--composed';

    const secContainer = document.createElement('div');
    secContainer.className = 'container';

    if (tab.heading) {
      const head = document.createElement('div');
      head.className = 'sec-head';
      const h2 = document.createElement('h2');
      h2.textContent = tab.heading;
      head.append(h2);
      secContainer.append(head);
    }

    const grid = document.createElement('div');
    grid.className = 'acrobat-cards parallax-stagger-ltr three-up';

    tab.cards.forEach((card) => {
      const article = document.createElement('article');
      article.className = 'acrobat-card';

      const asset = document.createElement('div');
      asset.className = 'acrobat-card__asset';
      if (card.img) asset.append(card.img.cloneNode(true));
      article.append(asset);

      const copy = document.createElement('div');
      copy.className = 'acrobat-card__copy';
      const text = document.createElement('div');
      text.className = 'acrobat-card__text';

      const h3 = document.createElement('h3');
      h3.className = 'acrobat-card__title';
      h3.textContent = card.title;
      text.append(h3);

      if (card.body) {
        const p = document.createElement('p');
        p.className = 'acrobat-card__body';
        p.textContent = card.body;
        text.append(p);
      }
      copy.append(text);
      article.append(copy);
      grid.append(article);
    });

    secContainer.append(grid);
    section.append(secContainer);
    inner.append(section);
    panel.append(inner);
    container.append(panel);
  });

  block.append(container);

  // Tab switching
  const tabBtns = [...block.querySelectorAll('.ax-panels__tab')];
  const panels = [...block.querySelectorAll('.ax-panels__panel')];
  tabBtns.forEach((btn) => btn.addEventListener('click', () => {
    const target = btn.dataset.panel;
    tabBtns.forEach((t) => {
      t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
    });
    panels.forEach((p) => {
      p.hidden = (p.dataset.panel !== target);
    });
  }));
}
