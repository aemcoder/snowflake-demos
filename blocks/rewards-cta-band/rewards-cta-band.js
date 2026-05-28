/**
 * Rewards CTA Band block — centered band on bay-deep.
 * Rows: 0 eyebrow | 1 heading | 2 body | 3 primary CTA.
 * @param {Element} block The rewards-cta-band block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  const eyebrow = rows[0]?.textContent.trim() || '';
  const heading = rows[1]?.textContent.trim() || '';
  const body = rows[2]?.textContent.trim() || '';
  const cta = rows[3]?.querySelector('a');
  if (cta) cta.className = 'btn btn-primary-on-bay';

  const container = document.createElement('div');
  container.className = 'container';

  if (eyebrow) {
    const eb = document.createElement('span');
    eb.className = 'eyebrow';
    eb.textContent = eyebrow;
    container.append(eb);
  }
  if (heading) {
    const h2 = document.createElement('h2');
    h2.className = 'editorial';
    h2.textContent = heading;
    container.append(h2);
  }
  if (body) {
    const p = document.createElement('p');
    p.textContent = body;
    container.append(p);
  }
  if (cta) container.append(cta);

  block.textContent = '';
  block.append(container);
}
