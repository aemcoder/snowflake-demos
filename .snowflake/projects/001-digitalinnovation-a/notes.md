# Notes — 001 digitalinnovation-a

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/digitalinnovation/proposed-A.html
- Captured: 2026-05-20
- Single HTML file (1183 lines), no external CSS/JS (all inline).
- Generator: Stardust prototype (per `_provenance` comment in `<head>`).
  - This variant uses `data-section="<slug>"` as the primary CSS selector,
    not class-based selectors.
  - `data-placeholder="<descriptor>"` attribute marks "unsourced content"
    blocks (per the provenance `unsourcedContent` list). Unlike older
    Stardust placeholder conventions, these are NOT separate placeholder
    UIs — they're real authored content with a dotted-border CSS hint
    `[data-placeholder] { border-right: 2px dotted ... }`. We preserve
    these attributes (they're part of the visual design) but treat the
    text as authorable slots.

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
712    <body>
714    <aside data-section="sponsor-band">         ← header fragment
721    <header data-section="site-header">         ← header fragment
743    <section data-section="hero">               ← main / block 1
777    <section data-section="audience-router">    ← main / block 2
808    <section data-section="featured-news">      ← main / block 3
897    <section data-section="topics">             ← main / block 4
973    <section data-section="pull-quote">         ← main / block 5
990    <section data-section="resource-cta">       ← main / block 6
1002   <footer data-section="site-footer">         ← footer fragment
1056   <script> (hero canvas dot grid)
1183   </html>
```

No `<main>` wrapper in source → synthesize one around sections 1-6.

### First-class assignments

Source sections have NO `class` attribute — only `data-section`. The overlay
engine matches via `section[class].first-class`. We add a first class to each
section equal to its `data-section` value, EXCEPT:

| data-section    | First class    | Reason for divergence |
|-----------------|---------------|------------------------|
| sponsor-band    | sponsor-band  | header fragment, no slots |
| site-header     | site-header   | header fragment, no slots |
| hero            | hero          | clean — no `.hero` in CSS |
| audience-router | audience-router | clean |
| featured-news   | featured-news | clean |
| topics          | topics        | clean |
| pull-quote      | **voices**    | CSS has `.pull-quote { grid-column: 5 / span 7 }` — collision |
| resource-cta    | resource-cta  | clean |
| site-footer     | site-footer   | footer fragment, no slots |

The `<section data-section="pull-quote">` becomes `<section class="voices" data-section="pull-quote">`. The CSS still matches via `[data-section="pull-quote"]`.

### Container conversion

- `<aside data-section="sponsor-band">` → header fragment (kept as `<aside>`).
- `<header data-section="site-header">` → header fragment (kept as `<header>`).
- `<footer data-section="site-footer">` → footer fragment (kept as `<footer>`).
- All `<section>` tags stay as `<section>` — no rewrite needed.

### Slot opportunities

#### hero
- `hero-stamp.num` (text) — "01"
- `hero-stamp.label` (text) — "Today's lead · Partner Programs"
- `title` (text) — h1 text
- `lead` (text) — paragraph lead
- `cta-primary` (link) — "Read the brief"
- `cta-secondary` (link) — "All news"
- `toc-label` (text) — "In this issue"
- `toc-1.label`...`toc-5.label` (text), `toc-1.href`...`toc-5.href` (via link slot)

Decision: TOC items can be one `<a data-slot>` each (link slots carry href+text).

#### audience-router
- ISV side:
  - `isv-eyebrow` (text)
  - `isv-title` (text — contains `<em>Azure.</em>` inline; preserve)
  - `isv-lead` (text)
  - `isv-link-1.text/href` × 3 link slots
  - `isv-cta` (link)
- SI side:
  - `si-eyebrow`, `si-title` (text — `<em>modernize.</em>`), `si-lead`
  - `si-link-1` × 3, `si-cta`

Note: `data-placeholder="audience-router-copy"` stays on the two `.half` divs (preserves visual hint).

#### featured-news
- `header-eyebrow`, `title` (h2), `more-link` (text-link)
- 6 editorial items:
  - `item-N.num` (text)
  - `item-N.cat` (text)
  - `item-N.title` (link — wraps the title <a>)
  - `item-N.dek` or `item-N.pull` (text — different items have different bodies)
  - `item-N.meta` (text)
  - Item 1 also has `item-1.thumb` (image)
- Marginalia rail:
  - `marginalia-pick` (link, with quoted "If you read one thing this week..." text)
  - `marginalia-pick-meta` (text)
  - `marginalia-list-1.text/href`, `-2`, `-3`
  - `marginalia-list-1.count`, `-2`, `-3`
  - `marginalia-byline` (text — contains `<strong>` and `<a>`, both preserved)

Note: items 2 and 4 use `<p class="editorial-list__pull">` (italic Lora quote)
instead of `<p class="editorial-list__dek">`. They are DIFFERENT slot types
because the CSS targets the class. To preserve the visual difference, we keep
two separate target elements per item — the rendered body has either `.dek`
OR `.pull` (not both). The template defines the right tag per-item.

#### topics
- `header-eyebrow`, `title`, `more-link`
- 6 tile blocks:
  - `tile-ai.count`, `tile-ai.name` (h3 with inline `<span>` description)
  - `tile-azure.count`, `tile-azure.latest-label`, `tile-azure.latest-title`, `tile-azure.name`
  - `tile-migration.count`, `tile-migration.big-num`, `tile-migration.name`, `tile-migration.delta`
  - `tile-events.count`, `tile-events.big-num`, `tile-events.name`, `tile-events.delta`
  - `tile-partner.count`, `tile-partner.latest-label`, `tile-partner.latest-title`, `tile-partner.name`
  - `tile-apps.count`, `tile-apps.big-num`, `tile-apps.name`, `tile-apps.delta`
- `mosaic-note.label`, `mosaic-note.text`

Inline `<span>` inside h3 is for the description sub-line. Per learnings:
EDS pipeline strips `<span class="...">`. The CSS targets `.tile__name span`
(structural span, no class — survives). BUT: if the slot value carries an
inline `<span>`, the DA cell HTML contains `<span>` — needs verification.
Stripping behavior is for `<span class="...">`. Bare `<span>` may also be
stripped. Safer: structure the h3 with its inline span in the TEMPLATE
(not in DA), and put data-slot on the h3 itself with default value that
includes the span. Wait — that means the text inside `<span>` is content,
not chrome.

Reconsidering: looking at h3 contents:
```html
<h3 class="tile__name">AI<span>Foundry · Copilot · agents</span></h3>
```
Both the leading text "AI" and the trailing span "Foundry..." are CONTENT.
The visual treatment differs (span is smaller / muted via CSS `.tile__name span`).
Per learnings 2026-05-20 "inline content elements belong INSIDE the slot":
put `data-slot` on the `<h3>` itself, value includes `<span>`. BUT the
pipeline strips bare `<span>`. So the span text would survive but the
visual treatment (the span tag) would NOT.

Solution: split into TWO slots — `tile-ai.name` (h3 text only, "AI") and
`tile-ai.subtitle` (the descriptive sub-line, slotted into a `<span>` that
stays static in the template). The `<span>` is template chrome; the text
inside is the slot.

```html
<h3 class="tile__name"><span data-slot="tile-ai.name">AI</span><span data-slot="tile-ai.subtitle">Foundry · Copilot · agents</span></h3>
```

Wait — first `<span>` is a slot wrapper inside the h3. The h3's CSS uses
`.tile__name span` which targets the *second* span (the styled sub-line).
The first `<span data-slot>` wraps the leading text "AI" — its presence
changes CSS: now `.tile__name span` matches BOTH spans. The first would
get the subtitle styling too.

Alternative: put data-slot directly on the h3 using the first text node:
```html
<h3 class="tile__name" data-slot="tile-ai.name">AI<span data-slot="tile-ai.subtitle">Foundry · Copilot · agents</span></h3>
```
That violates container-vs-children — nested `[data-slot]` inside an outer
`[data-slot]`. The outer writeSlot replaces innerHTML, killing the inner.

Right approach: name the h3 slot for the full content, value includes the
`<span>` from DA. Then DA must store `<span>` literally. Per learnings,
bare `<span>` (no class) may survive (it's just a `<span class="...">` 
that gets the class stripped). Let me default to that and verify in
local round-trip. Fallback: use `<em>` or `<strong>` which definitely
survive.

For this run: use `<strong>` as the inline tag with CSS `.tile__name strong`
override. Update inline `<span>` → `<strong>` in template AND extend page
CSS to target `strong` instead of `span`. This is a small inline-tag swap.

Actually simpler: keep the h3 markup verbatim (`<span>` survives in
template — the issue is only in DA cells). The h3 IS the slot. DA cell
stores:
```
AI<span>Foundry · Copilot · agents</span>
```
If the pipeline strips bare `<span>`, the rendered DA->HTML is `AIFoundry...`
losing the visual break. To verify: in this Generate I'll go with TWO slots
(safer): put data-slot on H3 text+span as separate slots using a structural
swap (template uses two `<strong>` or splits the h3 into separate elements).

The simplest, safest: put data-slot on h3 for the title text only ("AI"),
and a separate data-slot on the nested `<span>` for the subtitle. Per
container-vs-children rule, that's still nested data-slot inside outer
data-slot. So we CAN'T slot the h3 itself.

Final decision: slot the H3's content via two slots, h3 NOT slotted:
```html
<h3 class="tile__name" data-slot-skip="composite">
  <span data-slot="tile-ai.name">AI</span>
  <span data-slot="tile-ai.subtitle">Foundry · Copilot · agents</span>
</h3>
```
But now I have two `<span>` siblings — CSS `.tile__name span` matches BOTH.
The first (name span) takes subtitle styling. Need to differentiate.

Cleanest: split via explicit selectors:
```html
<h3 class="tile__name">
  <span class="tile__name-main" data-slot="tile-ai.name">AI</span>
  <span data-slot="tile-ai.subtitle">Foundry · Copilot · agents</span>
</h3>
```
Then CSS `.tile__name span:first-child` overrides to inherit, OR add a
nullifying rule. This is getting invasive.

**Pragmatic plan:** keep source markup verbatim in the template. Put
`data-slot` on the H3 for the WHOLE content. DA cell stores:
`AI<span>Foundry · Copilot · agents</span>`. If `<span>` survives the
pipeline (it's the bare-span case, no class), we're done. If not — fix
in round-trip by swapping `<span>` → semantically appropriate tag (e.g.
restructure with `<br>` line break — though `<br>` is stripped too — or
use `<em>` for the sub-line).

Pre-decision: use TWO slots, put `data-slot` on the H3 content text +
on a span that survives via class. To minimize template surgery, slot
only the h3's main text and the inner span as separate slots WITHOUT
the outer h3 having data-slot. This is the structural-split approach.

For run 001, simplify: slot the H3 (whole content) and verify in round-trip.

#### voices (pull-quote)
- `quote` (text) — the blockquote
- `attr-strong` + `attr-rest` — the figcaption text contains `<strong>`
- `more-link` — "Read all testimonials"
- `sidenote` (text) — "In partners' words"

#### resource-cta
- `eyebrow` (text)
- `title` (h2 text)
- `body` (p text)
- `cta` (link)

### Stripped elements

- `<canvas class="hero-dots">` — stays (decorative, populated by JS)
- `<div class="hero-accent">` — stays (decorative)
- `<div class="edge">` in audience-router — stays (decorative)
- `<div class="shader-conic">`, `<div class="shader-grain">`, `<span class="shader-corner">Live</span>` in AI tile — stay (decorative/static template)

### Head-level resources

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700;800;900&display=swap" rel="stylesheet">
```

Note: source CSS uses `font-family: var(--font)` defined as
`"Lato", system-ui, ...`. The drop-cap and pull-quote rules also reference
`"Lora", Georgia, ...` — but Lora is NOT loaded! Source page will fall back
to Georgia for these. We preserve that behavior (don't add Lora).

### Inline style block

Lines 61–710 (single inline `<style>`). Extract verbatim to `styles/digitalinnovation-a.css`.

### Inline script block

Lines 1056–1180 (hero canvas dot grid animation). Extract to
`scripts/digitalinnovation-a-animations.js`.

### Asset references

All assets are either:
- External absolute URLs (fonts.googleapis.com, digitalinnovation.com image, twitter.com etc.) — keep as-is.
- Root-relative `/stardust-site/...` (internal navigation/links) — these are NOT
  assets; they're navigation links to source-site pages. They'd 404 on EDS but
  that's harmless (links). Best to rewrite to absolute pointing back at
  the source host for visual parity.

Asset strategy: **absolute** (rewrite `/stardust-site/...` → `https://paolomoz.github.io/stardust-site/...`).

## Phase: Generate

- 6 main sections (hero, audience-router, featured-news, topics, voices, resource-cta)
- 107 data-slot markers across the template
- Synthesized `<main>` wrapper (source body had no `<main>`)
- Renamed pull-quote section first-class to `voices` (CSS `.pull-quote { grid-column: 5 / span 7 }` collision)
- Split topic tile h3 inline structure into two named-class spans
  (`tile__name-main` + `tile__name-sub`), each with its own data-slot.
  Updated CSS to target `.tile__name-sub` instead of `.tile__name span`.
  Avoids the bare-`<span>` survival ambiguity (per learnings 2026-05-20).
- Swapped marginalia trending `<span class="count">` to `<strong>` and
  added CSS supplement `.marginalia__list a strong { ... }`. This is
  the standard pattern for inline class hooks that get stripped by the
  pipeline.
- Pull-quote figcaption attribution: kept decorative `<span
  class="pull-quote__divider">` static in template, slotted only the
  inner caption span (`data-slot="attr"`).
- Lift head-level Google Fonts preconnect+stylesheet into the template
  top (substrate auto-lifts to document.head at runtime).
- Inline `<style>` (lines 61-710 → 648-line CSS) and inline `<script>`
  (lines 1056-1180 → 123-line animations JS) extracted verbatim.
- Asset URL rewrite: `/stardust-site/...` → `https://paolomoz.github.io/stardust-site/...` (absolute).

## Phase: Wire

- Lint clean (`npm run lint`).
- Files written:
  - templates/digitalinnovation-a.html
  - fragments/digitalinnovation-a/{header,footer}.html
  - styles/digitalinnovation-a.css
  - scripts/digitalinnovation-a-animations.js
  - drafts/digitalinnovation-a-a.html (via transform-da-to-eds.mjs)

## Phase: Round-trip

Skipped local; went straight to production per orchestrator instructions
(refresh contract).

- Labeled DA version `Before snowflake refresh 001 (digitalinnovation)` created (HTTP 201)
- DA PUT to `/digitalinnovation/a.html` (HTTP 200)
- `git push --force-with-lease origin sd-digitalinnovation-a` (forced update OK)
- Code-bus probes — all 200:
  - `/templates/digitalinnovation-a.html`
  - `/styles/digitalinnovation-a.css`
  - `/fragments/digitalinnovation-a/{header,footer}.html`
  - `/scripts/digitalinnovation-a-animations.js`
  - `/scripts/scripts.js`
- POST preview on `sd-digitalinnovation-a` — HTTP 200
- POST live on `sd-digitalinnovation-a` — HTTP 200
- Playwright verification at production URL:
  - `main.dataset.overlay === "digitalinnovation-a"` ✓
  - 6 sections with classes `[hero, audience-router, featured-news, topics, voices, resource-cta]` ✓
  - `body.classList.contains("appear")` ✓
  - Template meta resolved correctly ✓
  - All sampled slots applied (hero title, ISV title with inline `<em>`,
    audience CTAs, news items + thumb (Media Bus rewrote to optimized
    `./media_<sha>.jpg`), marginalia trending with `<strong>` counts,
    topic tiles with split spans, pull-quote with divider preserved + attr)
  - Console: 0 errors, 1 warning (Lenis CDN 404 — substrate fail-soft;
    cosmetic; not used by this template)
- Side-by-side comparison shows pixel-perfect parity.

## Phase: Reflect

### Branch-level fixes (this run, decided organically)

1. **`pull-quote` section first-class renamed to `voices`** — the source
   uses `data-section="pull-quote"` with no class attribute. CSS targets
   `[data-section="pull-quote"]` for the section AND `.pull-quote` for
   an inner element. Using "pull-quote" as section first-class would
   trip the layout collision documented in learnings.md (heathrow/glossier/aman/lovesac pattern).
   Picked `voices` from the section's `id="voices"` (discriminator hierarchy:
   data-section → id → eyebrow slug → positional).

2. **Topic tile h3 split into two slots with named spans** — source uses
   `<h3 class="tile__name">AI<span>Foundry · Copilot · agents</span></h3>`.
   Targeting the h3 with a single slot risks bare-`<span>` stripping by the
   pipeline (learnings 2026-05-20 explicitly covers `<span class="...">`
   but not bare `<span>`). Defensive split: two named-class spans
   (`tile__name-main` / `tile__name-sub`), each its own slot. CSS updated
   to target `.tile__name-sub` and a no-op `.tile__name-main`.

3. **Marginalia trending count `<span class="count">` → `<strong class="count">`**
   — standard fix per learnings 2026-05-20 for `<span class>` stripping.
   The class is lost on `<strong>` too (markdown round-trip drops classes),
   so I added a CSS supplement `.marginalia__list a strong { ... }` so the
   styling holds without the class attribute.

### Generic findings worth promoting

Nothing surfaced that isn't already in `<SKILL_DIR>/knowledge/learnings.md`.
The three fixes above are all instances of patterns documented there:
- "Inner CSS class repeated as section first-class collides with layout rules"
- "EDS pipeline strips `<span class="...">` from DA cell content"
- Implicitly the bare-`<span>` ambiguity (worth documenting more explicitly)

### Substrate gap

**Bare `<span>` (no class) handling is undocumented in learnings.** The
2026-05-20 entry covers `<span class="...">` explicitly but doesn't state
whether the pipeline keeps or strips a bare `<span>`. I hedged by
restructuring (option 2 in the topic-tile fix). A future iteration could
test this empirically (slot `<h3 data-slot>AI<span>x</span></h3>` and
inspect the rendered DOM) and codify the answer in learnings.

### Things that went smoothly

- Single inline `<style>` and `<script>` — clean extraction.
- All assets externally addressable (paolomoz.github.io is public).
- No font CORS issues (Google Fonts handled in head-link lift).
- `data-section`-based CSS made the template surgery minimal — we mostly
  just added a `class="X"` attribute to each section.
- DA Media Bus correctly optimized the lead-item thumbnail to
  `./media_<sha>.jpg?width=750&format=jpg&optimize=medium`.
- Header/footer fragments straightforward (no inner-`.footer` leak — the
  source uses `[data-section="site-footer"]` selector, not class).

### Timings (rough)

| phase           | duration |
|-----------------|----------|
| capture         | ~2 min   |
| analyze         | ~6 min   |
| generate        | ~25 min  |
| wire            | ~1 min   |
| roundtrip-prod  | ~3 min   |
| reflect         | ~3 min   |

