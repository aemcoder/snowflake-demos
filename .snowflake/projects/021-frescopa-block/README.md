# 021 — frescopa-block

Source: https://stardust.style/samples/frescopa/proposed-A.html
Captured: 2026-05-28
Generator: Stardust (stardustVersion 0.2.0), variant B
Conversion level: **block-level**
DA interaction: `aem content` (clone/add/commit/push), per user request
Branch: `sd-frescopa-block-a` · DA path: `/sd-frescopa-block-a/home-a`

## Structure (no `<main>`; 9 body-level children)

| # | Source element | Role |
|---|----------------|------|
| 1 | `header.promo-strip` | → header fragment |
| 2 | `header.site-header` | → header fragment |
| 3 | `section.hero` | block (bg image + eyebrow + h1 + subhead + 2 CTAs) |
| 4 | `section.shop-categories` | block (eyebrow + h2 + 5 cards) |
| 5 | `section.subscription-card-on-bay` | block (eyebrow + h3 + p + CTA + image) |
| 6 | `section.locations-finder` | block (eyebrow + h2 + p + search form) |
| 7 | `section.featured-coffee` | block (image + eyebrow + h3 + p + CTA; porcelain ground) |
| 8 | `section.rewards-cta-band` | block (eyebrow + h2 + p + CTA) |
| 9 | `footer.site-footer` | → footer fragment |

## Notable

- All 6 content sections carry their own `background` + class-level `padding`
  (the generic `section,header,footer{padding}` is redundant for them) → clean
  per-block CSS extraction, no page-level layout container.
- Assets publicly hosted & reachable → `absolute` strategy; EDS sideloads
  `<img>` into Media Bus on first preview.
- No overlay substrate installed — block-level uses standard EDS decoration.

Status: **complete** (local + production round-trip verified)

## Result

- 6 EDS blocks + header/footer fragments; standard EDS decoration (no overlay substrate).
- Lint clean; local + production: all blocks render, 0 console errors, pixel-identical to source.
- Media Bus optimizes all images (cards serve webp `<picture>`).
- DA content pushed via `aem content` to `/sd-frescopa-block-a/home-a.html`.

**Live:** https://sd-frescopa-block-a--snowflake-demos--aemcoder.aem.live/sd-frescopa-block-a/home-a
**Preview:** https://sd-frescopa-block-a--snowflake-demos--aemcoder.aem.page/sd-frescopa-block-a/home-a
**DA editor:** https://da.live/edit#/aemcoder/snowflake-demos/sd-frescopa-block-a/home-a

Run NOT closed (no tag, no demos.md row yet) — pending user decision.
