export default async function decorate(block) {
  const resp = await fetch('/fragments/express/header.html');
  if (!resp.ok) return;
  block.innerHTML = await resp.text();
  const nav = block.querySelector('#nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }
}
