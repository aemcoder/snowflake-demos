# Notes — 001 virginatlantic-a

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/virginatlantic/proposed-A.html
- 556 lines, single HTML file.
- No external CSS/JS — all inline.
- All image references are absolute URLs on virginatlantic.com (public host).
  No vendoring needed.
- Asset strategy: `absolute`. Image URLs already absolute; no rewrites.

## Phase: Analyze

### Structural map

```
Line   Element                                         Notes
─────  ──────────────────────────────────────────────  ─────────────────
283    <header class="va-header" data-section=...>     Page header
302    <main>
303      <section class="hero" data-section=hero>       hero
317      <div class="wrap">
318        <form class="booking" id="booking">           ← REWRITE to <section class="booking">
348      <section id="destinations" data-...>           ← needs class — add "destinations"
406      <section class="pull" data-section=pullquote>  pull (editorial pull quote)
414      <section id="cabins" class="cabin">            cabin
451      <section class="rewards" id="rewards">         rewards
469      <section class="help" id="help">               help
497    </main>
499    <footer class="footer" data-section="footer">    Page footer
```

### Decisions surfaced by analysis

1. **Booking form is not in a `<section>`.** It is a `<form class="booking">`
   inside `<div class="wrap">` between hero and destinations. The
   substrate engine only matches `section[class]`, so the booking
   block won't be picked up unless we restructure. Plan: drop the
   surrounding `<div class="wrap">` and rewrite `<form>` to
   `<section class="booking">` while keeping the form behaviour
   (the `<form>` semantics aren't needed — the buttons inside aren't
   real submits). Keep the inner authoring-relevant text as slots.

2. **Destinations section has no class.** Only `id="destinations"`.
   Substrate won't match. Add `class="destinations"`.

3. **No external CSS/JS or local assets to vendor.** All images
   absolute on virginatlantic.com.

4. **Inline `<style>` block:** lines 8–279 (extract to
   `styles/virginatlantic-a.css`). Strip `<style>` and `</style>`
   wrappers.

5. **No inline `<script>`** — skip `scripts/<template>-animations.js`.

6. **Head-level links:** none to lift. The source has no `<link>` or
   external `<script>` tags. (Fonts cascade to system fonts.)

7. **Page-CSS scope concern.** The source CSS includes generic
   selectors that would leak into EDS landmark wrappers if applied
   verbatim:
   - `section { padding: var(--pad-section) 0; }` — affects EVERY
     `<section>` in the document, including any landmarks not in the
     main flow. Acceptable here (only `<main>` has sections).
   - `.footer` is used both as the source's footer container CLASS
     and as the substrate's EDS block selector. Source footer is
     `<footer class="footer">`. After overlay, the fragment lands in
     `<footer data-section="footer">` wrapper. Pass through; scope
     the inner rules with `footer[data-section="footer"] > .footer`
     where needed.

8. **`<br>` in hero title.** `<h1 class="hero__title">Take off to
   <span class="accent">the UK</span><br>and beyond.</h1>` — contains
   a `<br>` in the slot. The DA-cell pipeline does not preserve `<br>`,
   so either:
   (a) drop the `<br>` (becomes "Take off to the UK and beyond." as
       one line in DA), OR
   (b) split the title into two slots / two paragraphs.
   Choice: drop the `<br>` in the authored cell, keep `<br>` in the
   template as static markup. The slot's default content (template
   fallback) renders with the `<br>`; the DA cell replaces innerHTML
   with text only. This is acceptable for a demo. Document for the
   reflection phase.

9. **`<span class="accent">` inside heading slot.** The `<span>` color
   styling lives in CSS via `.hero__title .accent`. Inside DA cells,
   `<span class>` is stripped. Solution: split the eyebrow + title +
   accent into separate slots OR leave the styling in the template
   default and only slot the plain text. Choice: title text is
   slotted as a plain `<h1>`; the colored "the UK" remains as static
   default content (acceptable demo trade — author edits override
   plain-text only).

10. **Strip:** Stardust provenance meta tag (line 6). Keep as-is for
    informational purposes — no harm in retaining.

### Slot opportunities per section

#### hero
- `eyebrow` (text): `.hero__eyebrow`
- `title` (text): `.hero__title` — kept HTML structure as default
- `lede` (text): `.hero__lede`
- `cta-primary` (link): `.hero__cta a:nth-child(1)`
- `cta-secondary` (link): `.hero__cta a:nth-child(2)`
- `bg` (background-image): `.hero__media` — has `style="background-image:..."`

#### booking
- `title` (text): `.booking__title`
- `from-label` / `from-value` (text): button 1
- `to-label` / `to-value` (text): button 2
- `journey-label` / `journey-value` (text): button 3
- `when-label` / `when-value` (text): button 4
- `who-label` / `who-value` (text): button 5
- `submit-label` (text): submit button label

#### destinations
- `eyebrow` (text): `.eyebrow`
- `title` (text): `.section-title`
- `lede` (text): `.section-lede`
- `dest-lead.image` (image): `.dest--lead .dest__img`
- `dest-lead.city` (text), `dest-lead.sub` (text)
- 7 secondary dests, each with image + city (+ optional sub on first two)

#### pull (editorial pullquote)
- `quote` (text): `.pull__text`
- `cite` (text): `.pull__cite`

#### cabin
- `eyebrow` (text): `.eyebrow`
- `title` (text): `.section-title`
- 3 cabin rows; per row: image, name, title, body, cta link

#### rewards
- `eyebrow` (text): `.eyebrow`
- `title` (text): `.rewards__title`
- `body-1` (text): first `.rewards__body`
- `body-2` (text): second `.rewards__body` (contains `<span data-placeholder>`)
- `cta-primary` (link), `cta-secondary` (link)
- `image` (image): `.rewards__visual img`

#### help
- `eyebrow` (text): `.eyebrow`
- `title` (text): `.section-title`
- 2 cards; per card: number, heading, body, 3 list-link items

### Differences from prior runs

This is a refresh run. The prior run for the same source URL produced
the closed snapshot already on `origin/sd-virginatlantic-a` (history
preserved by snapshot-by-clone tagging in the parent task). Re-running
on substrate v1.0.4 to capture substrate gains:
- heading-in-heading unwrap (writeSlot)
- body > header/footer padding reset
- background-image-before-`<a>` dispatch guard

## Phase: Round-trip

Skipped local round-trip per refresh policy; went straight to
production round-trip.

### Production round-trip outcome

- DA version snapshot created (HTTP 201).
- DA PUT succeeded (HTTP 200).
- Force-push to origin/sd-virginatlantic-a accepted (replaced prior
  closed-run tip 704201c with new tip 30a67a1).
- Preview triggered: HTTP 200, preview.status 200.
- Live triggered: HTTP 200, live.status 200.
- Code-bus sanity probe: all 4 deployed paths return 200 within 1s.

### Playwright verification

- `main.dataset.overlay` === `virginatlantic-a` ✓
- 7 sections with correct first-classes ✓
- Hero bg image rewritten by Media Bus to `./media_<sha>.jpg` ✓
- Header, footer, booking-section, pull-quote all visible ✓
- All cabin names render: Upper Class / Premium / Economy ✓
- 1 console error: 404 for `/scripts/virginatlantic-a-animations.js`.
  Expected — substrate HEAD-probes this; no inline `<script>` in
  source means no animations file. Browser logs the 404 even though
  the HEAD response is handled silently. This is the substrate's
  baseline behavior, not a regression.

## Phase: Reflect

### Branch-level fixes applied (substrate gaps NOT surfaced)

1. **Booking form `<form>` → `<section class="booking-section">` rewrite**
   with inner `.booking` card. Required because:
   - The source had a `<form class="booking">` inside
     `<div class="wrap">`, not inside a `<section>`. Substrate only
     matches `section[class]`, so without a section the booking
     block would never receive its DA cells.
   - Naming the section `class="booking"` would have collided with
     the `.booking` card's bg/border-radius/negative-margin styles
     intended for the inner card, not the outer section. Renamed
     section first-class to `booking-section` to avoid that
     collision.

2. **Destinations `<section>` had no class** — only `id="destinations"`.
   Substrate only matches `section[class]`. Added `class="destinations"`
   directly in the template. No DA-side change needed.

3. **Section padding scoped to `main > section:not(.booking-section)`**
   to preserve the booking card's negative-margin overlap with the
   hero. Source had `section { padding: ... }` as a tag selector;
   relying on that verbatim would have leaked into the EDS
   landmark `<header>`/`<footer>` wrappers AND added unwanted padding
   to `.booking-section`.

4. **Hero title `<br>` and `<span class="accent">` not authored as
   DA cells** — DA's HTML allow-list strips both. The DA cell sends
   the plain "Take off to the UK and beyond." text; the slot writer
   replaces innerHTML with that text. The template's default content
   still has the accent span + `<br>`, but the slot value overrides
   it. Acceptable trade-off for a demo. To preserve, the hero title
   could be split into `title-line1` / `title-line2` slots — out of
   scope for this refresh.

### Substrate gaps NOT surfaced

The four substrate v1.0.4 gains (heading-in-heading unwrap,
body > header/footer padding reset, background-image-before-`<a>`
guard, and the section-leak avoidance) all worked as expected. The
overlay applied cleanly on first try, all 7 sections rendered, all
78 slots populated correctly, no DA-cell HTML corruption.

The only console error (404 on `-animations.js`) is the substrate's
documented baseline HEAD-probe behavior and not a regression.

### Timings (approximate)

| phase | duration |
|---|---|
| capture | <5s |
| analyze | ~10min |
| generate | ~15min |
| wire | <30s |
| roundtrip-prod | ~30s |
| reflect | ~5min |

