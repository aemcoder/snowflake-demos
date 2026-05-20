# DOM equality report

- **Source URL:**     https://paolomoz.github.io/stardust-site/samples/theroadhome/proposed-A.html
- **Rendered URL:**   https://sd-theroadhome-a--snowflake-demos--aemcoder.aem.live/theroadhome/a
- **Source scope:**   `body`
- **Rendered scope:** `body`
- **Generated:**      2026-05-20T06:37:18.680Z

## Summary

| Field                 | Source                  | Rendered                | Status |
|-----------------------|-------------------------|-------------------------|--------|
| Element count         | 198                     | 158                     | ✗      |
| Tag+class sequence    | 198                     | 158                     | ✗      |
| Visible text (chars)  | 2225                    | 1868                    | ✗      |
| Image refs            | 12                      | 10                      | ✗      |

**Overall:** **FAIL**

## Differences

### elementCount

Source has 198, rendered has 158 (delta: -40).

### tagSequence

First divergence at position 0.

```diff
- [0] header
  [1] div.container
  [2] a.site-header__logo
---
+ [0] header.header-wrapper
  [1] div.header
  [2] div
```

### visibleText

Source: 2225 chars, rendered: 1868 chars. First divergent character at position 0.

Source context:

> GET HELP GIVE GET INVOLVED ABOUT US DONATE FOR 100

Rendered context:

> FOR 100 YEARS REFUGE. RESOURCES. RELIEF. The Road 

### imageSrcs

1 unexpected difference(s):

- Image count differs: source=12, rendered=10

*Media Bus rewrites (`./media_<sha>.<ext>?...`) are not counted as differences.*

