# Notes — 001 festool

## Phase: Capture

Fetched source from https://paolomoz.github.io/stardust-site/samples/festool/proposed-A.html
- 32,174 bytes
- Generator: Stardust 0.2.0 (provenance comment in HTML head)
- Page title: "Festool Worldwide — Tools for the toughest demands"
- No external CSS/JS files — all styles inline in `<style>` block
- No inline `<script>` blocks (no animation JS)
- All images are absolute CDN URLs (festool.com, media.cdn.festool.io, assets.cdn.festool.io)

## Phase: Analyze

### Structural map

```
Line  Element
────  ───────────────────────────────────────────────────────────
1     <!DOCTYPE html>
2     <html lang="en">
3-21  <head> (stardust provenance comment + meta charset/viewport + title)
24-452 <style> (inline CSS, single block)
454   <body>
456   <!-- HEADER -->
457   <header data-section="header"> ... </header>  ← HEADER FRAGMENT
486   <main>
488   <section data-section="hero">                 ← section 1: hero
         hero-img (background-image, absolute URL), scrim, container(eyebrow+h1+lead+cta), meta
511   <section data-section="new-products">         ← section 2: new-products
         section-head (eyebrow+h2+link), product-grid (4x article.product-card)
556   <section data-section="brand-teaser">         ← section 3: brand-teaser
         bt-grid (2x article.bt-card with background-image)
582   <section data-section="discover">             ← section 4: discover
         section-head + discover-grid (1 feature tile + 4 small tiles, bg-images)
638   <section data-section="festoolme">            ← section 5: festoolme
         section-head + fm-grid (6x a.fm-tile with bg-images) + fm-foot
664   <section data-section="cta-band-service">     ← section 6: cta-band-service
         svc-grid (left: eyebrow+h2+p+btn, right: 4x svc-tile)
688   <section data-section="service-tile-strip">   ← section 7: service-tile-strip
         section-head + sts-grid (8x a.sts-tile with icon+h4+p)
713   <section data-section="brand-copy">           ← section 8: brand-copy
         2x bc-block (eyebrow+h2+p), 1x bc-divider
731   </main>
733   <footer data-section="footer">                ← FOOTER FRAGMENT
790   </footer>
793   </body>
```

### Header boundary
Everything from `<body>` to `<main>` (line 457–485): `<header data-section="header">`.
Already uses `<header>` tag. Static nav fragment. No data-slot markers needed.

### Footer boundary
Everything from `</main>` to `</body>` (line 732–792): `<footer data-section="footer">`.
Already uses `<footer>` tag. Static fragment.

### Main sections: 8 sections, all already `<section>` tags
All sections have unique first classes (via data-section attributes that match the section classes in CSS):
1. `hero` — data-section="hero"
2. `new-products` — data-section="new-products"  
3. `brand-teaser` — data-section="brand-teaser"
4. `discover` — data-section="discover"
5. `festoolme` — data-section="festoolme"
6. `cta-band-service` — data-section="cta-band-service"
7. `service-tile-strip` — data-section="service-tile-strip"
8. `brand-copy` — data-section="brand-copy"

NOTE: All sections use data-section attribute, NOT a class list. CSS targets
`section[data-section="hero"]` — these are attribute selectors, not class selectors.
The overlay engine matches by first class of className. These sections have NO class attribute.
Decision: Add the data-section value as a class to each section element so the engine can match them.
e.g. `<section class="hero" data-section="hero">` — CSS attribute selectors still work.

### Placeholder convention
Stardust 0.2.0 — source uses `<span class="placeholder-tag">` markers.
Scan shows NO placeholder elements in this source. All content is real.

### Asset strategy
All images are absolute public URLs (festool.com CDNs). No vendoring needed.
Strategy: "absolute" — no rewriting required, URLs work as-is.

### Head-level links
None. No Google Fonts, no external stylesheets. CSS is fully inline.
Font stack: DINWebPro, DIN Next, Verdana, system-ui (all system/fallback fonts — no web font loading needed).

### Inline style
Lines 24–452: single `<style>` block → extract to styles/festool.css

### Inline script
None.

### Slot plan

**hero** (section 1):
- eyebrow: `p.eyebrow` text → "New for the trade — 18 V Tabless"
- title: `h1` → "Tabless – extra power for your cordless tools"
- lead: `p.lead` → lead text
- cta-primary: `a.btn--primary` link → "Everything to do with technology"
- cta-secondary: `a.link` (inside hero-actions) → "See the 18 V system"
- hero-bg: `div.hero-img` has inline background-image → background-image slot
- NOTE: meta at bottom (slide counter) is decorative/static, NOT a slot

**new-products** (section 2):
- eyebrow: `p.eyebrow.eyebrow--alert` → "Just released"
- title: `h2` → "Newly added to the catalogue"
- link-all: `a.link` in section-head → "All new products"
- card-1.img: `article:nth-child(1) .pc-img img` → image slot
- card-1.meta: `article:nth-child(1) p.pc-meta` → "Cordless · Energy"
- card-1.title: `article:nth-child(1) h3` → "Energy set 18V 2xTBX4/TCL6"
- card-1.link: `article:nth-child(1) a.pc-link` → link slot
- card-2.img, card-2.meta, card-2.title, card-2.link (same pattern)
- card-3.img, card-3.meta, card-3.title, card-3.link
- card-4.img, card-4.meta, card-4.title, card-4.link
- cta: `a.btn--secondary` → "Show all new products"

**brand-teaser** (section 3):
- card-1.bg: `article:nth-child(1) .bt-img` → background-image slot
- card-1.eyebrow: `article:nth-child(1) p.eyebrow` → "Heritage · 1925 — 2025"
- card-1.title: `article:nth-child(1) h3` → "100 years: Inspired by craftspeople"
- card-1.body: `article:nth-child(1) p:not(.eyebrow)` → body text
- card-1.link: `article:nth-child(1) a.link` → link slot
- card-2.bg: `article:nth-child(2) .bt-img` → background-image slot
- card-2.eyebrow, card-2.title, card-2.body, card-2.link

**discover** (section 4):
- eyebrow: section-head `p.eyebrow` → "Discover Festool"
- title: section-head `h2` → "The portfolio, by job to be done."
- link-all: section-head `a.link` → "All categories"
- tile-1.bg: `.discover-tile.feature .dt-img` → background-image slot
- tile-1.eyebrow: `.discover-tile.feature p.eyebrow` → "18 V system"
- tile-1.title: `.discover-tile.feature h3` → "Discover the entire 18 volt portfolio."
- tile-1.body: `.discover-tile.feature p:not(.eyebrow)` → body text
- tile-1.link: `.discover-tile.feature a.dt-link` → link slot
- tile-2.bg through tile-5.bg: non-feature tiles .dt-img → background-image slots
- tile-2.title through tile-5.title: non-feature tile h3 → text slots
- tile-2.link through tile-5.link: non-feature tile a.dt-link → link slots

**festoolme** (section 5):
- eyebrow: `p.eyebrow` → "#festoolme"
- title: `h2` → "What people are saying about our products."
- link-all: `a.link` → "See the wall"
- tile-1.bg through tile-6.bg: `a.fm-tile` → background-image slots
- foot-text: `p.fm-foot span` → text slot
- foot-link: `p.fm-foot a.link` → link slot

**cta-band-service** (section 6):
- eyebrow: `p.eyebrow` → "Festool SERVICE"
- title: `h2` → "Register for all services now."
- body-1: first `p` (not eyebrow) → body text
- cta: `a.btn--on-green` → link slot
- svc-tile-1.title: first `.svc-tile strong` → "Warranty all-inclusive"
- svc-tile-1.label: first `.svc-tile span` → "3-year warranty"
- svc-tile-2.title, svc-tile-2.label
- svc-tile-3.title, svc-tile-3.label
- svc-tile-4.title, svc-tile-4.label

**service-tile-strip** (section 7):
- eyebrow: `p.eyebrow` → "Trade utility"
- title: `h2` → "For owners, dealers, press."
- tile-1.title: first `.sts-tile h4` → "Social"
- tile-1.body: first `.sts-tile p` → "Join the conversation"
- tile-2 through tile-8: same pattern (h4 + p)
NOTE: sts-icon content (◎, ◇, etc.) is decorative Unicode → static, NOT a slot

**brand-copy** (section 8):
- block-1.eyebrow: first `article p.eyebrow` → "100 years"
- block-1.title: first `article h2` → "Passion for high-quality power tools."
- block-1.body: first `article p:not(.eyebrow)` → body text
- block-2.eyebrow: second `article p.eyebrow` → "18 V system"
- block-2.title: second `article h2` → "Simply clever – the Festool 18-volt system."
- block-2.body: second `article p:not(.eyebrow)` → body text

### Decisions

1. All 8 sections use `data-section` attribute for CSS targeting, no class attribute.
   Add data-section value as first class to each section for overlay engine matching.
   Template: `<section class="hero" data-section="hero" ...>`

2. Asset strategy: "absolute" — all image URLs already absolute public CDN URLs.
   No vendoring needed, no path rewriting.

3. No head-level links (no web fonts, no external CSS). No head links to emit.

4. No inline scripts → no animations.js needed.

5. Single inline style block (lines 24–452) → styles/festool.css

6. No placeholder elements in this Stardust 0.2.0 source.

7. Container-vs-children rule: In new-products, each product-card has img+h3+p+link all
   as separate slots. The `article.product-card` container is NOT slotted.
   In brand-teaser, each bt-card has bg+eyebrow+title+body+link as separate slots.
   The `article.bt-card` container is NOT slotted (and its .bt-img div is background-image slot).
