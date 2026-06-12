import { getMetadata } from '../../scripts/aem.js';

/**
 * Static-fragment footer loader (replaces the boilerplate footer decorator).
 *
 * Hybrid conversions keep the footer as committed static markup (code-managed
 * chrome, not DA-authored). The fragment is chosen by the page's `template`
 * metadata and lives in the code bus at /fragments/<template>/footer.html
 * (flat /fragments/footer.html if no template is set).
 */
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
