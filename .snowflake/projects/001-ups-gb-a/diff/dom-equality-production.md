# DOM equality report

- **Source URL:**     https://paolomoz.github.io/stardust-site/samples/ups-gb/proposed-A.html
- **Rendered URL:**   https://sd-ups-gb-a--snowflake-demos--aemcoder.aem.live/ups-gb/a
- **Source scope:**   `body`
- **Rendered scope:** `body`
- **Generated:**      2026-05-20T09:05:45.380Z

## Summary

| Field                 | Source                  | Rendered                | Status |
|-----------------------|-------------------------|-------------------------|--------|
| Element count         | 382                     | 243                     | ✗      |
| Tag+class sequence    | 382                     | 243                     | ✗      |
| Visible text (chars)  | 4066                    | 3307                    | ✗      |
| Image refs            | 9                       | 8                       | ✗      |

**Overall:** **FAIL**

## Differences

### elementCount

Source has 382, rendered has 243 (delta: -139).

### tagSequence

First divergence at position 0.

```diff
- [0] a.skip
  [1] header.site-header
  [2] div.utility-bar
---
+ [0] header.header-wrapper
  [1] div.header
  [2] div
```

### visibleText

Source: 4066 chars, rendered: 3307 chars. First divergent character at position 1.

Source context:

> Skip to main content Log in Find Closest UPS Locati

Rendered context:

> SELF-SERVICE Track a Parcel Enter one tracking or U

### imageSrcs

1 unexpected difference(s):

- Image count differs: source=9, rendered=8

*Media Bus rewrites (`./media_<sha>.<ext>?...`) are not counted as differences.*

