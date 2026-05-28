export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: eyebrow (cell 0) | section title (cell 1)
  const headerRow = rows[0];
  const eyebrow = headerRow?.children[0]?.textContent.trim() || '';
  const sectionTitle = headerRow?.children[1]?.textContent.trim() || '';

  // Row 1: card-1 body (cell 0) | card-1 CTA (cell 1)
  const card1Row = rows[1];
  const card1Body = card1Row?.children[0]?.innerHTML || '';
  const card1CtaEl = card1Row?.children[1]?.querySelector('a');
  const card1CtaHref = card1CtaEl?.href || '/specials/';
  const card1CtaText = card1CtaEl?.textContent.trim() || 'Learn More';

  // Row 2: card-2 title (0) | body (1) | CTA (2)
  const card2Row = rows[2];
  const card2Title = card2Row?.children[0]?.textContent.trim() || '';
  const card2Body = card2Row?.children[1]?.innerHTML || '';
  const card2CtaEl = card2Row?.children[2]?.querySelector('a');
  const card2CtaHref = card2CtaEl?.href || '/specials/';
  const card2CtaText = card2CtaEl?.textContent.trim() || 'Learn More';

  // Row 3: card-3 title (0) | body (1) | CTA (2)
  const card3Row = rows[3];
  const card3Title = card3Row?.children[0]?.textContent.trim() || '';
  const card3Body = card3Row?.children[1]?.innerHTML || '';
  const card3CtaEl = card3Row?.children[2]?.querySelector('a');
  const card3CtaHref = card3CtaEl?.href || '/specials/';
  const card3CtaText = card3CtaEl?.textContent.trim() || 'Learn More';

  block.textContent = '';

  block.innerHTML = `
    <div class="container">
      <div class="finance__head">
        <span class="label" data-anim>${eyebrow}</span>
        <h2 class="headline" style="margin-top: var(--sp-md);" data-anim>${sectionTitle}</h2>
      </div>
      <div class="finance__grid">
        <article class="finance-card" data-anim>
          <span class="label finance-card__eyebrow">Finance</span>
          <h3 class="title finance-card__title">0% FOR UP TO <span data-flip="60">60</span> MONTHS + $<span data-flip="500">500</span> TOWARD CVA</h3>
          <p class="body-copy finance-card__body">${card1Body}</p>
          <a class="btn btn-primary finance-card__cta" href="${card1CtaHref}">${card1CtaText}</a>
        </article>
        <article class="finance-card" data-anim>
          <span class="label finance-card__eyebrow">Finance</span>
          <h3 class="title finance-card__title">${card2Title}</h3>
          <p class="body-copy finance-card__body">${card2Body}</p>
          <a class="btn btn-primary finance-card__cta" href="${card2CtaHref}">${card2CtaText}</a>
        </article>
        <article class="finance-card" data-anim>
          <span class="label finance-card__eyebrow">Finance</span>
          <h3 class="title finance-card__title">${card3Title}</h3>
          <p class="body-copy finance-card__body">${card3Body}</p>
          <a class="btn btn-primary finance-card__cta" href="${card3CtaHref}">${card3CtaText}</a>
        </article>
      </div>
    </div>
  `;
}
