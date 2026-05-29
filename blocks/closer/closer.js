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
      clone.style.background = '#fff';
      clone.style.color = '#000';
    } else if (isEm) {
      clone.className = 'btn btn--outline';
      clone.style.borderColor = 'rgba(255,255,255,0.6)';
      clone.style.color = '#fff';
    } else {
      clone.className = 'btn btn--primary';
      clone.style.background = '#fff';
      clone.style.color = '#000';
    }
    target.append(clone);
  });
}

/**
 * Closer block — dark CTA section.
 *
 * Content model (DA rows):
 *   Row 0: <h2> heading (single cell)
 *   Row 1: CTAs — <strong><a> primary + <em><a> secondary (single cell)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const headingCell = rows[0]?.querySelector('div');
  const ctaCell = rows[1]?.querySelector('div');

  const heading = headingCell?.querySelector('h2')
    ?? headingCell?.firstElementChild;
  const headingText = heading?.textContent?.trim()
    ?? headingCell?.textContent?.trim() ?? '';

  block.textContent = '';

  const inner = el('div', 'closer__inner foreground');
  const copy = el('div', 'closer__copy');

  if (headingText) {
    const h2 = document.createElement('h2');
    h2.textContent = headingText;
    copy.append(h2);
  }

  inner.append(copy);

  // CTAs
  if (ctaCell) {
    const actions = el('div', 'closer__actions');
    buildCtas(ctaCell, actions);
    inner.append(actions);
  }

  block.append(inner);
}
