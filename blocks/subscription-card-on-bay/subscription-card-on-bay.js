/**
 * Subscription block — bay-deep rounded card, content left + photo right.
 * Rows: 0 eyebrow | 1 heading | 2 body | 3 primary CTA | 4 photo.
 * @param {Element} block The subscription-card-on-bay block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  const eyebrow = rows[0]?.textContent.trim() || '';
  const heading = rows[1]?.textContent.trim() || '';
  const body = rows[2]?.textContent.trim() || '';
  const cta = rows[3]?.querySelector('a');
  if (cta) cta.className = 'btn btn-primary-on-bay';
  const photo = rows[4]?.querySelector('picture, img');

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

  const photoFrame = document.createElement('div');
  photoFrame.className = 'photo-frame';
  if (photo) photoFrame.append(photo);

  const card = document.createElement('div');
  card.className = 'card';
  card.append(content, photoFrame);

  const container = document.createElement('div');
  container.className = 'container';
  container.append(card);

  block.textContent = '';
  block.append(container);
}
