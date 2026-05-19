# Notes — 001 polestar-a

## Phase: Capture

- Source URL: https://paolomoz.github.io/stardust-site/samples/polestar/proposed-A.html
- Fetched 18,831 bytes (481 lines) into `input/index.html`
- Generator: stardust:prototype 0.2.0 (no-impeccable mode), Variant A
- No external CSS/JS files (all inline). All image URLs are absolute to polestar.com CDN.

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
1-3    <html><head>
4-29   <!-- stardust:provenance --> (drop)
30-32  meta + title
33-290 <style>...</style>  (inline CSS — extract to styles/polestar-a.css)
291    </head>
292    <body>
294-310  <header data-section="header">    -- HEADER FRAGMENT
312    <main>
314-330  <section data-section="hero">
332-342  <section data-section="incentive">
344-382  <section data-section="model-grid">
384-402  <section data-section="sustainability">
404-412  <section data-section="charging">
414-426  <section data-section="newsletter">
428    </main>
430-478  <footer data-section="footer">     -- FOOTER FRAGMENT
479    </body>
```

### Decisions surfaced

1. Each section already has a unique first class via `data-section`. We need the engine matcher to use the class list, so the template will get `class="<section> ..."` rewrites — but every section in source is already `<section>` tag with `data-section`. The engine matches by `section.className.split(' ')[0]`. None of the source sections have a class at all on `<section>` itself — they use `data-section` instead, and the class lives on the inner `<div>` (e.g. `.nav`, `.incentive`, `.modelGrid`).

   Fix: rewrite each section element to `<section class="<slug> ...">` using the data-section value (kebab-case) so the engine matches.

2. No inline scripts to extract — no animations file needed.

3. All assets are absolute URLs already (https://www.polestar.com/dato-assets/...). No vendor/rewrite needed.

4. Background-image slots: hero `.hero__media`, model-grid `.card__media` x3, sustainability `.sus__media` — all have `style="background-image:url(...)"` inline.

5. No `<br>` tags, no inline spans except `.eyebrow` (only on charging strip), nav__brand and nav__utility (in header). Only `<sup>` in the incentive heading — this is NOT on the preserve list and will be stripped by DA pipeline. Restructure: include the sup text directly in the heading default, drop the sup tag, accept rendered text without superscript footnote indicator in DA value.

6. Inline form on newsletter — keep static in template (no slots; form fields are placeholders).

### Slot inventory

- hero: bg-image, title, cta-primary (link), cta-secondary (link) — 4 slots
- incentive: title, body, foot — 3 slots
- model-grid: card-1.bg-image, card-1.title, card-1.cta, card-2..., card-3... — 12 slots (3 cards × 4)
- sustainability: bg-image, title, sub, cta — 4 slots
- charging: eyebrow, body, cta — 3 slots
- newsletter: title — 1 slot

Total: 4 + 3 + 12 + 4 + 3 + 1 = 27 slots

### Strip

- Stardust provenance comment (lines 4-29)
- Nothing else; no dev-tool markup, no `<br>`, no `<b>`/`<i>`/`<u>`.
