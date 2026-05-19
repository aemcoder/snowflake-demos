# Learnings — 001 heathrow-proposed-a

## 2026-05-19 — Eyebrow-slug discriminator must avoid colliding with inner CSS classes [promoted-candidate]

**Context.** Two `<section class="section">` elements needed disambiguation. Per the documented hierarchy, falling back to eyebrow slugs gave `pillars` and `phases`.

**Visible symptom (averted).** `phases` would have made the outer `<section>` pick up the `.phases { display: grid; grid-template-columns: repeat(4, 1fr) }` rule that's already used for the inner timeline container — laying out the section as a 4-column grid of itself.

**Fix applied to this project.** Used `phased-expansion` instead. The outer section keeps the section padding from `.section` and the tint background from `.section--tint`; the inner `.phases` div retains its grid layout.

**Generic rule (if promotable).** When picking an eyebrow-slug discriminator, grep the page CSS for the candidate class. If it appears elsewhere (especially on a descendant element), pick a longer or different slug. Add to the discriminator-hierarchy entry in cross-project learnings.

## 2026-05-19 — Inline `<br>`-separated phase copy split into `<strong>` + `<span>` slots

**Context.** Source's `.phase__copy` is `<p><strong>Headline</strong><br />Detail</p>`. `<br>` is stripped from DA cells. A single slot value on the `<p>` would lose the headline/detail visual split.

**Fix applied to this project.** Two slots per phase: `phase-N.headline` (on the `<strong>`) and `phase-N.detail` (on a `<span>` introduced for the slot target). The `<br>` stays in the template (template HTML is parsed by the browser, not normalised by the DA pipeline), so the visual line break is preserved.

**Generic rule.** Already documented in `learnings.md` 2026-05-19 `<br>` entry — this run validated the rule end-to-end with two slots emitted as plain text values and the rendered DOM showing the headline/detail split.
