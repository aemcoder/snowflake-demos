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

## Phase: Generate

- Template: `templates/jfk-airport-a.html` — 12 `<section>`s wrapped in `<main>`.
- Section first-classes (all unique after disambiguation):
  brand-hero, audience-section, task-panel-departing, task-panel-arriving,
  task-panel-pickup, task-panel-connecting, task-panel-visiting,
  guide-section, construction, essentials, accessibility, latest.
- Slot count: 65 (text + image slots; no `<a>` link slots; no background-image slots).
- Header fragment: 1 absolute `<img>` URL (Kennedy SVG logo).
- Footer fragment: 1 absolute `<img>` URL (PANYNJ logo) + 4 columns + social row.
- Page CSS: 747 lines, 4 `@font-face` rules rewritten to absolute URLs.
- Animations JS: 114 lines (reveal IntersectionObserver, num-count, view-transition
  audience switch, "/" focus shortcut, console signature).
- DA doc: `output/da/a.html` — 13 outer-divs (12 sections + metadata), 65 slot rows,
  all `<img>` absolute. No `<table>`, no `<span class>`, no `<br>`.

## Phase: Wire

Deployed to:
- `templates/jfk-airport-a.html`
- `fragments/jfk-airport-a/header.html`
- `fragments/jfk-airport-a/footer.html`
- `styles/jfk-airport-a.css`
- `scripts/jfk-airport-a-animations.js`

`npm run lint` clean. No changes to `head.html`, `styles/styles.css`,
`scripts/scripts.js`, `scripts/delayed.js`, or the header/footer block decorators.

## Phase: Round-trip

Local skipped per refresh batch convention (substrate already exercised in
prior runs; production round-trip is the canary).

Production publish:
- Branch tip: `db3083a` on `sd-jfk-airport-a` (force-with-lease pushed over old
  `325cbc4` close commit).
- DA versionsource (label "Before snowflake refresh 001 (jfk-airport)"): 201.
- DA PUT `/jfk-airport/a.html`: 200.
- POST preview `sd-jfk-airport-a/jfk-airport/a`: 200, `preview.status=200`.
- POST live `sd-jfk-airport-a/jfk-airport/a`: 200, `live.status=200`.

Code-bus sanity probes (all 200):
- /templates/jfk-airport-a.html
- /styles/jfk-airport-a.css
- /fragments/jfk-airport-a/header.html
- /fragments/jfk-airport-a/footer.html
- /scripts/jfk-airport-a-animations.js

Playwright verification at
`https://sd-jfk-airport-a--snowflake-demos--aemcoder.aem.live/jfk-airport/a`:
- `main.dataset.overlay === "jfk-airport-a"` ✓
- 12 sections present, all unique first-classes ✓
- Slots applied (hero "JFK", audience title, latest title) ✓
- Header logo + footer PANYNJ logo present ✓
- `body.appear === true` ✓
- 0 console errors

Visual screenshots saved under `.playwright-cli/diff/jfk-prod-*.png`:
- Hero with NYC skyline + herofeed overlay (Today at JFK, 3 entries)
- Departing task panel (navy bg, search form, Quick Actions)
- Construction section + Essentials heading

## Phase: Reflect

### Refresh-specific findings

Substrate v1.0.4 already carries the three known fixes from prior refreshes:
- `writeSlot()` heading-in-heading unwrap (lovesac/frescopa)
- `body > header / body > footer { padding:0; margin:0 }` reset (frescopa)
- `writeSlot` background-image check ordered before `<a>` link branch (patagonia)

No new substrate gaps surfaced for this page. The conversion was clean on
first pass — likely because:
- The source uses the well-behaved Stardust 0.3.0 patterns we've already
  encoded into the methodology.
- All sections had stable `data-section` attributes for disambiguation,
  even where `task-panel` first-class collided across 5 instances.
- No locally-hosted assets — public github.io host means asset strategy is
  trivial "rewrite relative → absolute to source host."
- No CSS class collisions between section first-classes and page CSS
  layout rules (the new task-panel-* names don't match any CSS selector).
- No `<br>` survived into the slotted content; the only `<br>` instances
  are in the static herofeed block which we kept structural (not slotted).

### Timings (approximate, sequential)

| phase | notes |
|---|---|
| capture | ~5s (single curl) |
| analyze | ~30s (read source, identify boundaries) |
| generate | ~90s (write template + CSS + JS + DA doc, all from analysis) |
| wire | ~5s (cp + lint) |
| roundtrip | ~20s (git push + DA APIs + playwright eval) |
| reflect | this section |

### Cross-project candidates

Nothing new to promote — this run validates the substrate v1.0.4 already
contains the fixes from prior refreshes.

