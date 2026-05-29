export default function decorate(block) {
  const rows = [...block.children];
  const img = rows[0]?.querySelector('img');
  const quoteText = rows[1]?.textContent?.trim();
  const attr = rows[2]?.textContent?.trim();

  block.textContent = '';
  block.classList.add('is-compound-sibling');

  const container = document.createElement('div');
  container.className = 'container parallax-move-up';

  const inner = document.createElement('div');
  inner.className = 'quote__inner';

  if (img) {
    img.className = 'quote__avatar';
    inner.append(img);
  }

  const textDiv = document.createElement('div');
  if (quoteText) {
    const p = document.createElement('p');
    p.className = 'quote__text';
    p.textContent = `"${quoteText.replace(/^[""]|[""]$/g, '')}"`;
    textDiv.append(p);
  }
  if (attr) {
    const attrP = document.createElement('p');
    attrP.className = 'quote__attr';
    attrP.textContent = attr;
    textDiv.append(attrP);
  }
  inner.append(textDiv);
  container.append(inner);
  block.append(container);
}
