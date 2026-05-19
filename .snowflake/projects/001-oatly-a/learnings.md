# Learnings — 001 oatly-a

## 2026-05-19 — Outer wrapper divs that span header/main/footer require fragment split

**Context.** The Oatly browser-mockup design wraps ALL page content (header + main + footer)
inside `<div class="browser">`. The overlay pattern needs header fragment, main template, and
footer fragment to be independent units. The `.browser` wrapper breaks that cleanly.

**Solution.** Split the wrapper across fragments:
- Opening tag (`<div class="browser">`) → end of header fragment
- `</div>` closing tag → start of footer fragment
- The `<main>` template contains only the desktop content

This works because the header block's `innerHTML` injection appends to the EDS `<header>` element,
and the footer block appends to `<footer>`. The browser chrome div is effectively injected
into the page via header fragment and closed by footer fragment.

**Generic rule.** When a source uses a full-viewport wrapper div that contains header/main/footer
as flex children, open the wrapper in the header fragment and close it in the footer fragment.
The overlay engine will assemble them correctly.

[not promoted — specific to full-bleed wrapper pattern, may be worth adding to methodology once confirmed on a second case]

## 2026-05-19 — Decorative sections with zero slots still need to be `<section>` elements

**Context.** The trash icon is an `<a class="trash">` — purely decorative. It has no authorable
content. It still needs to appear in the template as a `<section class="trash">` because the
overlay engine parses ALL direct children of `<main>` as sections. If the original `<a>` is
kept, the engine sees it as an anchor (not a section[class]) and skips the DOM position,
potentially mis-laying the absolute-positioned element.

**Solution.** Rewrite the `<a>` to `<section class="trash">` with the `<a class="trash-link">`
inside. Adjust CSS: `.trash` keeps position:absolute/z-index etc., `.trash-link` gets
cursor:pointer and hover transform.

[not promoted — already implied by the "rewrite non-section blocks to section" rule]

## 2026-05-19 — Icon-tile link slot vs. label-only slot trade-off

**Context.** Each `.icon-tile` is an `<a>` containing a decorative SVG shape + `.label` span.
Using a link slot on the `<a>` would overwrite innerHTML at runtime (losing the SVG).
Using a text slot on `.label` preserves the SVG but makes the href static.

**Decision.** For demo purposes, text slot on `.label` only. Accepted trade-off: href values
are in the template (code-managed). For a production overlay, the right solution would be
either: (a) slot href separately as a data-attribute slot (not currently in the substrate),
or (b) restructure the template so the SVG comes from CSS `content`/`background-image` and
the `<a>` can be safely link-slotted.

[not promoted — specific to SVG-inside-link pattern; the substrate data-attribute slot
enhancement is worth tracking as a future feature request]
