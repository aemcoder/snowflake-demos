# Notes — 001 lovesac-a

## Phase: Capture

Source: https://paolomoz.github.io/stardust-site/samples/lovesac/proposed-A.html
Generator: Stardust 0.2.0 (per provenance comment)
Captured 2026-05-19. All images use absolute CDN URLs from lovesac.com — no asset vendoring needed.

## Phase: Analyze

### Structural map

```
<body>
  <aside class="promo-strip">               → header fragment
  <div class="trust-band">                  → header fragment
  <header class="site-header">              → header fragment
  <main>
    <section class="hero">                  → section 1 (first-class: hero)
    <section [data-section=shop-by-category]> → section 2 (first-class: shop-by-category)
    <section class="build">                 → section 3 (first-class: build-your-sactional)
    <section class="carousel">              → section 4 (first-class: product-line-carousel)
    <div class="fin-line">                  → section 5 (rewrite to <section>, first-class: financing-line)
    <section [data-section=lifestyle-grid]> → section 6 (first-class: lifestyle-grid)
    <section class="swatches-band">         → section 7 (first-class: swatches-band)
  </main>
  <footer class="site-footer">              → footer fragment
  <button class="chat-widget">              → footer fragment
```

### Decisions surfaced by analysis

1. All sections have data-section attributes — use as first-class discriminators.
2. financing-line is a `<div>`, not `<section>` — rewrite to `<section>`.
3. shop-by-category, lifestyle-grid have no class attr — add data-section as first class.
4. build-your-sactional, product-line-carousel have different original class vs data-section — promoted data-section to first class.
5. Cat-tile `<a>` links have nested slot children — do NOT slot the `<a>` container (container-vs-children rule). Dropped 8 cat-N.link slots.
6. No `<link>` elements in `<head>` — fonts are CSS variables only (miller-display, museo-sans). Font fallbacks will be used on production since no Typekit kit is wired.
7. No inline `<script>` blocks — no animation JS needed.
8. Stardust 0.2.0 uses `data-placeholder="true"` attr + `.placeholder-wordmark` CSS for the header wordmark placeholder — kept as-is in header fragment.

## Phase: Generate

- Template: 7 sections, 75 slots
- CSS extracted from inline `<style>` (lines 29-399)
- No animations JS
- DA doc: divs-with-class shape, all images absolute CDN URLs
- Self-checks: all passed (no relative asset refs, DA doc clean, images absolute)
- Container-vs-children fix: removed data-slot from cat-tile `<a>` wrappers, 8 fewer slots (83→75)

## Phase: Wire

- Lint: clean (0 errors, 0 warnings)
- Drafts file generated via transform-da-to-eds.mjs (11358 bytes, 2 meta tags)

## Phase: Round-trip

- Local: skipped per autonomous mode instructions
- DA PUT: 200, editUrl https://da.live/edit#/aemcoder/snowflake-demos/lovesac/a
- Preview POST: 200, https://sd-lovesac-a--snowflake-demos--aemcoder.aem.page/lovesac/a
- Live POST: 200, https://sd-lovesac-a--snowflake-demos--aemcoder.aem.live/lovesac/a
- Path probes: all 200 (templates, styles, both fragments)
- Code-bus sync: 1s (very fast)

## Findings

1. [project-specific] Stardust 0.2.0 uses data-placeholder="true" for the header wordmark placeholder — same attr as 0.3.0 but the CSS class approach (.placeholder-wordmark) is different. No slot-skip needed since it's in the header fragment (static).
2. [project-specific] No font link tags in source head — fonts are lovesac.com brand-extracted variables (miller-display, museo-sans). These will fall back to Georgia / system-sans on the EDS page. Acceptable for a demo prototype.
3. [generic, known] Container-vs-children: cat-tile `<a>` wrappers confirmed — must not slot a link that wraps individually-slotted children.
