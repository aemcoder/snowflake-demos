# Learnings — 001 ups-gb-a

## 2026-05-19 — Clean public-CDN source requires no asset migration

The UPS GB Proposed-A page sources all images from `assets.ups.com` and `www.ups.com` as
absolute CDN URLs. No vendoring or DA media migration was needed. Asset strategy "absolute"
worked with zero friction — copy the source img `src` verbatim into template and DA cells.

[not promoted — specific to this well-formed source]

## 2026-05-19 — Stardust 0.3.0 with band utility classes: all sections needed first-class rewrite

6 of 8 sections had `band`, `band-surface`, or `band-deep` as their first class. All had
unique `data-section` attributes. Rewriting first class to the data-section value was
mechanical and safe — CSS rules using `.band` continued to match because the class stayed
in the list, just not first.

**Rule (already in methodology):** Always check first-class collisions early in Analyze.
When `data-section` is present, use it as the canonical first class.

[not promoted — already covered in methodology]

## 2026-05-19 — Form-heavy hero section: forms are static, not slots

The tracking-hero has four tab forms with functional HTML (radio inputs, form actions to
UPS services, field labels). These are structural UI, not content. The correct decision
was to slot only the copy text and hero photo, leaving all form markup static in template.

**Rule:** Form UI (inputs, labels, action URLs, hidden fields) belongs in the template.
Only the heading, eyebrow, and adjacent copy text that would change between markets/variants
should be slots.

[not promoted — general principle, not new]
