/**
 * ax-panels block — tabbed panel switcher with feature-card grids.
 *
 * Authored rows (DA table):
 *   Row 0 (multi-column): Tab1 label | Tab2 label | Tab3 label | ...
 *   Row 1:   Panel 1 heading (h2)
 *   Rows 2-7: Panel 1 cards, each = image | title | body
 *   Row 8:   Panel 2 heading (h2)
 *   Rows 9-14: Panel 2 cards
 *   ... (repeat for each panel)
 *
 * The decorator detects heading rows (containing h1-h6) as panel
 * boundaries, so the number of cards per panel is flexible.
 *
 * @param {Element} block
 */

const TAB_ICON = `<svg viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
  <path d="M16.819,10.231l-.082-.034.481-1.122A1.962,1.962,0,0,0,15.727,6.36V5.091A4.1,4.1,0,0,0,11.636,1H7.265a2.435,2.435,0,0,0-1.735.719L1.718,5.529A2.443,2.443,0,0,0,1,7.265v6.008a4.1,4.1,0,0,0,4.091,4.091h5.727a.818.818,0,0,0,.319-.065,1.982,1.982,0,0,0,3.132.216l3.35-3.764a2.22,2.22,0,0,0-.8-3.523ZM6.686,2.876c.011-.012.029-.016.041-.028V5.909a.818.818,0,0,1-.818.818H2.848c.011-.013.016-.029.028-.042Zm-4.05,10.4V8.364H5.909A2.455,2.455,0,0,0,8.364,5.909V2.636h3.273a2.455,2.455,0,0,1,2.455,2.455V6.727a.675.675,0,0,0,.016.082,2,2,0,0,0-.2.178L10.563,10.75a2.218,2.218,0,0,0,.8,3.518l.082.035-.481,1.122a1.947,1.947,0,0,0-.092.313c-.019,0-.034-.011-.054-.011H5.091A2.455,2.455,0,0,1,2.636,13.273ZM16.4,12.666l-3.355,3.764a.345.345,0,0,1-.58-.357L13.6,13.436,12,12.763a.583.583,0,0,1-.214-.927l3.355-3.764a.339.339,0,0,1,.255-.119.343.343,0,0,1,.327.475l-1.142,2.635,1.6.673a.583.583,0,0,1,.218.929Z"></path>
</svg>`;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // Row 0: tab labels (one per cell)
  const tabRow = rows[0];
  const tabLabels = [...tabRow.children].map((c) => c.textContent.trim());

  // Remaining rows: group into panels by heading boundaries
  const panels = [];
  let current = null;
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const heading = row.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      current = { heading: heading.textContent.trim(), cards: [] };
      panels.push(current);
    } else if (current) {
      const cells = [...row.children];
      const img = cells[0]?.querySelector('img');
      const title = cells[1]?.textContent.trim() || '';
      const body = cells[2]?.textContent.trim() || '';
      if (title) {
        current.cards.push({ img, title, body });
      }
    }
  }

  block.textContent = '';

  // Outer container
  const container = document.createElement('div');
  container.className = 'container';

  // Tab bar
  const tabBar = document.createElement('div');
  tabBar.className = 'ax-panels__tabs';
  tabBar.setAttribute('role', 'tablist');

  tabLabels.forEach((label, idx) => {
    const btn = document.createElement('button');
    btn.className = 'ax-panels__tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    const panelId = `${slugify(label)}-${idx}`;
    btn.dataset.panel = panelId;
    btn.innerHTML = TAB_ICON;
    btn.append(` ${label}`);
    tabBar.append(btn);
  });
  container.append(tabBar);

  // Panels
  panels.forEach((panel, idx) => {
    const panelId = idx < tabLabels.length
      ? `${slugify(tabLabels[idx])}-${idx}`
      : `panel-${idx}`;

    const panelDiv = document.createElement('div');
    panelDiv.className = 'ax-panels__panel';
    panelDiv.dataset.panel = panelId;
    if (idx > 0) panelDiv.hidden = true;

    const inner = document.createElement('div');
    inner.className = 'ax-panels__panel-inner';

    const section = document.createElement('section');
    section.className = 'section features features--composed';

    const sectionContainer = document.createElement('div');
    sectionContainer.className = 'container';

    // Section heading
    const secHead = document.createElement('div');
    secHead.className = 'sec-head';
    const h2 = document.createElement('h2');
    h2.textContent = panel.heading;
    secHead.append(h2);
    sectionContainer.append(secHead);

    // Card grid
    const grid = document.createElement('div');
    grid.className = 'acrobat-cards three-up';

    panel.cards.forEach((card) => {
      const article = document.createElement('article');
      article.className = 'acrobat-card';

      const asset = document.createElement('div');
      asset.className = 'acrobat-card__asset';
      if (card.img) {
        const img = card.img.cloneNode(true);
        asset.append(img);
      }
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

    sectionContainer.append(grid);
    section.append(sectionContainer);
    inner.append(section);
    panelDiv.append(inner);
    container.append(panelDiv);
  });

  block.append(container);

  // Tab switching
  tabBar.addEventListener('click', (e) => {
    const tab = e.target.closest('.ax-panels__tab');
    if (!tab) return;

    tabBar.querySelectorAll('.ax-panels__tab').forEach((t) => {
      t.setAttribute('aria-selected', 'false');
    });
    tab.setAttribute('aria-selected', 'true');

    const target = tab.dataset.panel;
    container.querySelectorAll('.ax-panels__panel').forEach((p) => {
      p.hidden = p.dataset.panel !== target;
    });
  });
}
