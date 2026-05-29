/**
 * Loads the Photoshop Features footer fragment from the code bus.
 * Fragment lives at /fragments/photoshop-features/footer.html.
 */
export default async function decorate(block) {
  const resp = await fetch(`${window.hlx.codeBasePath}/fragments/photoshop-features/footer.html`);
  if (!resp.ok) return;
  block.innerHTML = await resp.text();
}
