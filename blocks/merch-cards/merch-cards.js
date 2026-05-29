const LOCK_SVG = '<svg class="merch-card__secure-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3.5 6V4a3.5 3.5 0 0 1 7 0v2M2.5 6h9v6.5h-9z" stroke="currentColor" stroke-width="1.2"></path></svg>';
const DOC_SVG = '<svg class="merch-card__section-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 2h7l3 3v13H5V2z" stroke="currentColor" stroke-width="1.2"></path></svg>';

function el(tag, cls, html) {
  const d = document.createElement(tag);
  if (cls) d.className = cls;
  if (html !== undefined) d.innerHTML = html;
  return d;
}

function buildCard(cell, variant) {
  const picture = cell.querySelector('picture');
  const img = cell.querySelector('img');
  const icon = picture || img;
  const h3 = cell.querySelector('h3');
  const paragraphs = [...cell.querySelectorAll(':scope > p')];
  const links = [...cell.querySelectorAll('a')];
  const items = [...cell.querySelectorAll('li')];

  // Extract paragraphs that are not CTA wrappers
  const textParas = paragraphs.filter(
    (p) => !p.querySelector('a') || (!p.querySelector('strong > a') && !p.querySelector('em > a')),
  );
  const desc = textParas[0]?.textContent?.trim() || '';
  const price = textParas[1]?.textContent?.trim() || '';
  const priceNote = textParas[2]?.textContent?.trim() || '';

  const card = el('article', `merch-card merch-card--${variant}`);
  const inner = el('div', 'merch-card__inner');

  // Top section
  const top = el('div', 'merch-card__top');

  // Mnemonic (product icon)
  const mnemonic = el('div', 'merch-card__mnemonic');
  if (icon) {
    const cloned = icon.cloneNode(true);
    if (cloned.tagName === 'IMG') {
      cloned.className = 'merch-card__product-icon';
      cloned.width = 24;
      cloned.height = 24;
    } else {
      const innerImg = cloned.querySelector('img');
      if (innerImg) {
        innerImg.className = 'merch-card__product-icon';
        innerImg.width = 24;
        innerImg.height = 24;
      }
    }
    mnemonic.append(cloned);
  }
  top.append(mnemonic);

  // Name + description
  const nameDesc = el('div', 'merch-card__name-desc');
  if (h3) {
    const name = el('h3', 'merch-card__name');
    name.textContent = h3.textContent.trim();
    nameDesc.append(name);
  }
  if (desc) {
    const d = el('p', 'merch-card__desc');
    d.textContent = desc;
    nameDesc.append(d);
  }
  top.append(nameDesc);

  // Pricing area
  const pricing = el('div', 'merch-card__pricing');
  const priceArea = el('div', 'merch-card__price-area');
  if (price) {
    priceArea.append(el('p', 'merch-card__price', price));
  }
  if (priceNote) {
    priceArea.append(el('p', 'merch-card__price-note', priceNote));
  }
  pricing.append(priceArea);

  // CTAs
  const ctas = el('div', 'merch-card__ctas');
  const primaryLink = links[0];
  const secondaryLink = links[1];
  if (primaryLink) {
    const a = primaryLink.cloneNode(true);
    a.className = 'btn btn--primary';
    ctas.append(a);
  }
  if (secondaryLink) {
    const a = secondaryLink.cloneNode(true);
    a.className = 'btn btn--outline';
    ctas.append(a);
  }
  pricing.append(ctas);
  top.append(pricing);
  inner.append(top);

  // Secure transaction badge
  const secure = el('div', 'merch-card__secure');
  secure.innerHTML = `${LOCK_SVG}<span>Secure transaction</span>`;
  inner.append(secure);

  card.append(inner);

  // Bottom features list
  if (items.length) {
    const bottom = el('div', 'merch-card__bottom');
    const features = el('div', 'merch-card__features');
    const featInner = el('div', 'merch-card__features-inner');
    const section = el('div', 'merch-card__section');

    const sectionTitle = el('div', 'merch-card__section-title');
    sectionTitle.innerHTML = `${DOC_SVG}<span>See what's included:</span>`;
    section.append(sectionTitle);

    const itemsDiv = el('div', 'merch-card__items');
    items.forEach((li) => {
      const item = el('div', 'merch-card__item');
      item.textContent = li.textContent.trim();
      itemsDiv.append(item);
    });
    section.append(itemsDiv);
    featInner.append(section);
    features.append(featInner);
    bottom.append(features);
    card.append(bottom);
  }

  return card;
}

function animateCards(panel) {
  const cards = [...panel.querySelectorAll('.merch-card')];
  cards.forEach((c, ci) => {
    c.style.transition = 'none';
    c.style.opacity = '0';
    c.style.transform = 'translateY(40px)';
    // Force reflow before transitioning
    // eslint-disable-next-line no-void
    void c.offsetWidth;
    const ease = 'cubic-bezier(0.42, 0, 0, 1)';
    const delay = ci * 60;
    c.style.transition = `opacity 450ms ${ease} ${delay}ms, transform 450ms ${ease} ${delay}ms`;
    requestAnimationFrame(() => {
      c.style.opacity = '1';
      c.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Merch-cards block: tabbed pricing card section.
 *
 * Content model (authored rows):
 *   Row 0 (1 cell): h2 heading
 *   Row 1 (1 cell): subtitle paragraph
 *   Tab label row (1 cell, bold): **Tab Label**
 *   Layout row (1 cell): "two-up" | "one-up" | "three-up" | "four-up"
 *   Card row (1 cell): structured HTML per card (icon, h3, p, a, ul)
 *
 * @param {Element} block The merch-cards block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const headingEl = rows[0]?.querySelector('h1, h2, h3');
  const heading = headingEl?.textContent?.trim()
    || rows[0]?.textContent?.trim() || '';
  const subtitle = rows[1]?.textContent?.trim() || '';

  // Parse tab groups from rows
  const tabGroups = [];
  let currentGroup = null;

  for (let i = 2; i < rows.length; i += 1) {
    const cells = [...rows[i].children];
    const text = cells[0]?.textContent?.trim() || '';
    const hasStrong = cells[0]?.querySelector('strong');
    const isLayout = /^(one|two|three|four)-up$/i.test(text);

    if (isLayout && currentGroup) {
      currentGroup.layout = text.toLowerCase();
    } else if (
      cells.length === 1
      && !cells[0].querySelector('img, picture')
      && (hasStrong || !currentGroup)
    ) {
      currentGroup = {
        label: text.replace(/\*\*/g, ''),
        layout: 'two-up',
        cards: [],
        variants: [],
      };
      tabGroups.push(currentGroup);
    } else if (currentGroup) {
      const variantText = cells.length > 1
        ? cells[0].textContent.trim().toLowerCase() : '';
      const isVariantCell = variantText === 'dark' || variantText === 'light';
      let variant = 'light';
      if (isVariantCell) {
        variant = variantText;
      } else if (currentGroup.cards.length % 2 !== 0) {
        variant = 'dark';
      }
      const cardCell = isVariantCell ? cells[1] : cells[0];
      if (cardCell) {
        currentGroup.cards.push(cardCell);
        currentGroup.variants.push(variant);
      }
    }
  }

  block.textContent = '';

  const container = el('div', 'container');

  // Section heading
  const secHead = el('div', 'sec-head');
  const h2 = document.createElement('h2');
  h2.textContent = heading;
  secHead.append(h2);
  if (subtitle) {
    const p = document.createElement('p');
    p.textContent = subtitle;
    secHead.append(p);
  }
  container.append(secHead);

  const shell = el('div', 'merch-cards-shell');

  // Build tab bar (only if multiple groups)
  if (tabGroups.length > 1) {
    const tabsBar = el('div', 'merch-cards-tabs');
    tabsBar.setAttribute('role', 'tablist');
    tabGroups.forEach((g, i) => {
      const slug = `${g.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`;
      g.slug = slug;
      const btn = document.createElement('button');
      btn.className = `merch-cards-tab${i === 0 ? ' active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.dataset.mcPanel = slug;
      btn.textContent = g.label;
      tabsBar.append(btn);
    });
    shell.append(tabsBar);
  }

  // Build panels
  tabGroups.forEach((g, i) => {
    const slug = g.slug
      || `${g.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}`;
    const panel = el('div', 'merch-cards-panel');
    panel.dataset.mcPanel = slug;
    if (i > 0) panel.hidden = true;

    const grid = el('div', `merch-cards ${g.layout}`);
    g.cards.forEach((cell, ci) => {
      grid.append(buildCard(cell, g.variants[ci] || 'light'));
    });
    panel.append(grid);
    shell.append(panel);
  });

  container.append(shell);
  block.append(container);

  // Tab switching
  const tabBtns = [...block.querySelectorAll('.merch-cards-tab')];
  const panels = [...block.querySelectorAll('.merch-cards-panel')];
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.mcPanel;
      tabBtns.forEach((t) => {
        const on = t === btn;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.classList.toggle('active', on);
      });
      panels.forEach((p) => {
        const wasHidden = p.hasAttribute('hidden');
        p.hidden = p.dataset.mcPanel !== target;
        if (!p.hidden && wasHidden) animateCards(p);
      });
    });
  });
}
