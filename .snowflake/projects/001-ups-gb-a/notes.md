# Notes — 001 ups-gb-a

## Phase: Capture

- Source URL: https://paolomoz.github.io/stardust-site/samples/ups-gb/proposed-A.html
- Fetched 1068 lines into `input/index.html`.
- Generator: Stardust 0.3.0 (per provenance comment).
- Page variant: "A — tool-first home (the tracking strip *is* the hero)".
- No external CSS/JS files referenced; no Google Fonts; all CSS is inline `<style>`.

## Phase: Analyze

### Structural map

```
Line   Element
-----  ----------------------------------------------------------
2      <html lang="en-GB">
3-554  <head> (incl. inline <style> lines 40-554)
556    <body>
557    <a class="skip" href="#main">  ← skip link inside header fragment
562    <header class="site-header" data-section="header">         ← header start
   565   utility-bar
   597   alert-shell (details/summary collapsible)
   630   primary-nav (logo + global-nav + nav-actions)
652    </header>
654    <main id="main">
659      <section class="tracking-hero" data-section="tracking-hero">     S1
752      <section class="band band-surface" data-section="regulations-cross-promo">  S2
786      <section class="band" data-section="marketing-row-asia">         S3
808      <section class="band band-surface app-band" data-section="marketing-row-app"> S4
822      <section class="band band-deep" data-section="digital-edge">     S5
869      <section class="band" data-section="services-case-studies">      S6
906      <section class="lfc-strip" data-section="lfc-sponsorship">       S7
926      <section class="band band-surface" data-section="quick-links">   S8
989    </main>
994    <footer class="site-footer" data-section="footer">                 ← footer start
1049   </footer>
1054   <aside class="cookie-band" data-section="cookie-consent-band">     ← INSIDE footer fragment
1067   </body>
```

### Boundary decisions

- Header fragment: `<a class="skip">` + `<header class="site-header">` (lines 557-652).
- Footer fragment: `<footer class="site-footer">` + `<aside class="cookie-band">` (lines 994-1065). Per methodology, "everything from `</main>` end to `</body>` (minus scripts)" — so the cookie-band aside is part of the footer fragment.
- Template main: synthesize `<main>` containing the 8 sections (S1-S8).

### First-class collisions and discriminator strategy

`data-section` slugs are present on every section (Stardust 0.3.0 convention). Multiple sections share the first class `band`:

| Section          | Source first class | Has CSS layout rule? | Rename first class to (kept after as 2nd class) |
|------------------|--------------------|----------------------|------------------------------------------------|
| S1               | `tracking-hero`    | yes (layout/visual)  | `tracking-hero` (already unique AND matches data-section, OK as-is) |
| S2               | `band band-surface`| `.band` has padding only — visual, not layout | `regulations-cross-promo band band-surface` |
| S3               | `band`             | yes                  | `marketing-row-asia band` |
| S4               | `band band-surface app-band` | yes (multiple)  | `marketing-row-app band band-surface app-band` |
| S5               | `band band-deep`   | yes                  | `digital-edge band band-deep` |
| S6               | `band`             | yes                  | `services-case-studies band` |
| S7               | `lfc-strip`        | yes (10 CSS hits, layout grid) | `lfc-sponsorship lfc-strip` |
| S8               | `band band-surface`| yes                  | `quick-links band band-surface` |

This matches the methodology rule about pre-pending the `data-section` slug as the discriminator while keeping original classes for CSS continuity.

S1 (tracking-hero) needs a careful look: `tracking-hero` is unique among sections, but `.tracking-hero` CSS rule sets PADDING (line 241), not display/grid. Padding is visual not layout, so no collision risk per the strict layout-collision rule (display/grid/flex/width/height/visibility). Keeping it as the first class is fine.

S7 (lfc-strip): the source's `.lfc-strip .row` is `display: grid` with custom column layout. That layout rule applies via the descendant `.row` selector, not via the section element itself. The `.lfc-strip` rule at line 474 is `padding/background-color/color` — visual only. So `lfc-strip` as first class is OK on layout grounds, but I'm still renaming to `lfc-sponsorship` for consistency with the data-section convention across the rest of the page.

### Slots per section (planned)

#### S1 — tracking-hero (23 slots)

- `eyebrow` — `.hero-eyebrow` (text "Self-service")
- `title-track`, `title-quote`, `title-ship`, `title-billing` — the 4 `<span class="tab-title">` inside `.hero-h1`
- `sub` — `.hero-sub` (contains `<sup>®</sup>` mid-sentence — slot on the `<p>` itself, sup inside)
- `tab-label-track`, `tab-label-quote`, `tab-label-ship`, `tab-label-billing` — 4 `<label class="tab-label">`
- `field-label-track`, `field-label-quote`, `field-label-ship`, `field-label-billing` — 4 `<label class="field-label">` (track one contains `<sup>®</sup>` — slot on label, sup inside)
- `cta-track`, `cta-quote`, `cta-ship`, `cta-billing` — 4 submit buttons
- `help-track`, `help-quote`, `help-ship`, `help-billing` — 4 `.hero-help` `<p>` (each contains an `<a>` — the `<p>` is the slot, anchor inside)
- `photo` — the `<img>` inside `<figure class="hero-photo">` (image slot)

Note: the input radios, hidden form fields, and form action URLs stay static.

#### S2 — regulations-cross-promo (15 slots)

- `eyebrow`, `title`, `lede` for the band header
- For each of 3 cards (card-1, card-2, card-3): `eyebrow` (card-eyebrow), `title` (h3), `body` (p), `cta` (span.card-cta with arrow)

The wrapping `<a class="card" href>` stays STATIC (container-vs-children rule).

#### S3 — marketing-row-asia (6 slots)

- `image`, `eyebrow`, `title`, `lede`, `cta-primary` (link slot, .btn), `cta-secondary` (link slot, .text-link)

#### S4 — marketing-row-app (4 slots)

- `eyebrow`, `title`, `lede`, `cta` (link slot)

#### S5 — digital-edge (13 slots)

- `eyebrow`, `title` for band header
- For each of 3 features (feature-1, feature-2, feature-3): `icon` (img slot), `title`, `body`
- `cta-primary` (link slot, Log In), `cta-secondary` (link slot, text-link-on-dark)

The `.label` inside band-header has inline `style="color: var(--color-primary)"` — keep it (slot the `<p>` text only).

#### S6 — services-case-studies (12 slots)

- `eyebrow`, `title` for band header
- For each of 2 cases (case-1, case-2): `image`, `eyebrow`, `title`, `body`, `cta` (the span.case-cta with arrow)

The wrapping `<a class="case-card" href>` stays STATIC.

#### S7 — lfc-sponsorship (4 slots)

- `image`, `title`, `body`, `cta` (link slot — the partnership link)

#### S8 — quick-links (6 slots)

- `eyebrow`, `title` for band header
- 4 column titles (h3): `col-1.title`, `col-2.title`, `col-3.title`, `col-4.title`

Decision: quick-links link items (~26 `<a>` elements across 4 columns) stay STATIC. They're navigational, change infrequently, and slotting each one would make the DA doc unwieldy without meaningful authoring value for this demo. If a future iteration needs them authorable, each `<a>` becomes its own link slot.

### Head-level resources to lift

- None. Page uses only Roboto/system fonts via CSS `font-family` stack. No `<link>` elements in `<head>`. No Google Fonts.

### Inline `<style>` blocks

- Lines 40-554 (one block).

### Inline `<script>` blocks

- None. Page is pure HTML+CSS with no JS interactivity (tabs are CSS-only via hidden radio + sibling selectors).

### Asset references

All `<img>` and CSS asset URLs are absolute (`https://www.ups.com/...`, `https://assets.ups.com/...`). No relative paths. No rewriting needed for template/fragment HTML.

DA cells will use the same absolute URLs — Media Bus can fetch them publicly (UPS hotlink protection is noted in the provenance comment but the demo's source page already references these URLs successfully, so fetch should work).

### Strip list

Nothing dev-tool-marked. The stardust provenance comment in `<head>` is the only generator artefact; keeping it doesn't hurt because the comment is stripped from the template body anyway.

### Cookie-band placement

The `<aside class="cookie-band">` after `</footer>` is part of the footer fragment per methodology. Static content. Its visible CTAs (Cookie Settings, Essential Cookies Only, Accept All Cookies) stay as static template text — these are functional cookie-consent UI, not content the author should re-word.

### Decisions surfaced

1. Synthesize `<main>` wrapping the 8 sections in the template file.
2. For all 7 sections that share the `band` first class (or have a CSS layout/visual rule on the first class), prepend the `data-section` slug as the section's new first class. Keep original classes after.
3. `tracking-hero` section keeps its first class but uses scoped class+slot naming consistent with the rest.
4. The `<sup>®</sup>` inline markers in hero-sub and the track-tab field label go INSIDE the slot value per the 2026-05-20 inline-content learning.
5. Cards (.card and .case-card) wrap multiple authorable children in `<a>` — slot the children individually, leave the `<a href>` static.
6. Quick-links column link items remain static for this demo.
7. No animation engine — no `scripts/ups-gb-a-animations.js` produced.

## Phase: Wire

- Copied template, header/footer fragments, page CSS, and DA-derived drafts file to deployed paths.
- `npm run lint` — clean.

## Phase: Round-trip (production only, per project methodology)

- Local round-trip skipped per orchestrator instruction (vanilla-refresh contract).
- Committed substrate v1.0.4 + run 001 artifacts as a single commit on `sd-ups-gb-a` (tip `3110e9a`).
- `POST versionsource` with label "Before snowflake refresh 001 (ups-gb)" → 201 (snapshot of prior DA state created).
- `PUT /source/aemcoder/snowflake-demos/ups-gb/a.html` → 200.
- `git push --force-with-lease origin sd-ups-gb-a` → forced update from prior tip.
- `POST preview` on branch → 200; `POST live` on branch → 200.
- Code-bus served `/templates/ups-gb-a.html`, `/styles/ups-gb-a.css`, `/fragments/ups-gb-a/{header,footer}.html` → all 200 within seconds.

### Production verification (playwright-cli, 1280×800)

- Overlay applied: `main.dataset.overlay === "ups-gb-a"` [verified].
- 8 sections with unique first classes matching plan [verified].
- 83 `[data-slot]` markers in the rendered DOM [verified].
- Body `appear` class present [verified].
- Header fragment loaded (nested `header.site-header` present); footer fragment loaded (nested `footer.site-footer` + cookie band aside present) [verified].
- 6 of 8 `<main>` images load successfully; 2 case-study images fail at HTTP-2 layer because they're served from `www.ups.com/gb/en/media_…` which has UPS hotlink protection — see "Branch-level fix" below.
- DOM-equality script reports FAIL with expected wrapper deltas (EDS `<header class="header-wrapper">` / `<footer class="footer-wrapper">`); the script captures DOM before fragments fully populate. After settle: 412 elements rendered vs 382 source (+30 EDS wrappers), 4114 vs 4066 chars text, 9 vs 9 images — within tolerance.

### Visual comparison

- `diff/source-top.png` and `diff/production-top.png` captured at 1280×800.
- `diff/comparison.png` shows source (left) vs production (right) — pixel-equivalent above the fold.

### Branch-level fix: case-study image slots dropped from DA

**Symptom (first PUT/preview pass):** the two `<img>` tags inside `services-case-studies` rendered with `src="about:error"`, producing one `ERR_UNKNOWN_URL_SCHEME` console error.

**Root cause:** Source URLs `https://www.ups.com/gb/en/media_1ff4c184…` and `https://www.ups.com/gb/en/media_16da6d5a…` are served from the live UPS Media Bus, which has hotlink protection rejecting connections at the HTTP/2 layer when fetched cross-origin (every connection attempt returns `HTTP 000` / TCP-level reset, regardless of Referer or User-Agent). The provenance comment in the source already calls this out: "imageHosts: www.ups.com, assets.ups.com — referenced by URL; subject to UPS hotlink protection." EDS Media Bus, when invoked on a DA cell `<img>` referencing such a URL, can't fetch it and substitutes `about:error`.

**The source page itself has the same problem** — the case-study `<img>` tags on `paolomoz.github.io` have `naturalWidth: 0` and produce the matching `ERR_HTTP2_PROTOCOL_ERROR` in the source page's own console. So this is an inherent source-content issue, not a conversion regression.

**Fix applied (branch-level):** Removed the `case-1.image` and `case-2.image` slot rows from `output/da/a.html`. With the slots absent from DA, the substrate's `applySlotsToTemplate` does not call `writeSlot` on the matching `<img data-slot>` template defaults — the template's original `src="https://www.ups.com/gb/en/media_…"` URLs remain in place. The browser then attempts to fetch them directly, producing the same `ERR_HTTP2_PROTOCOL_ERROR` the source page has — not the worse `about:error`. Visual outcome matches source.

**Why not a substrate fix:** Media Bus's `about:error` behaviour for unreachable image hosts is correct (it can't synthesise a working URL from a blocked one). The substrate is doing the right thing. The fix belongs in the conversion — Phase 2 (Analyze) should HEAD-probe image URLs and flag any that fail TCP-level, then Phase 3 (Generate) should omit those from the DA doc and let the template default carry them through. That's a methodology gap, not a substrate gap.

**Cosmetic residual:** 3 console `ERR_HTTP2_PROTOCOL_ERROR` (logo + 2 case images) on the production page — identical to the source page's error profile. 1 silent 404 on `/scripts/ups-gb-a-animations.js` (expected — the template has no animations; the substrate's HEAD probe was suppressed in v1.0.4 but the browser's prefetch hint still emits one).

## Phase: Reflect

### Slot/section accounting

- Template: 8 sections, 83 `[data-slot]` markers.
- DA doc: 8 block divs (`tracking-hero`, `regulations-cross-promo`, `marketing-row-asia`, `marketing-row-app`, `digital-edge`, `services-case-studies`, `lfc-sponsorship`, `quick-links`) + 1 metadata div = 9 outer divs.
- DA slot rows: **81** (83 template slots minus the 2 case-image slots dropped in the branch-level fix).

### Patterns confirmed against bundled learnings

- Stardust 0.3.0 `data-section` discriminator pattern (2026-05-18 learning): used as the unique first class, original layout classes (`band`, `lfc-strip`, etc.) kept after.
- CSS layout-collision check (2026-05-19 learning): verified before generating the template; only `tracking-hero` and `lfc-strip` have CSS rules on their first classes, both visual-only (padding/background) — no layout collision.
- Container-vs-children rule (2026-05-19 learning): the `<a class="card">` and `<a class="case-card">` wrappers are kept static; only their inner children carry `[data-slot]`.
- Mid-sentence inline content (2026-05-20 learning): `<sup>®</sup>` inside `hero-sub` and the track-tab field-label live INSIDE their respective slots, not as static template chrome.
- DA `<img>` URLs absolute (2026-05-19 Media Bus learning): every DA cell image URL is `https://…` absolute.
- DA preserve list: only `<a>`, `<sup>`, `<strong>` used inline in cells; no `<span class>`, `<br>`, `<b>`, `<i>`, `<u>`, `<mark>`.

### Branch-level fixes

1. **Drop `case-1.image` / `case-2.image` slot rows from the DA doc** (see Round-trip section). Reasoning: UPS hotlink protection on `www.ups.com/gb/en/media_…` URLs blocks Media Bus fetches, producing `about:error`. Omitting those slots leaves the template defaults in place so the browser's direct fetch produces a standard `ERR_HTTP2_PROTOCOL_ERROR` matching the source's own behaviour, not `about:error`.

### Substrate gaps surfaced

1. **Phase 2 (Analyze) should HEAD/TCP-probe image URLs and flag unreachable ones.** When an image URL fails to fetch cross-origin (HTTP/2 reset, TCP refused, 403 with hotlink-protection markers), the Generate phase should NOT emit a DA cell row for that slot — let the template default carry it through. Today this only surfaces during Round-trip as an `about:error` symptom. Promoting this to a Phase-2 check would catch it before publish.

   Concrete check (sketch):
   ```bash
   for url in $(jq -r '.sections[].slots[] | select(.type=="image") | .src' decisions.json); do
     code=$(curl -sI -o /dev/null -w "%{http_code}" --max-time 5 "$url")
     [ "$code" = "000" ] || [ "$code" = "403" ] && echo "unreachable: $url"
   done
   ```

   Generic — applies to any source page that references hotlink-protected image hosts (not just UPS).

2. **`/scripts/<template>-animations.js` 404 still logs to console** even when the substrate's HEAD probe in delayed.js correctly suppresses the actual load. Browser-driven prefetch hints or extension behaviour can still emit it. A `<meta name="has-animations">` in the DA metadata block — opt-in flag — would eliminate the cosmetic error for templates that have no animations. Already noted in the bundled learnings (2026-05-18 entry); this run reconfirms the residual.

3. **`dom-equality.mjs` timing.** The script reports FAIL on the production round-trip because it captures the rendered DOM before the lazy-loaded header/footer fragments fully populate. After settle, source 382 → rendered 412 (+30 EDS wrappers — expected). A longer wait (or a wait-for-idle hook) would let the script give a meaningful pass/fail rather than always-FAIL on wrapper-element deltas.

### Promotable to cross-project learnings

The Media-Bus-`about:error`-from-hotlink-protected-host pattern (item 1 above) is generic and worth promoting to the bundled learnings — it didn't manifest before because prior runs all used assets with permissive CORS / no hotlink rules. A Phase 2 pre-flight check would have caught this before the live-page error was visible.

