# Notes — 001 frescopa-a

## Phase: Capture

Source: https://paolomoz.github.io/stardust-site/samples/frescopa/proposed-A.html
Fetched 30KB single HTML file. No external assets to vendor — all
references are CDN (Google Fonts) or relative `assets/media/*` images
on the source host (paolomoz.github.io). Asset strategy: rewrite to
absolute URLs at source host (publicly reachable).

Generator: Stardust 0.2.0 (per provenance comment in head).
Placeholder convention: 0.2.0 uses `<span class="placeholder-tag">`
inline marker — but a scan of this page finds zero placeholders.
All content is authored.

## Phase: Analyze

### Structural map

```
Line   Element                                                Belongs to
─────  ─────────────────────────────────────────────────────  ──────────
617    <header.promo-strip data-section="promo-strip">        HEADER FRAGMENT
625    <header.site-header data-section="header">             HEADER FRAGMENT
648    <section.hero data-section="hero">                     MAIN sec 1
663    <section.shop-categories data-section="shop-categories"> MAIN sec 2
700    <section.subscription-card-on-bay data-section="...">  MAIN sec 3
717    <section.locations-finder data-section="...">          MAIN sec 4
730    <section.featured-coffee data-section="...">           MAIN sec 5
745    <section.rewards-cta-band data-section="...">          MAIN sec 6
755    <footer.site-footer data-section="footer">             FOOTER FRAGMENT
```

No `<main>` wrapper — synthesize one wrapping the 6 sections.

### First-class uniqueness

All 6 main sections have unique first-classes (hero, shop-categories,
subscription-card-on-bay, locations-finder, featured-coffee,
rewards-cta-band). No disambiguation needed.

### CSS-collision check (learning 2026-05-19)

For each section first-class, check whether the page CSS uses it with
layout properties (display: grid/flex) that would constrain inner
children. Per inspection:

- `.hero` uses `display: flex; align-items: center` — applies to the
  hero element itself, centering its `.container` child. Single child;
  no inner-grid collapse.
- All other section first-class rules only set background + padding +
  occasionally text-align. No inner-grid layout. No collision.

### Slot opportunities

Hero (section 1):
- eyebrow: `.eyebrow` text "MyBarista coffee quiz"
- title: `<h1>` text including `<em>perfect</em>` — keep as text
- subhead: `.subhead` p text
- cta-primary (link): "Take the quiz" → /stardust-site/quiz
- cta-secondary (link): "Browse coffee" → /stardust-site/coffee

shop-categories (section 2):
- eyebrow: "Shop"
- title: `<h2>` text "Shop all Frescopa products."
- 5 category cards. Each card has: image, title, catalog-line, link.
  Cards wrap children in `<a class="category-card">`. Per the
  container-vs-children rule, we slot the inner children (title,
  catalog, image) but leave the wrapper `<a>` static. Slot names:
  card-1.image, card-1.title, card-1.catalog (and card-1.link for
  the href).
  Per learnings, `<a>` slot with nested data-slot children would clobber
  → so we'll slot inner only (link href stays in template since it's
  navigation, not authored).

subscription-card-on-bay (section 3):
- eyebrow: "Subscription"
- title: `<h3.editorial>` "Coffee, every week."
- body: paragraph
- cta (link): "Start your subscription" → /stardust-site/subscription
- image: 1 photo

locations-finder (section 4):
- eyebrow: "Locations"
- title: `<h2>` "Find a Frescopa near you."
- body: paragraph
- (the form input + submit are not slots — they're functional UI)

featured-coffee (section 5):
- eyebrow: "Featured"
- title: `<h3.editorial>` "Elevate your coffee game."
- body: paragraph
- cta (link): "Shop coffee"
- image: 1 photo

rewards-cta-band (section 6):
- eyebrow: "Rewards"
- title: `<h2.editorial>` "Rewards waiting."
- body: paragraph
- cta (link): "Claim rewards"

### Asset references

- Inline CSS `background-image: url('assets/media/hero-B-generated.png')`
  → rewrite to `url('https://paolomoz.github.io/stardust-site/samples/frescopa/assets/media/hero-B-generated.png')`
- `<img src="assets/logo.svg">` (header + footer logos) → rewrite to source-absolute
- `<img src="assets/media/*.png|jpg">` (category cards + subscription + featured)
  → rewrite to source-absolute. DA cells need absolute URLs too.

### Head-level links to lift into template

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Cormorant+Garamond:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Martian+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@1,144,800..900&display=swap">
```

### Inline content

- One inline `<style>` block lines 40-612 → extract to
  `/styles/frescopa-a.css` (after URL rewrite).
- No inline `<script>` blocks. Skip animations.js — substrate HEAD-probes
  and silently 404s.

### Strip list

- `<!-- stardust:provenance ... -->` comment — keep is fine but strip for cleanliness.
- HTML comments demarcating sections (`<!-- 1. promo-strip -->`) — strip
  for cleanliness.

