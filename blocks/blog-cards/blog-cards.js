const CARD_MODIFIERS = ['maint', 'aerial', 'landscape', 'cva'];

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: eyebrow | section title
  const headerRow = rows[0];
  const eyebrow = headerRow?.children[0]?.textContent.trim() || '';
  const sectionTitle = headerRow?.children[1]?.textContent.trim() || '';

  // Rows 1–4: card links (each row cell 0 has an <a> with href and title text)
  const cards = [];
  for (let i = 1; i <= 4; i += 1) {
    const link = rows[i]?.querySelector('a');
    cards.push({
      href: link?.href || '#',
      title: link?.textContent.trim() || '',
    });
  }

  block.textContent = '';

  const cardHTML = cards.map((card, idx) => `
    <a class="blog-card blog-card--${CARD_MODIFIERS[idx]}" href="${card.href}" data-anim>
      <div class="blog-card__bg" aria-hidden="true"></div>
      <div class="blog-card__inner">
        <h3 class="blog-card__title">${card.title}</h3>
        <span class="blog-card__more">Read More</span>
      </div>
    </a>
  `).join('');

  block.innerHTML = `
    <div class="container">
      <div class="blog-cards__head">
        <span class="label blog-cards__eyebrow" data-anim>${eyebrow}</span>
        <h2 class="headline blog-cards__title" style="margin-top: var(--sp-md);" data-anim>${sectionTitle}</h2>
      </div>
      <div class="blog-cards__grid">
        ${cardHTML}
      </div>
    </div>
  `;
}
