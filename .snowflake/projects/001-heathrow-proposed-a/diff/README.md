# Diff — local overlay vs source

## Tag count comparison

| Tag | Source | Local | Δ |
|---|---|---|---|
| SECTION | 4 | 4 | 0 |
| DIV | 37 | 37 | 0 |
| P | 24 | 24 | 0 |
| IMG | 1 | 1 | 0 |
| A | 10 | 10 | 0 |
| H1 | 1 | 1 | 0 |
| H2 | 3 | 3 | 0 |
| H3 | 6 | 6 | 0 |
| STRONG | 4 | 4 | 0 |
| BR | 4 | 4 | 0 |
| SPAN | 6 | 10 | +4 |
| **Total** | **100** | **104** | **+4** |

### Intentional deltas

- **+4 `<span>` in the phases section.** The original `.phase__copy` paragraph contains `<strong>X</strong><br />Y`. The DA pipeline strips `<br>` from cell content, so the detail text after the `<br>` is split into its own slot wrapped in a `<span data-slot="phase-N.detail">`. The `<br>` stays in the template (it's parsed as HTML, not normalised), and the source's visual rendering is preserved (one line break between headline and detail).

## Section first-class rename

| Source first class | Renamed to | Why |
|---|---|---|
| `hero` | (unchanged) | Already unique. |
| `section` (1st) | `pillars` | First-class collision. Eyebrow "About this consultation" → chose `pillars` (descriptive, no CSS collision). |
| `section` (2nd) | `phased-expansion` | First-class collision. Eyebrow "A phased expansion" → slug. (Originally considered `phases`, but `.phases` is the CSS class of the inner timeline grid container — would collide.) |
| `cta-band` | (unchanged) | Already unique. |

Original classes preserved in the class list of each section; CSS rules continue to match.

## Visual comparison

Per-section screenshots:
- `local-hero.jpeg` — hero with photo backdrop + title + lead + buttons
- `local-pillars.jpeg` — 6 pillar cards in a 3-up grid
- `local-phased-expansion.jpeg` — 4-phase horizontal timeline
- `local-cta-band.jpeg` — final CTA band

The "Respond to the consultation" button in `cta-band` appears as unstyled text. **This matches the source** (`source-cta-band.png` for comparison) — both `.btn` and `.cta-band` use `var(--brand-purple)` as background, so the non-`--inverse` button blends into the section. A design quirk in the original, faithfully reproduced.

## Overlay verification

```json
{
  "overlayApplied": "heathrow-proposed-a",
  "sectionCount": 4,
  "sectionClasses": ["hero", "pillars", "phased-expansion", "cta-band"],
  "bodyAppearClass": true,
  "headerLoaded": true,
  "footerLoaded": true
}
```

Console: 1 expected 404 — the substrate's `delayed.js` HEAD-probe for `/scripts/heathrow-proposed-a-animations.js`. No animations script for this template; the 404 is cosmetic.
