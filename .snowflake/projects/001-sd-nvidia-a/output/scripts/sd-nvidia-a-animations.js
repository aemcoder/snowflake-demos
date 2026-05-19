  // ──────────────────────────────────────────────────────────────────────────
  // HERO CAROUSEL — auto-advance with WCAG 2.2.2 pause control.
  // ──────────────────────────────────────────────────────────────────────────
  (function() {
    const hero = document.getElementById('home-hero');
    if (!hero) return;
    const slides = hero.querySelectorAll('.hero-slide');
    const tabs = hero.querySelectorAll('.hero-tab');
    const pauseBtn = hero.querySelector('.hero-pause');
    const ADVANCE_MS = 7000;
    let current = 0;
    let timer = null;
    let userPaused = false;

    function show(idx) {
      slides.forEach(function(s, i) { s.classList.toggle('is-active', i === idx); });
      tabs.forEach(function(t, i) {
        t.classList.toggle('is-active', i === idx);
        t.setAttribute('aria-selected', i === idx ? 'true' : 'false');
        t.setAttribute('tabindex', i === idx ? '0' : '-1');
      });
      // Re-trigger CSS animation by removing and re-adding the active class on the progress element
      var activeTab = tabs[idx];
      if (activeTab) {
        var progress = activeTab.querySelector('.hero-tab-progress');
        if (progress) {
          progress.style.animation = 'none';
          // Force reflow
          progress.offsetHeight;
          progress.style.animation = '';
        }
      }
      current = idx;
    }
    function next() { show((current + 1) % slides.length); }
    function start() {
      if (userPaused) return;
      stop();
      timer = setInterval(next, ADVANCE_MS);
      hero.classList.remove('is-paused');
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      hero.classList.add('is-paused');
    }

    // Auto-pause on hover, focus, and reduced-motion
    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', function() { if (!userPaused) start(); });
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', function(e) { if (!hero.contains(e.relatedTarget) && !userPaused) start(); });

    // Tab click → switch slide and reset autoplay
    tabs.forEach(function(t, i) {
      t.addEventListener('click', function() { show(i); start(); });
      t.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); var n = (i + 1) % slides.length; show(n); tabs[n].focus(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); var n = (i - 1 + slides.length) % slides.length; show(n); tabs[n].focus(); }
      });
    });

    // Pause button (WCAG 2.2.2 mandatory pause control)
    pauseBtn.addEventListener('click', function() {
      userPaused = !userPaused;
      if (userPaused) {
        stop();
        pauseBtn.setAttribute('aria-pressed', 'true');
        pauseBtn.setAttribute('aria-label', 'Resume carousel autoplay');
        pauseBtn.textContent = '▶';
      } else {
        start();
        pauseBtn.setAttribute('aria-pressed', 'false');
        pauseBtn.setAttribute('aria-label', 'Pause carousel autoplay');
        pauseBtn.textContent = '⏸';
      }
    });

    // Reduced motion: skip auto-advance
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      userPaused = true;
      pauseBtn.setAttribute('aria-pressed', 'true');
      pauseBtn.setAttribute('aria-label', 'Resume carousel autoplay');
      pauseBtn.textContent = '▶';
      stop();
    } else {
      start();
    }
  })();

  // ──────────────────────────────────────────────────────────────────────────
  // THEME CAROUSELS — scroll-snap horizontal scrollers with arrow controls.
  // ──────────────────────────────────────────────────────────────────────────
  (function() {
    document.querySelectorAll('.theme-section').forEach(function(section) {
      const track = section.querySelector('.theme-carousel-track');
      const prev = section.querySelector('.theme-arrow-prev');
      const next = section.querySelector('.theme-arrow-next');
      if (!track || !prev || !next) return;
      // Scroll by the visible group: track.clientWidth covers exactly the N visible tiles + their gaps
      function pageWidth() {
        return track.clientWidth;
      }
      prev.addEventListener('click', function() { track.scrollBy({ left: -pageWidth(), behavior: 'smooth' }); });
      next.addEventListener('click', function() { track.scrollBy({ left:  pageWidth(), behavior: 'smooth' }); });
      // Keyboard arrow-key navigation on the track (WCAG 2.1.1 Keyboard)
      // Make the track focusable so the listener catches keys
      track.setAttribute('tabindex', '0');
      track.addEventListener('keydown', function(e) {
        switch (e.key) {
          case 'ArrowLeft':  e.preventDefault(); track.scrollBy({ left: -pageWidth(), behavior: 'smooth' }); break;
          case 'ArrowRight': e.preventDefault(); track.scrollBy({ left:  pageWidth(), behavior: 'smooth' }); break;
          case 'Home':       e.preventDefault(); track.scrollTo({ left: 0, behavior: 'smooth' }); break;
          case 'End':        e.preventDefault(); track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' }); break;
        }
      });
      // Disable arrows at edges
      function updateArrowState() {
        const max = track.scrollWidth - track.clientWidth - 4;
        prev.disabled = track.scrollLeft <= 4;
        next.disabled = track.scrollLeft >= max;
      }
      track.addEventListener('scroll', updateArrowState, { passive: true });
      window.addEventListener('resize', updateArrowState);
      updateArrowState();
    });
  })();

  // ──────────────────────────────────────────────────────────────────────────
  // v4 DELIGHT
  // ──────────────────────────────────────────────────────────────────────────

  // 2. Scroll-driven section reveal — IntersectionObserver, prefers-reduced-motion safe
  (function() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sections = document.querySelectorAll('.theme-section');
    sections.forEach(function(s) { s.classList.add('reveal-init'); });
    if (reduced || !('IntersectionObserver' in window)) {
      sections.forEach(function(s) { s.classList.add('reveal-in'); });
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    sections.forEach(function(s) { obs.observe(s); });
  })();

  // 3. Hero countdown — ticks down per slide, syncs with the auto-advance interval
  (function() {
    var hero = document.getElementById('home-hero');
    if (!hero) return;
    var countdown = hero.querySelector('.hero-countdown');
    if (!countdown) return;
    var ADVANCE_MS = 7000;
    var remaining = 7;
    var ticker = null;
    function paint(secs) {
      countdown.firstChild.textContent = (hero.classList.contains('is-paused') ? 'PAUSED · ' : 'AUTOPLAY · ') + secs;
    }
    function start() {
      stop();
      remaining = 7;
      paint(remaining);
      ticker = setInterval(function() {
        remaining = remaining > 1 ? remaining - 1 : 7;
        paint(remaining);
      }, 1000);
    }
    function stop() {
      if (ticker) { clearInterval(ticker); ticker = null; }
      paint(remaining);
    }
    // Observe state changes by polling pause class — minimal interference with existing JS
    var lastPaused = false;
    setInterval(function() {
      var paused = hero.classList.contains('is-paused');
      if (paused !== lastPaused) {
        lastPaused = paused;
        if (paused) stop(); else start();
      }
    }, 200);
    // Reset countdown when active slide changes
    var slides = hero.querySelectorAll('.hero-slide');
    var lastActive = -1;
    setInterval(function() {
      var active = -1;
      slides.forEach(function(s, i) { if (s.classList.contains('is-active')) active = i; });
      if (active !== lastActive) { lastActive = active; if (!hero.classList.contains('is-paused')) start(); }
    }, 250);
    // Initial start (deferred so existing JS can paint first)
    setTimeout(function() { if (!hero.classList.contains('is-paused')) start(); else paint(remaining); }, 100);
  })();

  // 5. Dev console greeting — for the curious developer
  (function() {
    if (typeof console === 'undefined' || !console.log) return;
    var brand = '#76b900';
    var black = '#000';
    var bigStyle = 'background:' + black + ';color:' + brand + ';font-weight:700;font-size:14px;padding:10px 14px;letter-spacing:0.04em;font-family:Arial,sans-serif;';
    var smStyle = 'color:#666;font-size:12px;padding:8px 0;font-family:Menlo,monospace;line-height:1.5;';
    console.log('%cNVIDIA · accelerated computing', bigStyle);
    console.log(
      '%cBuilt with NVIDIA-NALA + NVIDIA green (#76b900).\n' +
      'Engineering this site? See careers at https://www.nvidia.com/en-us/about-nvidia/careers/',
      smStyle
    );
  })();
</script>
