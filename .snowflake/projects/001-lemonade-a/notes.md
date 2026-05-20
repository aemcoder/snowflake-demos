# 001 — lemonade-a notes

## Source structure

- Source: https://paolomoz.github.io/stardust-site/samples/lemonade/proposed-A.html
- Generator: Stardust prototype (data-stardust-* attributes on body)
- No `<main>` wrapper — body has `<header>` + 9 `<section>` + `<footer>` at top level
- All inline `<style>` (~600 lines) + Google Fonts CDN link

## Header boundary

`<header class="ds-header" data-section="header">`...`</header>` — single header element with nav, wordmark, account/CTA right column. No announcement banner above. Lines 633–649.

## Footer boundary

`<footer class="ds-footer" data-section="footer">`...`</footer>` — single footer element with 5-column nav grid + bottom bar (wordmark + copyright). Lines 858–897.

## Main sections (9)

| # | Tag | First class | data-section | Notes |
|---|---|---|---|---|
| 1 | section | ds-hero | hero | Centered headline + flanked decorative SVG illos (aria-hidden). Has CTA. |
| 2 | section | ds-valueprops | value-props (dup attr; product-row wins) | Eyebrow + h2 + lede + 5-tile product row (linked tiles, rainbow tints) |
| 3 | section | ds-press-strip | press-strip | Label + press logos SVG (251KB — too large for DA cell) |
| 4 | section | ds-bundle-band | bundle-band | Eyebrow + h2 + lede + 3 bundle cards (img + h4 + p + CTA) |
| 5 | section | ds-social-proof | social-proof | Eyebrow + h2 + rating + stars + lede + 4 placeholder tweets |
| 6 | section | ds-instant | instant-ai | 2-col copy + illustration with CTA |
| 7 | section | ds-switch | switch-flow | Background-image panel with copy + CTA |
| 8 | section | ds-how | how-it-works | Eyebrow + h2 + lede + pizza diagram + 3 placeholder captions |
| 9 | section | ds-impact | social-impact | Eyebrow + h2 + lede + 3 trust badges with images |

All sections already use `<section>` elements. None share first-class.

## Placeholder convention

This Stardust output uses `.ds-placeholder` class on the parent element with a CSS `::after` pseudo-element that displays "PLACEHOLDER" overlay. Affects:
- All 4 tweets in `ds-social-proof`
- All 3 captions in `ds-how`

These are placeholder content the designer wants visible as "this is placeholder copy". Treat them as `data-slot-skip="placeholder"` — preserve markup, don't expose as DA slots. Their text content will display verbatim from the template (which is the placeholder copy).

NOTE: keeping them static means the placeholder visual overlay stays — which is the intended Stardust behavior. If author wants real testimonials, they can change the markup later.

## SVG sizes (>40KB → template-default-only, no DA image slot)

Per learnings: DA Media Bus rejects SVGs over ~40KB at preview-time.

Over 40KB (DA slot OMITTED, browser renders default from template):
- home-left.svg (45KB) — decorative hero illo (aria-hidden)
- home-right.svg (76KB) — decorative hero illo (aria-hidden)
- press_banner.svg (251KB) — press strip
- pet-renters.svg (81KB) — bundle 1
- car-renters.svg (98KB) — bundle 2
- car-home.svg (158KB) — bundle 3
- pizza_desktop.svg (176KB) — how-it-works diagram

Under 40KB (DA image slot OK):
- renters_desktop.svg (16KB), homeowners (8KB), car (16KB), pet (18KB), life (17KB)
- app-sketch-us.svg (14KB)
- b-corp.png (5KB), nyse.png (12KB), a-rated.png (4.9KB)

## Asset URLs

All images use absolute CDN URLs (`https://marketing-edge-assets.lemonade.com/...`). No relative paths to rewrite. Fonts via Google Fonts CDN.

## Template name

`lemonade-a`

## CSS layout-collision check

None of `ds-hero`, `ds-valueprops`, etc. (section first-classes) have layout-defining rules in source CSS (only background/padding). Safe as section first-classes.

## Things the slot writer might need

- Hero h1: text-only — text slot on `<h1>`
- Hero p: text-only — text slot on `<p>`
- Hero CTA: link slot on `<a class="ds-btn ds-btn-primary">`
- Product tiles: each tile is `<a>` with nested `<img>` + `<span>` label. Per learnings, do NOT slot the outer `<a>` AND its children — pick one. I'll slot the `<img>` (image) + the `<span>` (text); leave `<a>` static with its href as template default. Author can't change the destination URL via DA — acceptable for now.
- Press strip img: an absolute CDN URL > 40KB, so will be template-default-only
- Bundle cards: each card has img + h4 + p + cta link. img > 40KB → omit slot. h4/p/cta are text/link slots.
- Social proof: head text slots + the 4 placeholder tweets stay static (skip)
- Instant AI: text slots + image slot (app-sketch under 40KB)
- Switch: text slots + link slot
- How: text slots + image SKIPPED (>40KB) + 3 placeholder captions stay static
- Impact: text slots + 3 trust badges (text + image; all images under 40KB)

## Decisions log

See decisions.json.
