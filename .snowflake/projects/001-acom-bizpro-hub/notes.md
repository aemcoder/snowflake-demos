# Notes — 001 acom-bizpro-hub

## Phase: Capture

- Source: `http://127.0.0.1:8080/acom-bespoke-pages/bizpro-hub-prototype/` (local-only)
- Single HTML file, 2687 lines, with inline `<style>` (lines 8–1326) and inline
  `<script>` (lines 2162–2670 + 2674–2685). External CSS `assets/lenis.min.css`
  (line 6) and JS `assets/lenis.min.js` (line 2673).
- 73 unique referenced assets, ~38 MB total. All vendored under
  `input/assets/`. Largest: section-1 hero video (8.4 MB), BizPro_extrawide
  banner image (7.7 MB), product-tile-images (~12 MB collectively).
- Fonts directory contains a space: `assets/fonts/Adobe Clean Display/` —
  AEM CLI 404s on URL-encoded `%20`. Will rename to
  `assets/fonts/AdobeCleanDisplay/` and rewrite CSS `url(...)` refs.

## Phase: Analyze

### Structural map

```
Line  Element / Role
─────  ────────────────────────────────────────────────────────────────
3      <head> open
6      <link rel="stylesheet" href="assets/lenis.min.css">   ← lift
7      <title>BizPro Hub — PDF & Productivity</title>         ← DA metadata
8      <style>...</style>                                     ← extract to /styles/<tpl>.css
1326   </style>
1327   </head>
1328   <body>
1332   <div class="nav-wrap"><nav class="nav">…</nav></div>   ← HEADER fragment
1364   <div class="hero-scroll"><div class="hero-sticky">…    ← SECTION 1 (hero, rewrite to <section>)
1415   <section class="stories">                              ← SECTION 2
1484   <section class="acrobat-feature">                      ← SECTION 3
1578   <div class="tutorial-scroll">                          ← chrome (wrapper kept)
1579     <section class="tutorial">                            ← SECTION 4 (the matched section)
1674   </div>
1683   <section class="solutions">                            ← SECTION 5
1780   <section class="studio-banner">                        ← SECTION 6
1804   <section class="product-section">                      ← SECTION 7
1975   <section class="search-section">                       ← SECTION 8
1998   <footer class="footer">                                ← FOOTER fragment
2145   </footer>
2147   <div class="grid-overlay">                             ← STRIP (debug UI)
2152   <button class="grid-toggle">                            ← STRIP (debug UI)
2162   <script>...inline anims...</script>                    ← extract to /scripts/<tpl>-animations.js
2670   </script>
2673   <script src="assets/lenis.min.js"></script>            ← vendored lib (loaded by animations prelude)
2674   <script>// Lenis init</script>                          ← into animations
2685   </script>
2686   </body>
```

### Decisions

1. **Header fragment** = `<div class="nav-wrap"><nav class="nav">…</nav></div>`
   (lines 1330–1361, including comments). Whole nav wrap is the header.
2. **Footer fragment** = `<footer class="footer">…</footer>` (lines 1997–2145).
3. **Strip**: `.grid-overlay`, `.grid-toggle` (developer-only grid debug UI),
   and the comments wrapping them.
4. **Hero**: rewrite `<div class="hero-scroll">` → `<section class="hero-scroll">`
   so the substrate's `section[class]` query matches it.
5. **First-class collision check**: all 8 sections have unique first
   classes (`hero-scroll`, `stories`, `acrobat-feature`, `tutorial`,
   `solutions`, `studio-banner`, `product-section`, `search-section`).
   None of these are reused in CSS as layout-grid selectors at the section
   level (`hero-scroll` is the scroll container; `tutorial` has its own
   inner grid; etc.). Acceptable; double-check in Generate self-check.
6. **Tutorial wrapper**: keep `<div class="tutorial-scroll">` around the
   `<section class="tutorial">`. The wrapper provides scroll snapping
   geometry. The substrate finds the section by class regardless of an
   outer wrapper div.
7. **Inline `<br>`**: present in hero body, story-card titles, tutorial
   headlines, and search disclaimer. Pipeline strips `<br>` from DA
   cells — drop `<br>` from authored text; CSS already handles wrapping.
8. **`<span class="price-card__name">`**: per learnings, spans with
   `data-slot` survive the pipeline. Slot the span directly.
9. **Asset strategy**: `vendor`. Source is local-only. Copy
   `input/assets/` → repo `assets/`. Rename
   `fonts/Adobe Clean Display/` → `fonts/AdobeCleanDisplay/`. In template/
   fragments/CSS: root-relative `/assets/...`. In DA cells: absolute
   `https://acom-bizpro-hub--snowflake-demos--aemcoder.aem.page/assets/...`.
10. **Video**: leave the hero `<source src="…mp4">` as static template
    content. Author edits won't change the video file — acceptable for the
    prototype.
11. **Tutorial clones**: clones (slides aria-hidden) duplicate slides 0
    and 2. Keep clones static, only slot the 3 real slides. Authors editing
    a real slide won't update its clone — acceptable trade-off for the
    infinite loop UI.
12. **Lenis library**: vendor as `scripts/<tpl>-lenis.min.js` and load via
    the animations prelude before the inline script body runs (per
    methodology §3.6).
13. **`onclick` handlers in source**: `switchTab(this)` (solutions tabs)
    and `toggleGrid()` (grid debug — will be stripped). `switchTab` must
    be hoisted onto `window` from the animations script.

### Slot inventory (preview)

- Hero: 5 text slots (eyebrow, title, body, overlay-title, overlay-body) +
  2 button-text slots
- Stories: 3 header text + 4 cards × (1 bg-image + 1 category + 1 title) = 15
- Acrobat-feature: 3 header text + wide-card (1 img, 1 title, 1 body, 1 link) +
  3 cards × (1 img, 1 title, 1 body, 1 link) = 4 + 4 + 12 = 20
- Tutorial: 3 slides × (1 img + 1 headline) = 6 (clones ignored)
- Solutions: 2 header text + 3 price-cards × (name + price + billing + features list) ≈ 14
- Studio-banner: 1 title + 1 body + 2 CTA texts = 4
- Product-section: 9 cards × (icon + title + body + bg-image) = 36
- Search-section: 1 title + 1 body + 1 input placeholder + 1 disclaimer = 4

Estimated total: ~104 slots. Subject to refinement during Generate.
