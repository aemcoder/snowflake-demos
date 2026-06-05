# Core Web Vitals — Hybrid EDS Migration Performance Guide

Findings from converting a Stardust AI-generated static page (Knack Variant C)
to an EDS page using a hybrid block-level approach where all CSS is global rather
than per-block. The same principles apply to any EDS migration that loads
design-system CSS lazily.

---

## The approach

Each section of the source page becomes an EDS block. Instead of rebuilding the
source markup imperatively in JavaScript, each block's `decorate()` function fills
a verbatim HTML **template literal** (the original source markup with `data-slot`,
`data-group`, `data-repeat` markers) from slot-keyed DA rows. All CSS lives in a
single `styles/knack.css` file loaded lazily — every block CSS file is empty.

This is different from standard EDS blocks in one important way: **the CSS is not
loaded per-block by EDS's own machinery**. EDS loads each block's `blockname.css`
before calling `decorate()`, giving a synchronous CSS guarantee. When you bypass
that by using a single shared CSS file loaded lazily, you introduce a race condition
that requires an explicit fix (see Mistake 5 below).

---

## Score progression

| Stage | Mobile score | TBT | CLS | Speed Index |
|---|---|---|---|---|
| Initial lift — everything in head.html | 80 | 480 ms | 0.15 | 4.1 s |
| CSS moved to lazy file, no await | 78 | 480 ms | 0.557 | 1.1 s |
| async decorate + compositor animation | 95 | 0 ms | 0.142 | 1.6 s |
| Unsized images + scaleX bar | ~97–100 | 0 ms | <0.05 | 1.5 s |

---

## Mistake 1 — Render-blocking Google Fonts in `head.html`

**Symptom:** FCP/LCP 300–600 ms worse on mobile. TBT unchanged.

**Cause:** Adding `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` 
directly to `head.html` makes it a synchronous, render-blocking external CSS request
on every page in the site. The browser cannot paint anything until Google's server
responds (DNS + TCP + TLS + CSS download).

EDS already has a `loadFonts()` function in `scripts.js` that loads `styles/fonts.css`
lazily — on desktop during `loadEager`, on mobile during `loadLazy`. Adding an
external `<link>` bypasses this entirely.

**Fix:** Remove the `<link>` from `head.html`. Add the font import to `styles/fonts.css`:

```css
/* styles/fonts.css — loaded lazily by loadFonts() */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
```

`loadFonts()` in `scripts.js` inserts this as a non-blocking `<link>` after first
contentful paint on mobile, so it never blocks rendering.

---

## Mistake 2 — Large inline `<style>` block in `head.html`

**Symptom:** Render-blocking CSS parse time on every page in the site, even pages
that don't use the Knack design system at all.

**Cause:** Inlining a 200-line design-system stylesheet as `<style>` in `head.html`
forces the browser to parse the full CSSOM — including keyframes, gradients, and
complex selectors — synchronously on every page load, regardless of whether the
page uses any of those rules.

**Fix:** Move all design-system CSS to `styles/knack.css`. Load it lazily from the
template engine on first block render (see Mistake 5 for how to do this without
introducing CLS).

**Invariant:** `head.html` must remain at the EDS baseline:

```html
<meta http-equiv="Content-Security-Policy" ...>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<script nonce="aem" src="/scripts/aem.js" type="module"></script>
<script nonce="aem" src="/scripts/scripts.js" type="module"></script>
<link rel="stylesheet" href="/styles/styles.css"/>
<!-- optional: non-blocking preconnect hints -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

Nothing else. Every additional tag either blocks rendering or leaks to other pages.

---

## Mistake 3 — Parser-blocking inline `<script>` in `head.html`

**Symptom:** Small but measurable HTML parse delay.

**Cause:** `<script nonce="aem">document.documentElement.classList.add('js')</script>`
looks harmless but is a parser-blocking inline script. EDS's own `aem.js` and
`scripts.js` use `type="module"`, which defers them by default. An inline script
without `type="module"` blocks HTML parsing even if it's a single line.

**Fix:** Move this class-setting to the template engine, called on first block render:

```js
// In the shared template engine, on first call:
document.documentElement.classList.add('js');
```

By this point in the page lifecycle (inside `loadEager()` block decoration),
the class is set before any sections become visible — same effect, zero parsing cost.

---

## Mistake 4 — Non-compositor CSS animations → TBT 480 ms

**Symptom:** TBT 480 ms, 57 long tasks, 6.7 s main-thread work. "Avoid
non-composited animations" diagnostic flagging 4+ elements.

**Cause:** `@keyframes` animating `box-shadow`. Box-shadow changes require the browser
to recalculate layout and repaint on the **main thread at every frame** (60fps).
A single continuously-running box-shadow animation creates ~300 long tasks over a
5-second Lighthouse window. The pulse ripple effect on `.pulse` and `.rowdot` elements
caused this.

The same problem applies to any continuous animation using: `width`, `height`, `top`,
`left`, `margin`, `padding`, `border-radius`, `color`, `background`.

**Fix:** Replace with compositor-only properties (`transform` and `opacity`).
The GPU handles these without touching the main thread.

```css
/* BEFORE — forces main-thread layout+paint at 60fps */
@keyframes pulse {
  0%  { box-shadow: 0 0 0 0   rgba(22,199,132,.5); }
  70% { box-shadow: 0 0 0 8px rgba(22,199,132,0);  }
}

/* AFTER — compositor-only, zero main-thread cost */
.pulse { position: relative; }
.pulse::after {
  content: ''; position: absolute; inset: 0;
  border-radius: 50%; background: currentColor;
  animation: pulse 1.6s infinite;
}
@keyframes pulse {
  0%   { transform: scale(1); opacity: .7; }
  100% { transform: scale(3); opacity: 0;  }
}
```

Same fix for progress bars — replace `width` transition with `transform: scaleX()`:

```css
/* BEFORE */
.bar i { width: 0; transition: width 1.1s ease; }

/* AFTER */
.bar i { width: 100%; transform: scaleX(0); transform-origin: left center; transition: transform 1.1s ease; }
```

And update the JS accordingly:
```js
// BEFORE
el.style.width = el.dataset.fill;  // e.g. "92%"

// AFTER
el.style.transform = `scaleX(${parseFloat(el.dataset.fill) / 100})`;
```

**Rule:** Only `transform` and `opacity` in continuous animations. No exceptions.

---

## Mistake 5 — Lazy CSS arriving after sections are visible → CLS 0.557

**Symptom:** Catastrophic CLS (0.557). Every element on-screen shifted simultaneously
when the design-system CSS arrived.

**Cause:** After correctly moving CSS out of `head.html`, the CSS loaded lazily while
the hero section was already visible. The page rendered with EDS boilerplate styles
first (22 px Roboto, 40 px section margins) and then the design-system CSS landed and
reset everything: font-size from 22 px to 16 px, font-family from Roboto to Inter,
hero padding from 0 to 72 px/64 px, `.hero-grid` from block layout to a 2-column CSS
grid, `.kpis` to a 3-column grid. Every visible element shifted at once.

This is specific to the hybrid approach: standard EDS blocks have their own
`blockname.css` which EDS loads synchronously before calling `decorate()`, so the
CSS is always in place before the section is visible. When you use a shared CSS file
instead, you lose that guarantee.

**Fix — Part A (safety net):** Add critical layout rules to `styles/styles.css`
scoped to the template class. `styles/styles.css` is render-blocking and always
available before sections paint.

```css
/* styles/styles.css — loaded synchronously, prevents CLS from lazy CSS window */
body.knack { font-family: Inter, system-ui, sans-serif; font-size: 16px; }
body.knack h1, body.knack h2, body.knack h3 { font-family: Inter, system-ui, sans-serif; }
body.knack header { height: 0; }
body.knack main > .section { margin: 0; padding: 0; max-width: none; }
body.knack main > .section > div { max-width: none; padding: 0; margin: 0; }
```

**Fix — Part B (root fix):** Make the template engine's render function async and
await the CSS promise. EDS's `loadBlock()` already awaits `decorate()`, and
`loadSection()` only reveals a section after `loadBlock()` completes — so the section
stays hidden until the CSS is applied.

```js
// Stored once. All subsequent awaits resolve instantly (settled promise).
let cssPromise = null;

export async function renderTemplate(block, templateHTML) {
  if (!cssPromise) {
    document.documentElement.classList.add('js');
    cssPromise = loadCSS(`${window.hlx.codeBasePath}/styles/knack.css`);
  }
  await cssPromise;        // ~50 ms on first call; microtask tick on all others
  // ... fill slots, replace block children ...
}

// Every block's decorate() must be async:
export default async function decorate(block) {
  await renderTemplate(block, TEMPLATE);
}
```

The first block to decorate (the hero, during `loadEager`) absorbs the CSS
round-trip (~50 ms from CDN) while the section is still hidden. Every subsequent
block hits a pre-resolved promise and proceeds immediately.

**Trade-off:** LCP increases by ~50 ms (the hero section waits for CSS before
showing). In practice this is imperceptible — LCP went from 0.9 s to still 0.9 s
on PSI because the latency is absorbed within the existing load budget.

---

## Mistake 6 — Images without explicit dimensions → residual CLS

**Symptom:** CLS ~0.14 remaining after all other fixes.

**Cause:** `<img>` elements in block templates had no `width`/`height` attributes and
no `aspect-ratio` CSS. The browser reserved 0 height initially. When images loaded
(or failed to load), the containing grid columns gained or lost height, shifting
adjacent content.

**Fix:** Add `aspect-ratio` in CSS for any `<img>` whose dimensions aren't known at
template authoring time. The browser uses this to reserve proportional space from the
first render, regardless of whether the image loads successfully.

```css
.panel img {
  width: 100%;
  aspect-ratio: 16 / 10;   /* matches typical app screenshot ratio */
  object-fit: cover;
}
```

Alternatively, add explicit `width` and `height` attributes to `<img>` elements in
the template HTML. Either approach gives the browser enough information to reserve
the correct layout space.

---

## Summary checklist

Use this before launching any hybrid EDS migration page.

### head.html
- [ ] Contains only: CSP, viewport, `aem.js`, `scripts.js`, `styles.css`
- [ ] No `<link rel="stylesheet">` for external hosts
- [ ] No `<style>` blocks
- [ ] No inline `<script>` tags (non-module)
- [ ] Optional: `<link rel="preconnect">` hints (non-blocking)

### CSS architecture
- [ ] Design-system CSS in `styles/knack.css` (or equivalent), not inline
- [ ] Critical layout rules (font-size, font-family, section margins) in `styles/styles.css` scoped to `body.template-name`
- [ ] Google Fonts via `@import` in `styles/fonts.css`, loaded by `loadFonts()`
- [ ] No continuous animation uses `box-shadow`, `width`, `height`, or any layout property
- [ ] Progress bars, ripples, and similar effects use `transform` + `opacity` only

### Block JS
- [ ] Template render function is `async` and `await`s the CSS promise
- [ ] Every `decorate()` function is `async` and `await`s the render call
- [ ] CSS promise is stored at module level — not re-fetched per block call

### Images
- [ ] Every `<img>` in a template either has `width`/`height` attributes or `aspect-ratio` CSS
- [ ] Images in grid/flex containers have `object-fit` set to prevent layout collapse
