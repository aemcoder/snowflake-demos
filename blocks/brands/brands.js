function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/**
 * Brands block — logo strip with label.
 *
 * Content model (DA rows):
 *   Row 0: Label text (single cell)
 *   Row 1: Brand logo images in a single cell
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const labelCell = rows[0]?.querySelector('div');
  const imagesCell = rows[1]?.querySelector('div');

  const labelText = labelCell?.textContent?.trim() ?? '';
  const images = imagesCell ? [...imagesCell.querySelectorAll('img')] : [];

  block.textContent = '';

  const inner = el('div', 'brands__inner');

  // Label
  if (labelText) {
    const label = el('div', 'brands__label');
    label.textContent = labelText;
    inner.append(label);
  }

  // Logos
  if (images.length) {
    const logos = el('div', 'brands__logos');
    images.forEach((img) => {
      const clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt || '';
      clone.loading = 'lazy';
      logos.append(clone);
    });
    inner.append(logos);
  }

  block.append(inner);
}
