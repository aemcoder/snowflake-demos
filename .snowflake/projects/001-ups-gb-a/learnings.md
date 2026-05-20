# Learnings — 001 ups-gb-a

## 2026-05-20 — UPS hotlink protection produces Media Bus `about:error` on DA cell `<img>` [promoted]

### Context

The Stardust source page references images from two UPS-controlled hosts:
- `assets.ups.com/adobe/…` — works fine cross-origin.
- `www.ups.com/gb/en/media_…` and `www.ups.com/webassets/…` — these are subject to UPS hotlink protection. Cross-origin TCP connections are reset at the HTTP/2 layer (curl `HTTP 000`, browser `ERR_HTTP2_PROTOCOL_ERROR`).

The source page's provenance comment already calls this out: "imageHosts: www.ups.com, assets.ups.com — referenced by URL; subject to UPS hotlink protection."

### Visible symptom

Two `<img>` slots in `services-case-studies` rendered with `src="about:error"` after the first DA PUT. One `ERR_UNKNOWN_URL_SCHEME` console error. The source page itself also shows the same images broken (naturalWidth 0), but with a less severe `ERR_HTTP2_PROTOCOL_ERROR` instead of the `about:error` scheme error.

### Fix applied to this project

Removed `case-1.image` and `case-2.image` slot rows from `output/da/a.html`. With those slots absent from DA, the substrate's `applySlotsToTemplate` does not call `writeSlot` on the matching `<img data-slot>` template defaults — the template's original `src` URLs remain in place. The browser then attempts to fetch them directly, producing the same `ERR_HTTP2_PROTOCOL_ERROR` the source page has — not the worse `about:error`. Visual outcome matches source.

### Generic rule [promoted candidate]

**Analyze phase should HEAD/TCP-probe every image URL referenced by an image slot.** If the probe fails (TCP reset, `HTTP 000`, 403 with hotlink markers), drop the slot row from the DA doc and let the template default carry the URL through. This avoids `about:error` propagation through Media Bus.

Today this gap surfaces only during Round-trip as an `about:error` symptom; a Phase-2 pre-flight would catch it pre-publish.

## 2026-05-20 — Stardust 0.3.0 page with no inline `<script>` and no head-level `<link>`s

This source page uses no JavaScript, no Google Fonts, no external CSS. Tabs are CSS-only via hidden `<input type="radio">` + sibling `:checked` selectors. The Stardust 0.3.0 placeholder convention (`data-placeholder="true"`) is also absent — every slot is fully populated in the source. Run completed with no `scripts/<template>-animations.js` file and no `headLinks` entries.

Cross-project note: Stardust 0.3.0 outputs with packed/brand-faithful mode tend to be self-contained HTML+CSS with no runtime JS. Worth handling cleanly in the Analyze phase as "no animations engine needed".
