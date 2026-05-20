# Notes — 001 lovesac-a

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/lovesac/proposed-A.html
- Captured 696 lines into `input/index.html`.
- No external CSS or JS files referenced; everything inline.
- Generator: stardust 0.2.0 (provenance comment at top of source).
- Placeholder convention: `<span class="placeholder-tag">` per stardust 0.2.0, plus
  `data-placeholder="true"` attribute on at least one element (the wordmark span
  in the header).

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
3-28   <head>: title + stardust provenance comment + viewport
29-399 <style> (370 lines of page CSS — extract to /styles/lovesac-a.css)
401    <body>
403-407 <aside class="promo-strip" id="promo-strip">  HEADER FRAGMENT
409-415 <div class="trust-band">                       HEADER FRAGMENT
417-447 <header class="site-header">                   HEADER FRAGMENT
449    <main>
451-467 <section class="hero" data-section="hero">                             SLOT
469-518 <section data-section="shop-by-category"> (NO class attr)              SLOT
520-547 <section class="build" data-section="build-your-sactional">            SLOT
549-590 <section class="carousel" data-section="product-line-carousel">        SLOT
592-594 <div class="fin-line" data-section="financing-line">                   SLOT (rewrite div→section)
596-626 <section data-section="lifestyle-grid"> (NO class attr)                SLOT
628-638 <section class="swatches-band" data-section="swatches-band">           SLOT
640    </main>
642-691 <footer class="site-footer">                   FOOTER FRAGMENT
693    <button class="chat-widget">                    FOOTER FRAGMENT
695    </body>
```

### Decisions surfaced by analysis

1. **Template name:** `lovesac-a`.
2. **`<main>` already present.** No synthesis needed.
3. **Two sections missing a class attribute:**
   - `data-section="shop-by-category"` → first class `shop-by-category`.
   - `data-section="lifestyle-grid"` → first class **`lifestyle`** (NOT `lifestyle-grid`
     because the page CSS defines `.lifestyle-grid { display:grid; grid-template-columns:repeat(3,1fr) }`
     for the INNER div at line 602; using `lifestyle-grid` on the section would cause a
     3-column grid layout collision per learnings.md 2026-05-19 inner-CSS-class collision
     pattern).
4. **`<div class="fin-line">` is inside `<main>` between sections** — rewrite to
   `<section class="fin-line">`. CSS `.fin-line` rule has no layout grid, just
   text-align/padding/background — safe as section first-class.
5. **First-class collision review for the other sections:**
   - `hero` — `.hero { position:relative; padding }` targets the section by design. OK.
   - `build` — `.build { background }` targets the section by design. OK.
   - `carousel` — `.carousel { background; border-top; border-bottom }` targets the
     section by design. OK.
   - `swatches-band` — `.swatches-band { display:grid; grid-template-columns:7fr 5fr }`
     IS the section's intended layout. OK (CSS authored against this exact selector).
   - `shop-by-category` — no `.shop-by-category` rule in CSS. Safe.
6. **Header fragment** = promo-strip + trust-band + header (all three siblings of
   `<main>`). The promo-strip's inline `onclick` references `getElementById('promo-strip')`
   — keep the id so it still works after fragment injection.
7. **Footer fragment** = `<footer class="site-footer">` + `<button class="chat-widget">`
   (sibling of `<footer>`).
8. **Slots per section** (see decisions.json for full list). Pattern: each `<a class="cat-tile">`
   in shop-by-category wraps `<img>` + `<h4>` + `<small>` — slot the inner three, leave the
   `<a href>` as template chrome (per learnings.md container-vs-children rule).
9. **Image URLs in DA cells must be absolute.** All images are already absolute
   (`https://www.lovesac.com/...`). No rewriting needed.
10. **No external CSS or JS** to vendor.
11. **No head-level `<link>` resources** to lift (no Google Fonts, no preconnects).
    The source uses Typekit-style font names (`miller-display`, `museo-sans`) without
    loading the kit; falls back to Georgia/system-ui. Matches what the source itself
    renders.
12. **Inline `<style>` lines 29–399** → extract to `/styles/lovesac-a.css`.
13. **No inline `<script>` block** — the only JS is an inline `onclick` attribute on the
    promo-strip dismiss button (kept verbatim in the header fragment).
14. **No `<main>` synthesis required.**
15. **`<span class="placeholder-wordmark" data-placeholder="true">`** in header — keep
    in fragment as-is (placeholder UI per stardust convention; surfaced via the
    `[data-placeholder="true"]` outline CSS rule).
16. **Strip / dev-tool markup:** none observed. Stardust provenance HTML comment in
    `<head>` is kept (commentary only, not rendered).

### Slot summary

| Section | Slot count |
|---|---|
| hero | 5 (eyebrow, title, sub, cta-1, cta-2, photo = 6 actually) |
| shop-by-category | 18 (head eyebrow, head title, 8×{photo, title, sub}) |
| build (build-your-sactional) | 7 (eyebrow, title, body, cta, 3×{photo, label}) |
| carousel (product-line-carousel) | 17 (head not present, 4×{photo, eyebrow, title, body} + 4 indicators implicit) |
| fin-line (financing-line) | 1 (link) |
| lifestyle | 11 (head eyebrow, head title, 3×{photo, eyebrow, body}) |
| swatches-band | 5 (eyebrow, title, body, cta, photo) |
| TOTAL (approx) | ~70 |

Final counts are produced by the Generate phase; this is a planning estimate.
