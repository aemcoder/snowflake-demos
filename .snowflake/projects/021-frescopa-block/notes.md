# Notes — 021 frescopa-block

## Phase: Capture

Fetched `https://stardust.style/samples/frescopa/proposed-A.html` (815 lines,
30 KB) into `input/index.html`. Generator: Stardust 0.2.0, variant B.

Asset references (all under `https://stardust.style/samples/frescopa/assets/`):
- `logo.svg` (used in header + footer)
- 7 product/photo PNGs + 1 JPG under `assets/media/`
- `hero-B-generated.png` (1.2 MB) referenced as CSS `background-image`

All 9 image assets verified reachable (HTTP 200). → **asset strategy = absolute.**

## Phase: Analyze

### Structural map (no `<main>`; 9 body-level children)

```
Line  Element                                  Role
────  ───────────────────────────────────────  ─────────────
617   <header.promo-strip data-section>         header fragment
625   <header.site-header data-section>         header fragment
648   <section.hero data-section>               block · hero
663   <section.shop-categories data-section>    block · shop-categories
700   <section.subscription-card-on-bay …>      block · subscription-card-on-bay
717   <section.locations-finder data-section>   block · locations-finder
730   <section.featured-coffee data-section>    block · featured-coffee
745   <section.rewards-cta-band data-section>   block · rewards-cta-band
755   <footer.site-footer data-section>         footer fragment
```

Inline `<style>`: lines 40–612 (single block). No `<script>` anywhere.
No Stardust placeholder markers (`data-placeholder` / `placeholder-tag`): 0.
Head links: 2 font preconnects + 1 Google Fonts stylesheet (5 families).

### Block-level feasibility — 5 checks (all PASS)

Verified empirically against the inline `<style>`:

| Check | Evidence | Result |
|-------|----------|--------|
| 1 Structure | 9 body-level children, each a `<section>`/`<header>`/`<footer>` with unique first-class + `data-section` | ✅ |
| 2 CSS scope | Every section's rules class-prefixed (hero 9, shop-categories 6, subscription 8, locations 8, featured 7, rewards 4). No `body >`, no sibling/adjacent combinators, no `:nth-child`. `.container` is a global centering helper scoped per-section. | ✅ |
| 3 Content model | Each section = eyebrow + heading + body + CTA(+image). Maps cleanly to DA block tables. locations-finder form is structural (decorator-generated). | ✅ |
| 4 JS independence | Zero `<script>` tags. Pure CSS page. | ✅ |
| 5 Visual independence | Each content section has its own `background` + class-level `padding`. featured-coffee is the one porcelain-ground section; renders fine alone. | ✅ |

**Recommendation: block-level** (matches `level=block` param). 6 content blocks +
header fragment + footer fragment.

### Decisions surfaced by analysis

1. **No `<main>` in source** → synthesize `<main>` in drafts/DA doc; wrap the 6
   block sections. promo-strip/site-header → header fragment; site-footer → footer fragment.
2. **Asset strategy = absolute** — public host, reachable; hero bg too large to vendor.
   CSS `background-image` and DA `<img src>` both use absolute `stardust.style` URLs.
3. **Fonts via Google CDN** — lift the 3 head links into `head.html`; leave
   `styles/fonts.css` empty (prevents boilerplate Roboto leak). Fraunces (hero h1)
   is in the import — must be present or the editorial-italic H1 silently falls back.
4. **Global vs per-section CSS split**: `:root` tokens + base + typography +
   `.btn`/`.eyebrow`/`.editorial`/`.label`/`.catalog` + reduced-motion → `styles/styles.css`.
   Per-section rules → `blocks/<name>/<name>.css`.
5. **EDS landmark resets** (from project prior-run learning, refresh-frescopa-2026-05-19):
   the source's `section,header,footer{padding:64px}` (line 161) leaks onto EDS's
   bare `<header>`/`<footer>` landmark wrappers. Add `body>header,body>footer{padding:0;margin:0}`
   to styles.css. Also full-bleed overrides for `main>.section` and `<name>-wrapper`.
6. **Button decoration ordering**: `decorateButtons()` runs in `decorateMain` (sync)
   BEFORE block `decorate()` (async, in loadSection). Authored `<strong><a>` → `.button.primary`,
   `<em><a>` → `.button.secondary` already applied when decorators run. Decorators read the
   decorated form, with raw strong/em as fallback. Map `.button.primary` → source btn class
   per block (`btn-primary-on-bay` / `btn-primary-on-porcelain`), `.button.secondary` → `btn-secondary`.
7. **shop-categories cards**: title cell carries the link → decorator makes whole `<a.category-card>` clickable.
8. **scripts.js**: add `buildHeroBlock` early-return when `.hero` authored block exists (prevent auto-block dup).
9. **Strip** the Stardust provenance comment (lines 4–32) from all output.

### Differences from page-level frescopa (#019, sd-frescopa-a)

#019 is a page-level overlay (one template + `[data-slot]` markers + overlay engine).
This run (#021) is block-level: 6 independent EDS blocks, standard decoration, no
substrate. Distinct branch (`sd-frescopa-block-a`) and DA path (`/sd-frescopa-block-a/home-a`)
so the two demos coexist.
