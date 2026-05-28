export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: eyebrow text
  const eyebrow = rows[0]?.textContent.trim() || 'Trusted Partners';

  // Rows 1–N: logo images
  const logos = [];
  for (let i = 1; i < rows.length; i += 1) {
    const img = rows[i]?.querySelector('img');
    if (img) logos.push({ src: img.src, alt: img.alt });
  }

  block.textContent = '';

  const logoHTML = logos.map(
    (logo) => `<img src="${logo.src}" alt="${logo.alt}" loading="lazy">`,
  ).join('');

  block.innerHTML = `
    <div class="container">
      <div class="brand-logos__head" data-anim>
        <span class="brand-logos__eyebrow">${eyebrow}</span>
      </div>
      <div class="logo-track">
        ${logoHTML}
      </div>
    </div>
  `;
}
