# 003-aman — Block-level conversion

- **Source URL:** `http://127.0.0.1:8080/samples/aman/proposed-A.html`
- **Generator:** Stardust 0.2.0 (provenance comment in source)
- **Variant:** A · Calibration
- **Captured:** 2026-05-28
- **Conversion level:** block-level
- **Branch:** test-sf-blocks-03
- **DA path:** /test-sf-blocks-03/aman

## Page intent

Aman luxury hospitality homepage. Atmospheric hero, editorial sections,
card grids for experiences and brand extensions.

## Structure

```
<header class="site-header">          → fragment: fragments/aman/header.html
<section data-section="hero">         → block: hero
<section data-section="seasonal-feature">  → block: seasonal-feature
<section data-section="twin-features">     → block: twin-features
<section data-section="audience-grid">     → block: audience-grid
<section data-section="world-of-aman">     → block: world-of-aman
<footer class="site-footer">          → fragment: fragments/aman/footer.html
<script>…scroll listener…</script>    → ported into blocks/header/header.js
```

## Asset strategy

`absolute` — all images are `https://www.aman.com/...` URLs. No vendoring.
SVG logo is inline in the header fragment.

## Fonts

Source uses `Lyon Display Web` / `Whitney SSm A` with system fallbacks.
Proprietary fonts, no CDN. System fallbacks render: `Times New Roman` / `system-ui`.
