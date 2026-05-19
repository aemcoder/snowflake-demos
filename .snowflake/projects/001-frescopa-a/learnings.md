# Learnings — 001 frescopa-a

## 2026-05-19 — Hero CSS background-image is not a slot when it's not an inline style

**Context.** The Frescopa hero section uses `background-image` via a CSS class rule
(in the extracted `<style>` block), NOT as an inline `style` attribute on the element.
The overlay engine's background-image slot writer fires only when
`el.style.backgroundImage` is truthy — i.e., there's an inline style on the element.

**Visible symptom.** If you tried to add `data-slot` to `.hero` for the background image,
the slot writer would never trigger because there's no inline style to detect.

**Fix applied.** Left the hero background-image entirely in `styles/frescopa-a.css`
with the absolute URL. No slot created for it. The hero image is static design content
for this template.

**Generic rule.** Background-image slots only work when the source element has
`style="background-image:url(...)"` as an inline attribute. CSS-class-driven background
images stay in the CSS file unchanged; they are not authorable through the slot mechanism
without DOM restructuring.

**NOT promoted** — this is a nuance documented in architecture.md already (background-image
slot case requires inline style). No new cross-project rule needed.
