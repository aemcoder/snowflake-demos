/**
 * Brands block — label + row of brand logos.
 * Content model (DA rows):
 *   Row 0: Label text
 *   Rows 1-N: One <img> per row (brand logo)
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';

  const inner = document.createElement('div');
  inner.className = 'brands__inner parallax-move-up';

  // Label
  const labelRow = rows.shift();
  if (labelRow) {
    const label = document.createElement('div');
    label.className = 'brands__label';
    label.textContent = labelRow.textContent.trim();
    inner.appendChild(label);
  }

  // Logos
  const logos = document.createElement('div');
  logos.className = 'brands__logos';

  rows.forEach((row) => {
    const img = row.querySelector('img');
    if (img) {
      img.loading = 'lazy';
      logos.appendChild(img);
    }
  });

  inner.appendChild(logos);
  block.appendChild(inner);
}
