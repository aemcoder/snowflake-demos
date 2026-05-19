# Notes — 001 liquiddeath-a

## Phase: Capture

Fetched from https://paolomoz.github.io/stardust-site/samples/liquiddeath/proposed-A.html
Generator: Stardust 0.2.0 (per provenance comment), brand-faithful Mode A
Capture date: 2026-05-19

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
1-27   HEAD + stardust:provenance comment
28-537 <style> inline CSS (all page styles)
539    <body>
540    <a href="#main" class="skip-link">        ← skip link (header)
542    <div class="promo-strip" data-section="promo-strip">  ← announcement banner (header)
546    <header class="site-header" data-section="header">   ← sticky nav (header)
565    <main id="main">
567      <section class="hero" data-section="hero">         ← SECTION 1
584      <section class="product-grid" data-section="product-grid">  ← SECTION 2
723      <section class="manifesto" data-section="manifesto-strip">  ← SECTION 3
736      <section class="merch" data-section="merch-grid">  ← SECTION 4
777      <section class="dual-cta" data-section="dual-end-cta">    ← SECTION 5
795    <footer class="site-footer" data-section="footer">  ← footer
```

**Header boundary**: Lines 540-563 (skip-link + promo-strip + site-header), everything before `<main id="main">`
**Footer boundary**: Lines 796-844 (site-footer), everything after `</main>`
**Main sections**: 5 sections, all using `<section>` tags already

### Section details

**Section 1: hero** (data-section="hero")
- First class: "hero" — unique ✓ (data-section="hero" matches)
- No rewrite needed (already <section>)
- Slots:
  - `hero__bg` img → image slot "hero.bg-image" (absolute CDN URL — no rewrite)
  - `hero__sub` p → text slot "hero.sub"
  - `hero__head` h1 → text slot "hero.title" (contains <br>, restructure to strip it)
  - `btn--primary-invert` a → link slot "hero.cta-primary"
  - `btn--ghost-invert` a → link slot "hero.cta-secondary"
  - `hero__scrim` div (aria-hidden) → static decorative

**Section 2: product-grid** (data-section="product-grid")
- First class: "product-grid" — unique ✓
- section-head h2 → text slot "product-grid.title"
- section-head__meta span → text slot "product-grid.meta"
- Featured products (4 cards): card-1 through card-4
  - Each card: img slot, title slot (h3), sub text slot, cta link
  - card__addtocart span (aria-hidden) → static
  - card wraps <a> which wraps everything — do NOT slot the <a> (container-vs-children rule)
  - For each card: slot img, h3 title, card__sub as text, NOT the wrapping <a>
  - The wrapping <a href> should be a link slot (card-N.link) but NO nested data-slot allowed
  - Decision: slot inner children only (img, title, sub), keep <a> static
- Tail products (12 cards): too many to individually slot → keep product grids as static template blocks
  - The product listings are commerce-data-driven, not author-edited text content
  - Decision: Keep product-grid section as static template (no slots in cards), only section-head gets slots
  - This is a reasonable design: the page is a product catalog page

**Section 3: manifesto-strip** (data-section="manifesto-strip")
- First class from data-section: "manifesto-strip" — need to rewrite from "manifesto" to "manifesto-strip"
  - Wait: the section is `<section class="manifesto" data-section="manifesto-strip">`
  - Current first class is "manifesto" but DA block name should be "manifesto-strip" (from data-section)
  - Need to prepend "manifesto-strip" as first class: `class="manifesto-strip manifesto"`
- Slots:
  - `manifesto__head` h2 → text slot "manifesto-strip.title" (contains &nbsp; — use as-is)
  - `manifesto__sub` p → text slot "manifesto-strip.body" (contains <br>, use two <p> in DA)
  - `btn--ghost-invert` a → link slot "manifesto-strip.cta"
  - `manifesto__skull` SVG (aria-hidden) → static decorative

**Section 4: merch-grid** (data-section="merch-grid")
- First class: "merch" — need to prepend "merch-grid": `class="merch-grid merch"`
- section-head h2 → text slot "merch-grid.title"
- section-head btn--ghost a → link slot "merch-grid.cta-all"
- 4 merch cards (card.merch-card) — same pattern as product-grid
  - Decision: slot inner children, not wrapping <a>
  - Per card: img, title, sub text (no link slot since container rule)
  
**Section 5: dual-end-cta** (data-section="dual-end-cta")
- First class: "dual-cta" — need to prepend "dual-end-cta": `class="dual-end-cta dual-cta"`
- Two halves:
  - Left: dual-cta__eyebrow span → text slot "dual-end-cta.left-eyebrow"
  - Left: dual-cta__head h3 → text slot "dual-end-cta.left-title"
  - Left: dual-cta__body p → text slot "dual-end-cta.left-body"
  - Left: btn--primary-invert a → link slot "dual-end-cta.left-cta"
  - Right: dual-cta__eyebrow span → text slot "dual-end-cta.right-eyebrow"
  - Right: dual-cta__head h3 → text slot "dual-end-cta.right-title"
  - Right: dual-cta__body p → text slot "dual-end-cta.right-body"
  - Right: btn--primary-invert a → link slot "dual-end-cta.right-cta"

### Head-level resources to lift

- `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:wght@400;500;600;700&display=swap')` → included in CSS @import, not a <link> element
  - No separate `<link rel="preconnect">` or `<link rel="stylesheet">` in head — fonts via CSS @import only
  - No head-level <link> elements to lift (favicon is decorative)

### Asset strategy

All image URLs are absolute CDN URLs (`https://liquiddeath.com/cdn/shop/files/...`) — **no rewriting needed**.
No relative paths anywhere. Asset strategy: "absolute" (already absolute).

### External scripts

None. No external `<script src>` elements.

### Inline CSS

Lines 32-537: single `<style>` block extracted to `styles/liquiddeath-a.css`

### Inline scripts

None. No `<script>` blocks in body.

### Placeholder convention

Stardust 0.2.0 — looking for `<span class="placeholder-tag">` markers. None found in this page.

## Phase: Round-trip

### Production round-trip
- DA PUT: 200 — doc stored at da.live/edit#/aemcoder/snowflake-demos/liquiddeath/a [verified]
- POST preview on sd-liquiddeath-a: 200 — https://sd-liquiddeath-a--snowflake-demos--aemcoder.aem.page/liquiddeath/a [verified]
- POST live on sd-liquiddeath-a: 200 — https://sd-liquiddeath-a--snowflake-demos--aemcoder.aem.live/liquiddeath/a [verified]
- Code-bus probes: templates/liquiddeath-a.html 200, styles/liquiddeath-a.css 200, fragments/liquiddeath-a/header.html 200, fragments/liquiddeath-a/footer.html 200 [verified]
- Local round-trip: skipped per autonomous mode instructions

### Decisions surfaced by analysis

1. All sections already use `<section>` tags — no tag rewrites needed
2. Sections 3, 4, 5 need first-class prepend from data-section value
3. Asset strategy: "absolute" — all image refs are already absolute CDN URLs
4. Product and merch card inner elements: slot img, title, sub but NOT the wrapping <a> (container-vs-children)
5. Product grid tail (12 cards) and all card links left as static template (commerce data, not author copy)
6. manifesto__sub contains <br> — restructure to two <p> in DA cell
7. hero title contains <br> — strip or restructure in DA cell (use two <p>)
8. No external scripts, no vendored assets needed
9. No head <link> elements to lift (fonts via @import inside CSS)
