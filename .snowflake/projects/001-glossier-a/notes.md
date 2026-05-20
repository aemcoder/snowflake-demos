# Notes — 001 glossier-a

## Phase: Capture

Source: https://paolomoz.github.io/stardust-site/samples/glossier/proposed-A.html
Captured: 2026-05-20
Status: refresh (snapshot already archived as sd-glossier-a-2026-05-20)
Length: 610 lines, fully self-contained (inline `<style>` + no external scripts).

## Phase: Analyze

### Structural map

```
Line    Element
─────   ──────────────────────────────────────
372     <body>
374-377   <aside class="promo-strip" data-section="promo-strip">
379-395   <header class="site-header" data-section="header">
397-410   <section class="hero" data-section="hero">           ← section 1
412-466   <section class="section" data-section="sale-carousel"> ← section 2 (collision)
468-481   <section class="story-band" data-section="story-band"> ← section 3
483-537   <section class="section" data-section="fragrance-carousel"> ← section 4 (collision)
539-555   <section class="section" data-section="ugc-grid">    ← section 5 (collision)
557-607   <footer class="site-footer" data-section="footer">
609     </body>
```

### Header boundary
`<aside class="promo-strip">` + `<header class="site-header">` (rows 374-395).

### Footer boundary
`<footer class="site-footer">` (rows 557-607). Includes newsletter form, four column nav, sticky pink wordmark.

### Section first-class collisions
Three sections share `class="section"` → must disambiguate via `data-section`:

| data-section | First class chosen |
|---|---|
| sale-carousel | `sale-carousel` |
| fragrance-carousel | `fragrance-carousel` |
| ugc-grid | **`ugc`** (NOT `ugc-grid`) — `ugc-grid` collides with `.ugc-grid { display: grid; grid-template-columns: repeat(3, 1fr); }` per learnings 2026-05-19 |

`hero` and `story-band` already have unique first classes.

### Slot opportunities per section
See `decisions.json` (5 sections, slot counts: hero 4, sale-carousel 26, story-band 5, fragrance-carousel 26, ugc 6 → total 67 slots).

### Asset strategy
All images already use absolute imgix CDN URLs (`https://glossier-prod.imgix.net/...`) plus one CloudFront URL. **No rewriting needed.**

### Inline `<style>` extraction
Lines 25-370 inclusive contain the `<style>` open + closing tags. Inner CSS goes to `styles/glossier.css`.

### Head-level resources
None (no `<link>` tags in source `<head>`). Just `<meta charset>`, `<meta viewport>`, `<title>`, and the inline `<style>`.

### External libs / inline scripts
None — fully static page.

### Placeholder convention
Stardust 0.3.0: `<span data-placeholder>` inside the hero CTA `<a>`. Mark as `data-slot-skip="placeholder"`.

### Differences from prior run (a7a30dc)
Same source URL, same structure. The only branch-level change is the `ugc-grid` → `ugc` rename to defuse the CSS collision (was previously known but kept in prior run's decisions; the rendered DOM survived because the substrate engine matched on first-class `ugc-grid` BEFORE the `.ugc-grid` CSS targeted the section as a grid — but the CSS rule still applied incorrectly to the outer section, which was a layout bug per learnings).

### Substrate gaps observed
None — substrate v1.0.4 covers:
- heading-in-heading unwrap (writeSlot heading branch)
- background-image-before-`<a>` dispatch guard
- `body > header, body > footer { padding: 0; margin: 0 }` reset

Source-page CSS `.section { padding: var(--section-padding) 32px; }` does NOT use `section, header, footer` as a generic selector — applies only to `.section` class. So no padding leak on EDS landmarks (substrate reset is defence-in-depth here).

## Phase: Generate

- Template: 162-line `templates/glossier.html` with synthesized `<main>` wrapping the 5 sections.
- 5 sections with unique first classes: `hero`, `sale-carousel`, `story-band`, `fragrance-carousel`, `ugc` (renamed from `ugc-grid` per 2026-05-19 collision learning).
- 67 `data-slot` markers across the sections.
- 1 `data-slot-skip="placeholder"` on the hero CTA span (Stardust 0.3.0 placeholder convention).
- Header fragment: 23 lines (`<aside class="promo-strip">` + `<header class="site-header">`).
- Footer fragment: 51 lines (`<footer class="site-footer">` with newsletter form + 4-column nav).
- Page CSS: 344 lines extracted from inline `<style>` (lines 26-369 of source).
- DA doc: 99-line divs-with-class shape with `<div class="metadata">` block in `<main>`.
- No animations JS (source has no inline `<script>` or external libs).
- Asset strategy: absolute (all images already use `glossier-prod.imgix.net` + one CloudFront URL — no rewriting needed).

## Phase: Wire

Copied artifacts to `templates/`, `fragments/glossier/`, `styles/glossier.css`. Built local-test file at `drafts/glossier-a.html` (transformer reports 2 meta tags). Lint passes (eslint + stylelint clean).

## Phase: Round-trip (production-only per refresh contract)

- DA versionsource POST → 201 (snapshot created with label "Before snowflake refresh 001 (glossier)").
- DA PUT `/glossier/a.html` → 200 (`previewUrl`, `liveUrl` returned).
- `git push --force-with-lease origin sd-glossier-a` → forced update from 8e05efb to 1b3012a.
- POST preview on `sd-glossier-a` → 200.
- POST live on `sd-glossier-a` → 200.
- Code-bus probes: `/templates/glossier.html`, `/styles/glossier.css`, `/fragments/glossier/{header,footer}.html`, `/glossier/a` all return 200.
- Playwright verification on https://sd-glossier-a--snowflake-demos--aemcoder.aem.live/glossier/a:
  - `overlayApplied: "glossier"` ✓
  - `sectionCount: 5` ✓
  - `sectionClasses: ["hero", "sale-carousel", "story-band", "fragrance-carousel", "ugc"]` ✓
  - `dataSlotCount: 67` ✓
  - `bodyAppearClass: true` ✓
  - 17 imgs in `<main>` (1 hero + 6 sale + 1 story + 6 fragrance + 3 ugc = 17) ✓
  - 1 console error: 404 on `/scripts/glossier-animations.js` — expected, cosmetic only (substrate HEAD-probes; engine ignores 404; browser surfaces network 404 in console).
- Per-section screenshots saved to `diff/`:
  - `production-glossier-hero.png` — hero photo + "you smell good." overlay copy ✓
  - `production-glossier-sale.png` — sale carousel with 5 visible cards, prices in `CHF X.XX → CHF Y.YY` form ✓
  - `production-glossier-ugc.png` — UGC grid in 3-column layout (collision-free) ✓
  - `production-glossier-footer.png` — newsletter + 4-col nav + pink wordmark band ✓

## Phase: Reflect

### Findings

- **`ugc` rename works as predicted by 2026-05-19 learning.** The CSS rule `.ugc-grid { display: grid; grid-template-columns: repeat(3, 1fr); }` only applies to the INNER `<div class="ugc-grid">` now, not to the outer `<section>` (which has first class `ugc`). UGC tile layout is correct (3-up portrait + 2 landscape) — no collapse.
- **Substrate v1.0.4 surface clean.** No branch-level patches needed. The three substrate fixes promoted earlier (heading unwrap, background-image dispatch guard, `body > header/footer` padding reset) all apply but the dispatch guard isn't exercised here (no background-image slots on `<a>` in this page), and the padding reset is defence-in-depth (page CSS doesn't use generic `section, header, footer` selectors).
- **Heading slot unwrap is exercised** — DA cells use `<h1>`, `<h2>`, `<h3>` wrappers for title slots; the substrate unwraps them so a single clean heading element renders.
- **Refresh contract held.** Snapshot branch `sd-glossier-a-2026-05-20` is untouched; active branch tip force-pushed to new commit; DA labeled version preserves prior content; demo URL stable.

### No new generic learnings to promote.
This refresh confirms existing learnings (1.0.4 substrate fixes + ugc-grid CSS collision rule) without surfacing new ones.
