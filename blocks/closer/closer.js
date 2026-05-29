/**
 * Closer block — dark CTA section with heading and action buttons.
 * Content model (DA rows):
 *   Row 0: <h2> heading
 *   Row 1: CTA links (2 buttons)
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  block.textContent = '';
  block.classList.add('parallax-garage-door-reveal');

  const inner = document.createElement('div');
  inner.className = 'closer__inner foreground';

  // Copy with heading
  const copy = document.createElement('div');
  copy.className = 'closer__copy';
  const headingRow = rows.shift();
  if (headingRow) {
    const h2 = headingRow.querySelector('h2');
    if (h2) copy.appendChild(h2);
  }
  inner.appendChild(copy);

  // Actions
  const ctaRow = rows.shift();
  if (ctaRow) {
    const actions = document.createElement('div');
    actions.className = 'closer__actions';
    actions.style.display = 'flex';
    actions.style.justifyContent = 'center';
    actions.style.gap = '12px';
    actions.style.marginTop = '32px';

    const links = ctaRow.querySelectorAll('a');
    links.forEach((a, i) => {
      const isStrong = a.closest('strong') || a.classList.contains('primary');
      a.classList.remove('button', 'primary', 'secondary');

      if (isStrong || i === 0) {
        a.className = 'btn btn--primary';
        a.style.background = '#fff';
        a.style.color = '#000';
      } else {
        a.className = 'btn btn--outline';
        a.style.borderColor = 'rgba(255,255,255,0.6)';
        a.style.color = '#fff';
      }
      actions.appendChild(a);
    });

    inner.appendChild(actions);
  }

  block.appendChild(inner);
}
