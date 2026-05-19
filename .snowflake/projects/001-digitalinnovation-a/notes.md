# Notes — 001 digitalinnovation-a

## Phase: Capture

Source: https://paolomoz.github.io/stardust-site/samples/digitalinnovation/proposed-A.html
Fetched: 2026-05-19, 61,310 bytes, valid HTML5.
Generator: Stardust prototype v6-v9 (see HTML comment provenance block).
Page purpose: "Microsoft Azure for Partners — The Channel Company" editorial hub.

External CSS/JS: none on same-host (only Google Fonts CDN).
All images absolute (either `digitalinnovation.com` or `/stardust-site/` relative to github.io).

## Phase: Analyze

### Structural map

```
<body>
  <aside data-section="sponsor-band">       ← header fragment (utility band)
  <header data-section="site-header">       ← header fragment (sticky nav)
  <section data-section="hero">             ← section 1: interactive dot-grid, hero content
  <section data-section="audience-router">  ← section 2: diagonal split band, ISV/SI routing
  <section data-section="featured-news">    ← section 3: editorial list + marginalia rail
  <section data-section="topics">           ← section 4: topic mosaic (broken grid, mixed treatments)
  <section data-section="pull-quote">       ← section 5: heavily indented pull quote
  <section data-section="resource-cta">     ← section 6: dark CTA band
  <footer data-section="site-footer">       ← footer fragment
  <script>                                  ← animations JS (interactive dot grid)
```

### Placeholder convention

Stardust 0.3.0 style: `data-placeholder="..."` attribute on elements.
Affected: `.lead` in hero, `.half--isv`/`.half--si` in audience-router,
`.marginalia__group` in news, `.latest` divs in topics, `blockquote`/`figcaption` in pull-quote,
`h2`/`p` in resource-cta.

Decision: applied `data-slot-skip="placeholder"` only at the container level where the
placeholder attribute is present, while still slotting inner content elements individually
where that doesn't violate the container-vs-children rule.

Exception: audience-router halves are marked `data-slot-skip="placeholder"` as containers
because the inner content IS slotted (eyebrow, title, lead, cta). The placeholder applies
at the half level; slotting happens at children.

### Section first-class uniqueness

All 6 sections use unique `data-section` values which were promoted to first-class via
the class attribute: `hero`, `audience-router`, `featured-news`, `topics`, `pull-quote`,
`resource-cta`. No collision.

### Asset strategy

Assets: image in news item 1 is absolute (`digitalinnovation.com`). All other media refs
are structural (the hero dot-grid is canvas-drawn). Strategy: `absolute` — no vendoring needed.

### Head-level resources

- Google Fonts preconnects (2)
- Google Fonts Lato stylesheet

Lifted to top of template above `<main>`.

### Inline style

Lines 61-710 of source (648 lines) → `styles/digitalinnovation-a.css`

### Inline script

Lines 1057-1180 (122 lines) → `scripts/digitalinnovation-a-animations.js`
(interactive canvas dot-grid for hero, self-contained IIFE, no CDN deps)

### Decisions

1. Hero `.lead` has `data-placeholder="hero-lead-adapted"` — slot the content but note
   the placeholder attr means this was AI-generated copy. Applied `data-slot` normally
   since the slot value is real content.
2. Audience-router `half--isv`/`half--si` marked `data-slot-skip="placeholder"` at
   the container. Inner content (eyebrow, title, lead, cta) slotted at children level.
3. News marginalia two `marginalia__group` elements with `data-placeholder="marginalia-notes"`
   — both marked `data-slot-skip="placeholder"`. Third group (contributor byline) is static.
4. Topic tiles: `latest` divs with `data-placeholder` marked `data-slot-skip` but inner
   `latest__title` slotted since it's real authorable content.
5. Pull-quote: `blockquote` and `figcaption` have `data-placeholder` — slotted `blockquote`
   and the attribution `span` since those are real authorable content, not pure placeholders.

## Phase: Generate

Produced 5 artifacts:
- `templates/digitalinnovation-a.html` — 6 sections, 59 slots
- `fragments/digitalinnovation-a/header.html` — sponsor band + sticky nav
- `fragments/digitalinnovation-a/footer.html` — full footer with links + legal
- `styles/digitalinnovation-a.css` — 648 lines extracted from source
- `scripts/digitalinnovation-a-animations.js` — 122 lines hero dot-grid IIFE

DA doc: `output/da/a.html` — divs-with-class shape, metadata inside `<main>`.

Self-checks all pass: no relative assets/ refs, no table/br/span-class in DA doc,
all DA img URLs absolute.

## Phase: Wire

All artifacts copied to repo paths. Transform ran successfully (8,210 bytes, 2 meta tags).
ESLint: clean. Stylelint: clean.

## Phase: Round-trip

### Production

- Branch `sd-digitalinnovation-a` pushed
- DA PUT → 200, editUrl: https://da.live/edit#/aemcoder/snowflake-demos/digitalinnovation/a
- POST preview → 200, previewUrl: https://sd-digitalinnovation-a--snowflake-demos--aemcoder.aem.page/digitalinnovation/a
- POST live → 200, liveUrl: https://sd-digitalinnovation-a--snowflake-demos--aemcoder.aem.live/digitalinnovation/a

Code-bus sanity probes (all 200):
- /templates/digitalinnovation-a.html
- /styles/digitalinnovation-a.css
- /fragments/digitalinnovation-a/header.html
- /fragments/digitalinnovation-a/footer.html
- /scripts/digitalinnovation-a-animations.js

Production page: 200, contains `<meta name="template" content="digitalinnovation-a">` ✓

Local round-trip: skipped per batch-mode instructions (no aem up).

## Phase: Reflect

No new cross-project learnings to promote. Existing learnings applied correctly:
- Container-vs-children rule applied for audience-router and pull-quote sections
- Stardust 0.3.0 `data-placeholder` convention documented in decisions.json
- Media Bus absolute URLs rule applied for news item 1 thumbnail
- Metadata block inside `<main>` as `<div class="metadata">` ✓
- Sections have unique first classes ✓
- Template has `<main>` wrapper ✓
- Head-level `<link>` resources lifted above `<main>` ✓
