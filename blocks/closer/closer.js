export default function decorate(block) {
  const rows = [...block.children];
  const headingEl = rows[0]?.querySelector('h1, h2, h3');
  const headingHTML = headingEl?.innerHTML || rows[0]?.innerHTML || '';
  const bodyCell = rows[1];
  const bodyHTML = bodyCell?.innerHTML || '';
  const primaryCta = rows[2]?.querySelector('a');
  const secondaryCta = rows[3]?.querySelector('a');

  block.textContent = '';

  const inner = document.createElement('div');
  inner.className = 'closer-inner foreground';

  const copy = document.createElement('div');
  copy.className = 'closer-copy';

  const h2 = document.createElement('h2');
  h2.innerHTML = headingHTML;
  copy.append(h2);

  if (bodyHTML) {
    const p = document.createElement('p');
    p.className = 'closer-body';
    p.innerHTML = bodyHTML;
    copy.append(p);
  }

  inner.append(copy);

  if (primaryCta || secondaryCta) {
    const actions = document.createElement('div');
    actions.className = 'closer-actions';
    actions.style.cssText = 'display:flex;justify-content:center;gap:12px;margin-top:32px';

    if (primaryCta) {
      const a = primaryCta.cloneNode(true);
      a.className = 'btn btn--primary';
      a.style.cssText = 'background:#fff;color:#000';
      actions.append(a);
    }
    if (secondaryCta) {
      const a = secondaryCta.cloneNode(true);
      a.className = 'btn btn--outline';
      a.style.cssText = 'border-color:rgba(255,255,255,0.6);color:#fff';
      actions.append(a);
    }

    inner.append(actions);
  }

  block.append(inner);
}
