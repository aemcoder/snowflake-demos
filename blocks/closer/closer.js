/**
 * Closer block — dark CTA section with heading, body, and action buttons.
 *
 * Content model (authored rows):
 *   Row 0: H2 heading
 *   Row 1: Body paragraph (may contain inline <a> links — HTML preserved)
 *   Row 2: CTA links (<strong><a> = primary, <em><a> = secondary)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const headingEl = rows[0]?.querySelector('h1, h2, h3');
  const bodyCell = rows[1]?.querySelector('div') || rows[1];
  const ctaLinks = rows[2]?.querySelectorAll('a') || [];

  block.textContent = '';

  const inner = document.createElement('div');
  inner.className = 'closer__inner foreground';

  const copy = document.createElement('div');
  copy.className = 'closer__copy';

  if (headingEl) {
    const h2 = document.createElement('h2');
    h2.textContent = headingEl.textContent.trim();
    copy.append(h2);
  }

  if (bodyCell) {
    const p = document.createElement('p');
    p.className = 'closer__body';
    p.innerHTML = bodyCell.innerHTML;
    copy.append(p);
  }

  inner.append(copy);

  // CTA buttons
  if (ctaLinks.length) {
    const actions = document.createElement('div');
    actions.className = 'closer__actions';
    actions.style.cssText = 'display:flex;justify-content:center;gap:12px;margin-top:32px';

    [...ctaLinks].forEach((a, i) => {
      const link = a.cloneNode(true);
      link.classList.remove('button', 'primary', 'secondary');
      const isPrimary = i === 0
        || a.closest('strong')
        || a.classList.contains('primary');
      if (isPrimary) {
        link.className = 'btn btn--primary';
        link.style.cssText = 'background:#fff;color:#000';
      } else {
        link.className = 'btn btn--outline';
        link.style.cssText = 'border-color:rgba(255,255,255,0.6);color:#fff';
      }
      actions.append(link);
    });

    inner.append(actions);
  }

  block.append(inner);
}
