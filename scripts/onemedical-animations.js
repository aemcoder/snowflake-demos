// Sticky header subtle shadow on scroll
const hdr = document.querySelector('.site-header');
if (hdr) {
  window.addEventListener('scroll', () => hdr.classList.toggle('scrolled', window.scrollY > 8));
}
