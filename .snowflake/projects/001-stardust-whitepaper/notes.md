# Notes — 001 stardust-whitepaper

## Phase: Capture

Source: https://paolomoz.github.io/stardust-site/samples/stardust-whitepaper/proposed-A.html
Captured: 2026-05-19
Generator: Stardust / hand-crafted (not emitting Stardust 0.2/0.3 placeholders — no `data-placeholder` or `placeholder-tag` markers found)
Page intent: Vision brief / whitepaper for Stardust × Snowflake × Slicc pitch

Notable structure:
- 26 KB total HTML, all inline styles and scripts (no external CSS/JS libraries)
- Self-hosted assets (images, logos) at paolomoz.github.io — public, absolute URLs work
- IntersectionObserver-based reveal animation — minimal JS, no GSAP/Lenis
- Dark theme with amber accent color system, SF Pro Display/Text/Mono stack

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
1      <!doctype html>
8-237  <style> inline CSS block
239    <body>
242    <nav class="nav"> ← header fragment start
251    </nav> ← header fragment end
253    <header class="hero"> ← first main section (rewrite to <section class="hero">)
276    </header> ← hero end
278    <section class="b"> ← sections 2-9, all share first-class "b", disambiguated by eyebrow text
       01 the-shift
       02 what-brands-gain
       03 strategy
       04 technical-solution
       05 system-at-a-glance
       06 first-steps
       07 plg-end-state
       08 why-aem
502    <section class="logos"> ← section 10, already unique
520    <footer> ← footer fragment start
534    </footer> ← footer fragment end
537-545 <script> inline animation JS
```

### First-class collision analysis

All 8 `<section class="b">` elements share first class "b". Disambiguated by eyebrow
text slugs per methodology rule. None have `data-section` attributes.

### Slot decisions

- `<header class="hero">` → rewritten to `<section class="hero">` (methodology: non-section blocks → section)
- Section `system-at-a-glance` has no authorable text slots — all markup is static diagram content
  (Slicc/Stardust/AEM fixed architecture diagram). Zero slots for this section.
- Chip spans inside `.hero-meta` are slotted individually (3 chips)
- `<br>` in h1 (`Replatforming,<br><em>reimagined.</em>`) — kept in template as static; 
  the title slot value in DA does not include the `<br>` (would be stripped by pipeline)
- Logo images are static (not slotted) — 8 logos all stay in template as absolute-URL `<img>` tags
- The `.logos .caption` text is slotted (1 slot)
- `.arch` section (system-at-a-glance) is fully static — the architecture diagram content is
  considered template-static for this run

### Asset strategy

Public source host: all relative paths rewritten to absolute URLs pointing at
`https://paolomoz.github.io/stardust-site/samples/stardust-whitepaper/`

Assets referenced:
- images/before-virgin.png (hero before/after comparison)
- images/after-virgin.png (hero before/after comparison)
- logos/glossier.png, patagonia.png, polestar.png, oatly.png, virginatlantic.png, aman.png, vanguard.png, festool.png

No CORS concerns — images served from same public GitHub Pages origin as the source.

## Phase: Generate

Artifacts produced:
- templates/stardust-whitepaper.html — 10 sections, 66 slots
- fragments/stardust-whitepaper/header.html — sticky nav with SVG logo
- fragments/stardust-whitepaper/footer.html — 3-column footer with project links
- styles/stardust-whitepaper.css — 11.8 KB (full inline style extracted)
- scripts/stardust-whitepaper-animations.js — 385 bytes (IntersectionObserver reveal)
- da/a.html — divs-with-class shape DA source, metadata block inside main

Self-checks:
- Template has <main>: OK
- No relative assets/ refs: OK
- DA doc clean (no table, span class, br, b, i, u, mark): OK
- DA img URLs all absolute: OK

## Phase: Wire

All artifacts copied to EDS-served paths. Transform ran successfully (10,751 bytes drafts file).
Lint: PASS (eslint + stylelint both clean).

## Phase: Round-trip (production)

- git push sd-stardust-whitepaper-a: OK (new branch pushed)
- DA PUT /stardust-whitepaper/a.html: 200 OK
- POST preview on sd-stardust-whitepaper-a: 200 OK
  → https://sd-stardust-whitepaper-a--snowflake-demos--aemcoder.aem.page/stardust-whitepaper/a
- POST live on sd-stardust-whitepaper-a: 200 OK
  → https://sd-stardust-whitepaper-a--snowflake-demos--aemcoder.aem.live/stardust-whitepaper/a

No local round-trip (per autonomous mode instructions).

## Phase: Reflect

### Findings for this run

1. [verified] Source with no Stardust placeholder markers — the `system-at-a-glance` section
   (architecture diagram) contains all-static presentational content. Slotting it would
   provide no authoring value. Leaving as zero-slot static section is correct.

2. [verified] `<br>` in h1 kept in template static DOM, NOT in DA slot value. This is the
   correct approach per the `<br>` stripping learning — the title renders correctly from
   template defaults when DA slot is empty, and the DA slot value just carries the text.

3. [assumed] Logo images not slotted — for a whitepaper/vision-brief page the logos represent
   "brands we redesigned" which is template content. If authors need to swap logos, the template
   would need image slots added for each logo `<img>`.

4. [verified] Asset strategy "absolute" (public source host) works cleanly for GitHub Pages
   sources — no CORS issues, no vendoring needed, no DA media migration needed.
