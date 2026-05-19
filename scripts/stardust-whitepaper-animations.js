// Restrained motion — fade-in on enter
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.18 });
document.querySelectorAll('section.b > .container > *, .ba, .pipeline, .arch, .logos .row').forEach(el => {
  el.classList.add('reveal'); io.observe(el);
});
