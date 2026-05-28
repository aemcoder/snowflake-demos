const TILE_MODIFIERS = ['field', 'shop', 'parts', 'maint', 'rebuilds', 'online'];
const TILE_ICONS = ['icon-service', 'icon-service', 'icon-order', 'icon-new', 'icon-used', 'icon-phone'];

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: eyebrow | section title
  const headerRow = rows[0];
  const eyebrow = headerRow?.children[0]?.textContent.trim() || '';
  const sectionTitle = headerRow?.children[1]?.textContent.trim() || '';

  // Rows 1–6: tile links (cell 0 contains an <a> with href and label text)
  const tiles = [];
  for (let i = 1; i <= 6; i += 1) {
    const link = rows[i]?.querySelector('a');
    tiles.push({
      href: link?.href || '#',
      title: link?.textContent.trim() || '',
    });
  }

  // Row 7: footer CTA
  const footerCtaLink = rows[7]?.querySelector('a');
  const footerCtaHref = footerCtaLink?.href || '/service/';
  const footerCtaText = footerCtaLink?.textContent.trim() || 'Browse More Services';

  block.textContent = '';

  const tileHTML = tiles.map((tile, idx) => `
    <a class="service-tile service-tile--${TILE_MODIFIERS[idx]}" href="${tile.href}" data-anim>
      <span class="service-tile__icon icon ${TILE_ICONS[idx]}" aria-hidden="true"></span>
      <span class="service-tile__title">${tile.title}</span>
    </a>
  `).join('');

  block.innerHTML = `
    <div class="container">
      <div class="services__head">
        <span class="label services__eyebrow" data-anim>${eyebrow}</span>
        <h2 class="headline services__title" style="margin-top: var(--sp-md);" data-anim>${sectionTitle}</h2>
      </div>
      <div class="services__grid">
        ${tileHTML}
      </div>
      <div class="services__footer" data-anim>
        <a class="btn btn-primary" href="${footerCtaHref}">${footerCtaText}</a>
      </div>
    </div>
  `;
}
