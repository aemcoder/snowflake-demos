# Learnings — 001 liquiddeath-a

## 2026-05-19 — Stardust 0.2.0 liquiddeath page — clean conversion, no surprises

**Context.** Stardust 0.2.0 page for Liquid Death, brand-faithful Mode A.
All image URLs were absolute CDN URLs on `liquiddeath.com/cdn/shop/files/`. No local asset vendoring needed.
5 sections with `<section>` tags and `data-section` attributes matching the EDS discriminator pattern.
Sections 3 (manifesto), 4 (merch-grid), 5 (dual-cta) needed first-class prepend from data-section value.

**Outcome.** Straight-through conversion. All self-checks passed on first attempt. DA PUT + preview + live all 200.

**Generic rule (already in methodology).** When data-section value differs from the first class, prepend data-section as new first class and keep original classes for CSS compatibility.

**Note on product/merch cards.** Kept as static template content (not slotted) because they are commerce-data-driven catalog items. Only section headings were slotted. This is appropriate for e-commerce pages where the product grid is backend-driven.

**No head-level link elements.** Fonts were loaded via `@import url(...)` inside the inline `<style>` block, not via `<link>` elements in `<head>`. No head-level links to lift into the template.
