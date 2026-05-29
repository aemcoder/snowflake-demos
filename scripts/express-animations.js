(function () {
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js';
  s.onload = main;
  document.head.appendChild(s);

  function main() {
  // Lenis smooth scroll — same init as the designer's samples.
  // lerp:0.1 gives the buttery glide. Window-level scroll API still
  // works (and IntersectionObserver / view-timeline read scroll
  // position correctly), so existing animations are unaffected.
  // Respects prefers-reduced-motion automatically via Lenis's own
  // detection. Exposes window.__lenis for any script that wants to
  // read scroll position or programmatically scroll.
  (function () {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  })();

  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Photo-cards pan — cursor X position pans the track horizontally
  // (port of bizpro-hub's .stories component). If the track is wider
  // than the section, mousing in the left zone pans right (revealing
  // the left edge), right zone pans left, mouseleave returns to 0.
  // No-op when the track fits within the section.
  (function () {
    for (const section of document.querySelectorAll('.photo-cards-section')) {
      const viewport = section.querySelector('.photo-cards__viewport');
      const track = section.querySelector('.photo-cards__track');
      if (!viewport || !track) continue;
      const getOverflow = () => Math.max(0, track.scrollWidth - section.clientWidth);
      const pan = (x) => { track.style.transform = `translateX(${x}px)`; };
      viewport.addEventListener('mousemove', (e) => {
        const rect = viewport.getBoundingClientRect();
        const t = (e.clientX - rect.left) / rect.width;
        const range = getOverflow() / 2;
        if (range <= 0) return;
        // Map t in [0, 1] → [+range, -range] linearly so the pan tracks
        // the cursor (left edge: +range = reveal left, right edge:
        // -range = reveal right, middle: 0).
        pan(range - 2 * range * t);
      });
      viewport.addEventListener('mouseleave', () => pan(0));
    }
  })();

  // Hero-scroll-video — scroll-driven video hero (bizpro-hub design).
  // For each .hero-scroll, drive the video geometry + text/overlay
  // opacities via a rAF tick measuring window.scrollY relative to
  // the sticky's bounding rect. The next section's negative top-margin
  // makes it slide up over the video as you continue scrolling.
  (function () {
    for (const scrollEl of document.querySelectorAll('.hero-scroll')) {
      const sticky = scrollEl.querySelector('[data-hero-sticky]') || scrollEl.querySelector('.hero-sticky');
      const text = scrollEl.querySelector('[data-hero-text]') || scrollEl.querySelector('.hero-text');
      const vidWrap = scrollEl.querySelector('[data-hero-video-wrap]') || scrollEl.querySelector('.hero-video-wrap');
      const scrim = scrollEl.querySelector('[data-hero-scrim]') || scrollEl.querySelector('.hero-video-scrim');
      const overlay = scrollEl.querySelector('[data-hero-overlay]') || scrollEl.querySelector('.hero-video-overlay');
      const cover = scrollEl.nextElementSibling;
      const video = scrollEl.querySelector('video');
      if (!sticky || !text || !vidWrap) continue;
      let iL = 0, iT = 0, iW = 0, iH = 0, measured = false;
      const lerp = (a, b, t) => a + (b - a) * t;
      const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
      const easeOut3 = (t) => 1 - Math.pow(1 - t, 3);
      function measureInitial() {
        text.style.opacity = '1';
        text.style.transform = 'none';
        const vw = window.innerWidth;
        const m = vw >= 768 ? vw * 0.08333 : 24;
        iL = m;
        iW = vw - 2 * m;
        iH = iW * (600 / 1068);
        const sr = sticky.getBoundingClientRect();
        const tr = text.getBoundingClientRect();
        iT = tr.bottom - sr.top;
        measured = true;
      }
      function tick() {
        if (measured) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const finalH = vw * 0.5625;
          const scrollOffset = scrollEl.offsetTop;
          const rawP = clamp((window.scrollY - scrollOffset) / vh, 0, 1);
          const horizP = easeOut3(clamp(rawP * 2, 0, 1));
          const vertP = easeOut3(rawP);
          const vidLeft = lerp(iL, 0, horizP);
          const vidWidth = lerp(iW, vw, horizP);
          const vidHeight = lerp(iH, finalH, horizP);
          const vidTop = lerp(iT, 0, vertP);
          const leftProx = clamp(1 - vidLeft / 40, 0, 1);
          const topProx = clamp(1 - vidTop / 40, 0, 1);
          const radius = lerp(16, 0, Math.max(leftProx, topProx));
          vidWrap.style.left = vidLeft + 'px';
          vidWrap.style.top = vidTop + 'px';
          vidWrap.style.width = vidWidth + 'px';
          vidWrap.style.height = vidHeight + 'px';
          vidWrap.style.borderRadius = radius + 'px';
          const textP = clamp(rawP / 0.6, 0, 1);
          text.style.opacity = String(1 - textP);
          text.style.transform = 'translateY(' + (-40 * textP) + 'px)';
          const scrimIn = clamp((rawP - 0.25) / 0.6, 0, 1);
          const overlayIn = clamp((rawP - 0.35) / 0.6, 0, 1);
          let coverProgress = 0;
          if (cover) {
            const st = cover.getBoundingClientRect().top;
            coverProgress = clamp(1 - st / vh, 0, 1);
          }
          if (scrim) scrim.style.opacity = String(clamp(scrimIn - coverProgress, 0, 1));
          if (overlay) {
            overlay.style.opacity = String(clamp(overlayIn - coverProgress, 0, 1));
            overlay.style.transform = 'translateY(' + lerp(20, 0, overlayIn) + 'px)';
            overlay.style.pointerEvents = overlayIn > 0.5 ? 'auto' : 'none';
          }
        }
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(() => { measureInitial(); requestAnimationFrame(tick); });
      window.addEventListener('resize', () => { measured = false; measureInitial(); });
      // Pause/play
      const pauseBtn = scrollEl.querySelector('[data-hero-pause-btn]');
      if (pauseBtn && video) {
        pauseBtn.addEventListener('click', () => {
          if (video.paused) { video.play(); pauseBtn.setAttribute('aria-label', 'Pause'); }
          else { video.pause(); pauseBtn.setAttribute('aria-label', 'Play'); }
        });
      }
    }
  })();

  // Page TOC sticky behavior — hoist `[data-page-toc]` to body so its
  // positioning is page-relative, place it just below the hero by
  // default, then switch to fixed once the user scrolls past its
  // initial top (so it sticks below the header on scroll-down and
  // returns to its initial position on scroll-up).
  (function () {
    const toc = document.querySelector('[data-page-toc]');
    if (!toc) return;
    // Hoist out of any wrapping section so it's not clipped/centered.
    document.body.appendChild(toc);
    document.body.classList.add('has-page-toc');
    const STICKY_TOP = 96;
    const STOP_GAP = 32; // gap above the release zone (recommended cards / footer)
    const hero = document.querySelector('.hero, .hero-scroll, [class*="hero"]');
    // Release zone — the TOC stops sticking and parks once it would
    // otherwise overlap these sections.
    const stopAt = document.querySelector('.recommended-cards, footer, .footer');
    let initialTop = 0;
    let releaseY = Infinity;
    function measure() {
      const heroEl = hero;
      const heroBottom = heroEl
        ? heroEl.getBoundingClientRect().bottom + window.scrollY
        : 80;
      initialTop = Math.max(heroBottom + 132, 220);
      releaseY = stopAt
        ? stopAt.getBoundingClientRect().top + window.scrollY - STOP_GAP
        : Infinity;
      if (!toc.classList.contains('page-toc--stuck')) {
        toc.style.top = initialTop + 'px';
      }
    }
    function update() {
      const tocH = toc.offsetHeight;
      const shouldStick = window.scrollY + STICKY_TOP >= initialTop;
      const wouldOverflow = window.scrollY + STICKY_TOP + tocH >= releaseY;
      if (wouldOverflow) {
        // Park the TOC at the release point — switches back to
        // absolute so it scrolls naturally with the page.
        toc.classList.remove('page-toc--stuck');
        toc.style.top = Math.max(initialTop, releaseY - tocH) + 'px';
      } else if (shouldStick) {
        toc.classList.add('page-toc--stuck');
        toc.style.top = '';
      } else {
        toc.classList.remove('page-toc--stuck');
        toc.style.top = initialTop + 'px';
      }
    }
    measure();
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', () => { measure(); update(); });
  })();

  // AX panels tabs — switch active panel based on data-panel
  (function () {
    const tabs = [...document.querySelectorAll('#axTabs .ax-panels__tab')];
    const panels = [...document.querySelectorAll('.ax-panels__panel[data-panel]')];
    if (!tabs.length || !panels.length) return;
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      const target = tab.dataset.panel;
      tabs.forEach((t) => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
      panels.forEach((p) => { p.hidden = (p.dataset.panel !== target); });
    }));
  })();

  // Merch-cards tabs — same pattern, scoped to .merch-cards-shell.
  // On tab activation, newly-visible cards play a fade+slide entrance
  // (450ms cubic-bezier(0.42, 0, 0, 1)) matching the acrobat-plans
  // designer sample. Each card is marked data-tab-entering during the
  // animation so the scroll-driven rAF loop skips it (otherwise the
  // rAF would overwrite opacity/transform every frame).
  (function () {
    const TAB_EASE = 'cubic-bezier(0.42, 0, 0, 1)';
    const TAB_DUR = 450;
    const PER_CARD = 60;
    document.querySelectorAll('.merch-cards-shell').forEach((shell) => {
      const tabs = [...shell.querySelectorAll('.merch-cards-tab[data-mc-panel]')];
      const panels = [...shell.querySelectorAll('.merch-cards-panel[data-mc-panel]')];
      if (!tabs.length || !panels.length) return;
      tabs.forEach((tab) => tab.addEventListener('click', () => {
        const target = tab.dataset.mcPanel;
        tabs.forEach((t) => {
          const on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.classList.toggle('active', on);
        });
        panels.forEach((p) => {
          const wasHidden = p.hasAttribute('hidden');
          p.hidden = (p.dataset.mcPanel !== target);
          // Only animate the newly-revealed panel.
          if (!p.hidden && wasHidden) {
            const cards = [...p.querySelectorAll('.merch-card')];
            cards.forEach((c, i) => {
              const delay = i * PER_CARD;
              c.dataset.tabEntering = '1';
              c.style.transition = 'none';
              c.style.opacity = '0';
              c.style.transform = 'translateY(40px)';
              // Force reflow so the next style assignment animates.
              void c.offsetWidth;
              c.style.transition = `opacity ${TAB_DUR}ms ${TAB_EASE} ${delay}ms, transform ${TAB_DUR}ms ${TAB_EASE} ${delay}ms`;
              requestAnimationFrame(() => {
                c.style.opacity = '1';
                c.style.transform = 'translateY(0)';
              });
              // After the animation completes, hand control back to
              // the scroll-driven loop.
              setTimeout(() => {
                delete c.dataset.tabEntering;
                c.style.transition = '';
              }, TAB_DUR + delay + 60);
            });
          }
        });
      }));
    });
  })();

  // Scroll-driven card slide-up + fade-in — matches bizpro-hub pattern.
  // Cards register their docTop + per-row stagger delay; on every rAF
  // frame, opacity + translateY are computed from scroll progress and
  // applied inline. Tied to Lenis when available so motion feels as
  // smooth as the designer's sample. Bidirectional — cards re-animate
  // if user scrolls back up.
  (function () {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const easeOut3 = (t) => 1 - Math.pow(1 - t, 3);
    const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
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
        // Skip cards that are currently mid-tab-switch animation;
        // the tab handler owns their opacity/transform during entry.
        if (it.el.dataset.tabEntering === '1') continue;
        // Earlier trigger (vh * 1.1) + longer active range (vh * 0.5)
        // so cards begin fading BEFORE they reach the viewport edge
        // and finish well before scrolling past — they're never
        // "still fading" once visually settled in view.
        const raw = (sY + vh * 1.1 - it.triggerTop) / (vh * 0.5);
        const p = easeOut3(clamp(raw - it.staggerDelay, 0, 1));
        it.el.style.opacity = String(p);
        it.el.style.transform = `translateY(${((1 - p) * 40).toFixed(2)}px)`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  })();

  // Template rail: arrow-driven horizontal scroll
  (function () {
    const track = document.getElementById('tplTrack');
    const prev = document.getElementById('tplPrev');
    const next = document.getElementById('tplNext');
    if (!track || !prev || !next) return;
    const step = () => track.clientWidth * 0.7;
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left:  step(), behavior: 'smooth' }));
  })();

  // How-to: single-open accordion (click a step to expand, others collapse)
  (function () {
    const steps = [...document.querySelectorAll('#howToSteps .how-to__step')];
    if (!steps.length) return;
    steps.forEach((step) => step.addEventListener('click', () => {
      const isOpen = step.getAttribute('aria-expanded') === 'true';
      steps.forEach((s) => s.setAttribute('aria-expanded', 'false'));
      step.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    }));
  })();

  // Hero mockup stickers: on mouseleave, fly back from center → corners
  (function () {
    const mockup = document.getElementById('heroMockup');
    if (!mockup) return;
    mockup.addEventListener('mouseleave', () => {
      mockup.classList.add('animating-out');
      setTimeout(() => mockup.classList.remove('animating-out'), 250);
    });
  })();

  // FAQ — independent open/close per item. Toggles `.open` on the
  // .faq-item (drives the max-height transition + chevron rotation)
  // and `aria-expanded` on the button for accessibility.
  (function () {
    for (const item of document.querySelectorAll('.faq-item')) {
      const btn = item.querySelector('.faq-item__q');
      if (!btn) continue;
      btn.addEventListener('click', () => {
        const open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  })();

  // Header sync — make the nav coherent with the page's hero product.
  // The CTA + title sync is always safe; the active-nav-link rewrite
  // only runs as a fallback when the link still shows the scaffold's
  // catalog default ("Adobe Express"). When pageMeta has populated
  // the nav with source page-tabs ("Features" active, etc.), we
  // preserve them verbatim.
  (function () {
    const heroLabel = document.querySelector('.hero__logo [data-cat-slot="logo-label"], .hero__logo span');
    const product = heroLabel?.textContent.trim();
    if (!product) return;
    const activeLink = document.querySelector('.nav__links a.active');
    if (activeLink && /^Adobe Express$/.test(activeLink.textContent.trim())) {
      activeLink.textContent = product;
    }
    const primaryCta = document.querySelector('.nav__right .btn--primary');
    if (primaryCta) primaryCta.textContent = 'Buy ' + product;
    if (document.title && !document.title.includes(product)) {
      document.title = product + ' — Adobe';
    }
  })();

  // Composed h2 parallax — slides up to 20px above natural position
  // as the user scrolls past. rAF + Lenis-aware. Pairs with the
  // text-reveal-up line-height animation (CSS).
  (function () {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const h2 = document.querySelector('.features--composed .sec-head h2');
    if (!h2) return;
    const clamp = (v, lo, hi) => v < lo ? lo : v > hi ? hi : v;
    let triggerTop = h2.getBoundingClientRect().top + window.scrollY;
    // Recompute on resize since layout shifts.
    window.addEventListener('resize', () => {
      h2.style.transform = '';
      triggerTop = h2.getBoundingClientRect().top + window.scrollY;
    });
    const tick = () => {
      const sY = window.__lenis ? window.__lenis.scroll : window.scrollY;
      const vh = window.innerHeight;
      // Progress = 0 when h2 just enters viewport from bottom,
      // 1 when it would exit at top. Linear translateY 0 → -20px.
      const p = clamp((sY + vh - triggerTop) / (vh + 200), 0, 1);
      h2.style.transform = `translateY(${(-20 * p).toFixed(2)}px)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  })();

  // Closer sync (FALLBACK ONLY) — when the source's closer didn't
  // provide a heading, populate it from the hero's product so the
  // page doesn't end on a default catalog "Get Photoshop." example.
  // If the source did provide a heading, it's preserved verbatim
  // (e.g. Premiere's "Explore Adobe Premiere plans.").
  (function () {
    const closer = document.querySelector('.closer');
    if (!closer) return;
    const closerH = closer.querySelector('h2');
    const headingText = (closerH?.textContent || '').trim();
    // Detect catalog-default heading ("Get Photoshop.") that survived
    // because the extractor returned nothing.
    const isDefault = /^Get Photoshop\.?$/i.test(headingText);
    if (!isDefault) return;
    const heroLabel = document.querySelector('.hero__logo [data-cat-slot="logo-label"], .hero__logo span');
    const heroBody = document.querySelector('.hero__body');
    const heroCta = document.querySelector('.hero__ctas a.btn, .hero__ctas .btn');
    const product = heroLabel?.textContent.trim();
    if (!product) return;
    if (closerH) closerH.textContent = 'Adobe ' + product;
    const closerBody = closer.querySelector('.closer__body, .closer__copy p');
    const closerCta = closer.querySelector('a.btn, .btn');
    if (closerBody && heroBody) closerBody.textContent = heroBody.textContent.trim();
    if (closerCta && heroCta) {
      closerCta.textContent = heroCta.textContent.trim();
      const href = heroCta.getAttribute('href');
      if (href) closerCta.setAttribute('href', href);
    }
  })();
  }
})();
