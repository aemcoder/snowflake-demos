# Notes — 001 express

## Phase: Capture

Source: http://127.0.0.1:8080/express.html (Adobe Express homepage redesign)
File size: 182,926 bytes. Single HTML file with all CSS inline (~2275 lines),
all JS inline (~420 lines). External deps: Lenis smooth-scroll (CDN).
Content images all point to public `www.adobe.com` URLs.
Fonts are relative `../../assets/*.otf` (7 files, resolve to localhost).

## Phase: Analyze

### Structural map

```
Line   Element / Class
─────  ──────────────────────────────────────
2287   div.nav-wrap > nav.nav                         ← HEADER fragment
2394   section.section.hero.hero--split.hero--split-noimage  ← hero block
2412   div.stories.is-compound-sibling                ← story cards (NOT <section>)
2455   section.section.audience                       ← audience block (elastic cards)
2501   section.section.features                       ← features block (acrobat cards)
2569   section.section.merch-cards-section             ← merch-cards block (pricing)
2713   section.section.quote.is-compound-sibling       ← quote block (testimonial)
2725   section.section.brands                         ← brands block (logo strip)
2740   section.closer.parallax-garage-door-reveal      ← closer block (CTA)
2756   footer.footer                                  ← FOOTER fragment
```

### First-class collisions

All sections except `.closer` have `section` as their first class token.
Disambiguators (per methodology §3 priority):
- hero → use `hero` (semantic class, 2nd token)
- audience → use `audience` (semantic class, 2nd token)
- features → use `features` (semantic class, 2nd token)
- merch-cards-section → use `merch-cards-section` (semantic class, 2nd token)
- quote → use `quote` (semantic class, 2nd token)
- brands → use `brands` (semantic class, 2nd token)
- closer → already unique first class

### stories compound-sibling handling

The `div.stories.is-compound-sibling` sits between hero and audience
as a standalone `<div>` (not `<section>`). CSS rules:
- `.section.hero:has(+ section.is-compound-sibling) { padding-bottom: 0 !important; }`
- `section.is-compound-sibling .stories { margin-top: 12px; }`

For block-level: wrap this as its own `<section class="stories">` block.
The visual coupling is CSS-only (padding/margin) — reproducible in block CSS.

### Asset strategy

- Content images: **absolute** — all on `www.adobe.com`, publicly reachable
- Fonts: **vendor** — 7 OTF files at `../../assets/*.otf` (localhost-only),
  copy to `/fonts/` in repo, rewrite `@font-face src` URLs
- Inline SVGs (nav, footer): data: URIs — stay inline, no fetching needed
- External CDN: Lenis CSS+JS from jsdelivr — reference directly

### Head-level resources to lift

- `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.css">`
- `<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.4/dist/lenis.min.js">`

### Inline style extraction

Lines 7–2282 → extract to `/styles/express.css`

### Inline script extraction

Lines 2893–3312 → extract to `/scripts/express-animations.js`

### Block-level feasibility assessment

| Section | Structure | CSS Scope | Content Model | JS Independence | Visual Independence | Level |
|---------|-----------|-----------|--------------|-----------------|--------------------|----|
| hero (hero--split) | ✅ `<section>` with `.hero` | ✅ `.hero-split__xxx` BEM | ✅ logo + title + CTAs | ✅ no hero-scroll JS here | ✅ white bg | block |
| stories | ⚠️ `<div>` not `<section>` | ✅ `.story-card__xxx` BEM | ✅ 4 cards (bg-image + icon + title) | ✅ no direct JS | ⚠️ compound-sibling coupling | block (wrap as section) |
| audience | ✅ `<section>` with `.audience` | ✅ `.elastic-card__xxx` BEM | ✅ heading + 3 cards (image + title + body) | ✅ none | ✅ own bg | block |
| features | ✅ `<section>` with `.features` | ✅ `.acrobat-card__xxx` BEM | ✅ heading + 6 cards (image + title + body + CTA) | ⚠️ scroll-driven rAF targets `.acrobat-cards` | ✅ own section | block |
| merch-cards-section | ✅ `<section>` with `.merch-cards-section` | ✅ `.merch-card__xxx` BEM | ⚠️ complex pricing cards with nested features/SVGs | ⚠️ scroll-driven rAF targets `.merch-cards` | ✅ own bg (#fff) | block |
| quote | ✅ `<section>` with `.quote` | ✅ `.quote__xxx` BEM | ✅ avatar + text + attribution | ✅ none | ✅ own section | block |
| brands | ✅ `<section>` with `.brands` | ✅ `.brands__xxx` BEM | ✅ label + 5 logo images | ✅ none | ✅ own section | block |
| closer | ✅ `<section>` with `.closer` | ✅ `.closer__xxx` BEM | ✅ heading + CTAs | ⚠️ closer-sync reads hero (fallback only, one-shot) | ✅ dark bg | block |

**JS notes:**
- Scroll-driven card animations target `.merch-cards` and `.acrobat-cards` globally via rAF.
  These are per-element, not cross-section state. Each block's `decorate()` can register its
  own cards with a shared animation utility, or each block can include its own scroll animation.
- Closer-sync script is a one-shot DOM read from hero — move to block's `decorate()` or skip
  (DA content will supply the real heading).
- Lenis init is global — stays in `scripts/express-animations.js`.

**Recommendation: block-level** — all sections pass or have minor issues that are addressable.

### Warning

`level=block` was explicitly requested. Analysis confirms this is feasible.
No sections require page-level fallback.
