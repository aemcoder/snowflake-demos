/**
 * Hero block — product logo lockup, headline, body, and CTA buttons.
 *
 * Authored rows:
 *   0  product icon (img)
 *   1  product label text
 *   2  heading (h1/h2/h3)
 *   3  body paragraph
 *   4  CTA links (strong>a = primary, em>a = outline)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const iconImg = rows[0]?.querySelector('img');
  const label = rows[1]?.textContent.trim();
  const heading = rows[2]?.querySelector('h1, h2, h3') || rows[2];
  const body = rows[3]?.textContent.trim();
  const ctaLinks = rows[4]?.querySelectorAll('a') || [];

  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'container';

  // Logo lockup
  const logo = document.createElement('div');
  logo.className = 'hero-logo';
  if (iconImg) {
    logo.append(iconImg.cloneNode(true));
  }
  const labelSpan = document.createElement('span');
  labelSpan.textContent = label || '';
  logo.append(labelSpan);
  container.append(logo);

  // Title
  const h1 = document.createElement('h1');
  h1.className = 'hero-title';
  h1.textContent = heading?.textContent?.trim() || '';
  container.append(h1);

  // Body
  if (body) {
    const p = document.createElement('p');
    p.className = 'hero-body';
    p.textContent = body;
    container.append(p);
  }

  // CTAs
  if (ctaLinks.length) {
    const ctas = document.createElement('div');
    ctas.className = 'hero-ctas';
    [...ctaLinks].forEach((a) => {
      const link = a.cloneNode(true);
      link.classList.remove('button', 'primary', 'secondary');
      if (a.closest('strong') || a.classList.contains('primary')) {
        link.className = 'btn btn--primary';
      } else if (a.closest('em') || a.classList.contains('secondary')) {
        link.className = 'btn btn--outline';
      } else {
        link.className = 'btn btn--primary';
      }
      ctas.append(link);
    });
    container.append(ctas);
  }

  block.append(container);
}
