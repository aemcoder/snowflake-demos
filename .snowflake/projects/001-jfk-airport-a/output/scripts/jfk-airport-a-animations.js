  // === ANIMATE (v4): scroll-triggered section reveals ===
  // Each .reveal element fades + slides up when it enters the viewport.
  // Children with declared :nth-child stagger inherit the keyframe with a delay.
  // Honors prefers-reduced-motion (fall-through to instant visible state).
  (function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); el.style.opacity = 1; });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  })();

  // === DELIGHT (v3): count-up on intersection ===
  // Each .num-count span counts from 0 to its data-target the first time it enters
  // the viewport. Honors prefers-reduced-motion. Keeps the static value if JS fails.
  (function () {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    var ease = function (t) { return 1 - Math.pow(1 - t, 4); }; // ease-out-quart
    var animate = function (el) {
      var target = parseFloat(el.dataset.target);
      var suffix = el.dataset.suffix || '';
      if (!Number.isFinite(target)) return;
      var duration = 900 + Math.min(target, 1000); // larger numbers take a hair longer
      var start = performance.now();
      var step = function (now) {
        var t = Math.min(1, (now - start) / duration);
        var v = Math.round(target * ease(t));
        el.textContent = v + suffix;
        if (t < 1) requestAnimationFrame(step);
      };
      el.textContent = '0' + suffix;
      requestAnimationFrame(step);
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.num-count').forEach(function (el) { io.observe(el); });
  })();

  // === OVERDRIVE (v7): View Transitions on audience-tile selection ===
  // Click an audience tile to swap the active task panel with a coordinated morph.
  // document.startViewTransition() captures the before/after DOM and tweens shared
  // view-transition-name elements between the two states. Falls back to instant
  // DOM swap when the API is unavailable or reduced-motion is set.
  (function () {
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function applySwitch(id) {
      document.querySelectorAll('.audience-tile').forEach(function (t) {
        t.classList.toggle('active', t.dataset.audience === id);
      });
      document.querySelectorAll('.task-panel[data-audience]').forEach(function (p) {
        p.hidden = p.dataset.audience !== id;
      });
    }

    function switchAudience(id) {
      if (document.startViewTransition && !prefersReduced) {
        document.startViewTransition(function () { applySwitch(id); });
      } else {
        applySwitch(id);
      }
    }

    document.querySelectorAll('.audience-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var id = tile.dataset.audience;
        if (!id) return;
        switchAudience(id);
      });
    });
  })();

  // === DELIGHT: "/" focuses the destination input, search-driven app pattern ===
  (function () {
    var dest = document.getElementById('dep-dest');
    if (!dest) return;
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/') return;
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      e.preventDefault();
      dest.focus();
      dest.select();
    });
  })();

  // === DELIGHT: a quiet message for the curious ===
  if (typeof console !== 'undefined' && console.log) {
    console.log('%cJFK runs on people.', 'font: 700 18px "Helvetica Neue", sans-serif; color: #011565;');
    console.log('%cThanks for taking a look at the wires. Press / to search.', 'color: #475569;');
  }
</script>
