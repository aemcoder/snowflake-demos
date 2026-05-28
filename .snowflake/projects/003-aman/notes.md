# Notes — 003 aman

## Phase: Capture

Source fetched from `http://127.0.0.1:8080/samples/aman/proposed-A.html` (HTTP 200, 24 KB).
Stardust 0.2.0 provenance (comment block in `<head>`). Single self-contained HTML file:
all CSS inline in `<style>`, one `<script>` block for scroll-state toggling.
No external CSS/JS files referenced. All images are absolute `https://www.aman.com/...` URLs.
SVG logo inline inside `<header>`.

## Phase: Analyze

### Structural map

```
Line   Element / class                       Role
─────  ──────────────────────────────────────────────────────────
 298   <header class="site-header" id="siteHeader">   → fragment: header
 299     .site-header__left (menu + search buttons)
 309     <a class="site-header__brand"> (SVG logo)
 312     .site-header__right (English lang + Reserve CTA)
 315   </header>
 317   <section data-section="hero">                  → block: hero
 319     <span class="hero-anchor">Scroll</span>
 320   </section>
 322   <section class="section" data-section="seasonal-feature">  → block: seasonal-feature
 324     .container .seasonal
 325       .eyebrow "Summer With Aman"
 326       h2.lyon "Summer's Warm Embrace"
 327       p  body copy
 328       <a class="btn-secondary"> "Discover more"
 330   </section>
 332   <section class="section" data-section="twin-features">     → block: twin-features
 334     .container .twin
 335       <article class="twin-card">  (card 1)
 343       <article class="twin-card">  (card 2)
 350   </section>
 352   <section class="section" data-section="audience-grid">     → block: audience-grid
 354     .container
 355       .section-head (h2 + p)
 359       .audience-grid (4 × audience-card articles)
 389   </section>
 392   <section class="section" data-section="world-of-aman">     → block: world-of-aman
 394     .container
 395       .section-head (h2 only, no subtext)
 398       .world-grid (3 × world-card articles)
 422   </section>
 424   <footer class="site-footer">                               → fragment: footer
 427     .container .footer-grid (3 columns)
 464     .footer-bottom (copyright + social + lang)
 476   </footer>
 477   <script> scroll-state listener                             → ported to header.js
```

### First-class collisions

`seasonal-feature`, `twin-features`, `audience-grid`, `world-of-aman` all have
`class="section"` as their HTML class — but in the DA block table, the block div
carries the data-section value as first class, which is unique. No collision in
the DA/EDS representation.

Inside each decorator, the rebuilt `<section>` element gets class `"<name> section"`
so both `.<name>` and `section.section` CSS rules apply.

### Block-level feasibility

All 5 content sections pass all 5 checks (confirmed by the 2026-05-27 batch scan
recorded in demos.md). Page classified block-level.

| Section | Structure | CSS scope | Content model | JS | Visual | Level |
|---------|-----------|-----------|---------------|----|--------|-------|
| hero | ✅ | ✅ | ✅ bg image + scroll label | ✅ | ✅ | block |
| seasonal-feature | ✅ | ✅ | ✅ eyebrow/h2/body/cta | ✅ | ✅ | block |
| twin-features | ✅ | ✅ | ✅ 2-card rows | ✅ | ✅ | block |
| audience-grid | ✅ | ✅ | ✅ header + 4-card rows | ✅ | ✅ | block |
| world-of-aman | ✅ | ✅ | ✅ header + 3-card rows | ✅ | ✅ | block |

### Content model decisions

**hero:** Background image set via CSS custom property `--hero-bg` (source uses
`background: url(...)` on the section, no `<img>` inside). DA row 0 carries an
`<img>` whose `src` the decorator extracts. Row 1 carries the scroll-anchor label text.

**seasonal-feature:** Single-column layout. 4 rows: eyebrow, h2, body text, CTA link.
CTA is `<a class="btn-secondary">` — author uses `<em><a>` in DA.

**twin-features:** 2 item rows. Each row has 5 cells: image, eyebrow, h3, body, CTA.
The wrapping `<a class="twin-media">` around the image carries the card href.

**audience-grid:** Row 0 = section-head with 2 cells (h2, p). Rows 1–4 = audience cards:
image, eyebrow, h3, body, CTA. Card images wrapped in `<a class="audience-media">`.

**world-of-aman:** Row 0 = section heading only (1 cell, h2). Rows 1–3 = world cards:
image, eyebrow, h3, body, CTA.

### Decisions for Generate

1. Asset strategy = `absolute`. No path rewrites needed; all image URLs are already
   `https://www.aman.com/...`.
2. Scroll-state listener from source `<script>` block ported into `blocks/header/header.js`
   after fragment fetch — reads `block.querySelector('#siteHeader')` then attaches listener.
3. `styles/styles.css` replaced wholesale with global tokens + shared components bucket.
   Per-section rules extracted into per-block CSS.
4. `styles/fonts.css` → empty (proprietary fonts, system fallbacks in stack).
5. `head.html` → no change needed.
6. `scripts/scripts.js` → add 1-line `buildHeroBlock` early-return guard.

## Phase: Generate

5 content blocks created + 2 static fragments (header/footer).
Global `styles/styles.css` replaced wholesale with Aman design tokens + shared components.
`styles/fonts.css` emptied (proprietary fonts, system fallbacks).
`blocks/header/header.js` includes scroll-state listener ported from source `<script>`.
No `scripts/scripts.js` modification needed — existing `buildHeroBlock` guard
(`h1.closest('.hero')`) already prevents duplicate hero creation. The Aman hero has
no `<h1>` or `<picture>`, so `buildHeroBlock` exits before the guard would even trigger.
DA body fragment written to `output/da/aman.html`. All DA img URLs absolute.

## Phase: Wire

Lint clean after auto-fix pass plus manual expansion of single-line CSS rules.
Issues encountered and fixed:
- `declaration-block-single-line-max-declarations` — multi-property single-line rules
  expanded throughout styles/styles.css and all block CSS files
- `selector-class-pattern` — BEM double-underscore classes in header.css suppressed
  with file-level `/* stylelint-disable selector-class-pattern */` comment
- `no-descending-specificity` — footer.css `.social-row a` reordered before
  `.footer-grid a:hover` to fix specificity ordering

## Phase: Round-trip

**Local**: dev server started on port 3237 (worktree port). Verified via curl:
- All 5 block divs present in `drafts/aman.html` raw HTML
- All block JS + CSS files return 200
- Both fragments return 200
- No `assets/` references (absolute strategy confirmed)

**Production**:
- DA push: used `aem content clone → add → commit → push` workflow.
  CLI authenticated via browser (token saved to `.hlx/.da-token.json`).
  1 file pushed: `/test-sf-blocks-03/aman.html`
- Preview triggered: `admin.hlx.page/preview/...` → HTTP 200
- Production page: `https://test-sf-blocks-03--snowflake-demos--aemcoder.aem.page/test-sf-blocks-03/aman` → HTTP 200
- `.plain.html` verified all 5 block class names present

## Phase: Reflect

**New finding — `aem content` workflow for DA push:**
The `aem content` subcommand (clone → add → commit → push) is cleaner than direct
`curl PUT` for DA uploads. It handles authentication via browser IMS flow and caches
the token to `.hlx/.da-token.json` (not the global `~/.aem/da-token.json`).
Token is stored per-worktree/repo root.

**New finding — `buildHeroBlock` guard:**
For Aman's hero (background-image only, no `<h1>` or `<picture>` in DOM),
the existing boilerplate guard `if (h1.closest('.hero') || picture.closest('.hero'))`
is sufficient — `buildHeroBlock` exits early because neither `h1` nor `picture`
exist in the authored hero block. No additional guard line needed.

**New finding — CDN cold-start timeouts:**
First requests to `aem.page` paths after a new push can time out (curl exit 28)
even when the files are actually deployed. Re-probing after 10–20s succeeds.
Not a deployment failure — just CDN cache warming latency.
