# 001 — lemonade-a learnings

## Page-specific findings

### Stardust .ds-placeholder is a CSS overlay convention

The Stardust prototype generator used here applies placeholder UI via a CSS class (`.ds-placeholder`) that adds a `::after` overlay with text "PLACEHOLDER". This is a third placeholder convention distinct from:

- Stardust 0.3.0: `<element data-placeholder="true">` attribute
- Stardust 0.2.0: `<span class="placeholder-tag">` inline marker

For this page the marker is on the *outer* element of each placeholder card (the whole tweet card, the whole how-it-works caption). `data-slot-skip="placeholder"` on the same element correctly preserves the markup verbatim.

Not yet generic enough to promote — three observed conventions across Stardust output is a pattern worth tracking but the "skip the whole element" mechanism in the substrate already handles all three uniformly.

### Rating block: inline `<span>` without class

The source has:

```html
<div class="ds-social-proof__rating">4.9<span>/5</span></div>
```

With CSS `.ds-social-proof__rating span { font-size: 24px; ... }` styling the `<span>`. Both `<span class="...">` AND `<span>` without class are stripped by the pipeline normaliser if the slot value comes through DA. So this rating block cannot be a slot — either:

1. Keep it static template content (chosen here)
2. Restructure source markup to use `<strong>` (semantic + survives pipeline)

Option 1 is the lowest-friction path for fixed numerical content that won't change.

### Pre-flight SVG sizing matters

7 of the 16 referenced images on this page exceeded the 40KB DA Media Bus cap. Without checking sizes during Analyze, the Generate phase would have included them as image slots, the DA PUT would have succeeded, and the preview POST would have failed with 409 AEM_BACKEND_FETCH_FAILED at the very end of the pipeline.

The methodology already mentions this; for pages with many SVG assets, do the HEAD-content-length sweep during Analyze to catch this early.
