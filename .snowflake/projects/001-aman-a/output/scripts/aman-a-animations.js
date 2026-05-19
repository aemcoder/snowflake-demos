(function () {
  var hdr = document.getElementById('siteHeader');
  if (!hdr) return;
  var threshold = window.innerHeight * 0.85;
  function onScroll() {
    if (window.scrollY > threshold) hdr.dataset.scrolled = 'true';
    else hdr.dataset.scrolled = 'false';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}());
