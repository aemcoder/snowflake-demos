# Learnings — 001 acom-bizpro-hub

Per-project findings from the BizPro Hub conversion.

## 2026-05-20 — Asset-fetch shell loop drops last line on missing trailing newline [promote candidate]

**Context.** Phase 1 captured 74 asset references into `/tmp/asset-refs.txt`,
but only 73 files landed in `input/assets/`. The `<img src="assets/send-icon.svg">`
in the search section ended up 404'ing on production.

**Root cause.** The fetch loop used `while IFS= read -r ref; do ...; done < file`.
`read` returns non-zero (loop exits) if EOF is reached without a trailing
newline. Our file was generated via `[...refs].sort().join("\n")` (no trailing
`\n`), so the last entry (`assets/send-icon.svg` — alphabetically last) was
silently dropped.

**Fix applied to this project.** Manually fetched the missing icon and added
to repo `assets/`.

**Generic rule.** Use one of:
- `while IFS= read -r ref || [ -n "$ref" ]; do ...; done` — picks up the
  no-newline last line
- `[...refs].sort().map(r => r + "\n").join("")` — emit trailing newline
- Read into an array and iterate: `mapfile -t arr < file; for ref in "${arr[@]}"`

Promote to skill's `phases/1-capture.md` asset-fetch snippet.

## 2026-05-20 — `POST preview` races Code Sync; vendored assets bake as `about:error` [promote candidate]

**Context.** Right after `git push`, ran `POST preview`. Media Bus tried to
fetch the absolute branch-URL `<img>` references from DA cells, but Code
Sync hadn't deployed the vendored assets yet, so Media Bus baked
`<img src="about:error">` into the published page.

**Symptom.** 16 `about:error` images in the rendered DOM; the substrate's
writeSlot dutifully copied `about:error` into the template's `<img>` elements.
Console reported `net::ERR_UNKNOWN_URL_SCHEME @ about:error:0`.

**Fix applied to this project.** Sanity-probed
`https://<branch>--<repo>--<owner>.aem.page/templates/<tpl>.html` and a
sample asset URL after push. Once those returned 200, re-ran `POST preview`
and `POST live` — Media Bus then content-addressed all images correctly.

**Generic rule.** For any `assetStrategy=vendor` run:
1. `git push`
2. Probe vendored asset paths (and the template HTML) for HTTP 200
3. Only then `POST preview` and `POST live`

Or: if `about:error` appears, re-trigger preview after probing — the second
attempt succeeds once assets are reachable.

Promote to skill's `phases/5-roundtrip.md` between the push step and the
preview POST.

## 2026-05-20 — Substrate loads CDN GSAP+ScrollTrigger+Lenis even when template ships vendored libs [substrate gap]

**Context.** Our template uses Lenis (vendored as
`/scripts/acom-bizpro-hub-lenis.min.js`) but does not use GSAP or
ScrollTrigger. The substrate's `scripts/delayed.js` hardcodes the CDN
deps array and loads all three unconditionally before any animation engine
runs.

**Cost.**
- ~130 KB wasted fetch for GSAP + ScrollTrigger (not used)
- ~20 KB wasted fetch for CDN Lenis (we use the vendored copy)
- 1 console warning when the jsdelivr URL 404s (Lenis CDN URL is stale —
  see `cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.42/bundled/lenis.min.js`
  which returns 404)

**Fix idea (substrate level).** Make `cdnDeps` per-template by reading
metadata, or probe `/scripts/<template>-<libname>.js` first and skip the
CDN when the template ships its own. Alternatively: drop CDN deps from
substrate entirely and require templates that need them to load them from
their animations script.

**Branch-level workaround.** None applied — the CDN 404 is cosmetic, page
renders fine.

Promote to skill knowledge once the substrate fix lands.

## 2026-05-20 — Cell `<picture>` wrappers transparent to writeSlot

**Context.** EDS pipeline wraps `<img>` references in DA cells with
`<picture>` elements containing multiple `<source>` variants. Looked at
first as a possible failure mode for the `IMG`-slot writer.

**Resolution.** Not a failure mode. `writeSlot()` calls
`parseFirst(value, 'img')` which uses `querySelector('img')` — descendant
search finds the wrapped `<img>` correctly. The picture wrapping is
invisible to the slot writer.

Worth documenting as expected pipeline behavior so future debugging of
`<img data-slot>` doesn't waste time on this.

Promote to skill's `architecture.md` "Slot semantics" section.

## 2026-05-20 — DA path collision with existing doc (not a bug — informational)

**Context.** Per orchestrator instructions, the `versionsource` POST was
expected to 404 (first conversion of a new path). Instead it returned 201
— meaning the document already existed at `/acom/bizpro-hub/a.html` on DA.

**Hypothesis.** The DA path had previously been written to by another
process (perhaps a manual test or another agent). The 201 created a
labeled snapshot before our PUT overwrote it, preserving the prior content
as expected. The orchestrator's "404 expected" assumption was wrong — but
the versionsource step is unconditionally safe (201 OR 404 are both fine).

No fix needed. Worth noting that the "first conversion of a new path" can
encounter existing content if another caller has touched the path.
