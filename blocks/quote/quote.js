/**
 * Quote block — testimonial with avatar, quote text, and attribution.
 * Content model (DA rows):
 *   Row 0: Avatar <img>
 *   Row 1: Quote text
 *   Row 2: Attribution text
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [avatarRow, textRow, attrRow] = rows;

  block.textContent = '';

  const inner = document.createElement('div');
  inner.className = 'quote__inner parallax-move-up';

  // Avatar
  if (avatarRow) {
    const img = avatarRow.querySelector('img');
    if (img) {
      img.className = 'quote__avatar';
      img.loading = 'lazy';
      inner.appendChild(img);
    }
  }

  // Text container
  const textWrap = document.createElement('div');

  if (textRow) {
    const quoteText = document.createElement('p');
    quoteText.className = 'quote__text';
    quoteText.textContent = textRow.textContent.trim();
    textWrap.appendChild(quoteText);
  }

  if (attrRow) {
    const attr = document.createElement('p');
    attr.className = 'quote__attr';
    attr.textContent = attrRow.textContent.trim();
    textWrap.appendChild(attr);
  }

  inner.appendChild(textWrap);
  block.appendChild(inner);
}
