# Notes — 001 acom-bizpro-hub

## Phase: Capture

- Source: `http://127.0.0.1:8080/acom-bespoke-pages/bizpro-hub-prototype/` (local-only)
- Single HTML file, 2687 lines, with inline `<style>` (lines 8–1326) and inline
  `<script>` (lines 2162–2670 + 2674–2685). External CSS `assets/lenis.min.css`
  (line 6) and JS `assets/lenis.min.js` (line 2673).
- 73 unique referenced assets, ~38 MB total. All vendored under
  `input/assets/`. Largest: section-1 hero video (8.4 MB), BizPro_extrawide
  banner image (7.7 MB), product-tile-images (~12 MB collectively).
- Fonts directory contains a space: `assets/fonts/Adobe Clean Display/` —
  AEM CLI 404s on URL-encoded `%20`. Will rename to
  `assets/fonts/AdobeCleanDisplay/` and rewrite CSS `url(...)` refs.

## Phase: Analyze

### Structural map

```
Line  Element / Role
─────  ────────────────────────────────────────────────────────────────
3      <head> open
6      <link rel="stylesheet" href="assets/lenis.min.css">   ← lift
7      <title>BizPro Hub — PDF & Productivity</title>         ← DA metadata
8      <style>...</style>                                     ← extract to /styles/<tpl>.css
1326   </style>
1327   </head>
1328   <body>
1332   <div class="nav-wrap"><nav class="nav">…</nav></div>   ← HEADER fragment
1364   <div class="hero-scroll"><div class="hero-sticky">…    ← SECTION 1 (hero, rewrite to <section>)
1415   <section class="stories">                              ← SECTION 2
1484   <section class="acrobat-feature">                      ← SECTION 3
1578   <div class="tutorial-scroll">                          ← chrome (wrapper kept)
1579     <section class="tutorial">                            ← SECTION 4 (the matched section)
1674   </div>
1683   <section class="solutions">                            ← SECTION 5
1780   <section class="studio-banner">                        ← SECTION 6
1804   <section class="product-section">                      ← SECTION 7
1975   <section class="search-section">                       ← SECTION 8
1998   <footer class="footer">                                ← FOOTER fragment
2145   </footer>
2147   <div class="grid-overlay">                             ← STRIP (debug UI)
2152   <button class="grid-toggle">                            ← STRIP (debug UI)
2162   <script>...inline anims...</script>                    ← extract to /scripts/<tpl>-animations.js
2670   </script>
2673   <script src="assets/lenis.min.js"></script>            ← vendored lib (loaded by animations prelude)
2674   <script>// Lenis init</script>                          ← into animations
2685   </script>
2686   </body>
```

### Decisions

1. **Header fragment** = `<div class="nav-wrap"><nav class="nav">…</nav></div>`
   (lines 1330–1361, including comments). Whole nav wrap is the header.
2. **Footer fragment** = `<footer class="footer">…</footer>` (lines 1997–2145).
3. **Strip**: `.grid-overlay`, `.grid-toggle` (developer-only grid debug UI),
   and the comments wrapping them.
4. **Hero**: rewrite `<div class="hero-scroll">` → `<section class="hero-scroll">`
   so the substrate's `section[class]` query matches it.
5. **First-class collision check**: all 8 sections have unique first
   classes (`hero-scroll`, `stories`, `acrobat-feature`, `tutorial`,
   `solutions`, `studio-banner`, `product-section`, `search-section`).
   None of these are reused in CSS as layout-grid selectors at the section
   level (`hero-scroll` is the scroll container; `tutorial` has its own
   inner grid; etc.). Acceptable; double-check in Generate self-check.
6. **Tutorial wrapper**: keep `<div class="tutorial-scroll">` around the
   `<section class="tutorial">`. The wrapper provides scroll snapping
   geometry. The substrate finds the section by class regardless of an
   outer wrapper div.
7. **Inline `<br>`**: present in hero body, story-card titles, tutorial
   headlines, and search disclaimer. Pipeline strips `<br>` from DA
   cells — drop `<br>` from authored text; CSS already handles wrapping.
8. **`<span class="price-card__name">`**: per learnings, spans with
   `data-slot` survive the pipeline. Slot the span directly.
9. **Asset strategy**: `vendor`. Source is local-only. Copy
   `input/assets/` → repo `assets/`. Rename
   `fonts/Adobe Clean Display/` → `fonts/AdobeCleanDisplay/`. In template/
   fragments/CSS: root-relative `/assets/...`. In DA cells: absolute
   `https://acom-bizpro-hub--snowflake-demos--aemcoder.aem.page/assets/...`.
10. **Video**: leave the hero `<source src="…mp4">` as static template
    content. Author edits won't change the video file — acceptable for the
    prototype.
11. **Tutorial clones**: clones (slides aria-hidden) duplicate slides 0
    and 2. Keep clones static, only slot the 3 real slides. Authors editing
    a real slide won't update its clone — acceptable trade-off for the
    infinite loop UI.
12. **Lenis library**: vendor as `scripts/<tpl>-lenis.min.js` and load via
    the animations prelude before the inline script body runs (per
    methodology §3.6).
13. **`onclick` handlers in source**: `switchTab(this)` (solutions tabs)
    and `toggleGrid()` (grid debug — will be stripped). `switchTab` must
    be hoisted onto `window` from the animations script.

### Slot inventory (preview)

- Hero: 5 text slots (eyebrow, title, body, overlay-title, overlay-body) +
  2 button-text slots
- Stories: 3 header text + 4 cards × (1 bg-image + 1 category + 1 title) = 15
- Acrobat-feature: 3 header text + wide-card (1 img, 1 title, 1 body, 1 link) +
  3 cards × (1 img, 1 title, 1 body, 1 link) = 4 + 4 + 12 = 20
- Tutorial: 3 slides × (1 img + 1 headline) = 6 (clones ignored)
- Solutions: 2 header text + 3 price-cards × (name + price + billing + features list) ≈ 14
- Studio-banner: 1 title + 1 body + 2 CTA texts = 4
- Product-section: 9 cards × (icon + title + body + bg-image) = 36
- Search-section: 1 title + 1 body + 1 input placeholder + 1 disclaimer = 4

Estimated total: ~104 slots. Subject to refinement during Generate.

## Phase: Generate

- Vendored 73 assets (~38 MB) into repo `assets/`, renamed
  `fonts/Adobe Clean Display` → `fonts/AdobeCleanDisplay`.
- Extracted inline `<style>` (lines 9–1325) → `styles/acom-bizpro-hub.css`,
  rewrote `url(assets/...)` → `url(/assets/...)`.
- Extracted both inline `<script>` blocks (lines 2163–2669 and 2675–2684) →
  `scripts/acom-bizpro-hub-animations.js`, wrapped in a lenis-loader
  prelude per methodology §3.6.
- Built template with 8 sections, 88 slots. Rewrote
  `<div class="hero-scroll">` → `<section class="hero-scroll">`.
- Kept `<div class="tutorial-scroll">` wrapper around `<section class="tutorial">`
  — substrate engine matches `section[class]` at any depth.
- Stripped `.grid-overlay` + `.grid-toggle` debug UI.
- Self-check 5/6 passed: <main> present, all 8 section first-classes unique,
  no relative `assets/` refs in template/fragments/CSS, no nested
  data-slot, DA doc free of `<table>`/`<span class>`/`<br>`/`<b>`/`<i>`/etc.,
  all DA `<img>` URLs absolute. CSS layout-collision check: all section
  first-classes appear in CSS but as the section's own layout rule
  (no inner-class collision).

## Phase: Round-trip

Skipped local; went straight to production per orchestrator instructions.

- DA versionsource POST returned 201 (snapshot created — there was an
  existing doc at `/acom/bizpro-hub/a.html` from a prior run by someone
  else; preserved as "Before first conversion" label).
- DA PUT 200 — new content stored.
- Branch pushed, code-bus deployed all 7 paths (template, 2 fragments,
  2 styles, 2 scripts) and 73 assets — all HTTP 200.
- POST preview 200, POST live 200.
- First playwright check surfaced **`about:error`** on 16 image slots: the
  preview POST had run before code-bus finished deploying assets, so
  Media Bus couldn't fetch the absolute URLs we put in DA cells. Re-ran
  `POST preview` and `POST live` after sanity-probing all asset paths
  returned 200 — Media Bus then content-addressed all images correctly
  (`./media_<sha>.png?width=750&format=png&optimize=medium`).
- A separate 404 was traced to `/assets/send-icon.svg`: the Phase 1
  asset-list file lacked a trailing newline, so `while IFS= read -r ref`
  skipped the last entry. Fetched and committed.
- Final state: 0 console errors, 1 warning ([animations] CDN dep missed
  for the substrate's `cdn.jsdelivr.net/.../lenis.min.js` — substrate
  attempts a generic Lenis even though this template uses a vendored
  one. Substrate gap, harmless).
- Per-section screenshots captured under `diff/production-*.png`.
- Production verification:
  - `main.dataset.overlay === "acom-bizpro-hub"`
  - 8 sections, classes match decisions
  - 50 `<img>` in main, 1 `<video>`, 0 broken
  - `body.appear` true; 18 fonts loaded
- Production URL: https://acom-bizpro-hub--snowflake-demos--aemcoder.aem.page/acom/bizpro-hub/a

## Phase: Reflect

### Branch-level fixes applied

1. **send-icon.svg added** — see above. Branch fix, not skill fix; this
   was a bug in the run's own asset-fetch loop, not the skill.

### Substrate gaps surfaced

1. **CDN Lenis is loaded unconditionally** by the substrate's
   `scripts/delayed.js` even when the template ships a vendored Lenis.
   Cost: 1 console warning + ~20KB wasted fetch + brief delay before
   our own vendored Lenis loads. Fix idea: substrate could probe for a
   vendored `/scripts/<template>-lenis.min.js` and skip the CDN if
   found. Or template could declare its CDN needs via a metadata flag.
2. **CDN GSAP/ScrollTrigger always loaded** — same root cause as #1.
   The substrate's `cdnDeps` array is hardcoded; templates that don't
   use GSAP still pay ~130 KB. The existing learning (2026-05-18
   "Templates without an animation engine cost ~150 KB") already
   identified this gap for the no-animation case; we still pay the
   full cost when the template HAS animations but doesn't use GSAP.

### Cross-project findings (potentially promotable)

1. **Asset-fetch loop newline trap** — when the asset-refs file has no
   trailing newline, `while IFS= read -r` silently skips the last line.
   Generic rule: use `while IFS= read -r ref || [ -n "$ref" ]` to handle
   the no-newline-at-EOF case. Or emit asset-refs.txt with a trailing
   newline. This is a phase-1 mechanics bug — easy fix in the snowflake
   skill's reference capture logic. Worth promoting to learnings if
   not already covered.
2. **Preview POST runs Media Bus IMMEDIATELY** — if `git push` and
   `POST preview` happen back-to-back, the preview may build before
   Code Sync finishes deploying vendored assets, baking `about:error`
   into the published page. Mitigation: probe code-bus deployment of
   vendored asset paths BEFORE calling `POST preview`, OR re-trigger
   preview after probing. Worth promoting — this is generic to any
   `assetStrategy=vendor` run.
3. **Pictures wrap `<img>` in DA-served HTML** — the pipeline wraps
   DA-cell `<img>` references in `<picture>` elements with multiple
   `<source>` variants. The substrate's `writeSlot()` `parseFirst(value, 'img')`
   correctly finds the descendant `<img>`, so this works fine — worth
   documenting as expected pipeline behavior so future debugging
   doesn't go down a `<picture>`-wrapping rabbit hole.

## Timings

| Phase | Approx duration |
|---|---|
| Capture | 1m (mostly curl) |
| Analyze | 2m |
| Generate | 4m (build template, CSS, JS, DA fragment) |
| Wire | 2m |
| Round-trip | 8m (including diagnosing about:error race + send-icon fix) |
| Reflect | 1m |

Total: ~18m

