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
