(function loadLenis() {
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js';
  s.onload = main;
  document.head.appendChild(s);

  function main() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }
}());

(function scrollCards() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const easeOut3 = (t) => 1 - (1 - t) ** 3;
  const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  const items = [];
  const grids = document.querySelectorAll('.merch-cards, .acrobat-cards');
  if (!grids.length) return;
  grids.forEach((grid) => {
    const triggerTop = grid.getBoundingClientRect().top + window.scrollY;
    const cards = [...grid.children].filter((c) => c.matches('.merch-card, .acrobat-card'));
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      items.push({ el: card, triggerTop, staggerDelay: i * 0.10 });
    });
  });
  const tick = () => {
    const sY = window.__lenis ? window.__lenis.scroll : window.scrollY;
    const vh = window.innerHeight;
    for (const it of items) {
      if (it.el.dataset.tabEntering === '1') continue;
      const raw = (sY + vh * 1.1 - it.triggerTop) / (vh * 0.5);
      const p = easeOut3(clamp(raw - it.staggerDelay, 0, 1));
      it.el.style.opacity = String(p);
      it.el.style.transform = `translateY(${((1 - p) * 40).toFixed(2)}px)`;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}());
