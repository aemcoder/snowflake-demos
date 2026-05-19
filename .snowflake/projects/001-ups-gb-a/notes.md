# Notes — 001 ups-gb-a

## Phase: Capture

- Source URL: https://paolomoz.github.io/stardust-site/samples/ups-gb/proposed-A.html
- Generator: Stardust 0.3.0 (confirmed from provenance comment)
- 57KB HTML, all CSS inline in `<style>` block (lines 40-554), no external CSS/JS
- All images are absolute URLs on `assets.ups.com` and `www.ups.com` — no asset migration needed
- Two relative internal links: `/stardust-site/global` (country picker, kept as-is) — not a content slot, stays in template
- Stardust placeholder convention: `data-placeholder="true"` — **NOT FOUND** in this page; no placeholder elements

## Phase: Analyze

### Structural map

```
Line   Element/Role
─────  ──────────────────────────────────────────────────────────────────
1      <!doctype html>
4      <!-- stardust:provenance (metadata comment, strip from header fragment)
40     <style> ... </style>  → extract to styles/ups-gb-a.css
556    <body>
557    <a class="skip"> skip link → goes to header fragment
562    <header class="site-header">            HEADER FRAGMENT START
563      <div class="utility-bar">             utility bar (login, location, country)
597      <div class="alert-shell">             service alerts chip + drawer
630      <div class="primary-nav">             brand + nav + actions
652    </header>                               HEADER FRAGMENT END
654    <main id="main">                        MAIN START (already has <main>)
659      <section class="tracking-hero">       SECTION 1: tracking-hero
752      <section class="band band-surface">   SECTION 2: regulations-cross-promo
           data-section="regulations-cross-promo" → first-class = "regulations-cross-promo"
786      <section class="band">                SECTION 3: marketing-row-asia
           data-section="marketing-row-asia"   → first-class = "marketing-row-asia"
808      <section class="band band-surface">   SECTION 4: marketing-row-app
           data-section="marketing-row-app"    → first-class = "marketing-row-app"
822      <section class="band band-deep">      SECTION 5: digital-edge
           data-section="digital-edge"         → first-class = "digital-edge"
869      <section class="band">                SECTION 6: services-case-studies
           data-section="services-case-studies" → first-class = "services-case-studies"
906      <section class="lfc-strip">           SECTION 7: lfc-sponsorship
           data-section="lfc-sponsorship"      → first-class = "lfc-sponsorship"
926      <section class="band band-surface">   SECTION 8: quick-links
           data-section="quick-links"          → first-class = "quick-links"
989    </main>
994    <footer class="site-footer">            FOOTER FRAGMENT START
1049   </footer>
1054   <aside class="cookie-band">             COOKIE BAND → included in footer fragment
1065   </aside>                                FOOTER FRAGMENT END
```

### Section first-class analysis

All sections already have `data-section` attributes. The outermost sections use utility
classes (`band`, `band-surface`, etc.) as their first class — these will COLLIDE in the
overlay engine which matches by first class.

**Resolution:** The first class must be changed to the `data-section` value:
- `<section class="band band-surface" data-section="regulations-cross-promo">` → `<section class="regulations-cross-promo band band-surface" ...>`
- `<section class="band" data-section="marketing-row-asia">` → `<section class="marketing-row-asia band" ...>`
- `<section class="band band-surface app-band" data-section="marketing-row-app">` → `<section class="marketing-row-app band band-surface app-band" ...>`
- `<section class="band band-deep" data-section="digital-edge">` → `<section class="digital-edge band band-deep" ...>`
- `<section class="band" data-section="services-case-studies">` → `<section class="services-case-studies band" ...>`
- `<section class="band band-surface" data-section="quick-links">` → `<section class="quick-links band band-surface" ...>`
- `tracking-hero` first class = `tracking-hero` ✓ already unique
- `lfc-sponsorship`: first class = `lfc-strip` from class attribute; `data-section="lfc-sponsorship"` → `<section class="lfc-sponsorship lfc-strip" ...>`

### Slot decisions

**Section 1: tracking-hero**
- `.hero-eyebrow` → text slot `eyebrow` (content: "Self-service")
- `h1.hero-h1 > span.tab-title[data-tab="track"]` → text slot `h1-track` (content: "Track a Parcel")
- `h1.hero-h1 > span.tab-title[data-tab="quote"]` → text slot `h1-quote`
- `h1.hero-h1 > span.tab-title[data-tab="ship"]` → text slot `h1-ship`
- `h1.hero-h1 > span.tab-title[data-tab="billing"]` → text slot `h1-billing`
- `.hero-sub` → text slot `hero-sub`
- `.hero-photo img` → image slot `hero-photo`
- Tab forms and help text are functional/static — NOT slots (form actions are static UPS URLs)

**Section 2: regulations-cross-promo**
- `.band-header .label` → text slot `label`
- `.band-header h2.headline` → text slot `headline`
- `.band-header .lede` → text slot `lede`
- Cards: `.cards-3 .card:nth-child(1)` → card-1 (link slot on `<a class="card">` NOT suitable — contains multiple child slots; slot children individually)
  - `.card:nth-child(1) .card-eyebrow` → `card-1.eyebrow`
  - `.card:nth-child(1) h3.title` → `card-1.title`
  - `.card:nth-child(1) p` → `card-1.body`
  - `.card:nth-child(1) .card-cta` → `card-1.cta` (text, not link — cta text changes)
  - `.card:nth-child(1)` href → need slot on <a> for href; BUT <a> has nested slotted children → SKIP card-level link slot, keep href static
  - Same for cards 2 and 3

**Section 3: marketing-row-asia**
- `.band-header` absent — no section header
- `.pic img` → image slot `photo`
- `.copy .label` → text slot `label`
- `.copy h2.headline` → text slot `headline`
- `.copy .lede` → text slot `lede`
- `.copy .actions .btn-primary` → link slot `cta-primary`
- `.copy .actions .text-link` → link slot `cta-secondary`

**Section 4: marketing-row-app**
- `.app-band-inner .label` → text slot `label`
- `.app-band-inner h2.headline` → text slot `headline`
- `.app-band-inner .lede` → text slot `lede`
- `.app-band-inner .text-link` → link slot `cta`

**Section 5: digital-edge**
- `.band-header .label` → text slot `label` (note: has inline style="color:var(--color-primary)" — keep as-is in template, slot text only)
- `.band-header h2.headline` → text slot `headline`
- Features (3):
  - `.feature:nth-child(1) .icon-tile img` → image slot `feature-1.icon`
  - `.feature:nth-child(1) h3.title` → text slot `feature-1.title`
  - `.feature:nth-child(1) p` → text slot `feature-1.body`
  - `.feature:nth-child(2) .icon-tile img` → image slot `feature-2.icon`
  - `.feature:nth-child(2) h3.title` → text slot `feature-2.title`
  - `.feature:nth-child(2) p` → text slot `feature-2.body`
  - `.feature:nth-child(3) .icon-tile img` → image slot `feature-3.icon`
  - `.feature:nth-child(3) h3.title` → text slot `feature-3.title`
  - `.feature:nth-child(3) p` → text slot `feature-3.body`
- `.deep-cta .btn-primary` → link slot `cta-primary`
- `.deep-cta .text-link-on-dark` → link slot `cta-secondary`

**Section 6: services-case-studies**
- `.band-header .label` → text slot `label`
- `.band-header h2.headline` → text slot `headline`
- Case cards — <a class="case-card"> wraps img + text; slot children individually
  - `.case-card:nth-child(1) .pic img` → image slot `card-1.photo`
  - `.case-card:nth-child(1) .body .eyebrow` → text slot `card-1.eyebrow`
  - `.case-card:nth-child(1) .body h3.title` → text slot `card-1.title`
  - `.case-card:nth-child(1) .body p` → text slot `card-1.body`
  - `.case-card:nth-child(1) .body .case-cta` → text slot `card-1.cta`
  - Same for card 2

**Section 7: lfc-sponsorship**
- `.pic img` → image slot `photo`
- `.copy h2.headline` → text slot `headline`
- `.copy p` → text slot `body`
- `.actions a` → link slot `cta`

**Section 8: quick-links**
- `.band-header .label` → text slot `label`
- `.band-header h2.headline` → text slot `headline`
- Quick links columns are navigation — static links, NOT content slots (too many links, authors edit site nav separately)

### Head-level resources
- Google Fonts: NONE (uses Roboto via CSS variable — loaded via browser/OS or system fallback)
- No external stylesheets or preconnects in `<head>`
- No external CDN scripts

### CSS extraction
- Lines 40-554: full inline `<style>` block → `styles/ups-gb-a.css`

### Scripts
- No inline scripts in source page
- No animations JS needed

### Asset strategy
- All images: absolute URLs on `assets.ups.com` and `www.ups.com` → "absolute" strategy, no vendoring needed
- Two `/stardust-site/global` relative links in header/footer → keep as-is (they're nav links, not image assets)

### Decisions
1. Synthesize `<main>`: NOT needed (already has `<main id="main">`)
2. Rewrite section first-class: YES — use `data-section` value as first class for all sections that share utility class names
3. Asset strategy: "absolute" (all images already absolute URLs on public CDN)
4. No placeholder elements (Stardust 0.3.0 `data-placeholder` — not present in this page)
5. No external CDN libraries to vendor
6. Footer fragment: `<footer class="site-footer">` + `<aside class="cookie-band">` (cookie band is post-footer in body)
7. Skip link (`<a class="skip">`) goes in header fragment
8. `quick-links` columns: static nav — NOT slots (too many links)
9. Card/case-card links: slot children individually, NOT the wrapping `<a>` (container vs children rule)
