/**
 * Loads the Frescopa footer from a static fragment.
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const resp = await fetch(`${window.hlx.codeBasePath}/fragments/frescopa/footer.html`);
  if (!resp.ok) return;
  block.innerHTML = await resp.text();
}
