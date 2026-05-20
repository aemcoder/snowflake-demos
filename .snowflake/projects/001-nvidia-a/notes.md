# Notes — 001 nvidia-a

## Phase: Capture

- Fetched source: `https://paolomoz.github.io/stardust-site/samples/nvidia/proposed-A.html`
- 2381 lines, single self-contained file
- Inline `<style>` block 86–1037 (no external CSS)
- Inline `<script>` block 2167–2379 (hero carousel + console.log easter egg)
- Stardust 0.3.0 provenance comment in head
- No external link/script tags to fetch alongside

## Phase: Analyze

### Structural map

```
Line   Element
─────  ────────────────────────────────────────────────────────────
1040   <body>
1041   <a class="skip-link">Skip to main content
1043   <header class="site-header" …>  (HEADER FRAGMENT TOP)
1060   </header>
1062   <aside class="geo-banner" …>  (still header fragment — pre-main)
1068   <main id="main">  (MAIN START)
1071   <section class="hero-carousel" data-section="hero" id="home-hero">
1206   </section>
1210   <section class="theme-section variant-A surface-white" data-section="theme-ai">
1320   </section>
1323   <section class="theme-section variant-A surface-dark" data-section="theme-design-sim">
1441   </section>
1444   <section class="theme-section variant-G surface-white" data-section="theme-hpc">
1538   </section>
1541   <section class="theme-section variant-C surface-dark" data-section="theme-gaming-creating">
1652   </section>
1655   <section class="theme-section variant-C surface-white" data-section="theme-automotive">
1775   </section>
1778   <section class="theme-section variant-E surface-dark" data-section="theme-robotics-edge">
1888   </section>
1891   <section class="theme-section variant-G surface-white" data-section="theme-data-center-cloud">
1985   </section>
1988   <section class="theme-section variant-C surface-dark" data-section="theme-about-nvidia">
2108   </section>
2110   </main>
2112   <footer class="site-footer" …>  (FOOTER FRAGMENT)
2165   </footer>
2167   <script>  (inline JS, hero carousel)
2379   </script>
2380   </body>
```

### Decisions surfaced by analysis

1. **First-class collision on 8 theme sections.** All carry `class="theme-section variant-X surface-Y"`. Per Generate rule and learnings (`section first-class must be unique within template`, and `must not appear as a CSS selector with layout properties`), `theme-section` cannot be the first class. The Stardust `data-section` attribute provides stable, unique discriminators: `theme-ai`, `theme-design-sim`, `theme-hpc`, `theme-gaming-creating`, `theme-automotive`, `theme-robotics-edge`, `theme-data-center-cloud`, `theme-about-nvidia`. Promote these to first-class while preserving the original classes in the list so `.theme-section`, `.variant-A`, `.surface-white`, etc. selectors continue to match.

2. **Hero section first-class is `hero-carousel`** (already unique). No remapping.

3. **9 sections total** become 9 EDS blocks in the DA doc, plus a metadata block.

4. **Header fragment** spans `<a class="skip-link">` (line 1041) through `<aside class="geo-banner">` (lines 1062–1065). Both pre-`<main>` elements go in the header fragment per methodology.

5. **Footer fragment** is the `<footer class="site-footer">` block (2112–2165). Contains Stardust placeholders (`<span data-placeholder data-shape="...">`) which are not authorable — leave intact as static template content (they live in the fragment, not the slot system, so no `data-slot-skip` needed).

6. **`<main>` already exists** in source — no synthesis required.

7. **Inline `<style>` extraction.** Lines 86–1037 (~951 lines) of CSS → `/styles/nvidia-a.css`. There's also a `<noscript><style>` at line 1038 — that's a no-script fallback for theme-section reveal animation; keep in template top, NOT in extracted CSS (noscript blocks live in head).

8. **Inline `<script>` extraction.** Lines 2167–2379 → `/scripts/nvidia-a-animations.js`. Carousel auto-advance plus an easter-egg console-print. No external libs (no GSAP, Lenis, etc.).

9. **No head-level `<link>` resources.** Source page uses an unhosted brand font `NVIDIA-NALA` with a `var(--heading-font-family)` cascade that falls back to `Arial, Helvetica, sans-serif`. No Google Fonts or preconnects. Nothing to lift.

10. **Assets all absolute.** Tile images use `https://www.nvidia.com/content/...`, hero images use absolute URLs. Skip-link target `#main` is the only internal ref. No URL rewriting needed.

11. **Tile / card structure (slot strategy).**
    Every theme section's carousel has 8–11 `<a class="tile-<variant>">` children, each wrapping an `<img>` and a title/eyebrow/CTA-label band. Per the cross-project learning **"don't put `data-slot` on a container with nested `data-slot` children"**, I cannot slot the outer `<a>` as a link slot AND its inner image/title — the link writer would clobber the inner DOM. Choice:
    - Slot inner `<img>` (image type), inner `<h3>` (text type), inner `.tile-*-eyebrow` (text type). Per-tile.
    - Leave outer `<a href="...">` as static template chrome — link target is NOT authorable in this run. Acceptable trade-off: authors update copy and imagery but not link destinations. To make destinations authorable later would need a substrate addition (e.g. an `href` attribute slot).

12. **Hero slide structure (slot strategy).**
    Each `<article class="hero-slide">` contains: `<picture>` photo (4 sources + img), eyebrow, headline, description, single primary `<a class="btn">` CTA. The picture has nested `<source>` siblings — per architecture, slot the `<picture>` element (picture writer replaces it with the DA cell's picture). Eyebrow/headline/description are texts. CTA is a single anchor with text + href — can be slotted as link type since it has no nested data-slot children.
    
    Hero also has a `<button class="hero-tab">` row that DUPLICATES eyebrow/title per slide. Decision: keep tabs in template, derive their content from the slide slots at runtime via the inline `<script>` (which already reads slides). Alternative: separate `hero-tab-N.title` slots that duplicate the slide title. **Pick: leave the tab content as static template text** — the carousel JS only manipulates active state, not text. If authors want to change titles, they'll edit slides but the tabs will lag. Trade-off acceptable for a demo; document in reflections.
    
    Wait — re-reading the JS: it just toggles `is-active`. The tab text is hardcoded in template. So tabs WILL show stale titles if the slide title changes. Reasonable for a demo: 6 hero tab labels remain authorable IF I also expose them as slots. Decision: slot the tabs separately as `hero-tab-N.eyebrow` and `hero-tab-N.title` — small slot count overhead but preserves authoring fidelity.

13. **Pause button + countdown.** Static in template (UI chrome, not content).

14. **Quick links per theme section.** Each section has a `<nav class="theme-quicklinks">` with 6–8 anchor links. Each anchor has both `text` and `href`. Treat each as a `quicklink-N` link slot. 8 sections × ~6–8 quicklinks each adds up; this is the cleanest authoring approach (each link is a single slot, link-type writer copies both href and innerHTML).

15. **Theme section h2 title.** Each theme section's `<h2>` is authorable: `theme-{slug}.title` text slot.

16. **Theme section description.** Each `.theme-description` paragraph is authorable: `theme-{slug}.description` text slot.

17. **Slot total estimate** (approx):
    - Hero: 6 slides × (picture + eyebrow + headline + description + CTA) = 30 slots + 6 tabs × (eyebrow + title) = 42 hero slots
    - 8 theme sections × (title + description + ~7 quicklinks + ~9 tiles × (image + eyebrow + title)) = ~310 theme slots
    - Total estimate: ~350 slots

### Stripping decisions

- Strip the Stardust provenance HTML comment (lines 74–80) from the template head section — purely metadata, not user-facing.
- Keep `<noscript><style>...</style></noscript>` (line 1038) in template head — it's a no-JS fallback for the theme-section reveal animation.
- Skip-link `<a class="skip-link">` at line 1041 — keep in header fragment (it's interactive UI chrome that the user benefits from).
- `<button>`s inside hero (`hero-pause`, `hero-tabs`) — static UI chrome, no slots.
- `<aside class="geo-banner">` text + CTA — leave static (this is a demo affordance, region-specific). Could be authorable later.
- Footer columns and form — static template content (Stardust placeholders in lists are intentionally TBD content).

### Branch-level fixes anticipated (from learnings)

- **section CSS leak into EDS landmark `<header>`/`<footer>`** (`section, header, footer { padding }` learning, 2026-05-19). Need to scan source CSS for this pattern.
