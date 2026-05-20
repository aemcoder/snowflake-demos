# Learnings — 001 nvidia-a

## 2026-05-20 — Substrate CDN URL for Lenis is stale (warns on every page)

**Context:** Substrate `scripts/delayed.js` HEAD-probes for `/scripts/<template>-animations.js`, then loads Lenis + GSAP + ScrollTrigger from CDN before invoking the animation engine. The Lenis URL `https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.42/bundled/lenis.min.js` no longer resolves.

**Visible symptom:** Every overlay page logs:
```
[WARNING] [animations] CDN dep missed: failed: https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.42/bundled/lenis.min.js
```

The page still works because the animation engine defensively checks `typeof Lenis !== 'undefined'` before using it. Pages without Lenis-driven scroll behavior (most overlay templates) render identically.

**Generic rule (promotable):** Substrate animation deps should either (a) be loaded from currently-resolvable CDN URLs, or (b) be reduced to silent failures unless the template's animations.js actually needs them. Suggest moving the warn-on-miss to debug-verbosity, or removing Lenis from the universal preload list and letting per-template animation scripts opt in.

[promote-to-skill] — substrate change

## 2026-05-20 — Tile structure forces link-OR-content authoring trade-off

**Context:** NVIDIA tiles use `<a class="tile-X" href="..."><img/><band>eyebrow + h3 + cta-span</band></a>`. The link wraps multiple authorable children. Per the container-vs-children rule, you cannot expose the outer `<a>` as a link slot AND the inner image/text as separate slots — the link writer's `el.innerHTML = ...` clobbers nested slot markers.

**Choice this run:** Slot inner image + eyebrow + h3. Outer `<a href>` stays static — link target is NOT authorable. Acceptable trade-off for a content-marketing page where copy and imagery turnover happens but link targets are stable.

**Generic rule (worth considering for substrate):** An "attribute slot" — `<a data-slot-href="tile-1.link">` would let the substrate write only the `href` attribute, leaving innerHTML and nested slot markers intact. Then both link target and inner content become authorable. Roughly 4 lines of additional writeSlot dispatch:

```js
const hrefSlot = el.getAttribute('data-slot-href');
if (hrefSlot && hrefSlot in blockSlots) {
  const a = parseFirst(blockSlots[hrefSlot], 'a');
  if (a) el.href = a.getAttribute('href');
}
```

DA cell value would be a single `<a href="...">link target</a>` and the writer would extract just the href.

[promote-to-skill] — substrate addition (small, isolated)

## 2026-05-20 — Pre-flight URL probe in Generate self-check would catch broken source links

**Context:** One image in the source page (`theme-gaming-creating` tile-4) referenced a nvidia.com URL that returns HTTP 404. The DA cell carries the same URL (correctly — it matches source), and Media Bus substitutes `<img src="about:error">` after a failed fetch.

**Visible symptom:** One broken tile in the rendered DOM; one console `ERR_UNKNOWN_URL_SCHEME` error.

**Generic rule (promotable to methodology):** Add to Generate phase self-check 3.9 — HEAD-probe every absolute `<img src>` URL in the DA doc. Warn on 4xx/5xx so the operator knows which tiles will render broken. Doesn't block the conversion (source-data issue, not conversion bug), but surfaces the problem visibly before the round-trip rather than after.

```bash
# In Generate phase self-check, after writing DA doc:
grep -oE '<img[^>]*src="(https?://[^"]+)"' "$PROJ/output/da/$PAGE_SLUG.html" \
  | grep -oE 'https?://[^"]+' \
  | sort -u \
  | while IFS= read -r url; do
      code=$(curl -sI -o /dev/null -w '%{http_code}' "$url")
      [ "$code" = "200" ] || echo "WARN: DA img returns $code: $url"
    done
```

[promote-to-skill] — methodology self-check addition

## 2026-05-20 — Refresh on a vanilla substrate: clean output, no branch-level patches needed

**Context:** This was a refresh run against substrate v1.0.4. The source page had been converted before (closed run on the same branch — not consulted per vanilla-refresh contract), but the new conversion produced no branch-level CSS overrides, no template patches, no DA-cell workarounds. Everything was solved by the existing methodology + substrate.

**Generic finding:** The vanilla-refresh contract works. When the skill knowledge is sufficient (substrate handles heading-in-heading, picture writer, background-image dispatch order, etc.), a clean refresh produces clean output on the first try. If a prior run needed branch-level fixes that the current substrate has absorbed (e.g. via v1.0.3 heading writer), those fixes simply don't recur on refresh — proof that promoting learnings to substrate pays off.

This source page also happened to have well-behaved CSS (class-scoped, no bare element selectors competing with EDS landmarks), which kept the surface area small.

Not promotable as a separate learning — but worth noting as evidence the contract is healthy.
