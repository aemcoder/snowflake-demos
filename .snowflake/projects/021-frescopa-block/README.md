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

Status: capturing → analyze
