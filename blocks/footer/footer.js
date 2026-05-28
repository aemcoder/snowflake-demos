/**
 * Loads the Aman footer from a static fragment.
 * @param {Element} block
 */
export default async function decorate(block) {
  const resp = await fetch('/fragments/aman/footer.html');
  if (!resp.ok) return;
  block.innerHTML = await resp.text();
}
