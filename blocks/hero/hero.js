export default function decorate(block) {
  const rows = [...block.children];
  const iconImg = rows[0]?.querySelector('img, picture');
  const productName = rows[1]?.textContent?.trim();
  const heading = rows[2]?.querySelector('h1, h2, h3') || rows[2];
  const headingText = heading?.textContent?.trim() || heading?.innerHTML;
  const body = rows[3]?.textContent?.trim();
  const ctaLink = rows[4]?.querySelector('a');

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container';

  // Logo lockup
  const logo = document.createElement('div');
  logo.className = 'hero-logo';
  if (iconImg) {
    const img = iconImg.cloneNode(true);
    logo.append(img);
  }
  if (productName) {
    const span = document.createElement('span');
    span.textContent = productName;
    logo.append(span);
  }
  container.append(logo);

  // Title
  const h1 = document.createElement('h1');
  h1.className = 'hero-title';
  h1.textContent = headingText || '';
  container.append(h1);

  // Body
  if (body) {
    const p = document.createElement('p');
    p.className = 'hero-body';
    p.textContent = body;
    container.append(p);
  }

  // CTAs
  if (ctaLink) {
    const ctas = document.createElement('div');
    ctas.className = 'hero-ctas';
    const a = ctaLink.cloneNode(true);
    a.className = 'btn btn--primary';
    ctas.append(a);
    container.append(ctas);
  }

  block.append(container);
}
