# Learnings — 001 lemonade

## 2026-05-19 — DA Media Bus rejects SVGs over ~40KB with a 409 during preview POST

The DA pipeline's Media Bus validates SVG file sizes when converting HTML to Markdown during `POST preview`. SVGs over ~40KB (the documented cap) cause a 409 with:
```
AEM_BACKEND_FETCH_FAILED: Images N have failed validation
```

This is not a network error — the images ARE publicly reachable. The Media Bus fetches and validates them as part of html2md conversion, and the cap is enforced server-side.

**Lemonade page specifics:** Most of the large hero and bundle illustrations are SVGs well over 40KB (home-left 45KB, home-right 76KB, press logos 251KB, bundle cards 81–158KB, pizza 176KB). Only the product tile SVGs (8–18KB) and PNG badges passed validation.

**Fix applied:** Remove over-limit SVG image slots from the DA doc. The template's default values display those images correctly at runtime (browser fetches SVG directly from CDN, no Media Bus involved). Only text and under-40KB-image slots were kept in the DA doc.

**Asymmetry to remember:** The template/fragment HTML fetches images via the browser, which is not subject to the 40KB SVG cap. The DA doc's `<img>` tags go through Media Bus conversion at preview time, which IS subject to the cap. So a large SVG can live in the template default but must be omitted from the DA cell.

## 2026-05-19 — Placeholder convention in this source: CSS class `ds-placeholder`

This page uses `class="ds-placeholder"` rather than `data-placeholder="true"` (Stardust 0.3.0) or `<span class="placeholder-tag">` (Stardust 0.2.0). The placeholder badge is CSS-generated via `::after { content: 'PLACEHOLDER' }` on the class.

These elements (4 tweet cards + 3 how-it-works captions) were correctly marked `data-slot-skip="placeholder"` in the template and omitted from the DA doc.

## 2026-05-19 — DA block class name must exactly match template section's FIRST class

The overlay engine's `readBlockSlots` keys slots by the DA block div's first class, and `applySlotsToTemplate` matches by the template section's first class. If the source uses `ds-hero` as the section's first class, the DA block div must ALSO be `class="ds-hero"` — not `class="hero"` or any other form.

This is a minor but easy-to-miss trap when the source uses prefixed class names (like Lemonade's `ds-` prefix).
