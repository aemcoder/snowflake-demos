# DOM equality report

- **Source URL:**     http://127.0.0.1:8081/hub/
- **Rendered URL:**   http://localhost:3000/drafts/a.html
- **Source scope:**   `body`
- **Rendered scope:** `body`
- **Generated:**      2026-05-22T07:55:03.053Z

## Summary

| Field                 | Source                  | Rendered                | Status |
|-----------------------|-------------------------|-------------------------|--------|
| Element count         | 1057                    | 968                     | ✗      |
| Tag+class sequence    | 1057                    | 968                     | ✗      |
| Visible text (chars)  | 2024                    | 1575                    | ✗      |
| Image refs            | 122                     | 122                     | ✗      |

**Overall:** **FAIL**

## Differences

### elementCount

Source has 1057, rendered has 968 (delta: -89).

### tagSequence

First divergence at position 0.

```diff
- [0] div.grid-overlay
  [1] div.bp-indicator
  [2] div.hint
---
+ [0] header.header-wrapper
  [1] div.header
  [2] div.mega-nav-dim
```

### visibleText

Source: 2024 chars, rendered: 1575 chars. First divergent character at position 1095.

Source context:

> k faster. No matter the work. Sales Close more deals. Turn insights into action 

Rendered context:

> k faster. No matter the work. There’s more to Acrobat than Acrobat. Work smarter

### imageSrcs

122 unexpected difference(s):

- [0] source=`assets/icons/B_app_AdobeFirefly.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeFirefly.svg`
- [1] source=`assets/icons/B_app_CreativeCloud.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_CreativeCloud.svg`
- [2] source=`assets/icons/B_app_Photoshop.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_Photoshop.svg`
- [3] source=`assets/icons/B_app_PremierePro.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_PremierePro.svg`
- [4] source=`assets/icons/B_app_AdobeAcrobatPDF.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeAcrobatPDF.svg`
- [5] source=`assets/icons/B_app_Illustrator.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_Illustrator.svg`
- [6] source=`assets/icons/B_app_ExperienceCloud.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_ExperienceCloud.svg`
- [7] source=`assets/icons/B_app_ExperiencePlatform.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_ExperiencePlatform.svg`
- [8] source=`assets/icons/B_app_AdobeFirefly.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeFirefly.svg`
- [9] source=`assets/icons/B_app_AdobeAcrobatPDF.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeAcrobatPDF.svg`
- [10] source=`assets/icons/B_app_CreativeCloud.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_CreativeCloud.svg`
- [11] source=`assets/icons/B_app_PremierePro.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_PremierePro.svg`
- [12] source=`assets/icons/B_app_Photoshop.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_Photoshop.svg`
- [13] source=`assets/icons/B_app_CreativeCloud.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_CreativeCloud.svg`
- [14] source=`assets/icons/B_app_AdobeAcrobatPDF.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeAcrobatPDF.svg`
- [15] source=`assets/icons/B_app_AdobeAcrobatPDF.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeAcrobatPDF.svg`
- [16] source=`assets/icons/B_app_AdobeAcrobatPDF.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeAcrobatPDF.svg`
- [17] source=`assets/icons/B_app_ExperiencePlatform.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_ExperiencePlatform.svg`
- [18] source=`assets/icons/B_app_ExperienceCloud.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_ExperienceCloud.svg`
- [19] source=`assets/icons/B_app_AdobeAcrobatPDF.svg` rendered=`https://content.da.live/aemcoder/snowflake-demos/media/acom-hub/icons/B_app_AdobeAcrobatPDF.svg`
- … (102 more)

*Media Bus rewrites (`./media_<sha>.<ext>?...`) are not counted as differences.*

