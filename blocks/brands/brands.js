export default function decorate(block) {
  const rows = [...block.children];
  const label = rows[0]?.textContent?.trim();
  const logoImgs = [...block.querySelectorAll('img')];

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container parallax-move-up';

  const inner = document.createElement('div');
  inner.className = 'brands__inner';

  if (label) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'brands__label';
    labelDiv.textContent = label;
    inner.append(labelDiv);
  }

  if (logoImgs.length) {
    const logos = document.createElement('div');
    logos.className = 'brands__logos';
    logoImgs.forEach((img) => logos.append(img));
    inner.append(logos);
  }

  container.append(inner);
  block.append(container);
}
