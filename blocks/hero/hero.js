/** Create an element with a class name. */
function el(tag, className) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
}

/**
 * Extract CTA links from the authored cell. EDS may have
 * already decorated <strong><a> as .button.primary and
 * <em><a> as .button.secondary, or they may still be raw.
 */
function buildCtas(cell, target) {
  const links = cell.querySelectorAll('a');
  links.forEach((a) => {
    const clone = document.createElement('a');
    clone.href = a.href;
    clone.textContent = a.textContent;

    const isStrong = a.closest('strong')
      || a.classList.contains('primary');
    const isEm = a.closest('em')
      || a.classList.contains('secondary');

    if (isStrong) {
      clone.className = 'btn btn--primary';
    } else if (isEm) {
      clone.className = 'btn btn--outline';
    } else {
      clone.className = 'btn btn--primary';
    }
    target.append(clone);
  });
}

/**
 * Hero block — split variant (text-only, no image).
 *
 * Content model (DA rows):
 *   Row 0: Logo icon <img>
 *   Row 1: Logo label text
 *   Row 2: <h1> heading
 *   Row 3: CTAs — <strong><a> primary + <em><a> secondary
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const logoIcon = rows[0]?.querySelector('img');
  const logoLabel = rows[1]?.textContent?.trim() ?? '';
  const heading = rows[2]?.querySelector('h1')
    ?? rows[2]?.firstElementChild;
  const ctaCell = rows[3]?.firstElementChild;

  block.textContent = '';
  block.classList.add('hero--split', 'hero--split-noimage');

  const container = el('div', 'container');
  const split = el('div', 'hero-split');
  const copy = el('div', 'hero-split__copy');

  // Logo lockup
  const logo = el('div', 'hero-split__logo');
  if (logoIcon) {
    const img = document.createElement('img');
    img.src = logoIcon.src;
    img.alt = logoIcon.alt || '';
    logo.append(img);
  }
  if (logoLabel) {
    const span = document.createElement('span');
    span.textContent = logoLabel;
    logo.append(span);
  }
  copy.append(logo);

  // Heading
  if (heading) {
    const h1 = document.createElement('h1');
    h1.className = 'hero-split__title';
    h1.textContent = heading.textContent;
    copy.append(h1);
  }

  // CTAs
  if (ctaCell) {
    const actions = el('div', 'hero-split__actions');
    buildCtas(ctaCell, actions);
    copy.append(actions);
  }

  split.append(copy);
  container.append(split);
  block.append(container);
}
