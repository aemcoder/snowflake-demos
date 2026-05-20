# Notes — 001 glossier-a

## Phase: Capture

Source: https://paolomoz.github.io/stardust-site/samples/glossier/proposed-A.html
Captured: 2026-05-20
Status: refresh (snapshot already archived as sd-glossier-a-2026-05-20)
Length: 610 lines, fully self-contained (inline `<style>` + no external scripts).

## Phase: Analyze

### Structural map

```
Line    Element
─────   ──────────────────────────────────────
372     <body>
374-377   <aside class="promo-strip" data-section="promo-strip">
379-395   <header class="site-header" data-section="header">
397-410   <section class="hero" data-section="hero">           ← section 1
412-466   <section class="section" data-section="sale-carousel"> ← section 2 (collision)
468-481   <section class="story-band" data-section="story-band"> ← section 3
483-537   <section class="section" data-section="fragrance-carousel"> ← section 4 (collision)
539-555   <section class="section" data-section="ugc-grid">    ← section 5 (collision)
557-607   <footer class="site-footer" data-section="footer">
609     </body>
```

### Header boundary
`<aside class="promo-strip">` + `<header class="site-header">` (rows 374-395).

### Footer boundary
`<footer class="site-footer">` (rows 557-607). Includes newsletter form, four column nav, sticky pink wordmark.

### Section first-class collisions
Three sections share `class="section"` → must disambiguate via `data-section`:

| data-section | First class chosen |
|---|---|
| sale-carousel | `sale-carousel` |
| fragrance-carousel | `fragrance-carousel` |
| ugc-grid | **`ugc`** (NOT `ugc-grid`) — `ugc-grid` collides with `.ugc-grid { display: grid; grid-template-columns: repeat(3, 1fr); }` per learnings 2026-05-19 |

`hero` and `story-band` already have unique first classes.

### Slot opportunities per section
See `decisions.json` (5 sections, slot counts: hero 4, sale-carousel 26, story-band 5, fragrance-carousel 26, ugc 6 → total 67 slots).

### Asset strategy
All images already use absolute imgix CDN URLs (`https://glossier-prod.imgix.net/...`) plus one CloudFront URL. **No rewriting needed.**

### Inline `<style>` extraction
Lines 25-370 inclusive contain the `<style>` open + closing tags. Inner CSS goes to `styles/glossier.css`.

### Head-level resources
None (no `<link>` tags in source `<head>`). Just `<meta charset>`, `<meta viewport>`, `<title>`, and the inline `<style>`.

### External libs / inline scripts
None — fully static page.

### Placeholder convention
Stardust 0.3.0: `<span data-placeholder>` inside the hero CTA `<a>`. Mark as `data-slot-skip="placeholder"`.

### Differences from prior run (a7a30dc)
Same source URL, same structure. The only branch-level change is the `ugc-grid` → `ugc` rename to defuse the CSS collision (was previously known but kept in prior run's decisions; the rendered DOM survived because the substrate engine matched on first-class `ugc-grid` BEFORE the `.ugc-grid` CSS targeted the section as a grid — but the CSS rule still applied incorrectly to the outer section, which was a layout bug per learnings).

### Substrate gaps observed
None — substrate v1.0.4 covers:
- heading-in-heading unwrap (writeSlot heading branch)
- background-image-before-`<a>` dispatch guard
- `body > header, body > footer { padding: 0; margin: 0 }` reset

Source-page CSS `.section { padding: var(--section-padding) 32px; }` does NOT use `section, header, footer` as a generic selector — applies only to `.section` class. So no padding leak on EDS landmarks (substrate reset is defence-in-depth here).
