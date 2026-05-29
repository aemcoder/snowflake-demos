export default async function decorate(block) {
  const template = document.querySelector('main')?.dataset?.overlay || 'express';
  const path = `/fragments/${template}/footer.html`;
  const resp = await fetch(`${window.hlx.codeBasePath}${path}`);
  if (!resp.ok) return;
  block.innerHTML = await resp.text();
}
