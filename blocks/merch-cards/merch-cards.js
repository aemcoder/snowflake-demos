/**
 * Merch-cards block — tabbed pricing cards with animated panel switching.
 *
 * Authored rows (DA table):
 *   0  sec-head heading (h2)
 *   1  sec-head description (p)
 *   2  tab labels (one label per cell: "Individuals" | "Students…" | "Teams")
 *   ── then per-panel groups, each starting with a panel-marker row ──
 *   N  panel marker: single-cell text matching a tab label
 *   N+1..  card pairs: data row + cta/features row
 *
 * Card data row (6 cells):
 *   icon-img | name (h3 or text) | description | price | price-note | variant
 *   variant = "light" (default) or "dark"
 *
 * Card cta + features row (3 cells):
 *   CTA1 (strong>a) | CTA2 (em>a or a) | features (semicolon-separated)
 *
 * @param {Element} block
 */

const LOCK_SVG = '<svg class="merch-card__secure-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3.5 6V4a3.5 3.5 0 0 1 7 0v2M2.5 6h9v6.5h-9z" stroke="currentColor" stroke-width="1.2"></path></svg>';

const FILE_SVG = '<svg class="merch-card__section-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2h7l3 3v13H5V2z" stroke="currentColor" stroke-width="1.2"></path></svg>';

const TAB_EASE = 'cubic-bezier(0.42, 0, 0, 1)';
const TAB_DUR = 450;
const PER_CARD = 60;

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function countLabel(n) {
  const names = ['', 'one-up', 'two-up', 'three-up', 'four-up'];
  return names[n] || '';
}

function isPanelMarker(row) {
  const cells = [...row.children];
  if (cells.length !== 1) return false;
  const cell = cells[0];
  if (cell.querySelector('img, a, picture')) return false;
  return cell.textContent.trim().length > 0;
}

function extractCta(cell) {
  const anchor = cell?.querySelector('a');
  if (!anchor) return null;
  const { href } = anchor;
  const label = anchor.textContent.trim();
  const isPrimary = !!anchor.closest('strong');
  return { href, label, isPrimary };
}

function buildCard(cardData) {
  const {
    iconSrc, name, desc, price, priceNote,
    variant, cta1, cta2, features,
  } = cardData;

  const article = document.createElement('article');
  article.className = `merch-card merch-card--${variant}`;

  const inner = document.createElement('div');
  inner.className = 'merch-card__inner';

  const top = document.createElement('div');
  top.className = 'merch-card__top';

  const mnemonic = document.createElement('div');
  mnemonic.className = 'merch-card__mnemonic';
  if (iconSrc) {
    const icon = document.createElement('img');
    icon.className = 'merch-card__product-icon';
    icon.src = iconSrc;
    icon.alt = '';
    icon.width = 24;
    icon.height = 24;
    mnemonic.append(icon);
  }
  top.append(mnemonic);

  const nameDesc = document.createElement('div');
  nameDesc.className = 'merch-card__name-desc';
  const h3 = document.createElement('h3');
  h3.className = 'merch-card__name';
  h3.textContent = name;
  nameDesc.append(h3);
  if (desc) {
    const p = document.createElement('p');
    p.className = 'merch-card__desc';
    p.textContent = desc;
    nameDesc.append(p);
  }
  top.append(nameDesc);

  const pricing = document.createElement('div');
  pricing.className = 'merch-card__pricing';

  const priceArea = document.createElement('div');
  priceArea.className = 'merch-card__price-area';
  const priceEl = document.createElement('p');
  priceEl.className = 'merch-card__price';
  priceEl.textContent = price;
  priceArea.append(priceEl);
  if (priceNote) {
    const noteEl = document.createElement('p');
    noteEl.className = 'merch-card__price-note';
    noteEl.textContent = priceNote;
    priceArea.append(noteEl);
  }
  pricing.append(priceArea);

  const ctas = document.createElement('div');
  ctas.className = 'merch-card__ctas';
  [cta1, cta2].forEach((cta) => {
    if (!cta) return;
    const a = document.createElement('a');
    a.className = cta.isPrimary ? 'btn btn--primary' : 'btn btn--outline';
    a.href = cta.href;
    a.textContent = cta.label;
    ctas.append(a);
  });
  pricing.append(ctas);
  top.append(pricing);
  inner.append(top);

  const secure = document.createElement('div');
  secure.className = 'merch-card__secure';
  secure.innerHTML = `${LOCK_SVG}<span>Secure transaction</span>`;
  inner.append(secure);
  article.append(inner);

  if (features.length) {
    const bottom = document.createElement('div');
    bottom.className = 'merch-card__bottom';

    const featuresEl = document.createElement('div');
    featuresEl.className = 'merch-card__features';

    const featuresInner = document.createElement('div');
    featuresInner.className = 'merch-card__features-inner';

    const section = document.createElement('div');
    section.className = 'merch-card__section';

    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'merch-card__section-title';
    sectionTitle.innerHTML = `${FILE_SVG}<span>See what's included:</span>`;
    section.append(sectionTitle);

    const items = document.createElement('div');
    items.className = 'merch-card__items';
    features.forEach((text) => {
      const item = document.createElement('div');
      item.className = 'merch-card__item';
      item.textContent = text;
      items.append(item);
    });
    section.append(items);
    featuresInner.append(section);
    featuresEl.append(featuresInner);
    bottom.append(featuresEl);
    article.append(bottom);
  }

  return article;
}

function wireTabSwitching(shell) {
  const tabs = [...shell.querySelectorAll('.merch-cards-tab[data-mc-panel]')];
  const panels = [
    ...shell.querySelectorAll('.merch-cards-panel[data-mc-panel]'),
  ];
  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const target = tab.dataset.mcPanel;
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.classList.toggle('active', on);
    });
    panels.forEach((p) => {
      const wasHidden = p.hasAttribute('hidden');
      p.hidden = (p.dataset.mcPanel !== target);
      if (!p.hidden && wasHidden) {
        const cards = [...p.querySelectorAll('.merch-card')];
        cards.forEach((c, i) => {
          const delay = i * PER_CARD;
          c.dataset.tabEntering = '1';
          c.style.transition = 'none';
          c.style.opacity = '0';
          c.style.transform = 'translateY(40px)';
          // eslint-disable-next-line no-unused-expressions
          c.offsetWidth;
          c.style.transition = [
            `opacity ${TAB_DUR}ms ${TAB_EASE} ${delay}ms`,
            `transform ${TAB_DUR}ms ${TAB_EASE} ${delay}ms`,
          ].join(', ');
          requestAnimationFrame(() => {
            c.style.opacity = '1';
            c.style.transform = 'translateY(0)';
          });
          setTimeout(() => {
            delete c.dataset.tabEntering;
            c.style.transition = '';
          }, TAB_DUR + delay + 60);
        });
      }
    });
  }));
}

function initScrollAnimation(shell) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const easeOut3 = (t) => 1 - (1 - t) ** 3;
  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
  const items = [];
  const grids = shell.querySelectorAll('.merch-cards-grid');
  if (!grids.length) return;

  grids.forEach((grid) => {
    const triggerTop = grid.getBoundingClientRect().top + window.scrollY;
    [...grid.children]
      .filter((c) => c.classList.contains('merch-card'))
      .forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        items.push({ el: card, triggerTop, staggerDelay: i * 0.10 });
      });
  });

  const tick = () => {
    // eslint-disable-next-line no-underscore-dangle
    const lenis = window.__lenis;
    const sY = lenis ? lenis.scroll : window.scrollY;
    const vh = window.innerHeight;
    items.forEach((it) => {
      if (it.el.dataset.tabEntering === '1') return;
      const raw = (sY + vh * 1.1 - it.triggerTop) / (vh * 0.5);
      const p = easeOut3(clamp(raw - it.staggerDelay, 0, 1));
      it.el.style.opacity = String(p);
      it.el.style.transform = `translateY(${((1 - p) * 40).toFixed(2)}px)`;
    });
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 4) return;

  const headingEl = rows[0].querySelector('h1, h2, h3, h4') || rows[0];
  const headingText = headingEl.textContent.trim();
  const descText = rows[1].textContent.trim();

  const tabLabels = [...rows[2].children].map((c) => c.textContent.trim());
  const contentRows = rows.slice(3);

  // Parse panels. Cards before the first panel-marker belong to tab 0.
  const panels = [{ label: tabLabels[0] || '', cards: [] }];
  let currentPanel = panels[0];

  contentRows.forEach((row) => {
    if (isPanelMarker(row)) {
      currentPanel = { label: row.textContent.trim(), cards: [] };
      panels.push(currentPanel);
      return;
    }

    if (!currentPanel) return;

    const cells = [...row.children];
    if (cells.length >= 4) {
      const iconImg = cells[0]?.querySelector('img');
      const nameEl = cells[1]?.querySelector('h3') || cells[1];
      currentPanel.cards.push({
        iconSrc: iconImg?.src || '',
        name: nameEl?.textContent?.trim() || '',
        desc: cells[2]?.textContent?.trim() || '',
        price: cells[3]?.textContent?.trim() || '',
        priceNote: cells[4]?.textContent?.trim() || '',
        variant: (cells[5]?.textContent?.trim() || 'light').toLowerCase(),
        cta1: null,
        cta2: null,
        features: [],
      });
    } else if (cells.length >= 1 && currentPanel.cards.length > 0) {
      const lastCard = currentPanel.cards[currentPanel.cards.length - 1];
      lastCard.cta1 = extractCta(cells[0]);
      lastCard.cta2 = extractCta(cells[1]);
      const featText = cells[2]?.textContent?.trim() || '';
      if (featText) {
        lastCard.features = featText
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }
  });

  block.textContent = '';

  const section = document.createElement('div');
  section.className = 'section merch-cards-section';
  section.style.background = '#fff';

  const container = document.createElement('div');
  container.className = 'container';

  const secHead = document.createElement('div');
  secHead.className = 'sec-head';
  const h2 = document.createElement('h2');
  h2.textContent = headingText;
  secHead.append(h2);
  if (descText) {
    const p = document.createElement('p');
    p.textContent = descText;
    secHead.append(p);
  }
  container.append(secHead);

  const shell = document.createElement('div');
  shell.className = 'merch-cards-shell';

  const tabsBar = document.createElement('div');
  tabsBar.className = 'merch-cards-tabs';
  tabsBar.setAttribute('role', 'tablist');

  tabLabels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = 'merch-cards-tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if (i === 0) btn.classList.add('active');
    btn.dataset.mcPanel = `${slugify(label)}-${i}`;
    btn.textContent = label;
    tabsBar.append(btn);
  });
  shell.append(tabsBar);

  panels.forEach((panelData, i) => {
    const panel = document.createElement('div');
    panel.className = 'merch-cards-panel';
    panel.dataset.mcPanel = `${slugify(panelData.label)}-${i}`;
    if (i !== 0) panel.hidden = true;

    const grid = document.createElement('div');
    grid.className = `merch-cards-grid ${countLabel(panelData.cards.length)}`;
    panelData.cards.forEach((cardData) => {
      grid.append(buildCard(cardData));
    });

    panel.append(grid);
    shell.append(panel);
  });

  container.append(shell);
  section.append(container);
  block.append(section);

  wireTabSwitching(shell);
  initScrollAnimation(shell);
}
