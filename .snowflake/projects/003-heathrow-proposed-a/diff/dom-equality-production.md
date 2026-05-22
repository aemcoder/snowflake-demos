# DOM equality report

- **Source URL:**     https://paolomoz.github.io/stardust-site/samples/heathrow/proposed-A.html
- **Rendered URL:**   https://test-sf-eds-da--snowflake-demos--aemcoder.aem.page/test-sf-eds-da/page
- **Source scope:**   `body`
- **Rendered scope:** `body`
- **Generated:**      2026-05-21T15:15:07.540Z

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

2 unexpected difference(s):

- [0] source=`assets/logos/heathrow-white.png` rendered=`https://paolomoz.github.io/stardust-site/samples/heathrow/assets/logos/heathrow-white.png`
- [2] source=`assets/logos/heathrow-white.png` rendered=`https://paolomoz.github.io/stardust-site/samples/heathrow/assets/logos/heathrow-white.png`

*Media Bus rewrites (`./media_<sha>.<ext>?...`) are not counted as differences.*

