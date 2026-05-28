# Content model contract — 021 frescopa-block

Single source of truth for the DA block tables. The block `decorate()`, the
DA doc (`output/da/home-a.html`), and the drafts page
(`drafts/frescopa-block-home-a.html`) must all agree with this.

## Conventions

- A block is `<div class="<name>">`; each child `<div>` is a **row**; each
  child of a row is a **cell** `<div>`.
- **CTAs**: authored as `<p><strong><a href>Label</a></strong></p>` (primary)
  or `<p><em><a href>Label</a></em></p>` (secondary). EDS `decorateButtons()`
  runs in `decorateMain` (synchronous) BEFORE block `decorate()` (async, in
  `loadSection`), so by decorate-time they are `a.button.primary` /
  `a.button.secondary` inside `p.button-wrapper`. Decorators read `.button`
  (fallback: `strong a` / `em a`) and re-class to source `.btn` variants.
- **Images**: authored `<img src alt>` (absolute stardust.style URL). EDS
  Media Bus rewrites to optimized `<picture>` on preview — decorators must
  handle both `<img>` and `<picture><img>`.

## hero  (1 col)

| row | cell content | role |
|-----|--------------|------|
| 0 | `<img src=".../hero-B-generated.png" alt="">` | background image |
| 1 | `MyBarista coffee quiz` | eyebrow |
| 2 | `<h1>Find your <em>perfect</em> coffee in four questions.</h1>` | heading (em = Gilt accent) |
| 3 | `Four questions, your roast.` | subhead |
| 4 | `<p><strong><a href="/quiz">Take the quiz</a></strong></p>` | primary CTA → btn-primary-on-bay |
| 5 | `<p><em><a href="/coffee">Browse coffee</a></em></p>` | secondary CTA → btn-secondary |

Decorator: sets `--hero-bg` custom prop from row-0 img src; builds
`.container > .content` with eyebrow, h1, `.subhead`, `.ctas`.

## shop-categories  (multi-col)

| row | cells | role |
|-----|-------|------|
| 0 | `Shop` \| `Shop all Frescopa products.` | eyebrow \| heading |
| 1..5 | `<img>` \| `<a href>Title</a>` \| `CATALOG LINE` | card: image \| title-link \| catalog |

5 cards (machines, coffee, coffee, coffee, accessories). Title cell anchor
href makes the whole `.category-card` clickable.

| card | img | title | href | catalog |
|------|-----|-------|------|---------|
| 1 | 339b7a58…png | Coffee Machines | /machines | MACHINES |
| 2 | c4251005…png | Bagged Coffee | /coffee | COFFEE · WHOLE BEAN |
| 3 | 604aa0d1…png | Coffee Pods | /coffee | COFFEE · SINGLE-SERVE |
| 4 | bba1fdc3…png | Bundles | /coffee | CURATED SETS |
| 5 | 5dcf858f…png | Accessories | /accessories | BREWING TOOLS |

## subscription-card-on-bay  (1 col)

| row | cell | role |
|-----|------|------|
| 0 | `Subscription` | eyebrow |
| 1 | `<h3>Coffee, every week.</h3>` | editorial heading |
| 2 | `With a MyBarista subscription, …each week.` | body |
| 3 | `<p><strong><a href="/subscription">Start your subscription</a></strong></p>` | primary CTA → btn-primary-on-bay |
| 4 | `<img src=".../4828596f…png" alt="…">` | photo (right) |

Decorator builds `.card` (bay-deep, 2-col grid) > `.content` (rows 0-3) +
`.photo-frame` (row 4).

## locations-finder  (1 col)

| row | cell | role |
|-----|------|------|
| 0 | `Locations` | eyebrow |
| 1 | `<h2>Find a Frescopa near you.</h2>` | heading |
| 2 | `Visit a Frescopa for a fresh cup, …to take home.` | body |
| 3 | `ZIP CODE · CITY · STATE` | search input placeholder |
| 4 | `<p><strong><a href="/locations">Browse all locations</a></strong></p>` | submit label + action href |

Decorator builds centered `.container` + structural `<form class="search-row"
action="/locations" method="get" role="search">` with text input (placeholder
from row 3) + submit button (label from row 4 CTA, type=submit, btn-primary-on-bay).

## featured-coffee  (1 col, porcelain ground)

| row | cell | role |
|-----|------|------|
| 0 | `<img src=".../41cdb3eb…jpg" alt="…">` | photo (left) |
| 1 | `Featured` | eyebrow |
| 2 | `<h3>Elevate your coffee game.</h3>` | editorial heading |
| 3 | `Experience the bright, citrusy notes …any day.` | body |
| 4 | `<p><strong><a href="/coffee">Shop coffee</a></strong></p>` | primary CTA → btn-primary-on-porcelain |

Decorator builds 2-col `.container`: `.photo-frame` (row 0) LEFT, `.content`
(rows 1-4) RIGHT.

## rewards-cta-band  (1 col)

| row | cell | role |
|-----|------|------|
| 0 | `Rewards` | eyebrow |
| 1 | `<h2>Rewards waiting.</h2>` | editorial heading |
| 2 | `Surprise your loved ones …joy of Frescopa.` | body |
| 3 | `<p><strong><a href="/signup">Claim rewards</a></strong></p>` | primary CTA → btn-primary-on-bay |

Decorator builds centered `.container` with eyebrow, `.editorial` heading, p, CTA.
