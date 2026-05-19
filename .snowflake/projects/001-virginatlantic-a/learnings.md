# Learnings — 001 virginatlantic-a

## 2026-05-19 — Stardust source with `<form>` block instead of `<section>` block

### Context

The Stardust generator emitted the booking widget as a `<form
class="booking">` directly inside `<div class="wrap">`, not as a
`<section>`. Substrate matches block tables to template via
`section[class]` only, so the booking block was unreachable.

### Fix applied (this project)

Rewrite the outermost element to `<section class="booking-section">`
in the template, with the inner `.booking` card retained as a child
div. The first-class is `booking-section` (not `booking`) to avoid
collision with the inner card's CSS rules. In CSS, scope:

```css
main > section:not(.booking-section) { padding: var(--pad-section) 0; }
main > section.booking-section { padding: 0; }
```

### Generic rule

When a Stardust source's "section" is rendered as a non-`<section>`
container (e.g. `<form>`, `<aside>`, `<div>`), and the source's inner
elements depend on a specific class on a child of that container:

1. Don't reuse the source's inner-card class as the section's
   first-class — it'll collide.
2. Coin a new section-level first-class (e.g. `<originalclass>-section`).
3. Add a CSS rule to exclude or zero the section padding/margin so
   the inner card's negative-margin overlap still works.

This is the second time this pattern has surfaced (vanguard run-002
had a similar booking-widget shape). Promote to skill knowledge as a
common Stardust pattern.

[promoted-candidate]

---

## 2026-05-19 — Section without a `class` attribute (only `id`)

### Context

Source had `<section id="destinations" data-section="destinations">`
— no `class` at all. Substrate's `section[class]` selector wouldn't
match, so the destinations block wouldn't get its slots.

### Fix applied (this project)

Added `class="destinations"` to the template's `<section>` element
directly. DA cell named the block `destinations`. Worked.

### Generic rule

During Analyze, scan every section for the presence of a `class`
attribute. If missing, surface it as a decision: "section <id> has
no class — needs one added." The simplest fix is to add a class
matching the `id` or `data-section` attribute.

This is documented in methodology.md but worth re-emphasizing
because it's a silent failure — the page renders without the
overlay applying to that section, falling back to plain text.
