# Learnings — 001 oatly-a

## 2026-05-20 — OS-chrome pages need empty EDS landmark fragments

**Context.** The Oatly Variant-A page from Stardust 0.2.0 is a stylized
OS desktop UI: a `.browser` div wraps `<header class="window-rail">`,
`<nav class="tab-bar">`, `<main class="desktop">`, and
`<footer class="start-bar">` as siblings in a flex column. The
`.browser` itself is `position: fixed; inset: 0` to fill the viewport.

The standard methodology rule "header fragment = pre-`<main>`, footer
fragment = post-`</main>`" doesn't fit this shape:

- The source's `<header>`/`<footer>` are flex children of `.browser`,
  not site-level navigation/footer.
- EDS landmark `<header>`/`<footer>` are at body level. If we split
  the source's `<header>`/`<footer>` into separate fragments, the
  flex layout inside `.browser` breaks — its required children are
  scattered across three different ancestor elements.

**Fix applied to this project.** Collapse everything into the template
`<main>`. The four inner elements (`<header>`, `<nav>`, `<main>`,
`<footer>`) are rewritten to `<section[class]>` so the overlay engine
matches them. The EDS landmark `<header>` and `<footer>` get
intentionally-empty fragment files (just a comment explaining why).

**Generic rule.** When the source's `<header>` and `<footer>` are
nested inside a wrapping container that requires them to remain
siblings of `<main>` (flex/grid layout, position:fixed wrapper,
shared visual chrome), prefer collapsing into the template `<main>`
over fragmenting them out. Provide empty header/footer fragments so
the EDS landmarks exist but contribute no visual content.

This is the symmetric counterpart to the existing methodology entry
"Header is broader than `<header>`" (which says to PULL siblings
INTO the header fragment when they functionally belong with it).
Sometimes the right move is the opposite: push the `<header>`
content DOWN into `<main>` because it belongs with `<main>` visually.

Trigger heuristic to detect this case: source body has at most one
wrapping element (e.g. `<div class="browser">`) that uses
`position: fixed/absolute` or `display: flex/grid` and contains the
`<header>`, `<main>`, and `<footer>` as direct children with shared
parent-relative layout. If so, collapse-into-main is the cleanest
shape. `[promoted]`

## 2026-05-20 — Text-only slot on `<a>` with hash href stays editable without losing href

**Context.** The Oatly page has anchors with `href="#"` for purely
decorative ctrl buttons (FAQ, SIZ) and tab labels (Products,
Tastebuds, ...) where only the visible text varies between
implementations and the href has no real destination.

If we use the standard link slot (DA cell contains `<a href="..">text</a>`),
the link writer copies BOTH href and innerHTML from the cell. Editing
the label requires the author to manually preserve the `#` href in
every cell — fragile and surprising.

**Fix applied.** Mark the anchor with `data-slot` AND emit DA cell as
plain text (no `<a>` element). The link writer in scripts.js falls
through to `innerHTML = value`, leaving href untouched:

```js
if (tagName === 'A' && !(el.style && el.style.backgroundImage)) {
  const a = parseFirst(value, 'a');
  if (a) {
    el.href = a.getAttribute('href');
    el.innerHTML = a.innerHTML;
  } else {
    el.innerHTML = value;   // ← this path: just sets text
  }
  return;
}
```

DA cell: `<div>ctrl-1</div><div>FAQ</div>` — plain text in the value
cell, no anchor.

**Generic rule.** For anchors whose hrefs are hash-only or otherwise
fixed (`href="#"`, `href="#section-name"`), text-only slot is the
right choice. The substrate already supports it via the existing
fall-through; no substrate change needed. Document this pattern in
the methodology so Generate-phase authors don't reach for the link
slot pattern by default. `[promoted]`
