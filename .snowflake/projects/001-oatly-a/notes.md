# Notes — 001 oatly-a

## Phase: Capture

- Fetched `https://paolomoz.github.io/stardust-site/samples/oatly/proposed-A.html`
  (17533 bytes, 454 lines) into `input/index.html`.
- The source references one relative asset: `./grid-paper.svg`
  (background image on `.desktop`). Probed it on the source host:
  returns 404 — the asset is broken at the source. Three forms tried
  (`/samples/oatly/`, `/samples/`, `/`), all 404. We rewrite the URL to
  absolute (pointing to the source host) for fidelity; the same 404 will
  show in production but the page renders fine without the grid backdrop.

## Phase: Analyze

### Page shape

This is a Stardust 0.2.0 page emulating a "browser/window" OS UI. The
body contains a `.skip-link` then a single `<div class="browser">`
wrapping four siblings:

```
<body>
  <a class="skip-link">Skip to content</a>
  <div class="browser" data-section="browser-window">
    <header class="window-rail">     ← chrome (window controls + title)
    <nav class="tab-bar">            ← primary nav tabs
    <main class="desktop" id="desktop"> ← claim + folders + files + trash
    <footer class="start-bar">       ← bottom taskbar
  </div>
</body>
```

This is NOT a conventional site layout — the `<header>` and `<footer>`
tags here are part of the OS-window visual chrome, not site navigation
or site footer. The `.browser` wrapper is itself positioned `fixed`
with `inset:0` so the whole thing fills the viewport like a desktop.

### Header/footer fragment decisions

A conventional split (header fragment = pre-`<main>`, footer = post-
`</main>`) is **not appropriate** here:

1. EDS landmark `<header>`/`<footer>` sit at body level; the source's
   `<header>` and `<footer>` are CSS-flex children of `.browser` and
   only render correctly inside that wrapper.
2. The skip-link + browser wrapper + window-rail + tab-bar would all
   land in the header fragment, leaving very little inside the template
   `<main>` — and the source's `<main class="desktop">` content
   (claim + folders + files + trash) would be detached from the
   `.browser` flex column.

Decision: **collapse everything into the template's `<main>`**.

- `<header>` fragment = empty placeholder (just a comment).
- `<footer>` fragment = empty placeholder.
- Template `<main>` = the entire `.browser` wrapper, with inner
  elements rewritten so they become matchable `<section[class]>` for
  the overlay engine:
  - `<header class="window-rail">` → `<section class="window-rail">`
  - `<nav class="tab-bar">` → `<section class="tab-bar">`
  - `<main class="desktop">` → `<section class="desktop">`
  - `<footer class="start-bar">` → `<section class="start-bar">`

A second `<main>` inside the EDS landmark `<main>` would be invalid
HTML, so the source's `<main class="desktop">` must become a
`<section>`. CSS keys on `.desktop` so this is transparent.

The `<a class="skip-link">` belongs OUTSIDE the `.browser` wrapper
visually (it only appears on focus). It will be hoisted into the
template `<main>` ABOVE the `.browser` div so it stays in tab order
at the top of main.

### Section list

Each rewritten section gets a slot table:

| # | First class | Original tag | Slots                              |
|---|-------------|--------------|------------------------------------|
| 1 | window-rail | header       | window-title, ctrl-1, ctrl-2       |
| 2 | tab-bar     | nav          | tab-1..tab-5 (5 link/text slots)   |
| 3 | desktop     | main         | claim, folder-1..folder-5, file-1, file-2 |
| 4 | start-bar   | footer       | start-label                        |

Slots inside `desktop`: claim (text), folder-1..5 (text labels — the
URLs are part of the joke and stay hardcoded), file-1, file-2 (text
labels).

### Slot type rationale

- **window-title** — text slot on `<span class="window-title">`.
- **ctrl-1, ctrl-2** — `<a class="ctrl">` carries `href="#"` (decorative).
  Slotting the anchor with the link writer would replace href + content
  on edit. Because href is `#` and only the visible text varies, we mark
  the anchors with `data-slot` and emit DA cells as plain text — the
  link writer falls through to `innerHTML = value`, leaving href alone.
- **tab-1..tab-5** — same pattern: anchors with hash-only hrefs. Plain
  text in DA cell; link writer sets innerHTML only.
- **claim** — text slot on `<div class="claim">`.
- **folder-1..5** — each tile is `<a class="icon-tile">` with nested
  `<span class="folder-shape">` (SVG) and `<span class="label">`. Per
  the container-vs-children rule, NEVER slot the outer `<a>` while the
  inner span is also a slot. Slot only the `<span class="label">` as
  text; the URL stays hardcoded on the anchor. Labels in source contain
  `<br>` for line wrapping — pipeline strips `<br>`, so we emit DA
  cell values without it. CSS `.label { word-break: break-word }` lets
  them wrap if needed.
- **file-1, file-2** — same as folders.
- **start-label** — text slot on `<button class="start-button">`.
- The trash icon has no editable text and is omitted from slots.
- The window-controls' icon buttons (locale, close) have no text — no
  slots.
- The start-input's placeholder is an attribute; substrate doesn't
  support attribute slots — left as template default.

### Head-level link resources

The source `<head>` has only `<meta charset>`, `<meta viewport>`, and
`<title>`, plus the inline `<style>`. No external `<link>` resources to
lift (no Google Fonts, no preconnects).

### Inline styles / scripts

- One inline `<style>` block, lines 26–342 (~316 lines).
- Zero inline `<script>` blocks. No animation engine needed.
- No external `<script src>` references.

### Asset strategy

- One relative reference: `./grid-paper.svg` inside CSS `url(...)`.
- Source: `https://paolomoz.github.io/stardust-site/samples/oatly/`.
- Probe: 404 at all candidate paths — the asset is missing at source.
- Strategy: rewrite to absolute pointing at the source host
  (`https://paolomoz.github.io/stardust-site/samples/oatly/grid-paper.svg`).
  Will 404 on both local and production; degrades gracefully (background
  becomes solid cream color). No DA-cell image refs to worry about.

### CSS first-class collision check

Section first-classes: `window-rail`, `tab-bar`, `desktop`, `start-bar`.
Each has a corresponding CSS rule with layout properties. BUT in this
case the rules were authored FOR those elements (the source has
`<header class="window-rail">` matching `.window-rail { ... }`). Rewriting
to `<section class="window-rail">` keeps the same selector match —
no collision pattern (which is about inner-class-promoted-to-outer).

### Skip-link

The `<a class="skip-link">` anchors `#desktop`. After rewriting `<main
class="desktop" id="desktop">` to `<section class="desktop" id="desktop">`,
the anchor target still resolves. Keep the skip-link as template chrome
(no slot — it's accessibility infrastructure, not authorable).

### Decisions surfaced

1. **Empty header/footer fragments.** Document the rationale in a
   comment inside each fragment.
2. **Rewrite four inner elements** (`header`, `nav`, `main`, `footer`)
   to `<section>` while keeping their class lists intact.
3. **Hoist the skip-link** above `.browser` inside template `<main>`.
4. **Slot folder/file/tab/ctrl anchors as text-only** (no link writer
   replacement); href stays hardcoded.
5. **No `<br>` in DA cell values** — the pipeline strips them; let CSS
   wrap labels via `word-break: break-word`.
6. **`grid-paper.svg` rewrites to absolute** but will 404 (source bug,
   not ours). Graceful degradation.
