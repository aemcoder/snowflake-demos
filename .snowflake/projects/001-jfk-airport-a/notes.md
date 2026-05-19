# Notes — 001 jfk-airport-a

## Phase: Capture

Fetched 107060 bytes from https://paolomoz.github.io/stardust-site/samples/jfk-airport/proposed-A.html
Generator: Stardust 0.3.0 (`stardustVersion: 0.3.0` in provenance comment)
No external CSS or JS files (all inline).

## Phase: Analyze

### Structural map

```
Line   Element / data-section
─────  ──────────────────────────────────────
1-899  <head> + <style> (CSS lines 150-898)
900    <body>
902    <a class="skip"> (skip link)
904    <header data-section="header">  ← HEADER FRAGMENT start
         .logo img (assets/media/JFK-cd579a20.svg)
         <nav data-section="primary-nav"> (4 links)
         .right (accessibility icon + search button)
918    </header>  ← HEADER FRAGMENT end
920    <main>
922      <section data-section="brand-hero" class="brand-hero">
           <img src="assets/media/032_26...jpg"> (hero bg image)
           <div class="scrim">
           <div class="meta-strip"> (airport name + city)
           <div class="copy"> (h1: "JFK", p.deck: tagline)
           <aside class="herofeed"> (live updates overlay)
962      </section>
967      <section data-section="audience-router" class="audience-section reveal">
           h2: "What are you here to do?"
           p.deck: audience deck text
           .audience-tiles (5 buttons)
1013     </section>
1017     <section data-section="task-panel" data-audience="departing" class="task-panel">
           (default task panel: departing)
1077     </section>
1080     <section data-section="task-panel" data-audience="arriving" class="task-panel" hidden>
1140     </section>
1143     <section data-section="task-panel" data-audience="pickup" class="task-panel" hidden>
1188     </section>
1191     <section data-section="task-panel" data-audience="connecting" class="task-panel" hidden>
1248     </section>
1251     <section data-section="task-panel" data-audience="visiting" class="task-panel" hidden>
1309     </section>
1312     <section data-section="your-guide" class="guide-section reveal">
           h2: "Your Guide to JFK"
           5 guide-tile links with photos
1338     </section>
1341     <section data-section="construction-reality" class="construction" id="today">
           h2: "Building tomorrow's JFK."
           p: construction description
           2 CTA links
           figure > img
1355     </section>
1358     <section data-section="essentials" class="essentials">
           h2: "While you're here."
           p: essentials deck
           3 essential cards (dine/shop/relax), each with photo + icon + h3 + p + link
1394     </section>
1397     <section data-section="accessibility-band" class="accessibility">
           h2: "Accessibility at JFK."
           p: description
           CTA link
1408     </section>
1411     <section data-section="latest-from-jfk" class="latest">
           h2: "Latest from JFK."
           "all alerts" link
           feature article (photo + eyebrow + h3 + p + link)
           2 companion articles (eyebrow + h3 + p + link each)
1443     </section>
1444   </main>
1446   <footer data-section="footer">  ← FOOTER FRAGMENT start
         brand section (PANYNJ logo + brand line)
         4 link columns (Help, Travel info, About, Connect)
         .bottom (copyright + social)
1494   </footer>  ← FOOTER FRAGMENT end
1496   <script> (inline JS: scroll reveals + count-up + audience switcher + keyboard shortcut + console msg)
```

### Generator placeholder convention

Stardust 0.3.0 uses `data-placeholder="true"` on placeholder elements.
**No placeholders found in this source.** All content is voice-authored.

### First-class collision analysis

Five `<section class="task-panel">` elements — all share `task-panel` as first class.
Resolution: use `data-audience` attribute to form a unique first class:
- `data-audience="departing"` → first class: `task-panel-departing`
- `data-audience="arriving"` → first class: `task-panel-arriving`
- `data-audience="pickup"` → first class: `task-panel-pickup`
- `data-audience="connecting"` → first class: `task-panel-connecting`
- `data-audience="visiting"` → first class: `task-panel-visiting`

Original class list `task-panel` stays; new first class prepended.

### Asset strategy

Source host: `https://paolomoz.github.io/stardust-site/samples/jfk-airport/`
All assets are public (GitHub Pages). Strategy: **absolute** — rewrite relative `assets/...`
to `https://paolomoz.github.io/stardust-site/samples/jfk-airport/assets/...`

### Head-level resources

Only inline `<style>` — no external `<link>` for fonts. Fonts are declared in `@font-face`
blocks inside the `<style>`, loaded from relative `assets/icons/` paths. Will rewrite to absolute.
No Google Fonts or other CDN preconnects.

### Slot decisions per section

Given the complexity of this page (task panels with interactive JS, audience router buttons,
count-up animations), the DA overlay approach is to make ONLY the primary editorial content
authorable (text headings, paragraphs, images), NOT interactive widget internals.

Key decisions:
- **brand-hero**: slot the hero image, h1, deck, meta-strip spans
- **audience-router**: slot h2 + deck (tiles are interactive UI — not slotted)
- **task-panel sections**: slot h2 + paragraph per panel (flight-search/pickup/connect widgets are UI)
- **guide-section**: slot h2, each guide tile's h3 + photo + link
- **construction-reality**: slot h2, p, figure img, CTA links
- **essentials**: slot h2, p, each essential card's h3 + p + link + photo
- **accessibility-band**: slot h2, p, CTA link
- **latest-from-jfk**: slot h2, feature article (photo, eyebrow, h3, p, link), 2 companions

### Decisions surfaced by analysis

1. 5 task-panels share first class `task-panel` — disambiguate with `data-audience` suffix
2. Assets are on public GitHub Pages host — use absolute URL rewriting, no vendoring needed
3. `@font-face` in CSS references relative `assets/icons/` paths — rewrite to absolute
4. Hero `<section class="brand-hero">` is already `<section>` — no rewrite needed
5. All logical sections are already `<section>` elements — no outer-tag rewriting needed
6. Audience tile buttons and task panel widgets are interactive JS UI — treat as static template content, not slots
7. `herofeed` is nested inside `brand-hero` section (not a separate section) — part of brand-hero template
8. The 4 `hidden` task panels are present in DOM for JS show/hide — keep all in template, only departing panel is "default" visible
