  // Interactive dot grid for hero background
  // Dots ease away from the pointer, scale up, and tint red as the cursor approaches
  (function () {
    const HERO = document.querySelector('[data-section="hero"]');
    if (!HERO) return;
    const canvas = HERO.querySelector('.hero-dots');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const SPACING = 30;
    const RADIUS = 150;
    const MAX_OFFSET = 18;
    const DOT_R_BASE = 1.1;
    const DOT_R_HOVER = 3.0;
    const EASE = 0.18;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let dots = [];
    let pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;

    function resize() {
      const rect = HERO.getBoundingClientRect();
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, rect.height * dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.floor(rect.width / SPACING);
      const rows = Math.floor(rect.height / SPACING);
      const ox = (rect.width - cols * SPACING) / 2 + SPACING / 2;
      const oy = (rect.height - rows * SPACING) / 2 + SPACING / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ox + c * SPACING;
          const y = oy + r * SPACING;
          dots.push({ baseX: x, baseY: y, x, y });
        }
      }
    }

    HERO.addEventListener('pointermove', function (e) {
      const rect = HERO.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    });
    HERO.addEventListener('pointerleave', function () {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    });

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let tx = d.baseX;
        let ty = d.baseY;
        let intensity = 0;

        if (pointer.active) {
          const dx = d.baseX - pointer.x;
          const dy = d.baseY - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS) {
            const f = 1 - dist / RADIUS;
            const ff = f * f;
            const ang = Math.atan2(dy, dx);
            tx = d.baseX + Math.cos(ang) * ff * MAX_OFFSET;
            ty = d.baseY + Math.sin(ang) * ff * MAX_OFFSET;
            intensity = ff;
          }
        }

        d.x = lerp(d.x, tx, EASE);
        d.y = lerp(d.y, ty, EASE);

        const r = lerp(DOT_R_BASE, DOT_R_HOVER, intensity);
        if (intensity > 0.04) {
          // Mix from blue (#003049) toward red (#ed1c24) by intensity
          const cR = Math.round(lerp(0,   237, intensity));
          const cG = Math.round(lerp(48,  28,  intensity));
          const cB = Math.round(lerp(73,  36,  intensity));
          // resting alpha is now lower for readability; hover still rises sharply
          const a = 0.20 + 0.60 * intensity;
          ctx.fillStyle = 'rgba(' + cR + ',' + cG + ',' + cB + ',' + a + ')';
        } else {
          ctx.fillStyle = 'rgba(0, 48, 73, 0.14)';
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    let resizeTimer = 0;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    });

    // Pause when offscreen
    const io = new IntersectionObserver(function (entries) {
      const visible = entries[0].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
      if (!visible && raf) { cancelAnimationFrame(raf); raf = 0; }
    });
    io.observe(HERO);

    resize();
    raf = requestAnimationFrame(tick);
  })();
