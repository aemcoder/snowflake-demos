# Notes — 003 heathrow-proposed-a

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/heathrow/proposed-A.html
- 212 lines HTML, 664 lines CSS (`assets/css/site.css`).
- Generator: Stardust (provenance recorded in `assets/css/site.css`
  header: "Brand tokens captured by stardust:extract from heathrow.com
  on 2026-04-29").
- Captured externally referenced assets: `assets/css/site.css`.
- Google Fonts link kept as remote reference (CDN).
- All image refs are RELATIVE (`assets/photos/...`, `assets/logos/...`)
  — must be rewritten to absolute URLs pointing at the source host
  (publicly reachable, so vendoring not required).

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
  1-12 <head>  — meta, fonts preconnect, fonts stylesheet, site.css
 13    <body>  — NO <main>; synth required
 16-32 <header class="site-header">
       └── brand (img+span), nav (anchor links)
 33-44 <section class="hero hero--photo">                    ← block: hero
       └── img.hero__media, p.label, h1.hero__title,
           p.hero__lead, 2× a.btn
 46-115 <section class="section">                            ← block: about-consultation
       ├── div.section__head (label, h2, p)
       └── div.pillar-grid
           └── 6× a.pillar-card  (static <a>, slotted children)
               ├── div.pillar-card__photo style="background-image:url(...)"
               └── div.pillar-card__body
                   ├── p.pillar-card__label
                   ├── h3.pillar-card__title
                   ├── p.pillar-card__copy
                   └── span.pillar-card__more (static chrome)
117-154 <section class="section section--tint">              ← block: phased-expansion
       ├── div.section__head (label, h2, p)
       └── div.phases
           └── 4× div.phase
               ├── div.phase__dot (decorative, static)
               ├── div.phase__label
               ├── div.phase__year
               └── p.phase__copy (contains <strong> and <br/>)
157-169 <section class="cta-band" id="have-your-say">        ← block: cta-band
       ├── p.label, h2, p
       └── 2× a.btn
171-209 <footer class="site-footer">
       └── 4 cols + legal row
```

### Boundaries

- **Header fragment**: lines 16–32 (`<header class="site-header">`).
- **Footer fragment**: lines 171–209 (`<footer class="site-footer">`).
- **Template `<main>`**: synthesized; wraps the 4 sections lines 33–169.

### First-class disambiguation

Two sections share first class `section`:

| Source                                         | Disambiguator (from eyebrow) | Result first class |
|-----------------------------------------------|------------------------------|--------------------|
| `<section class="section">` (about + pillars) | "About this consultation"    | `about-consultation` |
| `<section class="section section--tint">`     | "A phased expansion"         | `phased-expansion`   |

Other sections: `hero` and `cta-band` already unique.

CSS-collision check (per learnings rule): none of the chosen
discriminators appear as layout-defining CSS selectors. `.section`
itself only declares padding (not layout), so even the kept `.section`
class on the second/third sections remains harmless.

### Generator placeholders

None — page is fully populated (no `data-placeholder`, no
`placeholder-tag` markers).

### Inline elements present mid-sentence

- `phase__copy` contains `<strong>` and `<br />` inline. Per the
  2026-05-20 inline-content learning, slot the whole `<p>` so the
  inline elements stay inside the slot value.

### `<span class="...">` audit

| Span                            | Location           | Decision                    |
|---------------------------------|--------------------|-----------------------------|
| `pillar-card__more`             | inside `<a.pillar-card>` | static template chrome (not a slot — stays in template HTML, not in DA cell) |
| `site-header__brand-meta`       | header fragment    | static fragment chrome      |
| `<span>` (plain, no class)      | footer legal row   | static fragment chrome      |

No `<span class>` is being slotted into a DA cell, so the EDS pipeline
strip behavior doesn't bite us.

### Asset strategy

Source host is `paolomoz.github.io` (public). Strategy: **rewrite all
relative paths to absolute source URLs**.

- Template/fragment HTML `src=`/`href=`: `https://paolomoz.github.io/stardust-site/samples/heathrow/assets/...`
- Inline `background-image: url(...)`: same.
- CSS `url()` references in extracted `site.css`: rewrite to same
  absolute base. (None observed in site.css — all url() refs are
  in the HTML.)
- DA cell `<img src=>`: same absolute URLs (Media Bus requires absolute).

No vendoring needed; no DA `/media/` migration needed.

### Head-level resources to lift to template top

- `<link rel="preconnect" href="https://fonts.googleapis.com">`
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
- `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&display=swap">`

(The `assets/css/site.css` link does NOT go in the template — its
content is extracted to `/styles/heathrow-proposed-a.css`.)

### Inline `<style>` / `<script>`

- No `<style>` blocks.
- No `<script>` blocks (no animation engine needed).

### Container-vs-children rule

- `<a class="pillar-card">` wraps 5 inner authorable children. Keep the
  `<a>` static (no `data-slot` on it). The hrefs (#the-proposal,
  #masterplan, etc.) are structural anchor-nav links — they're part of
  the template, not authorable content. Slot the inner children.
- `<a class="site-header__brand">` wraps an `<img>` and a `<span>` —
  but the header is a static fragment, not slot-bearing, so this
  doesn't apply.

### Decisions surfaced by analysis

1. Synthesize `<main>` wrapping the four body sections.
2. Disambiguate two `class="section"` sections via eyebrow slugs
   (`about-consultation`, `phased-expansion`).
3. No `data-section` attribute, no animation engine, no placeholders.
4. Rewrite all relative `assets/...` URLs to absolute
   `https://paolomoz.github.io/stardust-site/samples/heathrow/assets/...`.
5. Lift 3 head-level `<link>` resources into template top.
6. Extract `assets/css/site.css` content to `/styles/heathrow-proposed-a.css`.
7. Pillar-card `<a>` stays static (children slotted).
8. `phase__copy` p slotted as a whole, inline `<strong>`/`<br>`
   preserved in slot value.

## Phase: Generate

- 4 sections produced: `hero`, `about-consultation`, `phased-expansion`,
  `cta-band`.
- 53 `[data-slot]` markers total.
- Output artifacts:
  - `output/templates/heathrow-proposed-a.html` (148 lines)
  - `output/fragments/heathrow-proposed-a/header.html`
  - `output/fragments/heathrow-proposed-a/footer.html`
  - `output/styles/heathrow-proposed-a.css` (664 lines, byte-identical
    to source `site.css`; no url() refs to rewrite)
  - `output/da/page.html` (DA-source body fragment, 88 lines)
- No animation engine — page has no inline `<script>`.
- All 6 phase-3 self-checks passed:
  - No relative `assets/` refs in template/fragments/styles.
  - No `<span class>` or `<table>` in DA doc.
  - 4 `<br>` instances in DA doc, all in `phase-N.copy` slots
    (mid-paragraph, safe position).
  - All DA cell `<img src>` are absolute (source github.io host).
  - Section first-classes don't collide with layout-defining CSS rules.

## Phase: Wire

Copied to:
- `templates/heathrow-proposed-a.html`
- `fragments/heathrow-proposed-a/{header,footer}.html`
- `styles/heathrow-proposed-a.css`
- `drafts/page.html` (generated via `transform-da-to-eds.mjs`)

`npm run lint` clean.

## Phase: Round-trip (local)

Dev server at `http://localhost:3000/drafts/page.html`.

Browser verification:
- `main.dataset.overlay === "heathrow-proposed-a"` ✓
- 4 sections, 53 slot markers populated ✓
- `<meta name="template">` emitted ✓
- `body.appear` set ✓
- Inline `<strong>`/`<br>` preserved in phase copy slots ✓
- All 6 `<span class="pillar-card__more">` retained in template
  (static chrome, never went through DA cell) ✓
- 1 console error: 404 on `/scripts/heathrow-proposed-a-animations.js`
  — expected, cosmetic; substrate HEAD-probe finds no animation file.

DOM equality (source vs rendered) — `diff/dom-equality-local.md`:
- Element count: source 157, rendered 162 (delta +5 — expected EDS
  header/footer/main wrapper injection).
- Tag sequence first divergence at position 0: rendered has
  `header.header-wrapper > div.header > header.site-header` while
  source has `header.site-header` (EDS lifecycle wrappers — expected).
- **Visible text: byte-identical, 3357 chars** ✓
- Image src refs: 3 diffs, all source-relative → absolute (intentional
  per asset strategy).

Per-section viewport screenshots:
- `diff/local-hero.jpg`
- `diff/local-about-consultation.jpg`
- `diff/local-phased-expansion.jpg`
- `diff/local-cta-band.jpg`

## Phase: Round-trip (production)

- Branch: `test-sf-eds-da` pushed to origin.
- DA PUT: 201 (created labeled snapshot of prior content first), 200
  (PUT succeeded). DA edit URL:
  `https://da.live/edit#/aemcoder/snowflake-demos/test-sf-eds-da/page`.
- POST preview: 200; `preview.url` = production aem.page URL below.
- Code-bus deploy ready in 1s; all 4 deployed paths return 200.
- Production URL:
  `https://test-sf-eds-da--snowflake-demos--aemcoder.aem.page/test-sf-eds-da/page`

Browser verification on production:
- `overlayApplied: "heathrow-proposed-a"` ✓
- 4 sections, 53 slots ✓
- **Media Bus rewrote DA-cell image URLs** to optimised forms:
  - Hero img:
    `./media_188d5506…jpg?width=750&format=jpg&optimize=medium`
  - Pillar card background-image (sample):
    `./media_11373ae1…jpg?width=750&format=jpg&optimize=medium`
  - Confirms DA cells used absolute URLs correctly (no `about:error`).
- 1 console error: same animation 404 as local — expected.

DOM equality (source vs production) — `diff/dom-equality-production.md`:
- Same shape as local — element count +5, tag-sequence wrapper
  divergence at position 0, visible text identical (3357 chars).
- Image src diffs: 2 (header/footer logos — they live in static
  fragments, not in DA cells, so Media Bus doesn't rewrite them).

## Findings

### Project-specific

- **No new patterns.** This Heathrow source is well-trodden ground —
  similar to run 001 (`001-heathrow-proposed-a`). Confirms the
  refreshed substrate (v1.0.5) handles the same input identically to
  prior runs, with no regressions.
- **DA `versionsource` returned 201, not 404.** Indicates the DA path
  `/test-sf-eds-da/page` had prior content (likely from an unrelated
  experiment using this same branch name). The labeled snapshot now
  preserves that state.

### Cross-project (none promotable)

Nothing surfaced that isn't already captured in
`<SKILL_DIR>/knowledge/learnings.md`. The Media Bus DA-cell-image
rewrite worked as documented; the lifecycle wrapper diff is the same
+5 pattern expected from EDS header/footer/main injection; the
animation-script 404 is the known cosmetic console error.

## Timings (approximate)

| Phase            | Duration   | Notes                              |
|------------------|------------|------------------------------------|
| capture          | ~30s       | curl source + site.css             |
| analyze          | ~90s       | structure map + decisions.json     |
| generate         | ~3m        | template + fragments + DA doc      |
| wire             | ~30s       | cp + transform + lint              |
| roundtrip-local  | ~2m        | dev-server + playwright verify     |
| roundtrip-prod   | ~3m        | branch push + PUT + preview + verify; ~1m blocked on token refresh |
| reflect          | ~1m        | this writeup                       |

Total: ~11m, of which ~1m was waiting for the user to refresh the DA
token.
