# Notes — 001 patagonia-a

## Phase: Capture

Fetched 28 KB HTML from https://paolomoz.github.io/stardust-site/samples/patagonia/proposed-A.html
Generator: Stardust 0.2.0 (provenance comment in HTML head)
No external CSS or JS files to fetch — all styles are inline `<style>`, no `<script>` tags.
All images use absolute CDN URLs (patagonia.com.au, cdn.shopify.com) — no local assets to vendor.

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────────────────────────
309    <body>
  311    <!-- ribbon --> div.ribbon [data-section=utility-ribbon]  → HEADER
  323    <header class="header"> [data-section=primary-header]     → HEADER
  358    </header>
  360    <section class="hero"> [data-section=hero]                → MAIN section 1
  371    </section>
  373    <section class="section"> [data-section=activity-tile-grid] → MAIN section 2
  401    </section>
  403    <section class="sec-hero"> [data-section=secondary-photo-hero] → MAIN section 3
  412    </section>
  415    <section class="section"> [data-section=category-tile-grid] → MAIN section 4
  430    </section>
  436    <section class="sec-hero"> [data-section=tertiary-photo-hero] → MAIN section 5
  443    </section>
  446    <section class="section values"> [data-section=values-row] → MAIN section 6
  476    </section>
  479    <footer class="footer"> [data-section=mega-footer]        → FOOTER
  523    </footer>
```

No `<main>` element — must synthesize one wrapping sections 1-6.

### First-class collision analysis

Multiple sections share first classes. Using data-section for disambiguation (Stardust convention):

| Original first class | data-section            | New first class         |
|----------------------|-------------------------|-------------------------|
| hero                 | hero                    | hero (unique, OK)       |
| section              | activity-tile-grid      | activity-tile-grid      |
| sec-hero             | secondary-photo-hero    | secondary-photo-hero    |
| section              | category-tile-grid      | category-tile-grid      |
| sec-hero             | tertiary-photo-hero     | tertiary-photo-hero     |
| section              | values-row              | values-row              |

### Slot opportunities per section

**Section 1: hero**
- `.hero__media` div — background-image slot (inline `style="background-image:url(...)"`)
- `.hero__eyebrow` div — text slot: "Yulex® · Neoprene-free"
- `h1.hero__title` — text slot: "Outlast the Winter"
- `p.hero__sub` — text slot: long description
- `a.pill.pill--primary` in `.hero__cta` — link slot: href + label "Explore"
  (no nested data-slot children, safe as link slot)

**Section 2: activity-tile-grid**
- `h2.section__title` — text slot: "Find your sport"
- `a.section__more` — link slot: href + "See all activities"
- 6 tiles (a.tile): each tile is an `<a>` with background-image AND inner content
  → container-vs-children rule: slot the background-image on the `<a>` itself + inner text/link children?
  → NO: the `<a>` wraps inner `<div class="tile__inner">` with label+cta. The CTA is a `<span>` not `<a>`.
  → Slot: background-image on each `<a class="tile">` (has inline style="background-image:url(...)"), 
    href is part of the tile link so use background-image slot + tile label text slot only.
  → `<span class="pill pill--primary tile__cta">Explore</span>` — static text, not a slot (same text on all 6)
  → Per tile: background-image on the `<a>` element itself, label text in `.tile__label`
  → tile-1.bg, tile-1.label ... tile-6.bg, tile-6.label

**Section 3: secondary-photo-hero**
- `.sec-hero__media` div — background-image slot
- `h2.sec-hero__title` — text slot: "Stay Out, Stay Dry"
- `p.sec-hero__sub` — text slot: "Built to keep moving when the weather doesn't."
- `a.pill.pill--primary` — link slot: href + "Explore"

**Section 4: category-tile-grid**
- `h2.section__title` — text slot: "Shop by category"
- `a.section__more` — link slot: href + "All collections"
- 6 cats (a.cat): each `<a>` has background-image + inner `<span class="cat__caption">`
  → `<span class="cat__caption">` — stripped by pipeline. Options:
    1. Slot the span content as text (but span is stripped). Use `<p>` wrapper? No - it's inside an `<a>`.
    2. The caption is inside the `<a>` — could slot the inner text as a separate element, but it's a span.
    3. Best approach: the `<a>` is a link slot (href + label). But it also has background-image.
    → Container-vs-children rule: can't slot both the `<a>` as link AND have a child slot for background.
    → Decision: slot background-image on the `<a>` + make the cat__caption a text slot.
    → But `<span>` won't survive in DA cells (stripped). 
    → Per methodology: use the fallback approach - slot the `<a>` as a link slot (copies href + innerHTML).
      The inner `<span class="cat__caption">` text becomes the innerHTML. This works: the link slot
      writer copies href and innerHTML from the DA cell's `<a>`. In DA, put the cat name as text inside `<a>`.
    → But cat also needs background-image. Per container-vs-children rule: can't slot both.
    → Decision: separate the two concerns. Slot the `<a>` as a background-image slot only.
      For category names: they're static content (short labels like "Jackets", "Fleece") — 
      but they ARE authorable. The cat__caption's text needs to be editable.
    → Alternative: wrap cat__caption content in a `<p>` for the DA slot value,
      but in the template it stays a `<span>`. Background-image slot on the `<a class="cat">`,
      text slot on `<span class="cat__caption">` — but these are children of the same element.
    → Actually: the container-vs-children rule applies when BOTH parent AND child have data-slot.
      If the `<a>` is a background-image slot AND the `<span>` is a text slot, will they conflict?
      Let's check: background-image slot writer reads el.style.backgroundImage and writes it back.
      It does NOT touch innerHTML. Text slot writer sets el.innerHTML = value.
      So: background-image slot on `<a class="cat">` writes background-image URL,
      text slot on `<span class="cat__caption">` sets innerHTML. These are independent operations!
    → BUT: the background-image slot writer preserves inline styles. The text slot writer
      sets innerHTML of the span. These are on different elements. This should work.
    → WAIT: container-vs-children rule says "Never put [data-slot] on an element that has nested
      [data-slot] children" — because some slot writers clobber innerHTML. Background-image writer
      does NOT clobber innerHTML (just modifies style.backgroundImage). So this is safe!
    → Decision: background-image slot on `<a class="cat">` + text slot on `<span class="cat__caption">`.
      cat-1.bg, cat-1.label ... cat-6.bg, cat-6.label
    → Href on the cat `<a>` is NOT separately authorable (it's the same link as the visual area).
      Include href in the background-image slot row? No — background-image slot only writes bg-image.
      For the href: make cat caption a link slot instead, and background-image on the `<a>` parent.
    → Actually simpler: background-image slot on `<a>` + link slot for cat__caption wrapper.
      But `<span>` can't be a link slot (link slot is for `<a>` elements).
    → Final decision: background-image on `<a class="cat">` (writes bg-image only, href stays as-is),
      and cat__caption as a text slot. Href for each cat is hardcoded in template (not authorable for now).
      This is acceptable for a first conversion — hrefs can be added to a future iteration.

**Section 5: tertiary-photo-hero**
- Inline div for eyebrow — text slot: "Black Hole®"
- `h2.sec-hero__title` — text slot: "Life's in the Bag"
- `p.sec-hero__sub` — text slot: "Built to haul whatever you're hauling."
- `a.pill.pill--primary` — link slot: href + "Shop"
- No background image (static dark band)

**Section 6: values-row**
- 5 value items, each:
  - SVG icon — static/decorative, not a slot
  - `h3.value__title` — text slot
  - `a.value__link` — link slot: href + text
- value-1.title, value-1.link ... value-5.title, value-5.link

### Head-level resources

- `<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700&display=swap" rel="stylesheet">`
  → lift into template file above `<main>`

### Inline styles

- Lines 31-307: large inline `<style>` block → extract to `styles/patagonia-a.css`

### Scripts

- No inline `<script>` blocks (no animations, no external libs)

### Asset strategy

All images use ABSOLUTE CDN URLs:
- `https://www.patagonia.com.au/cdn/shop/files/...`
- `https://cdn.shopify.com/s/files/...`
These are publicly reachable from any host. No vendoring needed. Strategy: "absolute" (no rewriting needed).

### Stardust version

0.2.0 — placeholder convention: `<span class="placeholder-tag">` inline marker.
No placeholders visible in this page — all content is real.

### Decisions surfaced by analysis

1. Synthesize `<main>` wrapping sections 1-6 (source has no `<main>`)
2. Rewrite first classes using data-section discriminators for all 6 sections
3. activity-tile-grid: background-image slot on each `<a class="tile">` + text slot on `.tile__label`
4. category-tile-grid: background-image slot on each `<a class="cat">` + text slot on `.cat__caption` (span)
5. Header fragment = ribbon + header elements (no data-slot markers)
6. Footer fragment = footer element (no data-slot markers)
7. Lift Google Fonts `<link>` to top of template file
8. No animations JS needed (no scripts)
9. All image URLs already absolute — no path rewriting needed in template/fragments/CSS
10. DA cell image URLs: already absolute (same CDN URLs), no rewriting needed
