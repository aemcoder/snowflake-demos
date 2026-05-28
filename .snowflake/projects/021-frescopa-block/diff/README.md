# Round-trip diff — 021 frescopa-block (local)

Local dev server: `aem up --html-folder drafts` on port **3487** (the AEM CLI
picks a branch-specific port in a git worktree, not 3000).
Page: `http://localhost:3487/drafts/frescopa-block-home-a.html`

## Structural verification (playwright eval)

| Check | Result |
|-------|--------|
| `body.appear` | ✅ true |
| `main > .section` count | ✅ 6 (one per content block) |
| Blocks loaded (`data-block-status`) | ✅ all 6: hero, shop-categories, subscription-card-on-bay, locations-finder, featured-coffee, rewards-cta-band |
| Hero H1 text + `<em>` accent | ✅ "Find your *perfect* coffee in four questions." |
| Hero `--hero-bg` custom prop | ✅ absolute stardust.style URL |
| Shop cards | ✅ 5, first href `/machines` |
| CTA `.btn` variants | ✅ hero on-bay + secondary; subscription/locations/rewards on-bay; featured on-porcelain |
| Locations structural form | ✅ `<form.search-row>` with authored placeholder + submit label |
| Header (promo strip + nav) | ✅ loaded from fragment |
| Footer (5 cols + legal) | ✅ loaded from fragment |
| Console errors | ✅ 0 (after removing the local-only metadata block from drafts body) |

## Text equality vs source

All visible copy matches the source verbatim:
- 6 headings, 6 eyebrows, 6 CTA labels
- 5 card titles + 5 catalog lines

## Screenshots

- `comparison.png` — side-by-side, source (left) vs converted EDS (right). Pixel-identical hero/header.
- `local-<section>.png` — per-section viewport captures of the converted page
  (hero, shop-categories, subscription-card-on-bay, locations-finder, featured-coffee, rewards-cta-band).
- `local-header-view.png` — converted promo strip + sticky nav + hero (== source).
- `source-hero-fresh.png` — source hero/header reference.

## Notes

- **playwright-cli screenshot caching**: after a cross-origin `goto`, the
  `screenshot` command returned a stale buffer (identical MD5 across genuinely
  different pages). Per-section captures taken in tight eval→screenshot
  succession on a single origin are reliable; cross-origin recapture needs a
  fresh `open`. Worked around by capturing source in a clean browser session.
- **metadata block**: kept in the DA doc (the EDS pipeline lifts it to `<head>`
  meta tags + removes it from `<main>`). Removed from the drafts body because
  `aem up --html-folder drafts` serves files as-is, so `decorateBlocks` would
  try to load a nonexistent `/blocks/metadata/*` and 404. The drafts `<head>`
  already carries the `<meta>` tags from the transform step.

Production round-trip: pending DA token refresh (token expired; user opted to
pause before production).
