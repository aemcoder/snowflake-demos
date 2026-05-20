# Learnings — 001 lovesac-a

## 2026-05-20 — Regression test: substrate v1.0.4 handles all known lovesac patterns cleanly

This is a refresh-style run of the lovesac-a sample. Under the vanilla-refresh
contract, the conversion sub-agent operated without consulting any prior run's
findings — only bundled skill knowledge, project methodology override, the
live source URL, and the current substrate. The substrate (v1.0.4) cleanly
handled every pattern in the source:

- Heading-in-heading `writeSlot` unwrap (already promoted in v1.0.3)
- Background-image dispatch ordering (BG before A — already promoted)
- `body > header, body > footer { padding: 0 }` reset (already promoted)

No NEW substrate gaps surfaced. The conversion's branch-level fixes are
limited to template-level decisions (section first-class naming, `<div>` →
`<section>` rewrite) that are inherent to the source structure and would
recur on any future lovesac-shaped page.

## 2026-05-20 — Pattern: section sharing first-class with a CSS-grid inner div

Source pattern:

```html
<section data-section="lifestyle-grid">      <!-- no class attribute -->
  <div class="container">
    <div class="lifestyle-grid">              <!-- inner 3-col grid -->
      <article class="lifestyle-card">...
```

CSS:

```css
.lifestyle-grid { display: grid; grid-template-columns: repeat(3, 1fr); ... }
```

The mechanical first-class derivation rule says "use `data-section` if
present". Naïvely that gives `<section class="lifestyle-grid">`, which
inherits the inner div's 3-column grid rule and breaks layout (the
section's children get arranged as 3 grid columns instead of being a
normal block-flow container).

**Detection in Analyze:** during the first-class collision sweep, check
whether the proposed first-class appears in the page CSS with layout
properties (`display`, `grid`, `flex`, `width`, `height`, `visibility`).
If yes, the proposed class is meant for an INNER element and can't be the
section's first-class.

**Fix:** use a different discriminator. Per the bundled discriminator
hierarchy:
1. `data-section` (or a transformation of it)
2. `id` attribute
3. Slug from eyebrow/label
4. Positional `section-N`

For lovesac, `lifestyle-grid` failed step 1's CSS-collision check, so we
went with `lifestyle` — `data-section`'s root noun (also matches
`data-intent="lifestyle"`).

This pattern is already documented in cross-project `learnings.md`
(2026-05-19 inner-CSS-class collision) — surfaced again here as the
regression test for that rule.

## 2026-05-20 — Pattern: non-section block inside `<main>`

The source places a `<div class="fin-line">` (financing message) between
two `<section>` siblings inside `<main>`. CSS targets the class with
text-align/padding/background — no layout grid.

The overlay engine matches blocks by `section[class]`, so the div would
never receive its slot value. **Fix:** rewrite the outermost tag to
`<section>`, preserving the class list and inner DOM. The CSS continues
to match (`.fin-line { ... }` selects by class regardless of element type).
The new section also picks up the page CSS `section { padding: ... }`
generic rule, but `.fin-line` class-level padding overrides it on specificity.

Pattern already documented in bundled `learnings.md` 2026-05-19 ("Hero
(or any logical section) may be a `<div>`, not `<section>` — rewrite to
`<section>`"). Surfaced again here.
