# Notes — 001 aman

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/aman/proposed-A.html
- Generator: Stardust 0.2.0 (prototype mode)
- Variant: A · Calibration (conservative refresh)
- The brand.html?slug=aman#A URL is a viewer shell — the actual page is inside an iframe
- All styles inline, one inline script (header scroll behavior)
- All images absolute URLs to www.aman.com
- No external CSS/JS, no font preloads

## Phase: Analyze

### Structural map

```
Line   Element                                        First-class (for EDS)
─────  ──────────────────────────────────────         ─────────────────────────
298    <header class="site-header">                   → HEADER FRAGMENT
318    <section data-section="hero">                  → hero
323    <section class="section" data-section="seasonal-feature">  → seasonal-feature
333    <section class="section" data-section="twin-features">     → twin-features
353    <section class="section" data-section="audience-grid">     → audience-experiences [renamed]
393    <section class="section" data-section="world-of-aman">    → world-of-aman
425    <footer class="site-footer">                   → FOOTER FRAGMENT
477    <script> (inline, header scroll)               → animations JS
```

### No `<main>` — must synthesize

Source has no `<main>` element. Content sections are direct children of `<body>`.
Template must wrap them in `<main>`.

### First-class collision analysis

All content sections share `class="section"` as their only class. The hero has
no class at all. Per methodology, disambiguate using `data-section` attribute
(Stardust convention, priority 1).

**CSS collision check:**
- `hero` — CSS targets `section[data-section="hero"]` not `.hero` → SAFE
- `seasonal-feature` — no `.seasonal-feature` in CSS → SAFE
- `twin-features` — no `.twin-features` in CSS → SAFE
- `audience-grid` — `.audience-grid { display: grid; grid-template-columns: repeat(4, 1fr) }` → **COLLISION**
- `world-of-aman` — no `.world-of-aman` in CSS → SAFE

Per cross-project learning 2026-05-19: `audience-grid` was already flagged for Aman.
Renaming first-class to `audience-experiences` (from section's heading "Seasonal Experiences").

### Slot mapping

**hero:**
- hero-bg (background-image) — on section element's inline style

**seasonal-feature:**
- eyebrow (text) — `p.eyebrow`
- title (text) — `h2.lyon.lyon-h-xl`
- body (text) — `p` (body paragraph)
- cta (link) — `a.btn-secondary`

**twin-features:**
- card-1.image (image) — `.twin-card:nth-child(1) .twin-media img`
- card-1.eyebrow (text)
- card-1.title (text)
- card-1.body (text)
- card-1.cta (link)
- card-2.image (image)
- card-2.eyebrow (text)
- card-2.title (text)
- card-2.body (text)
- card-2.cta (link)

**audience-experiences:**
- title (text) — `.section-head h2`
- body (text) — `.section-head p`
- card-1.image through card-4.image (image)
- card-1.eyebrow through card-4.eyebrow (text)
- card-1.title through card-4.title (text)
- card-1.body through card-4.body (text)
- card-1.cta through card-4.cta (link)

**world-of-aman:**
- title (text) — `.section-head h2`
- card-1.image through card-3.image (image)
- card-1.eyebrow through card-3.eyebrow (text)
- card-1.title through card-3.title (text)
- card-1.body through card-3.body (text)
- card-1.cta through card-3.cta (link)

### Head-level resources

None. No external font links (Lyon Display Web / Whitney SSm referenced in
font-family stacks but no @font-face or Google Fonts link in source). These
fonts will fall back to 'Times New Roman' / system-ui in the converted page
unless font files are vendored separately.

### Asset strategy

All images use absolute URLs to `https://www.aman.com/...`. Public host.
Strategy: **keep as-is** (absolute URLs pointing at public source host).
No vendoring needed.

### Decisions surfaced by analysis

1. Synthesize `<main>` wrapping all content sections (hero through world-of-aman)
2. Rename section first-classes using data-section, except audience-grid → audience-experiences
3. Hero uses background-image slot (background-image writer case)
4. No placeholders detected (Stardust 0.2.0 convention not triggered)
5. Footer fragment uses `<footer>` tag — apply visibility fix per learnings
6. Strip provenance comment from template (dev-only)
7. Extract inline `<style>` to `styles/aman.css`
8. Extract inline `<script>` to `scripts/aman-animations.js`
