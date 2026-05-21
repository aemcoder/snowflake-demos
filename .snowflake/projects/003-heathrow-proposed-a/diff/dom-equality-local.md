# DOM equality report

- **Source URL:**     https://paolomoz.github.io/stardust-site/samples/heathrow/proposed-A.html
- **Rendered URL:**   http://localhost:3000/drafts/page.html
- **Source scope:**   `body`
- **Rendered scope:** `body`
- **Generated:**      2026-05-21T15:09:14.881Z

## Summary

| Field                 | Source                  | Rendered                | Status |
|-----------------------|-------------------------|-------------------------|--------|
| Element count         | 157                     | 162                     | ✗      |
| Tag+class sequence    | 157                     | 162                     | ✗      |
| Visible text (chars)  | 3357                    | 3357                    | ✓      |
| Image refs            | 3                       | 3                       | ✗      |

**Overall:** **FAIL**

## Differences

### elementCount

Source has 157, rendered has 162 (delta: +5).

### tagSequence

First divergence at position 0.

```diff
- [0] header.site-header
  [1] div.site-header__row
  [2] a.site-header__brand
---
+ [0] header.header-wrapper
  [1] div.header
  [2] header.site-header
```

### imageSrcs

3 unexpected difference(s):

- [0] source=`assets/logos/heathrow-white.png` rendered=`https://paolomoz.github.io/stardust-site/samples/heathrow/assets/logos/heathrow-white.png`
- [1] source=`assets/photos/hero-vision.jpg` rendered=`https://paolomoz.github.io/stardust-site/samples/heathrow/assets/photos/hero-vision.jpg`
- [2] source=`assets/logos/heathrow-white.png` rendered=`https://paolomoz.github.io/stardust-site/samples/heathrow/assets/logos/heathrow-white.png`

*Media Bus rewrites (`./media_<sha>.<ext>?...`) are not counted as differences.*

