export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: background image
  const bgImg = rows[0]?.querySelector('img');
  const bgSrc = bgImg?.src || '';

  // Row 1: eyebrow text
  const eyebrow = rows[1]?.textContent.trim() || '';

  // Row 2: headline accent line (yellow)
  const headlineAccent = rows[2]?.textContent.trim() || '';

  // Row 3: headline main line (white)
  const headlineMain = rows[3]?.textContent.trim() || '';

  // Row 4: CTA link
  const ctaLink = rows[4]?.querySelector('a');
  const ctaHref = ctaLink?.href || '#';
  const ctaText = ctaLink?.textContent.trim() || '';

  block.textContent = '';

  if (bgSrc) {
    block.style.setProperty('--hero-bg', `url('${bgSrc}')`);
  }

  block.innerHTML = `
    <div class="container hero__inner">
      <span class="label hero__eyebrow">${eyebrow}</span>
      <h1 class="display hero__headline">
        <span class="hero__headline-line hero__headline-line--accent">${headlineAccent}</span>
        <span class="hero__headline-line">${headlineMain}</span>
      </h1>
      <p class="hero__supporting">
        <span class="hero__sup-accent">PARTNER WITH WHEELER</span> FOR YOUR EQUIPMENT MAINTENANCE AND GET<br>
        <em class="hero__sup-italic"><span class="hero__sup-accent">GUARANTEED PARTS AVAILABILITY, PRIORITIZED SERVICE, FASTER REBUILDS,</span> AND MORE.</em>
      </p>
      <div class="hero__actions">
        <a class="btn btn-pill-light" href="${ctaHref}">${ctaText}</a>
      </div>
    </div>
  `;
}
