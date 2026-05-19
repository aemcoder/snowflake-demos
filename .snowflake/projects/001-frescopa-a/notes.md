# Notes — 001 frescopa-a

## Phase: Capture

Fetched 30,968 bytes from https://paolomoz.github.io/stardust-site/samples/frescopa/proposed-A.html
Generator: Stardust 0.2.0 (provenance comment in source confirms stardustVersion: 0.2.0)
No external same-host CSS/JS assets referenced. Google Fonts are CDN-hosted.
Source assets are hosted at https://paolomoz.github.io/stardust-site/ (public).

## Phase: Analyze

### Structural map

```
Body (data-template="landing")  [NO <main> — needs synthesis]
│
├── <header class="promo-strip" data-section="promo-strip">   ← HEADER FRAGMENT START
│     .container
│       span.promo-text   "FREE SHIPPING FROM $35 WITH CODE FRESCOPA"
│       a.tannin-link     "Shop now"
│
├── <header class="site-header" data-section="header">
│     .container
│       a.logo > img (assets/logo.svg)
│       nav.nav-primary > 6 nav links
│       .nav-secondary > 3 icon-btns + a.signin          ← HEADER FRAGMENT END
│
├── <section class="hero" data-section="hero">             ← MAIN START (synthesized)
│     .container > .content
│       span.eyebrow
│       h1 > em (gilt accent "perfect")
│       p.subhead
│       .ctas
│         a.btn.btn-primary-on-bay  "Take the quiz"
│         a.btn.btn-secondary       "Browse coffee"
│
├── <section class="shop-categories" data-section="shop-categories">
│     .container
│       .header-row
│         span.eyebrow  "Shop"
│         h2            "Shop all Frescopa products."
│       .grid (5 category cards)
│         a.category-card (×5) each: .img-wrap > img, span.card-title, span.catalog-line
│
├── <section class="subscription-card-on-bay" data-section="subscription-card-on-bay">
│     .container > .card
│       .content
│         span.eyebrow  "Subscription"
│         h3.editorial  "Coffee, every week."
│         p             (body copy)
│         a.btn         "Start your subscription"
│       .photo-frame > img
│
├── <section class="locations-finder" data-section="locations-finder">
│     .container
│       span.eyebrow  "Locations"
│       h2            "Find a Frescopa near you."
│       p             (body copy)
│       form.search-row > input[type=text] + button "Browse all locations"
│
├── <section class="featured-coffee" data-section="featured-coffee">
│     .container
│       .photo-frame > img
│       .content
│         span.eyebrow  "Featured"
│         h3.editorial  "Elevate your coffee game."
│         p             (body copy)
│         a.btn         "Shop coffee"
│
├── <section class="rewards-cta-band" data-section="rewards-cta-band">
│     .container
│       span.eyebrow  "Rewards"
│       h2.editorial  "Rewards waiting."
│       p             (body copy)
│       a.btn         "Claim rewards"               ← MAIN END (synthesized)
│
└── <footer class="site-footer" data-section="footer">     ← FOOTER FRAGMENT START
      .container (grid: brand col + 4 nav cols)
        .brand > .logo, p.tagline, address.contact
        4x nav-col: p.col-heading + ul.col-links
      .legal (copyright + links)                           ← FOOTER FRAGMENT END
```

### First-class uniqueness

All 6 template sections have unique first classes:
- hero
- shop-categories
- subscription-card-on-bay
- locations-finder
- featured-coffee
- rewards-cta-band

No rewrite needed. `data-section` attrs present and match first classes already.

### Asset strategy

Source is publicly hosted on `paolomoz.github.io`. Strategy: **absolute**.
Rewrite all relative `assets/...` refs to `https://paolomoz.github.io/stardust-site/samples/frescopa/assets/...`

Asset paths found:
- assets/logo.svg (header × 2, footer)
- assets/media/hero-B-generated.png (CSS background-image in hero)
- assets/media/339b7a58_media_18d90d06cb150321e2b7de19e82a9818c57b1eaaa.png (shop-categories card 1)
- assets/media/c4251005_media_11f2acc820929d908638cf3f7f133c5ac9792a560.png (card 2)
- assets/media/604aa0d1_media_1611a15fc05b259399fa254f961f08b9f7804cd23.png (card 3)
- assets/media/bba1fdc3_media_1b4036e97de71a31f998526cf47deb2999dbaee87.png (card 4)
- assets/media/5dcf858f_media_1ad953e2b8b4f9e3e3f11e8fb8cedeca7a5ab2343.png (card 5)
- assets/media/4828596f_media_142bc7969dd6719789e5d13a853d6e6887c5311c5.png (subscription)
- assets/media/41cdb3eb_media_1990fe27244fdc5d261155cd983f85a56415baf1c.jpg (featured-coffee)

### Head-level links to lift into template

1. `<link rel="preconnect" href="https://fonts.googleapis.com">`
2. `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
3. `<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Cormorant+Garamond:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Martian+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@1,144,800..900&display=swap" rel="stylesheet">`

### Inline styles & scripts

- One `<style>` block: lines 40–612 → extract to `styles/frescopa-a.css`
- No inline `<script>` blocks — no animations file needed

### Placeholder convention

Stardust 0.2.0 uses `<span class="placeholder-tag">` markers.
Scanning source: NONE PRESENT in this page. All content is real.

### Hero background-image

The hero uses a CSS `background-image: url('assets/media/hero-B-generated.png')` on the
`.hero` section element. This is in the extracted CSS, NOT an inline style on the element.
The hero background is a design decision in CSS — it is NOT a slot (authors can't change it
via a `data-slot` on the `.hero` element since there's no inline `style` attribute on the
element itself, only in the extracted CSS).

Decision: The hero background image is part of the CSS styling; it stays in `styles/frescopa-a.css`
pointing to the absolute URL. It is NOT a slot.

### Decisions surfaced by analysis

1. Synthesize `<main>` around the 6 sections (hero → rewards-cta-band).
2. All sections use `<section>` tag — no rewrite needed.
3. All first classes unique — no disambiguation needed.
4. No `<main>` in source — synthesize one.
5. Asset strategy: absolute → rewrite to https://paolomoz.github.io/stardust-site/samples/frescopa/assets/
6. Hero h1 has `<em>` for gilt color accent — the `<em>` is styling. For DA slot value, we'll use plain text "Find your perfect coffee in four questions." The template keeps the `<em>` as static decoration. Actually, since it's content that authors may want to change, keep the h1 as a slot but note that the `<em>` wrapping "perfect" is part of the design — we'll include it in the default slot value.
7. No animations JS needed.
8. Header fragment: both `<header>` elements (promo-strip + site-header).
9. Footer fragment: `<footer class="site-footer">`.
10. Shop-categories: 5 category cards — use indexed slot names (card-1 through card-5). Cards are `<a>` wrappers with inner `<img>`, `<span.card-title>`, `<span.catalog-line>`. Slot the inner children individually (card-N.img, card-N.title, card-N.catalog) — NOT the outer `<a>` (container-vs-children rule).
