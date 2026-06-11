import { getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  const template = getMetadata('template');
  const path = template
    ? `/fragments/${template}/footer.html`
    : '/fragments/footer.html';
  const resp = await fetch(`${window.hlx.codeBasePath}${path}`);
  if (!resp.ok) {
    // eslint-disable-next-line no-console
    console.warn(`[footer] fragment not found at ${path}`);
    return;
  }
  block.innerHTML = await resp.text();
}
