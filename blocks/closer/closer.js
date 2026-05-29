export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows[0]?.querySelector('h2')?.textContent?.trim()
    || rows[0]?.textContent?.trim();
  const ctas = [...block.querySelectorAll('a')];

  block.textContent = '';
  block.classList.add('parallax-garage-door-reveal');

  const inner = document.createElement('div');
  inner.className = 'closer__inner foreground';

  const copy = document.createElement('div');
  copy.className = 'closer__copy';

  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading;
    copy.append(h2);
  }

  inner.append(copy);

  if (ctas.length) {
    const actions = document.createElement('div');
    actions.className = 'closer__actions';
    actions.style.cssText = 'display:flex;justify-content:center;gap:12px;margin-top:32px';
    ctas.forEach((cta, i) => {
      if (i === 0) {
        cta.className = 'btn btn--primary';
        cta.style.cssText = 'background:#fff;color:#000';
      } else {
        cta.className = 'btn btn--outline';
        cta.style.cssText = 'border-color:rgb(255 255 255/60%);color:#fff';
      }
      actions.append(cta);
    });
    inner.append(actions);
  }

  block.append(inner);
}
