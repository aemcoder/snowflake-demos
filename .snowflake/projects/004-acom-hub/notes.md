# Notes — 004 acom-hub

## Phase: Capture

- Source: http://127.0.0.1:8081/hub/ (1076 lines HTML, 75 KB).
- Generator: hand-coded, Figma-derived (Acrobat Studio Hub prototype).
- 14 CSS files fetched into `input/styles/` (3547 lines, ~100 KB).
- 11 JS files fetched into `input/scripts/` (9 project) and
  `input/vendor/` (2 vendored libs: gsap.min.js, ScrollTrigger.min.js).
- 36 binaries fetched into `input/assets/`:
  - 16 PNG (hero grid + hub router + editorial cards + mobile-only image)
  - 15 SVG (5 Adobe logos, 8 product icons, S2 apps icon, icon_plus)
  - 3 OTF fonts (Adobe Clean Display: Black, Bold, Regular)
  - 1 JPG (nav-solutions-offer)
  - Total ~10 MB. Largest single file: 3.5 MB (bento-img-1.png).
  - All SVGs well under 40 KB DA cap (max 11 KB).

## Phase: Analyze

### Structural map

```
Line     Element
─────    ──────────────────────────────────────
   1-30  <head>  — title, favicon, 14 stylesheet links (relative)
  31     <body>
  33-38  Dev-tool markup: grid-overlay, bp-indicator, debug hint  ← STRIP
  45-484 <div id="megaNavPanel">  — 4 mega-nav panes (products,
         use-cases, solutions, learn-support)                     ← HEADER
  486-519 <header id="gnav">  — fixed top nav                     ← HEADER
  524-735 <div id="mobileNav">  — mobile nav overlay              ← HEADER
  740-955 <div id="smooth-wrapper"><div id="smooth-content"><main>  ← MAIN
  747-916   <div class="hero-pin-spacer">
  748-915     <section id="hero">                                 ← block: hero
  921-953   <section id="editorial" class="editorial">             ← block: editorial
         </main></div></div>
  960    External CDN script: lenis (CDN)
  963-964 Vendored: vendor/gsap.min.js, vendor/ScrollTrigger.min.js
  967-991 Inline init: smooth-scroll wiring, nav-scroll state
  994-1012 Project scripts: mega-nav, mobile-nav, hub-router,
         hero-grid, hero-grid-mobile, hero-breakpoint-orchestrator,
         reveal-tuner, editorial, text-animate
  1015-1073 Inline debug script (M/G keys)                        ← STRIP
```

### Boundaries

- **Header fragment**: lines 33–735 (mega-nav panel + gnav header + mobile-nav
  overlay), with the dev-tool divs stripped (lines 33–38). Substantial DOM
  but all static — no slot opportunities.
- **Footer fragment**: **EMPTY**. Source has no `<footer>` element. Everything
  after `</main>` is scripts.
- **Template `<main>`**: source already has `<main>` (lines 742–955); template
  preserves it AND the `#smooth-wrapper > #smooth-content` wrapper divs that
  GSAP ScrollTrigger relies on for the smooth-scroll setup.

### First-class disambiguation

| Source                                    | First class                | Disambiguator       |
|-------------------------------------------|----------------------------|----------------------|
| `<section id="hero">` (no class)          | `hero` (add)               | `id="hero"`          |
| `<section id="editorial" class="editorial">` | `editorial` (kept) | already unique       |

CSS check:
- `.hero` — **no rule in CSS** (page uses `#hero { position: sticky; ... }` ID
  selector). Adding `class="hero"` doesn't collide with anything.
- `.editorial` — exists, but rule is `position: relative; z-index: 0;
  margin-top: -32px` — no grid/flex layout properties. Safe.

### Generator placeholders

None — page is fully populated, no `data-placeholder`, no `placeholder-tag`.

### Inline elements present mid-slot

- Hero `<h1>`: `With great power comes<br>great productivity.` — `<br>`
  inside the heading slot value. Keep inside; survives pipeline mid-paragraph.
- Editorial `<h2>`: `There&rsquo;s more to<br>Acrobat than Acrobat.` — same.
- Editorial subtitle uses `&rsquo;` and `&mdash;` entities — these survive.

### Strip list

- `<div class="grid-overlay" id="gridOverlay">` (line 34)
- `<div class="bp-indicator" id="bpIndicator">` (line 37)
- `<div class="hint" id="debugHint">` (line 38)
- Inline debug `<script>` block (lines 1015–1073)
- HTML comments throughout (visual noise; keep optionally — they're harmless)

### Asset strategy: DA /media/acom-hub/ + Code Bus /fonts/

**Per eds-da-content §13.1 decision tree**, preferred URL form for assets
hosted in DA is `https://content.da.live/{org}/{repo}/media/<scope>/<file>` —
stable, branch-independent.

Source asset → final URL mapping:

| Source path (in HTML/CSS)                  | Final URL form                                                       |
|--------------------------------------------|----------------------------------------------------------------------|
| `assets/adobe-logo*.svg` (5 files)         | `https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/adobe-logo*.svg` |
| `assets/icons/*.svg` (10 files)            | `.../media/acom-hub/icons/*.svg`                                     |
| `assets/images/editorial/*.png` (2)        | `.../media/acom-hub/images/editorial/*.png`                          |
| `assets/images/hero/*.png` (12)            | `.../media/acom-hub/images/hero/*.png`                               |
| `assets/images/hero/mobile/Expanded.png`   | `.../media/acom-hub/images/hero/mobile/Expanded.png`                 |
| `assets/images/nav/nav-solutions-offer.jpg`| `.../media/acom-hub/images/nav/nav-solutions-offer.jpg`              |
| `assets/fonts/AdobeCleanDisplay-*.otf` (3) | `/fonts/AdobeCleanDisplay-*.otf` (Code Bus — eds-da-content §13.2)   |

All HTML/fragment refs use the absolute content.da.live URL. All CSS
`url()` refs do the same EXCEPT fonts, which use root-relative `/fonts/...`
(Code Bus serves them; same-origin avoids font CORS issues).

### Head-level links to lift

- Favicon: `<link rel="icon" type="image/svg+xml" href="...adobe-logo-red.svg">`
  — rewrite href to content.da.live URL, place at top of template.
  (No external font preconnects, no font CDN — fonts self-hosted in Code Bus.)

### Inline + project scripts → animation engine

Consolidate into `/scripts/acom-hub-animations.js`:

```
1. Vendor: GSAP min + ScrollTrigger min (concat, both in vendor/)
2. CDN: lenis (load via <script src> from unpkg, like the source does)
3. Inline init: smooth-scroll wiring (Lenis ↔ ScrollTrigger), nav-scroll state
4. Project scripts (concat): mega-nav, mobile-nav, hub-router, hero-grid,
   hero-grid-mobile, hero-breakpoint-orchestrator, reveal-tuner, editorial,
   text-animate
```

Strip the debug script entirely (it's tied to dev-tool divs we're also stripping).

Total animations.js size: ~232 KB (gsap 72KB + scrollTrigger 44KB + 9 project
scripts ~115KB + ~3KB inline). Larger than typical but matches the source's
animation complexity.

### Slot plan

#### Section: `hero` (~21 slots)

Top text block (5 slots):
- `eyebrow` — "PDF & Productivity"
- `app-icon` — `<img>` "B_app_AdobeAcrobatPDF.svg" (image slot)
- `title` — "With great power comes&lt;br&gt;great productivity." (text slot, br preserved)
- `lead` — body paragraph
- `cta-primary` — "Try it free" link slot
- `cta-secondary` — "Buy now" link slot

Hub-router cards (4 cards × 4 fields = 16 slots):
- `card-N.label` — Sales / Marketing / Legal / Human Resources
- `card-N.image` — image slot (each card's hero PNG)
- `card-N.tagline` — short title
- `card-N.body` — body copy

Hero image grid (10 desktop + 10 mobile = 20 images): **STATIC** — they're
part of the page's visual identity, not editorial content. They're also
duplicated across desktop/mobile grids; making them authorable would require
authors to edit two copies. Keep static in template.

Hero hub-title "Work faster. No matter the work." — **STATIC** (visual chrome
above the carousel, decorative `aria-hidden="true"`).

#### Section: `editorial` (~8 slots)

Intro (2 slots):
- `title` — "There's more to&lt;br&gt;Acrobat than Acrobat."
- `body` — subtitle paragraph

Bento cards (2 cards × 3 fields = 6 slots):
- `card-1.image` — bento-img-1.png
- `card-1.title` — "Understand quickly."
- `card-1.body` — body copy
- `card-2.image` — bento-img-2.png
- `card-2.title` — "Collaborate effortlessly."
- `card-2.body` — body copy

### Container-vs-children check

- Hub-router cards: each is a `<div class="hhub-card">` containing label,
  image, tagline, body. No wrapping anchor. Slot children individually. ✓
- Bento cards: `<article class="ed-card">` containing image + copy. Slot
  children individually. ✓

### Decisions surfaced

1. `<section id="hero">` gets `class="hero"` added (engine matches by class).
2. `<section id="editorial" class="editorial">` stays as-is.
3. Keep `#smooth-wrapper > #smooth-content` inside the template's `<main>`
   to preserve the animation engine's DOM expectations.
4. Keep `<div class="hero-pin-spacer">` around the hero section (ScrollTrigger
   pin spacer).
5. Hero image grid (20 images) is static. Hub-router card images (4) are slots.
6. Footer fragment is empty (no source `<footer>`).
7. Strip 3 dev-tool divs + 1 inline debug script.
8. Asset URLs: content.da.live form for everything except fonts (Code Bus
   `/fonts/`).
9. Need to write `da-media-upload.mjs` uploader script (new skill candidate).
10. Animation engine concatenates 2 vendor + 2 inline + 9 project = ~232 KB.

## Phase: Generate

- Output artifacts (all under `output/`):
  - `templates/acom-hub.html` (220 lines, 30 [data-slot] markers, head-level favicon link).
  - `fragments/acom-hub/header.html` (696 lines, 96 content.da.live refs).
  - `fragments/acom-hub/footer.html` (intentionally empty).
  - `styles/acom-hub.css` (3575 lines, 14 source CSS files concatenated).
  - `scripts/acom-hub-animations.js` (~234 KB, 2663 lines).
  - `da/a.html` (DA-source body with 30 slot rows + metadata).
- Asset uploads (via new `tools/da-media-upload.mjs`):
  - 33 binaries → `https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/...`
  - 3 OTF fonts copied to Code Bus `/fonts/`.
- All 6 self-checks passed: no relative `assets/` refs in artifacts,
  no `<span class>` or `<table>` in DA doc, all DA `<img src>` absolute,
  no section first-class CSS collisions.

## Phase: Wire

Copied to `templates/`, `fragments/acom-hub/`, `styles/`, `scripts/`,
`fonts/`, `drafts/`. Lint clean after relaxing `tools/*.mjs` to allow
`no-await-in-loop`, `no-console`, `no-restricted-syntax`, `no-continue`
(CLI-tool-appropriate exemptions).

## Phase: Round-trip (local)

- Dev server at `http://localhost:3000/drafts/a.html`.
- `main.dataset.overlay === "acom-hub"` ✓
- 2 sections, 30 slot markers populated ✓
- 4 hub cards, 2 bento cards in DOM ✓
- gnav / mega-nav / mobile-nav fragments injected ✓
- `body.appear` set, `<meta name="template">` emitted ✓
- 0 console errors; 1 warning (`delayed.js` CDN dep fallback — cosmetic,
  our engine loads Lenis from unpkg separately).
- DOM equality: source 1057 elements vs rendered 968 (-89). Diff is
  explained by EDS landmark wrappers, consolidated CSS/scripts (-9 link
  + -8 script tags), and stripped dev-tool divs. Visible text diff
  (-449 chars) is the hub-router cards' text being hidden during initial
  scroll state via `.hero-hub-router:not(.hhub-ready) { visibility: hidden }`
  — animation timing differs slightly between source (eager JS load) and
  rendered (delayed JS load).
- Screenshots in `diff/local-{top,editorial,bottom}.jpg`.

## Phase: Round-trip (production)

- Branch `acom-hub` pushed to origin.
- DA version-source: HTTP 201 (snapshot created before PUT).
- DA PUT: HTTP 200.
- POST preview: HTTP 200; `preview.url` = production aem.page URL below.
- Code-bus deploy ready in 1s; all 5 deployed paths return 200.
- Production URL:
  `https://acom-hub--snowflake-demos--aemcoder.aem.page/acom/hub/a`
- DA editor URL:
  `https://da.live/edit#/aemcoder/snowflake-demos/acom/hub/a`

Production verification:
- Overlay applied, 2 sections, 30 slots, 4 hub cards, 2 bento cards ✓
- **Media Bus sideloaded all DA-cell `<img>` URLs** — production
  delivers hub card images via `./media_<hash>.png?width=750&format=png&optimize=medium`
  (confirmed: `heroImgSrc` in browser eval).
- Production DOM equality matches local fidelity (same -89 element delta).
- Screenshots in `diff/production-{top,editorial,bottom}.jpg`.

## Findings

### Project-specific

- **First snowflake run using DA `/media/` asset migration.** Works end
  to end. Reusable uploader script lives at `tools/da-media-upload.mjs`.
- **No `<footer>` in source** → footer fragment intentionally empty.
  Substrate's `blocks/footer/footer.js` fetches it and injects no DOM.
- **Source page bundles `reveal-tuner.js`** — a dev-time UI panel for
  adjusting scroll-reveal timings. Currently included in the animation
  engine; visible as a "Timeline controls" panel in screenshots. Worth
  stripping in a follow-up run.

### Cross-project (promote candidates)

- **DA `/media/` strategy + uploader script** should be promoted into the
  snowflake skill bundle. See `learnings.md` in this folder for the full
  rationale + a 4-step promotion proposal targeting the bundle's
  `methodology.md`, `0-prereq.md`, and `scripts/`.
- **`tools/*.mjs` ESLint override** (no-await-in-loop, no-console,
  no-continue, no-restricted-syntax) is a one-time repo-level fix that
  could be replicated in the substrate's `.eslintrc.js` patches.

## Timings (approximate)

| Phase            | Duration   | Notes                                      |
|------------------|------------|--------------------------------------------|
| capture          | ~10m       | 1 HTML + 14 CSS + 11 JS + 36 binaries      |
| analyze          | ~5m        | structure + asset inventory + slot plan    |
| build uploader   | ~10m       | new `tools/da-media-upload.mjs` script     |
| generate         | ~20m       | template + fragments + concat CSS/JS + DA  |
| wire             | ~5m        | cp + transform + lint (incl. eslint fix)   |
| roundtrip-local  | ~5m        | dev-server + verify + screenshots          |
| roundtrip-prod   | ~5m        | branch + PUT + preview + verify            |
| reflect          | ~5m        | this writeup                               |

Total ~65 min, of which ~10 min was building the new uploader (would be
absent in subsequent runs).
