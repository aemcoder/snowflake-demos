# Notes — 001 jfk-airport-a

## Source

- URL: https://paolomoz.github.io/stardust-site/samples/jfk-airport/proposed-A.html
- Generator: stardust:prototype 0.3.0 (impeccable: delight, animate, typeset, colorize, overdrive)
- Variant: V1-faithful-navy-v7-herofeed
- 1614 lines, structure is clean (head + skip link + header + main + footer + script)

## Phase: Capture

- Fetched index.html (1614 lines).
- Asset base: `https://paolomoz.github.io/stardust-site/samples/jfk-airport/` (public, github.io, CORS `*` on woff2).
- 12 referenced relative assets under `assets/media/` + 1 woff2 under `assets/icons/`.
- No external CSS or JS links. All styles inline (lines 150-898), all scripts inline (lines 1496-1611).

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
3-143  <head> with provenance comment + meta
144-149 meta tags (charset, viewport, theme-color, description, og:image)
150-898 inline <style> (the page CSS)
899     </head>
900     <body data-variant="..." data-axis="..." data-content="...">
902     <a class="skip">Skip to Content</a>           ← header zone
904-918 <header data-section="header" role="banner"> ← header zone
920     <main id="main-content">
922-962   <section data-section="brand-hero" class="brand-hero">
967-1013  <section data-section="audience-router" class="audience-section reveal">
1017-1077 <section data-section="task-panel" data-audience="departing" class="task-panel">
1080-1140 <section data-section="task-panel" data-audience="arriving" class="task-panel" hidden>
1143-1188 <section data-section="task-panel" data-audience="pickup" class="task-panel" hidden>
1191-1248 <section data-section="task-panel" data-audience="connecting" class="task-panel" hidden>
1251-1309 <section data-section="task-panel" data-audience="visiting" class="task-panel" hidden>
1312-1338 <section data-section="your-guide" class="guide-section reveal">
1341-1355 <section data-section="construction-reality" class="construction" id="today">
1358-1394 <section data-section="essentials" class="essentials">
1397-1408 <section data-section="accessibility-band" class="accessibility">
1411-1443 <section data-section="latest-from-jfk" class="latest">
1444    </main>
1446-1494 <footer data-section="footer">                ← footer zone
1496-1611 <script>                                       ← extract to animations.js
1613    </body>
```

12 top-level sections inside `<main>`. Source uses `<main>` already, so no synthesis needed.

### First-class collisions

The 5 task-panel sections all share class `task-panel`. Per discriminator priority,
each has a unique `data-audience` attribute (departing/arriving/pickup/connecting/visiting),
which becomes the disambiguator. Rewrite first-class:

| Section | Original first-class | Rewritten first-class | Other classes kept |
|---|---|---|---|
| Task panel 1 (departing) | task-panel | task-panel-departing | task-panel |
| Task panel 2 (arriving) | task-panel | task-panel-arriving | task-panel |
| Task panel 3 (pickup) | task-panel | task-panel-pickup | task-panel |
| Task panel 4 (connecting) | task-panel | task-panel-connecting | task-panel |
| Task panel 5 (visiting) | task-panel | task-panel-visiting | task-panel |

All other section first-classes are unique within the template.

### CSS layout collision check

Per the 2026-05-19 learning, I checked whether any section first-class is used as a
CSS layout selector. Findings:
- `.brand-hero`, `.audience-section`, `.task-panel`, `.guide-section`, `.construction`,
  `.essentials`, `.accessibility`, `.latest` ALL appear in CSS but only with
  padding/margin/background/color rules — no `display`, `grid-template-columns`,
  `flex`, `width`, or `height` on the section element itself.
- Grid/flex layouts are always declared on INNER children (`.task-panel .inner`,
  `.essentials-grid`, `.guide-tiles`, etc.). The section first-class CSS rules are safe.
- The new disambiguators (`task-panel-departing` etc.) don't exist in CSS at all.

### Slot opportunities per block

**brand-hero** (`brand-hero`):
- Background `<img>` → image slot `hero-image`
- `.meta-strip span:nth-child(1)` → text `meta-left`
- `.meta-strip span:nth-child(2)` → text `meta-right`
- `<h1>JFK</h1>` → text `title` (heading-in-heading)
- `<p class="deck">` → text `deck`
- The `aside.herofeed` is LIVE OPERATIONAL DATA — keep as static template content
  (would be replaced by a real feed in production; not authored copy).
  Pipeline strips `<span class="tag">`, `<span class="now">`, `<br>` from cells —
  making this authorable would require markup changes that don't preserve the visual
  rhythm. Out of scope for this run.

**audience-section** (`audience-section`):
- `.opener h2` → text `opener-title`
- `.opener p.deck` → text `opener-deck`
- Buttons: text + meta per tile. The `data-audience` attribute is functional (drives
  the View Transitions JS). Keep as static template chrome to preserve the interactive
  behavior. The featured-tile stats (`data-target`, `data-suffix`) are animated by
  the count-up script. Keep those as static template (live ops data, not editorial).

  Decision: only the visible label + meta texts become slots. Stats stay static.

  - `.audience-tile[data-audience="departing"] .label` → `tile-departing.label`
  - `.audience-tile[data-audience="departing"] .meta` → `tile-departing.meta`
  - …same for arriving/pickup/connecting/visiting.

**5 task-panels** (task-panel-departing/…/-visiting):
Each task panel has roughly:
- `.head .eyebrow` → text `eyebrow`
- `.head h2.display` → text `title`
- `.head > p` (intro paragraph) → text `intro`
- Per-panel content (flight-search form, pickup-status, connect-info, vi-grid) — KEEP STATIC
  (forms, tables, structured data — not freely-authored copy).
- `.task-side .label-eyebrow` → text `side-eyebrow`
- `.task-side h3.display` → text `side-title`
- 5 quick-actions per panel (label `.l` + value `.v`) → text slots
  `qa-1.label`, `qa-1.value`, … `qa-5.label`, `qa-5.value`.

The `<span class="icon-arrow-right">` inside `.quick-action .v` is decorative — its
class will be stripped from DA cells. Since the span has no inner text content
(icon-font glyph via :before), removing it from the value cell is fine —
just put the visible text. But that loses the arrow on the rendered page.

**Fix:** Slot only the `.l` and `.v > .text-portion`, NOT the whole `.v` span. The icon
span stays in the template as static chrome. Need to restructure each `<span class="v">Save up to 20% <span class="icon-arrow-right"></span></span>` to
`<span class="v"><span data-slot="qa-1.value">Save up to 20%</span> <span class="icon-arrow-right"></span></span>`. The data-slot wraps only the text.

**guide-section** (`guide-section`):
- `.section-head h2.display` → text `title`
- 5 guide-tiles, each:
  - `<a>` wrapper — DON'T slot (would wipe nested slots; container-vs-children rule)
  - `.photo img` → image slot `tile-N.image`
  - `.body h3` → text `tile-N.title`
  - `.body .arrow` → text `tile-N.arrow-label`

**construction** (`construction`):
- `.copy h2` → text `title`
- `.copy p` → text `body`
- 2 `<a>` ctas: `cta-1`, `cta-2` (link slots, no nested data-slot)
- `figure img` → image slot `image`

**essentials** (`essentials`):
- `.essentials-head h2` → text `title`
- `.essentials-head p` → text `deck`
- 3 essential cards, each:
  - `.photo img` → image slot `card-N.image`
  - `.body h3` → text `card-N.title`
  - `.body p` → text `card-N.body`
  - `.body a` → link slot `card-N.cta`
  - `.icon-tile` is a pure icon-font glyph — keep static template

**accessibility** (`accessibility`):
- `.access-card h2` → text `title`
- `.access-card p` → text `body`
- `.arrow-cta` (`<a>`) → link slot `cta`
- `.glyph` icon — static template

**latest** (`latest`):
- `.latest-head h2` → text `title`
- `.latest-head a.all` → link slot `all-link`
- 1 feature article:
  - `.photo img` → image slot `feature.image`
  - `.eyebrow` → text `feature.eyebrow`
  - `h3` → text `feature.title`
  - `p` → text `feature.body`
  - `a.read` → link slot `feature.cta`
- 2 companion articles, each:
  - `.eyebrow` → text `companion-N.eyebrow`
  - `h3` → text `companion-N.title`
  - `p` → text `companion-N.body`
  - `a` (last) → link slot `companion-N.cta`

### Inline content elements check (per 2026-05-20 learning)

Scanned the source headings/paragraphs for mid-sentence `<sup>`, `<sub>`, `<strong>`, `<em>`, etc.
- Brand hero h1 "JFK" — no inline elements
- Construction p: no inline elements
- Latest feature p: no inline elements
- No mid-sentence inline content elements exist in any authorable heading/paragraph.
  The `<strong>` tags inside herofeed entries are inside non-slotted (static) content.

### Background-image slots

No CSS-driven background images in slotted content. All hero/card photos are `<img>` tags.
Skip the background-image writer.

### Head-level resources

The source `<head>` has no `<link rel="stylesheet">` to external fonts or CDN resources.
All fonts are system or via the page CSS `@font-face` (panynj-icons.woff2). No `<link>`
needs to be lifted to the template.

### Inline scripts

Lines 1496-1611. Contains:
1. IntersectionObserver `.reveal` add `.in` class
2. Count-up animation on `.num-count` elements
3. View Transitions on audience-tile click (`document.startViewTransition`)
4. "/" key focuses dep-dest input
5. Console log message

All client-side, no dependencies on libraries. Extract verbatim to
`scripts/jfk-airport-a-animations.js`.

### Asset strategy

- Strategy: `absolute` (public source host).
- Asset base: `https://paolomoz.github.io/stardust-site/samples/jfk-airport/`.
- Rewrite all `assets/...` references to `${assetBase}assets/...`.
- `@font-face` icon font URL becomes absolute → CORS works (github.io sends `*`).
- DA cell `<img>` URLs use the same absolute form (Media Bus requirement satisfied).

### Strip

- The `<!-- ... -->` HTML comments at section boundaries are kept (they're harmless).
- The provenance comment in `<head>` (lines 4-143) is dropped from the template
  (it's documentation, not rendered content). Bytes saved: ~14 KB.
- The skip link `<a href="#main-content" class="skip">` is part of the header fragment.

### Animations engine handling

The inline script depends on `#dep-dest` (departing flight destination input) for the
"/" key shortcut. Since that input is inside `task-panel-departing > .inner > .head >
.flight-search > .form-row > #dep-dest`, and that section is in the template (always
present, just `hidden` initially for non-departing tabs), the script will find it
after overlay applies.

The substrate's `delayed.js` HEAD-probes `/scripts/<template>-animations.js` and runs
it after the DOM stabilizes. The script reads selectors during execution, so it must
run AFTER the overlay completes. The substrate handles this correctly.

## Phase: Round-trip

### Production round-trip (local skipped per instructions)

- Branch tip pushed (force-with-lease): commit `497b23e` on `sd-jfk-airport-a`.
- DA versioned snapshot created with label "Before snowflake refresh 001 (jfk-airport)" — POST `versionsource` returned 201.
- DA PUT to `/jfk-airport/a.html` — returned 200 with editUrl, contentUrl, previewUrl, liveUrl.
- POST preview on sd-jfk-airport-a — 200; preview URL: `https://sd-jfk-airport-a--snowflake-demos--aemcoder.aem.page/jfk-airport/a`.
- POST live on sd-jfk-airport-a — 200; live URL: `https://sd-jfk-airport-a--snowflake-demos--aemcoder.aem.live/jfk-airport/a`.
- All 5 deployed paths return 200 on the branch (templates, styles, header, footer, animations).

### Verification on production

Loaded `https://sd-jfk-airport-a--snowflake-demos--aemcoder.aem.live/jfk-airport/a` in
playwright-cli. Results:

| Check | Value |
|---|---|
| `main.dataset.overlay` | `"jfk-airport-a"` ✓ |
| `sectionCount` | 12 ✓ |
| Section first-classes | brand-hero, audience-section, task-panel-departing, task-panel-arriving, task-panel-pickup, task-panel-connecting, task-panel-visiting, guide-section, construction, essentials, accessibility, latest ✓ |
| `body.appear` | true ✓ |
| `h1` text | "JFK" ✓ (slotted from DA) |
| Console errors | 0 |
| Console warnings | 1 (harmless Lenis CDN miss — substrate `delayed.js` defaults to loading Lenis as a CDN dep; this page doesn't use it) |

### Screenshots saved in diff/

- `production-top.png` — header + brand hero + start of audience router
- `production-task-panel.png` — departing task panel (default visible)
- `production-latest.png` — Latest from JFK section
- `production-footer.png` — Pickup feature article + footer

All section content rendered correctly. Hero image visible, JFK wordmark in display
font, herofeed widget overlay with 3 entries (live data, static template content in this
demo), audience-section with deck, departing task panel form + 5 quick actions, latest
articles with feature image + 2 companions, footer with PANYNJ co-brand and 4 nav columns.

## Phase: Reflect

### Branch-level fixes applied

NONE. This run produced clean output from the substrate v1.0.4 with no branch-level
workarounds needed. The methodology and learnings already encode every pattern that
mattered for this page:

- Section first-class collisions handled by `task-panel-<audience>` rewrite (rule in
  methodology §3 / discriminator priority — `data-audience` here served as the
  per-instance label since `data-section` was identical across the 5 panels).
- Asset paths rewritten to absolute github.io URLs (asset strategy "absolute" for
  public source hosts) — Media Bus accepts these in DA cells, the browser fetches
  the icon font CORS-friendly from github.io directly.
- Container-vs-children rule applied to guide tiles (`<a>` wrapper not slotted; image
  + h3 + arrow slotted individually).
- Heading-in-heading wrapping handled by the substrate's writeSlot heading branch
  (v1.0.3+) — DA cells contain `<h2>...</h2>` and the engine unwraps them cleanly.
- Quick-action `<span class="icon-arrow-right">` icon spans kept as template chrome
  (would be stripped by the pipeline if put inside DA cells); inserted an inner
  `<span data-slot="qa-N.value">` around just the text portion so the icon survives.

### Substrate gaps surfaced

None new. Substrate v1.0.4 handled everything correctly:

- `<footer> > .footer` direct-child selector in lifecycle CSS — footer fragment's
  inner `.col` and other divs visible, no nav invisible bug (the 2026-05-19 fix is
  in v1.0.4).
- `body > header, body > footer { padding: 0; margin: 0 }` substrate reset —
  page CSS uses `header { display: flex; ... padding: 12px ... }` for the source's
  fragment-internal header element. The substrate reset only zeroes the EDS landmark
  wrappers; inner `<header data-section="header">` keeps its source styling. Hero is
  not pushed down.
- `writeSlot` heading-in-heading unwrap — DA cells contain `<h2>title</h2>` and the
  substrate produces a clean single heading in the rendered DOM.
- `writeSlot` background-image guard on `<a>` tags — N/A on this page (no `<a>` with
  inline background-image).

### Findings worth promoting (none in this run)

Nothing new generalised beyond what's in cross-project learnings.md.

### Page-specific findings (kept in project notes only)

- The source's herofeed widget contains semantic-stripping patterns
  (`<span class="tag">`, `<span class="now">`, `<br>`) and was deliberately kept as
  STATIC template content because (a) it represents live operational data that
  would be wired to a backend feed in production, not authored copy, and (b) preserving
  the visual styling (pill-like tag chip, "Now/24m ago" subdued color) would have
  required swapping spans for `<strong>` and CSS rewrites that aren't worth the
  fidelity cost for a demo run.
- The source's 5 task-panels share `data-section="task-panel"` and `class="task-panel"`
  but each has a unique `data-audience` attribute. Used `task-panel-<audience>` as the
  rewritten first-class (5 unique disambiguators). All `task-panel-X` are absent from
  the page CSS (only `.task-panel` is targeted) — no CSS collisions.
- The 5 task-panels are interactively swapped via `document.startViewTransition()` on
  audience-tile click. The animations script runs after overlay applies and the
  selectors all resolve. Verified the "Departing" panel is visible by default; tile
  click would swap panels (not verified — initial state suffices for the demo).

