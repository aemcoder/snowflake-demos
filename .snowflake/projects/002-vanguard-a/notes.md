# Notes — 002 vanguard-a

## Phase: Capture

- Source: https://paolomoz.github.io/stardust-site/samples/vanguard/proposed-A.html
- Generator: Stardust 0.2.0 (`<!-- stardust:provenance ... stardustVersion: 0.2.0 -->`)
- 33 KB HTML. No external CSS (all inline). Google Fonts only (Mona Sans).
- All images: absolute `investor.vanguard.com` URLs — no asset rewriting needed.

## Phase: Analyze

### Structural map

```
297–322  <header class="site-header">           ← header fragment
323–577  <main>
327–346    <section class="hero">
348        <hr class="section-divider">
351–364    <section class="subhero">
366        <hr class="section-divider">
369–402    <section class="goals">
404–422    <section class="advice">
424–466    <section class="products">
468–496    <section class="anniversary">
498        <hr class="section-divider">
500–517    <section class="social">
519        <hr class="section-divider">
521–563    <section class="resources">
565–576    <section class="bottom-cta">
580–613  <footer class="site-footer">           ← footer fragment
```

`<main>` already present; no synthesize needed.
`<hr>` dividers stay in the template as-is (engine queries `section[class]` only).
All 9 section first-classes already unique — no collision, no renaming.

### Placeholder convention (Stardust 0.2.0)

`<span class="placeholder-tag">F-002 ...</span>` inline marker.

Locations:
- `anniversary .anniv-fact:nth-child(4)` — entire fact is placeholder → `data-slot-skip` on the outer `div.anniv-fact`
- 5 × `.social__cell span.placeholder-tag` — logo placeholders → `data-slot-skip` on each `span`
- `footer .site-footer__legal span.placeholder-tag` — regulated disclosure → `data-slot-skip` on the `span` (static fragment)

### Important: `<b>` in hero slot values

`.hero__sub` and `.hero__inline-claim` use `<b>0.25%</b>` and `<b>$1.25M</b>` for typographic accent.
`<b>` is stripped by the DA pipeline. DA cell values for these slots use `<strong>` instead.
The template keeps `<b>` (browser-parsed, not pipeline-normalised) for the fallback default.

## Phase: Generate

- 9 sections, 80 `[data-slot]` markers.
- `styles/vanguard-a.css` extracted verbatim from lines 25–294 of source (no `url()` refs — no rewrites needed).
- No animations script (no inline `<script>` in source).
- Self-checks: all clean.

## Phase: Round-trip

**Local** (`http://localhost:3000/drafts/vanguard-a.html`):
- overlay applies (`main.dataset.overlay === 'vanguard-a'`), 9 sections.
- Header/footer fragments loaded. All slot types execute: text, img, link.
- Placeholder elements render with `F-002 LOGO` / `F-002 PLACEHOLDER` dashed-box UI — correct.
- Console: 1 expected 404 for missing animations script (cosmetic).

**Production** (`https://sd-vanguard-a--snowflake-demos--aemcoder.aem.live/vanguard/a`):
- All 4 deployed artifact paths 200. DA PUT 201. Preview + live both 200.
- `main.dataset.overlay === 'vanguard-a'`, `sectionCount === 9`.
- Hero img, goal-1 img, advice img all rewritten by Media Bus to `media_<sha>` optimised form.
- `<meta name="template" content="vanguard-a">` present.

## Phase: Reflect

### What went smoothly vs run 001

- Source already had `<main>` → no synthesize, no `<hr>` ambiguity.
- All images absolute → zero asset-rewriting work.
- No CSS class collision on section first-classes → no renaming needed.
- Stardust 0.2.0 placeholder convention correctly handled; 6 elements marked `data-slot-skip`.
- `<b>` → `<strong>` substitution in DA cells for hero slots — worked first try.
- Larger slot count (80 vs 57) handled with no issues.

### No new cross-project findings to promote.
