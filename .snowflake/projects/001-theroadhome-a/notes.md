# Notes — 001 theroadhome-a

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/theroadhome/proposed-A.html
- Page is single-file (805 lines): one inline `<style>` block (31-525), no inline `<script>`, no external CSS/JS.
- All images are absolute URLs at theroadhome.org WordPress CDN.
- Generator: Stardust 0.2.0 variant A (provenance comment lines 8-30).
- Placeholder convention used: `data-placeholder` attribute (Stardust 0.3.0 style — 0.2.0 declared but uses the newer attribute marker).

## Phase: Analyze

### Structural map

```
Line   Element                                                   Notes
─────  ──────────────────────────────────────────────────────    ─────
1-30   <!doctype>, <head> metas + provenance comment             keep
31-525 <style>...</style>                                        extract to /styles/theroadhome-a.css
527    <body>                                                    open
530    <header data-section="site-header">                       HEADER FRAGMENT
546    <section data-section="hero">                             MAIN section 1
573    <section data-section="join-our-team">                    MAIN section 2 (banner)
582    <section data-section="get-involved">                     MAIN section 3 (3-up)
609    <section data-section="impact">                           MAIN section 4 (stats)
633    <section data-section="road-divider" aria-hidden>         MAIN section 5 (decorative)
638    <section data-section="programs">                         MAIN section 6 (banner)
647    <section data-section="housing-resources">                MAIN section 7 (3-up)
674    <section data-section="heritage">                         MAIN section 8
692    <section data-section="stories">                          MAIN section 9 (carousel)
735    <section data-section="newsletter">                       MAIN section 10 (form)
754    <footer data-section="site-footer">                       FOOTER FRAGMENT
802    </body>
```

10 main sections. Source has no `<main>` wrapper — synthesize one.

### First-class collisions

8 of 10 sections share `class="section"`. Use `data-section` value as discriminator (Stardust convention).

CSS-collision check on candidate first-classes:

| data-section value | inner class collision? | resolved first-class |
|---|---|---|
| hero | (section has no class; `[data-section="hero"]` attr selector + `.hero__*` BEM only) | `hero` |
| join-our-team | none | `join-our-team` |
| get-involved | none | `get-involved` |
| impact | none | `impact` |
| road-divider | YES — `.road-divider` styles inner `<div>` (dotted band) | `road-divider-section` |
| programs | none | `programs` |
| housing-resources | none (BEM only) | `housing-resources` |
| heritage | YES — `.heritage { display: grid; grid-template-columns: 1fr auto auto }` styles inner `<div class="container heritage">` | `heritage-section` |
| stories | none (BEM only) | `stories` |
| newsletter | YES — `.newsletter { display: grid; max-width: 760px; margin: 0 auto }` styles inner `<form class="newsletter">` | `newsletter-section` |

### Hero section special considerations

Hero has two presentational empty divs (`.hero__photo`, `.hero__scrim`) — these are CSS-driven decorations and stay in the template as-is. `.hero__photo` carries a CSS-defined `background-image`, not inline style. Since the slot-write rule for backgrounds requires inline `style="background-image:..."`, this stays static.

Hero contains three help-cards with hard-coded copy. Make them authorable.

### Slot opportunities per section

| Section | Slots |
|---|---|
| hero | eyebrow, title, body, help-1.question/cta-link, help-2.question/cta-link, help-3.question (phone link in `<a>`) |
| join-our-team | title, body (placeholder), cta-link |
| get-involved | title, card-1 {image, h3, body(placeholder), cta-link}, card-2 {...}, card-3 {...} |
| impact | title, stat-1 {icon-img, n(placeholder), label(placeholder)}, stat-2 {...}, stat-3 {...} |
| road-divider | (no slots — purely decorative) |
| programs | title, body (placeholder), cta-link |
| housing-resources | title, card-1 {icon-img, h3, body(placeholder), cta-link}, card-2 {...}, card-3 {...} |
| heritage | eyebrow, title, body, logo-img, century-n, century-l |
| stories | title, body (placeholder), card-1 {photo (background-image), name, quote (placeholder), cta-link}, card-2..6 {photo, name only} |
| newsletter | title, body, form (kept static — labels/inputs not slottable) |

Placeholder elements (`data-placeholder` attr) are NOT slots — marked `data-slot-skip="placeholder"`.

### Head-level resources

None. Page has no external `<link>` (no Google Fonts, no preconnect). Fonts use system fallback chain. Skip head-link extraction.

### Inline style / script

- Inline `<style>`: lines 31-525 → extract to `styles/theroadhome-a.css` (strip wrapper tags).
- Inline `<script>`: NONE — no animations file needed. The HEAD-probe will 404 silently.

### Asset strategy

- All images at theroadhome.org are publicly reachable (WordPress media). Use absolute URLs verbatim (assetStrategy: absolute).
- Background images in CSS already use absolute URLs.
- DA cell `<img>` URLs will also be absolute (already are).
- No vendoring needed.

### Strip list

- Provenance comment (lines 8-30) — keep in source notes but strip from template.
- `data-section-tone`, `data-variant` attributes — keep on sections (they're Stardust metadata; harmless).
- `data-placeholder` styling (lines 130-149 of CSS) — strip from CSS because it adds a visual outline + "PLACEHOLDER" badge that we don't want in the EDS overlay (these are placeholder content meant for the static preview, not for the production page). Actually — keep for now, the source styling shows authors what's a placeholder. The runtime will still display them.

Decision: Keep the placeholder CSS for visual consistency with source. The `data-slot-skip="placeholder"` markers prevent the substrate from trying to write authored values into them.

### Differences from prior runs

This run extends the pattern from earlier `theroadhome-a` runs:
- Same source URL, same generator.
- Substrate is now v1.0.4 (heading-in-heading unwrap, body landmark reset, background-image dispatch guard).
- No structural divergence in the source — refresh exercises substrate stability.
