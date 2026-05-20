/* Tabs panel switcher — extracted from inline <script> in the source page. */
(function attachTabsSwitcher() {
  const section = document.querySelector('main section.c-tabs');
  if (!section) return;
  section.addEventListener('click', (e) => {
    const btn = e.target.closest('.c-tabs__btn');
    if (!btn) return;
    const i = btn.getAttribute('data-tab');
    section.querySelectorAll('.c-tabs__btn').forEach((b) => {
      const active = b.getAttribute('data-tab') === i;
      b.setAttribute('aria-selected', active);
      b.style.color = active ? '#0f0d0c' : '#666';
      b.style.borderBottom = active ? '2px solid #0f0d0c' : '2px solid transparent';
    });
    section.querySelectorAll('[data-panel]').forEach((p) => {
      p.style.display = p.getAttribute('data-panel') === i ? 'grid' : 'none';
    });
  });
})();
