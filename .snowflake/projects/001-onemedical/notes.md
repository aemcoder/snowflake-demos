# Notes — 001 onemedical

## Phase: Capture

Source: https://paolomoz.github.io/stardust-site/samples/onemedical/proposed-A.html
Captured: 2026-05-19
Generator: Stardust 0.2.0 (variant A — faithful + improvements)
File size: 25888 bytes
Status: single-file HTML — all CSS inline in `<style>`, minimal JS inline in `<script>`

No external CSS/JS files on the same host. One inline `<script>` at bottom (sticky header scroll handler).

All image references are absolute URLs pointing to `www.onemedical.com` — no asset vendoring needed.

## Phase: Analyze

### Structural map

```
<body>
├── <header class="site-header" data-section="header">        ← HEADER FRAGMENT
│     sticky nav: logo SVG, nav-list (3 buttons), nav-cta (login + signup)
│
├── <section class="hero" data-section="hero">               ← SECTION 1
│     h1, promo-line p, hero-cta-row (Get Started btn), terms p
│     (hero background via CSS ::before pseudo-element — not a slot)
│
├── <section class="preview-section" data-section="preview-cards">  ← SECTION 2
│     3 × preview-card (each has: background-image div, eyebrow, h3, p, "more" span)
│
├── <section class="rotating-section" data-section="rotating-services">  ← SECTION 3
│     lead p, h2 with inline .rotator (CSS animation), footer-line p
│
├── <section class="icon-grid-section" data-section="benefits">  ← SECTION 4
│     header-row (eyebrow + h2 + sub p), 6 × icon-grid item (icon img + h3)
│
├── <section class="app-section" data-section="app-services">  ← SECTION 5
│     app-text (eyebrow + h2 + 4-item ul), app-photo (img)
│
├── <section class="membership-callout" data-section="cta-band">  ← SECTION 6
│     h3, p, CTA btn
│
├── <section class="video-section" data-section="video">  ← SECTION 7
│     h2, video-stage div (img poster, CSS ::after play button)
│
├── <section class="employer-strip" data-section="employer-benefit">  ← SECTION 8
│     eyebrow, h2, sub p, ghost-btn link, 3 × logo img
│
├── <section class="signup-footer" data-section="cta-band-final">  ← SECTION 9
│     eyebrow, h2, CTA btn
│
└── <footer class="site-footer" data-section="footer">          ← FOOTER FRAGMENT
      3-col footer-grid (locations, links, social), subfooter (legal links + copyright)
```

### Stardust version

0.2.0 (per provenance comment). No `data-placeholder="true"` attributes — no placeholder markers to skip.

### First-class collision analysis

Each section has a `data-section` attribute that is unique. Per the methodology discriminator hierarchy, using these for first-class names:

| Original class       | data-section        | New first class (in template) |
|----------------------|---------------------|-------------------------------|
| hero                 | hero                | hero (no collision — OK as-is) |
| preview-section      | preview-cards       | preview-cards (rename needed) |
| rotating-section     | rotating-services   | rotating-services (rename)    |
| icon-grid-section    | benefits            | benefits (rename)             |
| app-section          | app-services        | app-services (rename)         |
| membership-callout   | cta-band            | cta-band (rename)             |
| video-section        | video               | video (no collision — OK)     |
| employer-strip       | employer-benefit    | employer-benefit (rename)     |
| signup-footer        | cta-band-final      | cta-band-final (rename)       |

All 9 sections get unique first classes by using the data-section value.

### Asset strategy

All images use **absolute URLs** pointing to `https://www.onemedical.com/media/images/`. No vendoring needed.
Strategy: **absolute** — leave URLs as-is.

### Head-level resources

No `<link>` elements in `<head>` — only inline `<style>`. Fonts are `GT Super Display` and `Ginto`, referenced in CSS `font-family` but no `@font-face` blocks — these are system/fallback fonts.

### Inline style

Lines 24–482 (the entire `<style>` block).

### Inline script

Lines 719–723 (sticky header scroll handler — very small, include in animations file).

### External libs

None.

### Slots per section

**hero (section 1):**
- `title` — `h1` text
- `promo-line` — `p.promo-line` (contains strong)
- `cta-primary` — `.hero-cta-row a.btn` (link slot)
- `terms` — `p.terms` (contains link)

**preview-cards (section 2) — 3 cards:**
- `card-1.photo` — `.preview-card:nth-of-type(1) .photo` (background-image slot)
- `card-1.eyebrow` — `.preview-card:nth-of-type(1) .eyebrow`
- `card-1.title` — `.preview-card:nth-of-type(1) h3`
- `card-1.body` — `.preview-card:nth-of-type(1) p`
- `card-1.link` — `.preview-card:nth-of-type(1)` (the `<a>` itself — wraps photo+body, but we'll slot the inner items, NOT the container link)
- [repeat for card-2, card-3]

NOTE: The preview-card `<a>` wraps `.photo` (background-image slot) and `.body` which has eyebrow+h3+p. Per container-vs-children rule, do NOT slot the `<a>` itself — slot the inner items.

**rotating-services (section 3):**
- `lead` — `p.lead`
- `footer-link` — `p.footer-line a` (link slot)
NOTE: The h2 rotator is a CSS animation with the conditions list — this is a JS-animated interactive element. The conditions themselves are static template content (not individually authorable in this pattern). The h2+rotator stays static in template.

**benefits (section 4):**
- `eyebrow` — `.header-row .eyebrow`
- `title` — `.header-row h2`
- `sub` — `.header-row .sub`
- `item-1.icon` — `.icon-grid .item:nth-child(1) .icon img` (image slot)
- `item-1.text` — `.icon-grid .item:nth-child(1) h3`
- [repeat for items 2–6]

**app-services (section 5):**
- `eyebrow` — `.app-text .eyebrow`
- `title` — `.app-text h2`
- `list-item-1` — `.app-text li:nth-child(1)`
- `list-item-2` — `.app-text li:nth-child(2)`
- `list-item-3` — `.app-text li:nth-child(3)`
- `list-item-4` — `.app-text li:nth-child(4)`
- `app-photo` — `.app-photo img` (image slot)

**cta-band (section 6):**
- `title` — `h3`
- `body` — `p`
- `cta` — `a.btn-melon` (link slot)

**video (section 7):**
- `title` — `h2`
- `poster` — `.video-stage img` (image slot)

**employer-benefit (section 8):**
- `eyebrow` — `.eyebrow`
- `title` — `h2`
- `sub` — `.sub`
- `cta` — `a.btn-ghost` (link slot)
- `logo-1` — `.logo-row img:nth-child(1)` (image slot)
- `logo-2` — `.logo-row img:nth-child(2)` (image slot)
- `logo-3` — `.logo-row img:nth-child(3)` (image slot)

**cta-band-final (section 9):**
- `eyebrow` — `.eyebrow`
- `title` — `h2`
- `cta` — `a.btn-melon` (link slot)

### Decisions

1. Template name: `onemedical`
2. No `<main>` in source — synthesize one wrapping all 9 sections
3. All sections use `data-section` for first-class reordering
4. Asset strategy: absolute (all images already absolute from onemedical.com)
5. No head-level `<link>` resources to lift (no external fonts/CSS)
6. Inline `<style>` → `styles/onemedical.css`
7. Inline `<script>` (sticky header) → `scripts/onemedical-animations.js`
8. rotating-services: h2/rotator stays static (CSS animation); only lead and footer-line are slots
9. preview-cards: slot inner items NOT the `<a>` container (container-vs-children rule)
