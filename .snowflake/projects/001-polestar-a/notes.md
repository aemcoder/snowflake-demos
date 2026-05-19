# Notes — 001 polestar-a

## Phase: Capture

Fetched `https://paolomoz.github.io/stardust-site/samples/polestar/proposed-A.html` (18,831 bytes).
Stardust 0.2.0 prototype, "Variant A — Conservative refresh" for Polestar US home page.
No external CSS/JS assets referenced — self-contained inline style and no JS animations.

## Phase: Analyze

### Structural map

```
Line    Element
──────  ────────────────────────────────────────────────────────
1–31    <!DOCTYPE html> + provenance comment + <head> open
32–290  <style> inline — all CSS extracted to polestar-a.css
291     </head>
292     <body>
293–310 <header data-section="header"> — nav + brand → HEADER FRAGMENT
312     <main>
314–330 <section data-section="hero"> — full-bleed image + h1 + 2 CTAs
332–341 <section data-section="incentive"> — 2-col: head + body/footnote
344–381 <section data-section="model-grid"> — 3 car cards with bg-images
384–401 <section data-section="sustainability"> — bg-image + 2-col text + CTA
404–411 <section data-section="charging"> — eyebrow + text + CTA (3-col)
414–426 <section data-section="newsletter"> — title + email form
427     </main>
430–478 <footer data-section="footer"> — 5-col nav grid + legal → FOOTER FRAGMENT
479     </body>
```

### Differences from prior runs

- Stardust 0.2.0 (no `data-placeholder` attrs like 0.3.0; no placeholder markers needed)
- All images are absolute polestar.com CDN URLs — no asset vendoring needed
- No inline `<script>` blocks — no animations JS generated
- No head-level `<link>` resources — no Google Fonts or preconnects
- `data-section` provides unique first-class for each section — clean discriminators

### Decisions surfaced by analysis

1. [verified] All 6 content sections already use `<section>` elements with unique `data-section` attrs.
   Use `data-section` value as first class per methodology rule.
2. [verified] Hero and model-grid use `background-image` style on `.hero__media` and `.card__media`
   elements — these become background-image slots.
3. [verified] Asset strategy: `absolute` (all images are polestar.com CDN, publicly reachable).
4. [verified] No nested `[data-slot]` conflicts: card `.card__cta` links do NOT contain slotted children.
5. [verified] Newsletter form is static (no `input` or `button` becomes a slot — they're structural).
6. [verified] `<sup>¹</sup>` in incentive heading: DA cell pipeline strips `<sup>` but the
   superscript is numeric context. Kept as plain text in DA cell (dropped `<sup>` wrapper).

## Phase: Generate

### Slot count: 24 across 6 sections

| Section      | Slots |
|---|---|
| hero         | 4 (hero-media bg, title, cta-primary, cta-secondary) |
| incentive    | 3 (heading, body, footnote) |
| model-grid   | 9 (3 cards × media-bg + title + cta) |
| sustainability | 4 (media-bg, title, sub, cta) |
| charging     | 3 (eyebrow, body, cta) |
| newsletter   | 1 (title) |

All checks passed:
- No relative `assets/` refs [OK]
- DA doc: no `<table>`, `<span class>`, `<br>`, `<b>` etc [OK]
- DA cell `<img>` URLs are absolute [OK]
- Template has `<main>` and 24 `data-slot` markers [OK]

## Phase: Wire

Deployed paths:
- `templates/polestar-a.html`
- `fragments/polestar-a/header.html`
- `fragments/polestar-a/footer.html`
- `styles/polestar-a.css`
- `drafts/polestar-a-a.html`

Lint: clean pass (no eslint or stylelint errors).

## Phase: Round-trip

Skipped local round-trip (autonomous mode — straight to production).

Production:
- Branch pushed: `sd-polestar-a`
- Code Sync: instant (200 on all 4 paths at first probe)
- DA PUT: 200, content uploaded
- Preview POST: 200 — `https://sd-polestar-a--snowflake-demos--aemcoder.aem.page/polestar/a`
- Live POST: 200 — `https://sd-polestar-a--snowflake-demos--aemcoder.aem.live/polestar/a`

Verification via `curl`:
- `<meta name="template" content="polestar-a">` present in rendered HTML [verified]
- Media Bus rewrote hero-media img to `./media_127c6b7037bd9c3b3a5a792fdf5b5995acae4be5c.avif?width=...` [verified]
  (confirms absolute URLs in DA cells worked correctly)
- Title `Polestar – Electric cars | Polestar US` rendered correctly [verified]
