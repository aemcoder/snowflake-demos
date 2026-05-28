# Notes — 001 wheelercat

## Phase: Capture

Source fetched from `https://main--uplift-wheelercat-eds--paolomoz.aem.live/` (HTTP 200, 7.7 KB).
Source is itself an EDS page-level overlay (template: `wheelercat-home`). Fetching the URL
returns the raw DA block table HTML, which reveals the full slot/content model directly.

Template (172 lines), CSS (788 lines), header fragment (99 lines), footer fragment (49 lines)
fetched from the same origin. All asset paths under `/assets/wheelercat-home/`.

19 binary files downloaded: 14 media images + 5 fonts (4 woff2 + 1 ttf icomoon icon font).
Asset strategy: `da-media` — binaries will be uploaded via DA Source API before code push.
Font strategy: Code Bus (`/fonts/`) per snowflake methodology (fonts are Content Bus, not Media Bus).

## Phase: Analyze

### Structural map

```
Element                               Role
──────────────────────────────────────────────────────
<a href="#main"> skip-link             → header fragment
<div class="utility-strip">           → header fragment
<div class="site-header">             → header fragment
<div class="mega-nav">                → header fragment
<section class="hero">                → block: hero
<section class="finance">             → block: finance
<section class="services">            → block: services
<section class="blog-cards">          → block: blog-cards
<section class="brand-logos">         → block: brand-logos
<section class="locations">           → block: locations
<div class="site-footer">             → footer fragment
```

### Block-level feasibility summary

All 6 content sections pass all 5 checks. Conversion level: **block-level** (no hybrid).

Key observations:
- hero: background image encoded as CSS background-image via slot; supporting paragraph is
  hardcoded chrome (too rich for plain authoring in DA — spans, em nesting).
- finance: card-1 title has `data-flip` animated numerals (60, 500) — hardcoded in decorator.
  Cards 2-3 have authored titles.
- services: 6 tile positions map 1:1 to CSS modifier classes (--field, --shop, --parts, --maint,
  --rebuilds, --online). Tile bg images are ::before pseudo-elements keyed by modifier class.
  Icon glyphs from icomoon. Author writes tiles as plain `<a>` rows.
- blog-cards: 4 card positions map to CSS modifier classes (--maint, --aerial, --landscape, --cva).
  Author writes card-N rows as `<a href="...">Title</a>`. Decorator assigns modifiers positionally.
- brand-logos: logo-track is a CSS grid. Author provides 5 logo image rows + eyebrow text.
  No JS animation — static grid with CSS grayscale/hover transitions.
- locations: Dark section. Author provides eyebrow-band text + proof paragraph (with <strong> tags).
  Branch list (15 cities + 'plus 3') is decorator chrome — hardcoded.

### Global CSS items

`:root` design tokens: colors (cat-yellow, surface-dark, warm-stone), font-size ratio scale
(--fs-100 through --fs-381), spacing (--sp-xs through --sp-3xl), easing vars, border-radius,
container max-width. All go into `styles/styles.css`.

Shared components (also global): `.label`, `.headline`, `.title`, `.body-copy`, `.eyebrow-block`,
`.display`, `.btn` variants (btn-primary, btn-secondary, btn-pill-light), `.btn-primary-dark`.

EDS section override needed: `main > .section { margin: 0; padding: 0; }` and
`main > .section > div { max-width: none; margin: 0; padding: 0; }` for full-bleed.

Icomoon icon font: @font-face declaration in global styles with `/fonts/icomoon.ttf` reference.

Lenis smooth-scroll CSS (first ~10 lines of source CSS): include in global styles.

`data-anim` IntersectionObserver: CSS defines initial transform/opacity state; JS observer
adds `.is-visible` class. This logic will live in `scripts/scripts.js` (shared across blocks)
OR inline in each block's decorator. Decision: shared utility in scripts.js (simpler).

## Phase: Generate

6 content blocks + 2 static fragments (header, footer) created.
Global `styles/styles.css` replaced wholesale with Wheeler Cat design tokens + shared components.
Icon font strategy: Code Bus (`/fonts/icomoon.ttf`), not DA media.
Font strategy: Code Bus for all 5 fonts (icomoon + Roboto Condensed + Roboto × 2 + Oswald).

`data-anim` IntersectionObserver exported from `scripts/scripts.js` as `decorateAnimations` — 
but ultimately not called from each block (blocks use inline `data-anim` attrs only; the observer
lives in scripts.js via `decorateAnimations` export, not auto-called from global `decorateMain`).
The `[data-anim]` CSS initial state is `opacity: 0; transform: translateY(24px)` — so without
observer call, elements are invisible on load. Fix needed in Phase 5 / post-reflect.

**Lint findings:**
- BEM selectors (double-underscore/double-dash) fail `selector-class-pattern` — add
  `/* stylelint-disable selector-class-pattern */` at top of every block CSS with BEM.
- `rgba()` → `rgb()` with slash notation auto-fixable.
- `no-descending-specificity`: modifier-class selectors (`.blog-card--maint .blog-card__bg`)
  must come BEFORE pseudo-class selectors (`.blog-card:hover .blog-card__bg`).
- Lenis minified line in styles.css needs `/* stylelint-disable ... */` wrapper.

## Phase: Round-trip

**Local:** AEM CLI dev server on port 3040. All 20 JS/CSS/fragment files return 200.
All 6 block divs present in `drafts/wheelercat.html` DOM.

**DA media upload:** `da-media-upload.mjs` uploaded 19 files to DA `/media/wheelercat-home/`.
19/19 OK. Fonts also uploaded (not needed — they're Code Bus — but harmless as da-media copies).

**DA content push:** `aem content clone --path /test-sf-blocks-04` (correct syntax — NOT
`aem content clone org/repo path`). Token saved to `.hlx/.da-token.json`.
`aem content add → commit → push` pushed 1 file: `/test-sf-blocks-04/wheelercat.html`.

**Production preview:**
- Branch pushed: `wheelercat-001`
- Preview API: HTTP 200
- Production URL: https://wheelercat-001--snowflake-demos--aemcoder.aem.page/test-sf-blocks-04/wheelercat
- All 6 block class names confirmed in `.plain.html`
- EDS Media Bus confirmed: `media_*` hashed image URLs present in rendered HTML

**Issue found post-launch:** `decorateAnimations` is exported from `scripts/scripts.js` but
never called — blocks rely on `[data-anim]` in their HTML but the IntersectionObserver is never
wired up. Elements with `[data-anim]` start at `opacity: 0` and never become visible. Fix: either
call `decorateAnimations(main)` inside `decorateMain` in scripts.js, or add it to loadLazy.

