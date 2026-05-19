# Notes — 001 virginatlantic-a

## Phase: Capture

Fetched 29,373 bytes from https://paolomoz.github.io/stardust-site/samples/virginatlantic/proposed-A.html
Generator: Stardust prototype (provenance meta: `stardust:prototype`, variant A-editorial-sky)
No external CSS or JS files referenced. Single self-contained HTML file with one inline <style> block.
All images are absolute URLs pointing to virginatlantic CDN hosts (vaabrowse.virginatlantic.com, flywith.virginatlantic.com).
No font preconnect <link> elements in head — font stack is "Gotham","Helvetica Neue",Helvetica,Arial,sans-serif.

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
1-7    <head> — charset, viewport, provenance meta, title
8-279  <style> → extract to styles/virginatlantic-a.css
281    <body data-variant="A-editorial-sky" data-stardust-prototype="home">
283-300  HEADER FRAGMENT: <header class="va-header"> logo + nav + utility
302    <main>
303-315  hero — <section class="hero" data-section="hero"> [rewriteToSection: already section]
317-346  booking — <div class="wrap"><form class="booking"> [non-section, rewrite to <section class="booking">]
348-404  destinations — <section id="destinations" data-section="destinations"> [first-class="destinations"]
406-412  editorial-pullquote — <section class="pull" data-section="editorial-pullquote"> [first-class="editorial-pullquote"]
414-449  cabins — <section id="cabins" class="cabin" data-section="cabins"> [first-class="cabin"]
451-467  rewards — <section class="rewards" id="rewards" data-section="rewards"> [first-class="rewards"]
469-496  help — <section class="help" id="help" data-section="help"> [first-class="help"]
497    </main>
499-553  FOOTER FRAGMENT: <footer class="footer"> multi-column footer
```

### Placeholder convention

Stardust: `<element data-placeholder>` (boolean attribute, no value). Found at:
- Line 410: `<div class="pull__cite" data-placeholder>` — pull-quote attribution
- Line 457: `<span data-placeholder>LHR → JFK Premium · from 30,000 pts + £232</span>` — illustrative pricing

Both are marked with `data-slot-skip="placeholder"` in the template.

### Section first-class uniqueness

All 7 sections have unique first classes. Booking widget is a <form> inside a <div.wrap>, needs to be
rewritten as <section class="booking"> with inner .wrap preserved.

### Slot plan

**hero** (section.hero):
- `hero__media` div has inline style via CSS class (not inline style attr) → NOT a bg-image slot (CSS class controls it)
  Actually: .hero__media uses background-image as CSS CLASS rule `background-image: url(...)`. This is in CSS, not inline style.
  No data-slot for the hero background — it's in the CSS file. This is acceptable for now.
- `hero.eyebrow` → text slot: `.hero__eyebrow`
- `hero.title` → text slot: `.hero__title` (contains <span class="accent"> — use <strong> in DA, note CSS accent class won't survive)
- `hero.lede` → text slot: `.hero__lede`
- `hero.cta-primary` → link slot: `a.btn--primary` in .hero__cta
- `hero.cta-secondary` → link slot: `a.btn--ghost` in .hero__cta

**booking** (section.booking) — static form widget (no content slots, functional widget):
- No text/image slots — entire widget is static functional UI
- The field values (Flying from, Flying to, etc.) are UI defaults, not authored content → static

**destinations** (section#destinations):
- `destinations.eyebrow` → text slot: `span.eyebrow`
- `destinations.title` → text slot: `h2.section-title`
- `destinations.lede` → text slot: `p.section-lede`
- Destination cards — images are in `<img class="dest__img">` inside `<a class="dest">` links
  - dest-lead.img → image slot: `a.dest--lead img.dest__img`
  - dest-lead.city → text slot: `a.dest--lead h3.dest__city`
  - dest-lead.sub → text slot: `a.dest--lead span.dest__sub`
  - dest-lead.link → link slot: `a.dest--lead` — BUT this wraps img + caption children which have their own slots.
    Per container-vs-children rule: slot the children, leave the <a> unslotted.
  - Rail items (5 small): Each has img + city text. slot img and city.
    dest-edinburgh.img, dest-edinburgh.city, dest-edinburgh.sub, etc.

**editorial-pullquote** (section.pull):
- `pullquote.text` → text slot: `blockquote.pull__text`
- `pullquote.cite` → data-slot-skip="placeholder" (has data-placeholder attr)

**cabins** (section.cabin):
- `cabins.eyebrow` → text slot: `span.eyebrow`
- `cabins.title` → text slot: `h2.section-title`
- cabin-1 (Upper Class):
  - `cabin-1.name` → text: `cabin__row:nth-child(1) p.cabin__name`
  - `cabin-1.title` → text: `cabin__row:nth-child(1) h3.cabin__title`
  - `cabin-1.body` → text: `cabin__row:nth-child(1) p.cabin__body`
  - `cabin-1.img` → image: `cabin__row:nth-child(1) img`
  - `cabin-1.cta` → link: `cabin__row:nth-child(1) a.btn`
- cabin-2 (Premium):
  - `cabin-2.name`, `cabin-2.title`, `cabin-2.body`, `cabin-2.img`, `cabin-2.cta`
- cabin-3 (Economy):
  - `cabin-3.name`, `cabin-3.title`, `cabin-3.body`, `cabin-3.img`, `cabin-3.cta`

**rewards** (section.rewards):
- `rewards.eyebrow` → text: `span.eyebrow`
- `rewards.title` → text: `h2.rewards__title`
- `rewards.body` → text: `p.rewards__body` (first one)
- `rewards.pricing` → data-slot-skip="placeholder" (has data-placeholder)
- `rewards.cta-primary` → link: `a.btn--primary`
- `rewards.cta-secondary` → link: `a.btn--ghost`
- `rewards.img` → image: `.rewards__visual img`

**help** (section.help):
- `help.eyebrow` → text: `span.eyebrow`
- `help.title` → text: `h2.section-title`
- help-card-1:
  - `help-1.num` → text: `article.help__card:nth-child(1) span.help__num`
  - `help-1.heading` → text: `article:nth-child(1) h3.help__h`
  - `help-1.body` → text: `article:nth-child(1) p.help__b`
  - `help-1.link1` → link: `ul.help__list li:nth-child(1) a`
  - `help-1.link2` → link: `ul.help__list li:nth-child(2) a`
  - `help-1.link3` → link: `ul.help__list li:nth-child(3) a`
- help-card-2: same pattern

### Head-level resources
No <link> elements in <head>. Font stack is system/fallback. No head links needed.

### Asset strategy
All images are absolute URLs pointing to virginatlantic CDN hosts. No relative paths found.
Strategy: "absolute" — no path rewriting needed.

### Decisions surfaced by analysis

1. Booking widget is a functional form widget; no content slots needed — all fields are static UI defaults.
2. Hero background image is in CSS class rule (not inline style attr) — cannot be a bg-image slot via data-slot.
   Leave the background-image in the CSS file as-is.
3. Destination card <a> wraps slotted children — do NOT slot the <a> itself (container-vs-children rule).
4. Pull-quote cite and rewards pricing have data-placeholder → mark data-slot-skip="placeholder".
5. Booking <form> inside <div class="wrap"> needs to be rewritten as <section class="booking"> 
   with the inner wrap and form preserved.
6. All image URLs are absolute CDN URLs — no DA cell URL rewriting needed beyond using them as-is.
