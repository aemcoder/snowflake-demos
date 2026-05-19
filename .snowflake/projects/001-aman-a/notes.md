# Notes — 001 aman-a

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/aman/proposed-A.html
- Captured: 2026-05-19
- Generator: Stardust 0.2.0 (provenance comment in source)
- Page intent: Aman luxury hotel brand home page, variant A (Calibration)
- Size: 24 149 bytes

## Phase: Analyze

### Structural map

```
<head>          inline <style> only — no external CSS, no Google Fonts
<body>
  <header>      .site-header — fixed top nav with logo, menu, reserve CTA
  <section>     data-section="hero" — full-bleed atmospheric image, scroll anchor
  <section>     class="section" data-section="seasonal-feature" — centered text block
  <section>     class="section" data-section="twin-features" — 2-card split
  <section>     class="section" data-section="audience-grid" — 4-card grid
  <section>     class="section" data-section="world-of-aman" — 3-card grid
  <footer>      .site-footer — columns: More Info, Destinations, Stay in touch
  <script>      inline scroll handler for sticky header
```

### Decisions surfaced by analysis

1. **`<main>` absent** — synthesize wrapping the 5 sections.
2. **First-class collision** — multiple `section.section` elements; use `data-section` value as unique first class (e.g. `seasonal-feature section`).
3. **Hero has no editable text** — only a decorative `<span class="hero-anchor">` (aria-hidden). Zero slots.
4. **Hero background**: set via CSS `section[data-section="hero"]` — no inline style, no background-image slot needed. Background is static in the extracted CSS.
5. **Images**: all absolute `https://www.aman.com/...` URLs — no vendor/rewrite needed.
6. **Container-vs-children**: `.twin-media`, `.audience-media`, `.world-media` each wrap `<a>` + `<img>`. Slot the `<img>`, not the `<a>`.
7. **No `data-placeholder` markers** — Stardust 0.2.0 convention; no `data-slot-skip` needed.
8. **Inline `<script>`** → extracted to `aman-a-animations.js` (header scroll state).
9. **No external fonts** — no Google Fonts links to lift; font stack uses web-safe fallbacks.

## Phase: Generate

- Template: 5 sections, 52 `[data-slot]` markers
- DA doc: divs-with-class shape, metadata block inside `<main>` ✓
- All DA cell `<img>` src are absolute ✓
- No `<table>`, `<br>`, `<b>`, `<span class>` in DA doc ✓
- No `assets/` relative refs in template/fragments/CSS ✓

Slot count by section:
- hero: 0
- seasonal-feature: 4 (eyebrow, title, body, cta)
- twin-features: 10 (2 cards × 5)
- audience-grid: 22 (section-title, section-body + 4 cards × 5)
- world-of-aman: 16 (section-title + 3 cards × 5)
Total: 52

## Phase: Wire

Artifacts deployed:
- templates/aman-a.html
- fragments/aman-a/header.html
- fragments/aman-a/footer.html
- styles/aman-a.css
- scripts/aman-a-animations.js
- drafts/aman-a-a.html

Lint: clean (no errors)

## Phase: Round-trip

Local: skipped (autonomous mode per instructions)

Production:
- Branch pushed: sd-aman-a
- DA PUT: 201 Created
- Preview POST: 200 — https://sd-aman-a--snowflake-demos--aemcoder.aem.page/aman/a
- Live POST: 200 — https://sd-aman-a--snowflake-demos--aemcoder.aem.live/aman/a
- Code-bus sanity: all 5 artifact paths return 200
- Live page HTTP 200
- `<meta name="template" content="aman-a">` verified present in response
- Media Bus active: first card image resolved to `media_1f031917...` (optimized)

## Phase: Reflect

This was a clean conversion — Stardust 0.2.0 source with no placeholders, all absolute CDN images, minimal JS. The hero section has zero editorial slots (background hardcoded in CSS by selector, not inline style) which is noted but acceptable for this variant.

No new cross-project learnings surfaced — all patterns matched documented methodology.
