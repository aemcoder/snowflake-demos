# Notes — 001 jfk-airport-a (refresh)

Source: https://paolomoz.github.io/stardust-site/samples/jfk-airport/proposed-A.html
Generator: Stardust 0.3.0
Captured: 2026-05-19

## Phase: Capture

- HTML fetched: 1614 lines.
- Inline `<style>` block: lines 150–898.
- Inline `<script>` block: lines 1496–1611.
- No external `<link>` or `<script src>` references — fully self-contained.
- No head-level fonts or Google Fonts; all fonts referenced through inline `@font-face`
  pointing at `assets/icons/*.woff2`.

## Phase: Analyze

### Structural map

```
904 <header data-section="header">              → header fragment
920 <main id="main-content">                    → template <main>
922   <section data-section="brand-hero">        first class: brand-hero
967   <section data-section="audience-router">   first class: audience-section
1017  <section data-section="task-panel" data-audience="departing">     first class collision!
1080  <section data-section="task-panel" data-audience="arriving">
1143  <section data-section="task-panel" data-audience="pickup">
1191  <section data-section="task-panel" data-audience="connecting">
1251  <section data-section="task-panel" data-audience="visiting">
1312  <section data-section="your-guide">        first class: guide-section
1341  <section data-section="construction-reality"> first class: construction
1358  <section data-section="essentials">         first class: essentials
1397  <section data-section="accessibility-band"> first class: accessibility
1411  <section data-section="latest-from-jfk">    first class: latest
1444 </main>
1446 <footer data-section="footer">              → footer fragment
1496 <script>...</script>                        → animations JS
```

### Section first-class collision

The 5 `<section class="task-panel" ...>` share `task-panel` as first class.
Use `data-audience` as discriminator:
- `task-panel-departing` (current `task-panel`)
- `task-panel-arriving`
- `task-panel-pickup`
- `task-panel-connecting`
- `task-panel-visiting`

CSS rules keyed on `.task-panel` still apply because we prepend the new first class
and keep the original (`task-panel` stays in the class list).

### Asset strategy

- Source URL is public on github.io.
- Strategy: `absolute` — rewrite every `assets/...` → `https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/...`.
- This applies to template, fragments, and the inline `@font-face` url()s in extracted CSS.
- DA cell `<img>` URLs likewise must be absolute (Media Bus rule).

### Slot strategy (per section)

The page has a lot of decorative micro-text. Reasonable slot scope = authorable
chunks the demo would conceivably edit:
- Brand hero: meta-strip text, h1, deck, herofeed entries (3 entries with tag+body).
- Audience router: opener h2/deck (5 tile labels/meta stay static since they drive
  inline JS via `data-audience`).
- Task panels (5): eyebrow + h2 + first paragraph per panel (search-form internals
  stay static — they're application UI, not content).
- Your-guide: h2 + 5 tile photos+titles.
- Construction: h2, paragraph, figure image.
- Essentials: h2, deck, 3 tiles (photo, h3, body, link).
- Accessibility: h2, body, CTA link.
- Latest: h2, all-link, feature article (photo+eyebrow+h3+body+read), 2 companion articles.

### Decisions surfaced

1. Synthesize `<main>` wrapper kept (source already has one — just preserve).
2. Rewrite section first-class collisions for `task-panel` instances (5 panels).
3. Extract inline `<style>` (150–898) verbatim, rewrite asset URLs to absolute.
4. Extract inline `<script>` (1496–1611) into `jfk-airport-a-animations.js`.
5. Asset base: `https://paolomoz.github.io/stardust-site/samples/jfk-airport/`.
6. No head-level `<link>` to lift (none in source).
7. `<br>` appears inside herofeed entries — restructure to 2 `<p>` or omit slot.
   Decision: keep herofeed structural in template (not slotted) — it's tiny and
   carries the `<br>` we can't reproduce through DA.
8. Footer is rich; keep entirely static in fragment.
9. Header is rich (logo, nav, icons) — keep entirely static in fragment.
