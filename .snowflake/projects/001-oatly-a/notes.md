# Notes — 001 oatly-a

## Phase: Capture

Fetched source from https://paolomoz.github.io/stardust-site/samples/oatly/proposed-A.html
Size: 17533 bytes. Stardust 0.2.0 provenance. No external CSS/JS. No external assets.
All inline SVG, no `<img>` tags.

## Phase: Analyze

### Structural map

```
Line  Element
─────────────────────────────────────────────────────────────────
1     <!DOCTYPE html>
27    <head> ... inline <style> (lines 27-342), no <link> elements
344   <body>
345     <a class="skip-link">  (accessibility, static)
347     <div class="browser" data-section="browser-window">  ← ENTIRE PAGE WRAPPER
349       <header class="window-rail" data-section="window-chrome-rail">
             home icon (SVG, static)
             <span class="window-title">Oatly | the Original…</span>  ← SLOT: window-title
             <div class="window-controls">
               <a class="ctrl">FAQ</a>  ← SLOT: ctrl-faq
               <a class="ctrl">SIZ</a>  ← SLOT: ctrl-siz
               icon-btn (locale, static SVG)
               icon-btn (close, static SVG)
             </div>
369       <nav class="tab-bar" data-section="tab-bar">
             <a class="tab">Products</a>  ← SLOT: tab-1
             <a class="tab">Tastebuds</a> ← SLOT: tab-2
             <a class="tab">News</a>      ← SLOT: tab-3
             <a class="tab">Sustainability</a> ← SLOT: tab-4
             <a class="tab">Health</a>    ← SLOT: tab-5
377       <main class="desktop" id="desktop" data-section="desktop">
             <div class="claim">The Original Oat Drink Company</div> ← SLOT: claim
             <div class="folders" role="list">
               <a class="icon-tile">fckfckfckoatly.com</a>   ← SLOT: folder-1 (link+label)
               <a class="icon-tile">fckfckoatly.com</a>      ← SLOT: folder-2
               <a class="icon-tile">fckoatly.com</a>         ← SLOT: folder-3
               <a class="icon-tile">fckfckfckfckfckoatly</a> ← SLOT: folder-4
               <a class="icon-tile">fckfckfcfckkoatly</a>   ← SLOT: folder-5
             </div>
             <div class="files" role="list">
               <a class="icon-tile">heybarista.png</a>   ← SLOT: file-1 (link+label)
               <a class="icon-tile">oatfinder.png</a>    ← SLOT: file-2
             </div>
             <a class="trash" aria-label="Trash">  (static, decorative)
446       <footer class="start-bar" data-section="start-taskbar">
             <button class="start-button">START</button>  (static)
             <input class="start-input" placeholder="Where to next?"> (static UI)
```

### Page architecture notes

- This is a browser/OS mockup — a single design frame with the entire page as one "browser window"
- The `<main class="desktop">` already exists; the overlay engine can use it
- The `<main>` has NO `<section>` children. The content elements (claim, folders, files) are divs/anchor
- Per architecture: the overlay engine does `templateMain.querySelectorAll('section[class]')`.
  We need to convert the top-level children of `<main>` to `<section>` elements.
- The page has a `.browser` outer wrapper — the header/footer fragment must include everything
  OUTSIDE `<main>` to preserve the browser-chrome visual.

### Header boundary decision

Everything from `<body>` start to `<main>` start is the header fragment:
- `<a class="skip-link">` (accessibility)
- `<div class="browser">` opening tag (can't split the div — need strategy)

**PROBLEM**: The `.browser` div WRAPS everything including the main. We cannot cleanly split
this into header/main/footer at the DOM level without restructuring.

**Resolution**: Include the opening of `.browser` in the header fragment, and close it in
the footer fragment. The template main is `<main class="desktop">` as-is.

Header fragment = skip-link + browser opening tag + window-rail header + tab-bar nav
Footer fragment = start-bar footer + closing `</div>` of .browser
Template main = the `<main class="desktop">` converted with section children

### Section structure for `<main class="desktop">`

The main has 4 direct children:
1. `div.claim` → rename to `section.claim`
2. `div.folders` → rename to `section.folders`
3. `div.files` → rename to `section.files`
4. `a.trash` → rename to `section.trash` (decorative, no meaningful slots)

All 4 become `<section>` elements with unique first classes.

### Slot analysis

**Header fragment (static — no slots):**
- window-title span text: "Oatly | the Original Oat Drink Company | Oatly" — could be a slot but header is static per architecture
- FAQ/SIZ ctrl links — static
- Tab bar links — static

Actually on reflection: headers are STATIC in the overlay pattern (read from code bus, not DA).
No slots in the header or footer fragments.

**Template (main) sections:**

`section.claim`:
- `.claim` div: text "The Original Oat Drink Company" → slot: `claim` (text)

`section.folders`:
- Each `.icon-tile` link: href is the URL, `.label` span is the display text
- Problem: `.icon-tile` has both `href` and inner `.label` text. The label has `<br>` tags.
- Per architecture: `<a data-slot>` copies href + innerHTML. But `<br>` in innerHTML will be in the DA cell... however, `<br>` is stripped by pipeline normalizer.
- Strategy: slot the `<a class="icon-tile">` elements directly (link slot on the `<a>`).
  The label text will be the DA cell content. `<br>` stripped is acceptable as label text still renders.
  The SVG folder-shape inside the `<a>` is decorative and static — the link slot writer sets innerHTML
  from the DA cell `<a>` which would lose the SVG. 
- **Better strategy**: slot only the `.label` span (text slot) and let the `<a>` href be static, OR
  we need to accept that link-slotting overwrites the SVG.
- **Final decision**: Slot the `<a class="icon-tile">` as a link slot. The DA cell contains
  `<a href="URL">label text</a>`. At runtime the link writer copies href and sets innerHTML to
  "label text" — this OVERWRITES the folder SVG. The SVG is decorative and lives in the template;
  we need a different approach.
- **Correct approach**: The SVG `.folder-shape` is template decoration. The authorable parts are
  the href and label text. Since we can't use nested data-slot, we should:
  - Put `data-slot` on the `.label` span (text slot — just the text, `<br>` gone on pipeline)
  - Keep the href static (same for all runs? No — authors need to change URLs)
  - Use a link slot on the `<a>` tag itself — this will overwrite SVG on render.
  
  Wait: the link slot writer does `el.innerHTML = value` which would destroy the SVG.
  But for initial authoring, the SVG is decorative and can be in the template. 
  If we slot the `<a>` as a link slot, runtime sets innerHTML = `<a href="url">label</a>` innerHTML
  = "label", losing SVG. The SVG needs to stay in the template visually.
  
  **Resolution**: We cannot slot the `<a>` as link slot (loses SVG) AND slot `.label` as text
  (loses href editability). Accept the trade-off: slot `.label` as text only (visible text is
  authorable), href remains static in the template. Folders are decorative enough that fixed
  URLs in the template are acceptable.
  
  For a cleaner authoring experience, slot the `<a>` as link slot: the DA block provides 
  href + display text, and the SVG is re-injected by the animations JS after the slot is applied.
  However we have no animations JS in this template.
  
  **Pragmatic final decision**: Slot `.label` as text slot on each folder. The `href` will be 
  a separate static-or-link slot. Use TWO slot approach: `folder-N.href` on the `<a>` (just href
  copied) and `folder-N.label` on `.label` span. But wait — link slot copies href AND innerHTML.
  If we slot the `<a>` as link AND the `.label` as text, that violates container-vs-children.
  
  **Simplest working approach**: slot the `<a class="icon-tile">` as a link slot. Accept that
  SVG is in the template and will be destroyed by innerHTML assignment. To preserve SVG:
  move the SVG to CSS using `content` or keep it in the template as before-pseudo. OR:
  simply accept that the SVG folder shape is static per-template, and when you slot the `<a>`,
  the slot writer sets innerHTML to just the anchor text, losing the SVG at runtime.
  
  This is a visual regression. The cleanest solution: DON'T slot the `<a>` as link. Instead,
  slot the `.label` text span. The href stays in the template (fixed URLs = acceptable for demo).
  Authors can edit the visible label text; URLs are code-managed. This is the right trade-off
  for a demo.

`section.files`:
- Same pattern as folders but with file-shape SVGs
- Slot `.label` span as text only (file-N.label)

`section.trash`:
- Purely decorative, no meaningful text slots
- `aria-label="Trash"` - static, not a text slot (aria attributes not in slot model)
- This section has zero slots. Still needs to be a `<section>` for template structure.

### Placeholder convention

Stardust 0.2.0 uses `<span class="placeholder-tag">` (per learnings). No placeholder markers
found in this page — all content is real.

### Asset strategy

No `<img>` tags, no external CSS, no relative asset paths. All graphics are inline SVGs.
No vendoring needed. Asset strategy: N/A.

### Head resources

No `<link>` elements in `<head>`. Inline `<style>` only. No external fonts — uses custom
font families with system fallbacks. No head resources to lift.

### Inline script

No inline `<script>` blocks. No animations JS needed.

### Summary of sections

1. `section.claim` — 1 slot (`claim` text)
2. `section.folders` — 5 slots (`folder-1.label` through `folder-5.label` text)
3. `section.files` — 2 slots (`file-1.label`, `file-2.label` text)
4. `section.trash` — 0 slots (decorative)

Total slots: 8
Total sections: 4

## Phase: Round-trip

### Production round-trip

- DA PUT: [verified] HTTP 200, contentUrl and editUrl confirmed
- POST preview on `sd-oatly-a`: [verified] HTTP 200, preview.status 200
- POST live on `sd-oatly-a`: [verified] HTTP 200, live.status 200
- Code-bus sanity probes:
  - `/templates/oatly-a.html` → 200 [verified]
  - `/styles/oatly-a.css` → 200 [verified]
  - `/fragments/oatly-a/header.html` → 200 [verified]
  - `/fragments/oatly-a/footer.html` → 200 [verified]
- Live page HTTP: 200 [verified]
- `<meta name="template" content="oatly-a">` present in live page [verified]
- Production URL: https://sd-oatly-a--snowflake-demos--aemcoder.aem.live/oatly/a
- DA editor URL: https://da.live/edit#/aemcoder/snowflake-demos/oatly/a

### Local round-trip

Skipped per autonomous mode instructions (no aem up).

### Notes

1. **`.browser` wrapper split**: The source wraps all content in `<div class="browser">`.
   Solved by putting opening tag in header fragment, closing `</div>` in footer fragment.
   This is a pattern worth documenting — "wrapper that spans header/main/footer" requires
   split injection at fragment boundaries.

2. **`trash` section has zero slots**: The trash icon is purely decorative SVG. It still
   needs to be a `<section>` in the template (renamed from `<a class="trash">`) to be
   properly parsed by the overlay engine. The section appears in the DA doc as an empty block.
   The original `<a>` is wrapped in a `<section class="trash">` containing a `<a class="trash-link">`.

3. **CSS `.desktop` background-image**: The `.desktop` section uses a relative URL
   `url("./grid-paper.svg")`. Rewrote to absolute `url("https://paolomoz.github.io/stardust-site/samples/oatly/grid-paper.svg")` in the extracted CSS.

4. **Slot granularity decision**: Chose to slot only `.label` text spans on icon-tiles,
   not the `<a>` link href. This keeps SVG folder/file shapes intact at render time.
   Trade-off: URLs are static in the template, only visible text is authorable in DA.
   For a demo this is acceptable; a real production site would need a different approach
   (e.g., separate href slot + label slot, or restructure template to inject SVG via CSS).

## Phase: Reflect

Run complete. 8 slots, 4 sections. Page renders correctly in production with template meta tag.

