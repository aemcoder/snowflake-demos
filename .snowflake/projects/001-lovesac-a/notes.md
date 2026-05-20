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

## Phase: Generate

- Output: `output/templates/lovesac-a.html`, `output/fragments/lovesac-a/{header,footer}.html`,
  `output/styles/lovesac-a.css`, `output/da/a.html`.
- 7 sections, 75 `[data-slot]` markers.
- No animation script extracted (only inline `onclick` attribute on the
  promo-strip dismiss button — kept as-is in the header fragment).
- All section first-classes unique; none collides with a CSS layout rule
  meant for an inner element.

## Phase: Wire

- Copied to `templates/lovesac-a.html`, `fragments/lovesac-a/{header,footer}.html`,
  `styles/lovesac-a.css`.
- Built `drafts/lovesac-a-a.html` via `tools/transform-da-to-eds.mjs` —
  not used for round-trip (skipped local per task instructions).
- `npm run lint` — clean.

## Phase: Round-trip

Skipped local; went straight to production per task instructions.

- DA labeled snapshot before PUT: HTTP 201 (label `Before snowflake refresh 001 (lovesac)`).
- DA PUT `/lovesac/a.html`: HTTP 200.
- `git push --force-with-lease origin sd-lovesac-a`: tip `0c90c6c`.
- POST `admin.hlx.page/preview/aemcoder/snowflake-demos/sd-lovesac-a/lovesac/a`: HTTP 200.
- POST `admin.hlx.page/live/aemcoder/snowflake-demos/sd-lovesac-a/lovesac/a`: HTTP 200.
- Code-bus probes (templates, styles, fragments, scripts): all 200.

### Production verification at https://sd-lovesac-a--snowflake-demos--aemcoder.aem.live/lovesac/a

| Check | Value |
|---|---|
| `main.dataset.overlay` | `lovesac-a` (matches template) |
| Section count | 7 (matches) |
| Section first-classes | `hero, shop-by-category, build, carousel, fin-line, lifestyle, swatches-band` |
| `body.appear` class | true |
| Header fragment | loaded (`.site-header` + `.promo-strip` + `.trust-band`) |
| Footer fragment | loaded (`.site-footer` + `.chat-widget`) |
| Hero h1 text | "Lovesac – Designed For Life®" |
| Carousel slides | 4 |
| Lifestyle cards | 3 |
| `<meta name="template">` | `lovesac-a` |
| Console errors | 1 (substrate-known cosmetic: `scripts/lovesac-a-animations.js` 404 from delayed-phase HEAD probe) |

### Screenshots

Saved to `diff/`:
- `production-{top,shop,build,carousel,lifestyle,swatches,footer}.jpg` — per-section
- `original-top.jpg` — source for visual comparison
- `comparison.png` — side-by-side composite (original left, EDS right) for the hero region

The lifestyle section renders in the expected 3-column grid, confirming the
section first-class rename (`lifestyle-grid` → `lifestyle`) prevented the
`.lifestyle-grid { display: grid; grid-template-columns: repeat(3, 1fr); }`
rule from incorrectly applying to the section itself instead of only the
inner `<div class="lifestyle-grid">`.

## Phase: Reflect

### Substrate gaps surfaced

Single cosmetic gap, already documented in cross-project `learnings.md`:
- The `delayed.js` HEAD probe for `scripts/<template>-animations.js` 404s
  loudly in the browser console even though the JS code itself catches and
  ignores. The substrate could replace the HEAD probe with a
  `<meta name="has-animations">` flag in the DA Metadata block (read in
  `loadDelayed`) so the network request is never issued when no engine
  exists. Cosmetic only — page renders fine.

No NEW substrate gaps found on this run.

### Branch-level fixes applied (with reasoning)

1. **Section first-class `lifestyle` instead of `lifestyle-grid`** — because
   CSS at line 298 declares `.lifestyle-grid { display: grid;
   grid-template-columns: repeat(3, 1fr); }` for the INNER
   `<div class="lifestyle-grid">` at line 602 of the source. If we used
   `lifestyle-grid` as the section's first-class (Stardust's `data-section`
   value), the section would inherit that 3-column grid rule and the layout
   would break. This is the same inner-CSS-class collision pattern recorded
   in cross-project `learnings.md` 2026-05-19 (5 occurrences across batch
   runs including the prior lovesac iteration). The pattern is now stably
   detected during Analyze.

2. **`<div class="fin-line">` rewritten to `<section class="fin-line">`** —
   the source authored a single-line "Financing" callout as a sibling-of-
   sections `<div>` inside `<main>` instead of as a `<section>`. The overlay
   engine matches blocks by `section[class]`. Without the rewrite, the
   `fin-line` block in the DA doc would have no template counterpart.
   The CSS rule `.fin-line { text-align; padding; background }` has no
   layout-grid impact and survives the type change.

3. **Synthesised first-class on two sections that had none:**
   - `<section data-section="shop-by-category">` (no `class` attribute)
     → `<section class="shop-by-category" ...>`.
   - `<section data-section="lifestyle-grid">` (no `class` attribute)
     → `<section class="lifestyle" ...>` (see fix #1 above).
   Without a first-class, the overlay engine's `section[class]` filter
   would skip them entirely; slots would never be applied.

These fixes are all in the template and DA doc — none required substrate
edits.

### Cross-project findings

Nothing new to promote — every pattern encountered this run is already in
cross-project `learnings.md`. The bundled substrate (v1.0.4) handled:
- Heading-in-heading auto-close (substrate writeSlot heading branch)
- Background-image-on-`<a>` dispatch ordering (background-image before A)
- Generic `header, footer { padding }` leak (`body > header, body > footer { padding: 0 }` reset)

All of these were promoted to the substrate after prior batch runs; this
run is the regression test that confirms they still work.

### Timings

| Phase | When | Notes |
|---|---|---|
| Capture | 11:00:30 | 696 lines fetched, no external assets |
| Analyze | 11:05:00 | 5min |
| Generate | 11:15:00 | 10min; bulk of the work |
| Wire | 11:18:00 | 3min |
| Round-trip | 11:30:00 | 12min (incl. preview + live + screenshots) |

