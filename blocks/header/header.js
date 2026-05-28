/**
 * Loads the Frescopa header (promo strip + sticky nav) from a static fragment.
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const resp = await fetch(`${window.hlx.codeBasePath}/fragments/frescopa/header.html`);
  if (!resp.ok) return;
  block.innerHTML = await resp.text();
}
