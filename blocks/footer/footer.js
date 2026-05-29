export default async function decorate(block) {
  const resp = await fetch(`${window.hlx.codeBasePath}/fragments/express/footer.html`);
  if (!resp.ok) return;
  block.innerHTML = await resp.text();
}
