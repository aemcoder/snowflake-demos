/**
 * Hero Split block — text-left hero with logo, headline, and CTA buttons.
 * Content model (DA rows):
 *   Row 0: Logo <img> + label text
 *   Row 1: <h1> heading
 *   Row 2: CTA links (primary/secondary buttons)
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [logoRow, titleRow, ctaRow] = rows;

  block.textContent = '';
  block.classList.add('hero', 'hero--split', 'hero--split-noimage');

  const copy = document.createElement('div');
  copy.className = 'hero-split__copy';

  // Logo
  if (logoRow) {
    const logo = document.createElement('div');
    logo.className = 'hero-split__logo';
    const img = logoRow.querySelector('img');
    if (img) {
      img.setAttribute('width', '28');
      img.setAttribute('height', '28');
      logo.appendChild(img);
    }
    const text = logoRow.textContent.trim();
    if (text) {
      const span = document.createElement('span');
      span.textContent = text;
      logo.appendChild(span);
    }
    copy.appendChild(logo);
  }

  // Title
  if (titleRow) {
    const h1 = titleRow.querySelector('h1');
    if (h1) {
      h1.className = 'hero-split__title';
      copy.appendChild(h1);
    }
  }

  // CTAs
  if (ctaRow) {
    const actions = document.createElement('div');
    actions.className = 'hero-split__actions';
    const links = ctaRow.querySelectorAll('a');
    links.forEach((a) => {
      // Handle EDS-decorated buttons or raw strong/em wrapped links
      const isStrong = a.closest('strong') || a.classList.contains('primary');
      a.classList.remove('button', 'primary', 'secondary');
      a.className = isStrong ? 'btn btn--primary' : 'btn btn--outline';
      actions.appendChild(a);
    });
    copy.appendChild(actions);
  }

  block.appendChild(copy);
}
