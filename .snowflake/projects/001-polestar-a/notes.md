# 001 — polestar-a — notes

## Source page

- URL: https://paolomoz.github.io/stardust-site/samples/polestar/proposed-A.html
- Generator: stardust:prototype (no-impeccable mode), v0.2.0
- 481 lines; 290 inline `<style>`, ~190 markup
- Single inline `<style>` block; no external CSS, no external JS
- Provenance/comment block at top of `<head>` (Stardust metadata; preserved)
- 11-token Polestar brand palette, single typeface "Polestar Unica" w/ system fallback
- No `@font-face` rules — uses system fallbacks ("Polestar Unica" not loaded)

## Structural map

### Header boundary
- `<header data-section="header">` — sticky top bar
- Contains brand link + 7-item primary nav + "United States" utility text
- Lines 294–310

### Main sections (six)
| # | data-section    | Inner wrapper class | Notes                                            |
|---|-----------------|---------------------|--------------------------------------------------|
| 1 | hero            | (none on section)   | full-bleed bg-image media, plate w/ h1 + 2 CTAs  |
| 2 | incentive       | .incentive          | 2-col headline + body+legal                      |
| 3 | model-grid      | .modelGrid          | 3 cards (Polestar 4 / 3 / 2)                     |
| 4 | sustainability  | .sus__body          | full-bleed bg-image + 2-col title + sub+CTA      |
| 5 | charging        | .charging           | 3-col: eyebrow + body + CTA                      |
| 6 | newsletter      | .nl                 | 2-col: title + form (email + submit)             |

### Footer boundary
- `<footer data-section="footer">` — 5-col link grid + legal row
- Lines 430–478
- 5 link columns: Explore & buy / Shop / Support / About / Social
- Legal row contains "United States" span + copyright span

## Section first-class strategy

All `<section>`s in the source carry ONLY `data-section="..."` — no
class. The overlay engine matches blocks by `section.className`. So
in the generated template we must give each section a unique first
class derived from `data-section`:

| data-section    | Template first-class |
|-----------------|----------------------|
| hero            | `hero`               |
| incentive       | `incentive`          |
| model-grid      | `model-grid`         |
| sustainability  | `sustainability`     |
| charging        | `charging`           |
| newsletter      | `newsletter`         |

### Collision check (CSS rules vs. section first-class candidates)

- `hero` → no `.hero { ... }` rule (rules are `.hero__media`, `.hero__plate` etc.). Safe.
- `incentive` → `.incentive { display:grid; ... }` — **COLLISION**. Inner wrapper div uses `.incentive`.
- `model-grid` → no `.model-grid` rule (inner is `.modelGrid`). Safe.
- `sustainability` → no `.sustainability` rule. Safe.
- `charging` → `.charging { display:grid; ... }` — **COLLISION**. Inner wrapper div uses `.charging`.
- `newsletter` → no `.newsletter` rule (inner is `.nl`). Safe.

For `incentive` and `charging`: the source's CSS targets the INNER
wrapper div, not the section. As long as the template `<section>`
has class `incentive` and the inner `<div class="incentive">` is
preserved, the rule will match the inner div (which is what the
source page does too). The selector `.incentive` matches both, but
the styles applied are display:grid which doesn't affect the section
visibly because the section has no children other than the wrapper.

Actually wait — if the SECTION gets `display:grid`, the wrapper div
becomes a 1-col grid item. That's fine visually since the section has
exactly one child. But let me think harder: `.incentive { max-width:...; margin: 0 auto; padding: 0 32px; display:grid; grid-template-columns: 1.4fr 1fr; }` applied to BOTH the section and the inner div.

The section then becomes display:grid with 1.4fr 1fr template columns and a single child (the inner div) that occupies the FIRST track only. The inner div is also display:grid with its actual two children. So the visible result: the inner content sits in the first half of the section, with the second half empty. **THIS IS A LAYOUT BUG.**

**Fix:** Rename collision classes to data-section-derived names that don't collide:
- `incentive` → don't put `incentive` as first-class. Use a distinct name. Per learnings.md 2026-05-19 pattern: prefer a slug from a label/eyebrow if one exists. There's no eyebrow here. Options:
  - Use `incentive-band` (descriptive distinct slug)
  - Or use `section` + the data-section attribute selector

Actually the cleaner fix is to use a SLIGHTLY DIFFERENT first-class for the section that's unique and not a CSS rule target. Like `incentive-section` or `incentive-band`. Then the inner div keeps its class `.incentive` and the CSS rule continues to match only it.

| data-section    | Template first-class (refined) | Why                                       |
|-----------------|--------------------------------|-------------------------------------------|
| hero            | `hero`                         | No `.hero` rule                           |
| incentive       | `incentive-band`               | Avoid `.incentive` grid rule collision    |
| model-grid      | `model-grid`                   | No `.model-grid` rule                     |
| sustainability  | `sustainability`               | No `.sustainability` rule                 |
| charging        | `charging-strip`               | Avoid `.charging` grid rule collision     |
| newsletter      | `newsletter`                   | No `.newsletter` rule                     |

DA block names must match these template first-classes exactly. So the
DA blocks will be `hero`, `incentive-band`, `model-grid`, `sustainability`, `charging-strip`, `newsletter`.

## Slots inventory

### Header (static fragment — no slots)
Static; nav + brand are stable.

### Hero (block `hero`)
- `hero.bg` — background-image on `.hero__media` div
- `hero.title` — h1 text
- `hero.cta-primary` — `<a class="btn--primary">` (label + href)
- `hero.cta-tertiary` — `<a class="btn--tertiary">` (label + href)

Wait, slot names are scoped to block already. So just:
- `bg` (image), `title` (text), `cta-primary` (link), `cta-tertiary` (link)

### Incentive-band (block `incentive-band`)
- `head` — h2 (contains a `<sup>¹</sup>` — sup is NOT on preserve list; will be stripped on round-trip)
  - **Mitigation:** put the `<sup>¹</sup>` in the template as static content, slot only the leading text. But the leading text includes the dollar amount which is the author-editable bit. Best fix: keep `<sup>` in the template HTML AND use a slot for the heading WITHOUT the `<sup>` — but then how is the sup attached?

  Actually re-read methodology: preserve list = `<strong>`, `<em>`, `<a>`, `<img>`, `<picture>`, `<h1>`-`<h6>`, `<p>`. `<sup>` is NOT on the list.

  Option A: Split into two slots — `head` for the prefix text "Not the status quo. Tesla owners receive $14,000.", and let the `<sup>¹</sup>` stay static in the template after the slot. The `<sup>¹</sup>` references the footnote which is in the next paragraph; this is reasonable since the footnote marker doesn't change.

  Option B: Make the sup the static part embedded in the template, slot only the parts that change. E.g. template has:
  ```html
  <h2 class="incentive__head"><span data-slot="head">Not the status quo. Tesla owners receive $14,000.</span><sup>¹</sup></h2>
  ```
  But `<span>` wrapping the slot is also problematic if data-slot writes the whole innerHTML… wait, `data-slot` IS on the span itself, so the engine writes to the span's innerHTML. The slot is the span. The outer h2 wraps it + the sup. This should work.

  But: span survives because it has `data-slot` (per learnings.md: "spans with data-slot survive — substrate's writeSlot writes text into it before DA serialization ever happens"). That's about template spans which is exactly this case. ✓

  Let me re-check: the issue from learnings.md is `<span class="...">` in DA cell content getting stripped. Template spans with data-slot don't go through DA at all — they're in the template HTML file served by code bus, not in DA. So no stripping happens. The slot value (just "Not the status quo. Tesla owners receive $14,000.") goes into the span via innerHTML at runtime. ✓

  **Decision: Use Option B** — template has `<h2 class="incentive__head"><span data-slot="head">prefix</span><sup>¹</sup></h2>`. The `<sup>¹</sup>` is static template content.

- `body` — p text (incentive body)
- `foot` — p text (footnote)

### Model-grid (block `model-grid`)
3 cards:
- `card-1.bg` (background-image), `card-1.title`, `card-1.cta` (link)
- `card-2.bg`, `card-2.title`, `card-2.cta`
- `card-3.bg`, `card-3.title`, `card-3.cta`

### Sustainability (block `sustainability`)
- `bg` — background-image on `.sus__media`
- `title` — h2
- `sub` — p
- `cta` — link

### Charging-strip (block `charging-strip`)
- `eyebrow` — span text. NOTE: span has class `.eyebrow`. The
  span is in the TEMPLATE (not in DA). Slot writes innerHTML.
  ✓ (template spans with data-slot are fine)
- `body` — p text
- `cta` — link

### Newsletter (block `newsletter`)
- `title` — h2
- `submit` — submit button text. The button is `<button class="btn btn--primary" type="submit">Sign up</button>`. To slot the label, use `<button data-slot="submit">Sign up</button>`.
- (skip the input placeholder — attribute slots not yet supported)

### Footer (static fragment — no slots)
Static; 5-col link grid + legal text are stable.

## Container-vs-children rule check

Hero `.hero__plate` wraps an h1 and a `<div class="hero__ctas">` with
two CTAs. No outer slot — just slot h1 and the two CTAs individually. ✓

Cards (`.card`): the article wraps `.card__media`, h3, and `<a class="card__cta">`. No outer slot on the article. Slot the inner three. ✓

No nested `[data-slot]` collisions.

## Sup handling

`<sup>` is NOT on the pipeline preserve list. Strategy: keep `<sup>¹</sup>` as static template content in the h2, slot only the inner text via a `<span data-slot="head">` wrapper. The footnote symbol doesn't change between authoring sessions; only the dollar amount and the "Tesla owners" framing change.

## Span handling (learnings 2026-05-20)

Template spans with `data-slot` are fine — they don't pass through DA cell content. The new rule applies to spans IN DA cells used as styling hooks. This page has no such pattern (no `<del>`/`<span class>` combos in slot content). The `.eyebrow` span is in the TEMPLATE, not in DA — safe.

## Asset URLs (already absolute)

All background-image URLs in source use absolute `https://www.polestar.com/...`. No rewriting needed.

## Page CSS extraction notes

- Reset rules (`*{box-sizing}`, `html,body{margin:0}` etc.) — these go in /styles/polestar-a.css. They affect the page only when the template is active, so they don't leak globally.
- BUT: the source's `body{...}` rule sets background, color, font. These will apply to ALL EDS pages once we deploy. To scope: don't touch body in page CSS. Use `:root` for tokens but apply the body styles using `body[data-template="polestar-a"]` or simply leave them — substrate's styles.css does NOT set background/color/font, so this is fine.

  Actually substrate's styles.css sets nothing of these. The page CSS will set body{} unconditionally. This is OK for a single demo page but unclean. Per Stardust-A precedent (prior refresh), the body{} was kept — and the page worked. Keep it.

- `header[data-section="header"]` and `footer[data-section="footer"]` are SCOPED — they only match the source's header/footer. In our converted page, the source header tag is INSIDE the EDS header landmark (nested), and the data-section attribute is preserved. So these rules will match. ✓

- The substrate's `body > header, body > footer { padding: 0; margin: 0 }` resets the OUTER EDS landmark — no leak into the inner source header/footer. ✓

- Footer visibility bug: `.footer { display:grid }` is matched by both
  the inner nav div AND the EDS block wrapper `<div class="footer block">`. The fix is to scope the rule to `footer[data-section="footer"] > .footer` so only the fragment-inner nav div matches. AND add `visibility: visible` because the substrate's `footer > .footer { visibility: hidden }` will also match the fragment-inner div.

## Decisions summary

- Template name: `polestar-a`
- 6 blocks: `hero`, `incentive-band`, `model-grid`, `sustainability`, `charging-strip`, `newsletter`
- Slot count estimate: 4 + 4 + 9 + 4 + 3 + 2 = 26 slots (excludes metadata; close to prior run's 27)
- All image slots use background-image writer (no `<img>` tags in source)
- Page CSS: extract `<style>` verbatim, then patch:
  - `.incentive`, `.charging` references: keep as-is (they target the inner div only since the section doesn't have those classes anymore in the template)
  - `.footer` references: scope to `footer[data-section="footer"] > .footer`, add visibility:visible
- Static header fragment, static footer fragment
- No animations.js needed (page has no inline `<script>`)
- DA metadata block: template=polestar-a, title="Polestar – Electric cars | Polestar US"

## Reflect (Phase 6)

### Outcomes
- 6 sections, 25 slots — all rendered correctly in production.
- Production URL HTTP 200 on both preview and live admin APIs.
- Browser verification: `main.dataset.overlay === "polestar-a"`, all 6
  section first-classes present, 3 model cards, 5 footer nav columns,
  hero title + sup¹ rendered, charging-strip eyebrow + body + CTA all
  visible, newsletter form intact.
- One cosmetic console error: 404 on
  `/scripts/polestar-a-animations.js` (template has no animation
  engine — substrate v1.0.4's HEAD probe still surfaces the 404 as a
  network log entry; pre-existing residual per learnings 2026-05-18).

### What substrate v1.0.4 picked up correctly
- `body > header, body > footer { padding: 0; margin: 0 }` — no
  generic page padding leaks into the EDS landmarks (page CSS sets
  `section[data-section] { padding: ... }` so without this fix the
  EDS landmark `<header>`/`<footer>` would inherit). [verified]
- `writeSlot()` heading-in-heading unwrap — incentive-band uses
  `<span data-slot>` inside h2, so this didn't trigger; but the
  generic protection is still in scripts.js for future runs.
- `writeSlot()` background-image-before-`<a>` dispatch guard — all
  six background-image slots (hero.bg, 3× card-N.bg, sustainability.bg)
  are on `<div role="img">`, NOT `<a>`, so the guard isn't strictly
  required for this page. Engine still applied them correctly.

### Branch-level fix (not yet substrate)
- `footer > .footer { visibility: hidden }` in substrate styles.css
  leaks into the fragment-inner `<div class="footer">` (a direct
  child of the fragment's `<footer>` root). Page CSS adds
  `visibility:visible` on `footer[data-section="footer"] > .footer`
  to counter. Same pattern observed in the prior 2026-05-19 polestar-a
  run. **Substrate gap candidate** — see learnings.md 2026-05-19 entry
  titled "substrate footer > .footer { visibility: hidden } leaks
  into fragment inner divs"; recommended substrate fix is to tighten
  to `footer > .footer.block { visibility: hidden }` so the `.block`
  qualifier limits it to EDS block wrappers only.

### Span-stripping rule (learnings.md 2026-05-20)
- **Not relevant to this page** — no `<span class="...">` patterns
  in DA cell content (no sale prices, badges, callouts, or other
  inline span-with-class styling hooks). The only spans in this run
  are template-side with `data-slot` (the charging-strip eyebrow,
  the incentive-band sup-prefix wrapper) — those don't pass through
  the DA pipeline, so they're unaffected by the strip rule.

### Sup-handling pattern (new wrinkle for the methodology)
- `<sup>¹</sup>` is NOT on the EDS pipeline preserve list (per
  learnings.md 2026-05-19 inline-stripping entry — preserve list is
  `<strong>`, `<em>`, `<a>`, `<img>`, `<picture>`, `<h*>`, `<p>`).
- Strategy used: keep `<sup>¹</sup>` as STATIC template content
  inside the h2, with a `<span data-slot="head">` wrapping the
  authorable text part. The footnote marker is presentation, not
  content the author edits.
- This is a generalisable pattern for any "static suffix/prefix on a
  heading" case (asterisks, dagger marks, trademark/(R) symbols).
  Worth promoting to methodology if it recurs.

