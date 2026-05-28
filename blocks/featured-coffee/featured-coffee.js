/**
 * Featured Coffee block — porcelain ground, photo left + content right.
 * Rows: 0 photo | 1 eyebrow | 2 heading | 3 body | 4 primary CTA.
 * @param {Element} block The featured-coffee block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  const photo = rows[0]?.querySelector('picture, img');
  const eyebrow = rows[1]?.textContent.trim() || '';
  const heading = rows[2]?.textContent.trim() || '';
  const body = rows[3]?.textContent.trim() || '';
  const cta = rows[4]?.querySelector('a');
  if (cta) cta.className = 'btn btn-primary-on-porcelain';

  const photoFrame = document.createElement('div');
  photoFrame.className = 'photo-frame';
  if (photo) photoFrame.append(photo);

  const content = document.createElement('div');
  content.className = 'content';
  if (eyebrow) {
    const eb = document.createElement('span');
    eb.className = 'eyebrow';
    eb.textContent = eyebrow;
    content.append(eb);
  }
  if (heading) {
    const h3 = document.createElement('h3');
    h3.className = 'editorial';
    h3.textContent = heading;
    content.append(h3);
  }
  if (body) {
    const p = document.createElement('p');
    p.textContent = body;
    content.append(p);
  }
  if (cta) content.append(cta);

  const container = document.createElement('div');
  container.className = 'container';
  container.append(photoFrame, content);

  block.textContent = '';
  block.append(container);
}
