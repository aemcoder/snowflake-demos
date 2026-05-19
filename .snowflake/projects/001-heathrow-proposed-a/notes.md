# Notes — 001 heathrow-proposed-a

## Phase: Capture

- Source URL: https://paolomoz.github.io/stardust-site/samples/heathrow/proposed-A.html
- Source HTML: 10241 bytes — saved to `input/index.html`
- External CSS: `assets/css/site.css` — 18161 bytes, saved to `input/site.css`. No `url()` refs inside.
- No inline `<style>` or `<script>` blocks.
- Head-level links: 2 font preconnects + 1 Google Fonts stylesheet (Open Sans 400/500/600).
- All image refs are relative `assets/...` paths.
- Source is public on github.io → asset strategy is "rewrite to absolute github.io URLs".

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
13–32  <header class="site-header">  ← header fragment
33–44  <section class="hero hero--photo">  ← block 1: hero
46–115 <section class="section">  ← block 2: pillars (collides on first-class "section")
117–154 <section class="section section--tint">  ← block 3: phases (collides on first-class "section")
157–169 <section class="cta-band" id="have-your-say">  ← block 4: cta-band
171–209 <footer class="site-footer">  ← footer fragment
```

No `<main>` in source — must synthesize. Sections are direct children of `<body>`.

### First-class collisions

Two sections share first class `section` (lines 46 and 117). Per the discriminator hierarchy:
- No `data-section` attribute → skip
- No `id` on these sections → skip
- Eyebrow slug:
  - Line 48: "About this consultation" → first-class becomes `pillars` (more recognisable than `about-consultation` given the dominant feature is the 6 pillar cards)
  - Line 119: "A phased expansion" → first-class becomes `phased-expansion`. (Originally tried `phases`, but `.phases` is already used in the source CSS for the inner timeline grid container — putting `phases` on the outer section would apply `display: grid; grid-template-columns: repeat(4, 1fr)` to the wrong element.)

Original classes preserved in the class list afterwards so CSS rules still match.

### Decisions surfaced by analysis

1. **Synthesize `<main>`** wrapping all four sections (hero, pillars, phases, cta-band).
2. **Rewrite section first-classes** for pillars and phases (`pillars section`, `phases section section--tint`). Hero and cta-band already have unique first classes.
3. **Lift head-level links** into the top of the template file: 2 font preconnects + Open Sans stylesheet. The overlay engine moves them into `document.head` at runtime.
4. **Extract CSS** of `assets/css/site.css` into `styles/heathrow-proposed-a.css` verbatim. No `url()` refs to rewrite.
5. **No animations engine** — there are no inline `<script>` blocks and no third-party motion libraries referenced. `scripts/heathrow-proposed-a-animations.js` is NOT written; the HEAD probe in delayed.js will 404 silently.
6. **Asset rewriting**: every relative `assets/...` reference in the template, header fragment, footer fragment, and DA cells gets rewritten to absolute `https://paolomoz.github.io/stardust-site/samples/heathrow/assets/...`. DA cells require absolute (Media Bus rule).
7. **Pillar card container/children rule** — each `<a class="pillar-card">` wraps the photo + label + title + copy + "more" link. Slot the inner children (photo, label, title, copy), leave the `<a>` href and the static "Read this section →" span untouched. Per the container-vs-children rule, the `<a>` itself MUST NOT carry `data-slot`.
8. **Phase copy split** — each `.phase__copy` paragraph contains `<strong>…</strong><br />…`. `<br>` is stripped by the DA pipeline normaliser, so split into two slots: `phase-N.headline` (the strong) and `phase-N.detail` (the text after the `<br>`). Keep `<br>` in the template only (not in DA cells).
9. **CTA band id** — the `<section>` is the anchor target for `#have-your-say`. Keep the `id` on the template `<section>`.

### Slot plan

#### Block `hero` (was `section.hero.hero--photo`)
| Slot | Type | Selector |
|---|---|---|
| `hero.image` | image | `.hero__media` |
| `hero.eyebrow` | text | `.label.label--inverse` |
| `hero.title` | text | `.hero__title` |
| `hero.lead` | text | `.hero__lead` |
| `hero.cta-primary` | link | `.hero__meta .btn:not(.btn--inverse)` |
| `hero.cta-secondary` | link | `.hero__meta .btn.btn--inverse` |

#### Block `pillars` (was `section.section` with "About this consultation" eyebrow)
| Slot | Type | Selector |
|---|---|---|
| `pillars.eyebrow` | text | `.section__head .label` |
| `pillars.title` | text | `.section__head h2` |
| `pillars.intro` | text | `.section__head p:not(.label)` |
| `card-1.image` | background-image | `.pillar-card:nth-child(1) .pillar-card__photo` |
| `card-1.label` | text | `.pillar-card:nth-child(1) .pillar-card__label` |
| `card-1.title` | text | `.pillar-card:nth-child(1) .pillar-card__title` |
| `card-1.copy` | text | `.pillar-card:nth-child(1) .pillar-card__copy` |
| `card-2..6.*` | (same shape repeats) | |

#### Block `phased-expansion` (was `section.section.section--tint` with "A phased expansion" eyebrow)
| Slot | Type | Selector |
|---|---|---|
| `phased-expansion.eyebrow` | text | `.section__head .label` |
| `phased-expansion.title` | text | `.section__head h2` |
| `phased-expansion.intro` | text | `.section__head p:not(.label)` |
| `phase-1.label` | text | `.phase:nth-child(1) .phase__label` |
| `phase-1.year` | text | `.phase:nth-child(1) .phase__year` |
| `phase-1.headline` | text | `.phase:nth-child(1) .phase__copy strong` |
| `phase-1.detail` | text | `.phase:nth-child(1) .phase__copy > span` (introduced) |
| `phase-2..4.*` | (same shape repeats) | |

#### Block `cta-band` (was `section.cta-band#have-your-say`)
| Slot | Type | Selector |
|---|---|---|
| `cta.eyebrow` | text | `.cta-band__inner > div:first-child .label` |
| `cta.title` | text | `.cta-band__inner > div:first-child h2` |
| `cta.copy` | text | `.cta-band__inner > div:first-child p:not(.label)` |
| `cta.primary` | link | `.cta-band__inner > div:nth-child(2) .btn:not(.btn--inverse)` |
| `cta.secondary` | link | `.cta-band__inner > div:nth-child(2) .btn.btn--inverse` |

### Strip list

- None. The source has no dev-tool overlays, no debug markup, no Stardust provenance comments to remove.
