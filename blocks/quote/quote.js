export default function decorate(block) {
  const rows = [...block.children];

  const avatarRow = rows[0];
  const textRow = rows[1];
  const attrRow = rows[2];

  const inner = document.createElement('div');
  inner.className = 'quote__inner';

  // Avatar image
  const img = avatarRow?.querySelector('img');
  if (img) {
    img.className = 'quote__avatar';
    inner.append(img);
  }

  // Text wrapper (quote + attribution)
  const textWrap = document.createElement('div');

  const quoteText = textRow?.querySelector('p')
    || textRow?.firstElementChild?.firstElementChild;
  if (quoteText) {
    const p = document.createElement('p');
    p.className = 'quote__text';
    p.textContent = quoteText.textContent;
    textWrap.append(p);
  }

  const attrText = attrRow?.querySelector('p')
    || attrRow?.firstElementChild?.firstElementChild;
  if (attrText) {
    const p = document.createElement('p');
    p.className = 'quote__attr';
    p.textContent = attrText.textContent;
    textWrap.append(p);
  }

  inner.append(textWrap);

  block.textContent = '';
  block.append(inner);
}
