# Project Learnings — 004 acom-hub

Findings from this run. Items tagged `[promote]` are candidates to lift
into the snowflake skill bundle's `knowledge/learnings.md` or substrate.

---

## 2026-05-22 — DA `/media/` asset strategy works; uploader belongs in skill bundle [promote]

**Context.** First snowflake run to use DA `/media/` migration instead of
vendoring under `./assets/`. The eds-da-content skill documents the
mechanism fully (§4.1 Source API, §13 decision tree) but snowflake's
methodology still calls /media migration "out of scope unless the user
asks" because the uploader script wasn't bundled.

**Approach.** Wrote `tools/da-media-upload.mjs` — a 270-line Node 22
script that walks a local asset tree and PUTs each file to
`https://admin.da.live/source/{org}/{repo}/{scope}/{rel-path}` via the
Source API, emitting a mapping JSON of local-path → content.da.live URL
for the Generate phase to consume.

**Outcome.**
- 33 binaries (16 PNG, 15 SVG, 1 JPG, plus 1 mobile-only PNG) uploaded
  successfully on first run, ~10 MB total.
- DA Source API returned 200 OK for every PUT; content.da.live serves
  immediately, no preview step needed (binaries skip the
  preview/publish lifecycle per eds-da-content media.md §3.4).
- Media Bus sideloaded the DA-cell `<img src>` URLs on first preview
  and the production page renders `./media_<sha>.<ext>?width=750&...`
  optimised paths. Confirmed in production: hub card images deliver
  through Media Bus.

**Generic rule.** When asset binaries are being migrated for a snowflake
run, prefer DA `/media/<scope>/<file>` over vendoring in `/assets/`
unless there's a specific reason not to (single-doc author uploads,
existing AEMaaCS DAM, etc.). The trade-offs:

|                              | Vendor in `/assets/` | Upload to DA `/media/` |
|------------------------------|----------------------|------------------------|
| Repo size                    | +N MB committed      | unchanged              |
| Branch-independence          | No                   | **Yes**                |
| Survives doc rename / move   | Yes (root-relative)  | Yes                    |
| Initial-run effort           | curl + sed (~15 min) | uploader (~30 min then reusable) |
| URL form in HTML / fragments | `/assets/...`        | content.da.live URL    |
| URL form in DA cells         | absolute branch URL  | content.da.live URL    |
| Sideloads into Media Bus     | Yes (via Code Bus)   | Yes (via Content Bus)  |
| Delivered image URL          | `./media_<hash>`     | `./media_<hash>`       |

**Promotion candidates for the snowflake skill bundle:**

1. **Add `tools/da-media-upload.mjs`** (or equivalent) to
   `<SKILL_DIR>/scripts/` so phases 1/3 can invoke it directly. The
   script is host-portable (Node 22 built-in fetch + FormData + Blob, no
   external deps).
2. **Update `methodology.md` §3** to document `da-media` as an
   asset strategy alongside `absolute` and `vendor`, with a short
   procedure: walk asset tree → upload → emit mapping → rewrite refs.
3. **Update `methodology.md` §3.7** with the rewrite plan when using
   `da-media`: template / fragment / page-CSS refs go to
   `https://content.da.live/{org}/{repo}/media/{scope}/{path}`; DA cell
   refs go to the same content.da.live URLs.
4. **Update `0-prereq.md`** to flag the script's existence so future
   runs find it without re-deriving the contract from eds-da-content.

---

## 2026-05-22 — Source page's dev tooling needs explicit stripping

**Context.** Hand-coded Adobe.com prototype includes:
- 3 dev-tool divs in `<body>` (`.grid-overlay`, `.bp-indicator`, `.hint`)
- 1 inline `<script>` block at end of body implementing M/G keyboard
  shortcuts to toggle them
- `reveal-tuner.js` — a separate script that injects a "Timeline
  controls" UI panel for adjusting scroll-reveal animation timings

Source page hides the dev-tool divs by default (`style="display:none"`)
and the keyboard shortcut JS only shows them when the user presses M.
But `reveal-tuner` injects its panel **unconditionally** and shows it on
load — visible in our screenshots as a panel labeled "Timeline controls
+" in the bottom-right.

**Decision for this run.** We stripped the 3 dev-tool divs + the inline
debug script (lines 33–38, 1015–1073 in source), but kept reveal-tuner
in the animation engine. Reveal-tuner's UI is cosmetic on top of the
page and doesn't break functionality.

**Better path for future runs.** When source pages bundle dev tooling
(scroll tuners, breakpoint indicators, grid overlays), strip ALL of it
during Generate — including any scripts that inject debug UIs. Add a
check in Analyze: list every `<script src>` whose name suggests dev
tooling (`*-tuner.js`, `*-debug.js`, etc.), confirm with user, strip.

**Promote**: Not yet — the rule needs to play out on more runs before
hardening into methodology. Document here as a per-project finding.

---

## 2026-05-22 — Hub-router animation triggers correctly without #smooth-wrapper

**Context.** Source page wraps `<main>` in `<div id="smooth-wrapper">
<div id="smooth-content">`. The overlay engine's
`body.querySelector('main')` finds the `<main>` and copies its innerHTML
into the rendered page's `<main>` — the wrappers are NOT preserved.

I worried this would break the smooth-scroll setup. It didn't. The
hub-router GSAP animation runs correctly (verified via console logs:
`[hub] buildTimeline ENTRY (st=null)`, hub cards transition through
their `--flying` state). Lenis smooth-scroll initializes against the
window, not against `#smooth-wrapper`, so no DOM dependency exists.

**Take-away.** The `#smooth-wrapper > #smooth-content` pattern is a
GSAP ScrollSmoother convention that Lenis-based pages don't actually
need. Future Adobe.com bespoke pages may have the same convention
without semantic load; safe to drop in the overlay template.

**Not promoting yet** — needs a clear rule about WHICH source page
animation-stack patterns survive overlay extraction. Document for now.

---

## 2026-05-22 — Animation engine size budget

**Context.** 234 KB animation engine for this page:
- gsap.min.js: 72 KB
- ScrollTrigger.min.js: 44 KB
- 9 project scripts: ~115 KB
- inline init: ~3 KB

That's ~70% of the page's total JS budget. Heavier than the heathrow
run (~0 KB animations) and bizpro-hub (varied).

**Observation.** Source pages with complex GSAP-driven animations are
where the per-template animation engine adds most value (and most
weight). For pages without animations, the engine HEAD-probes and
short-circuits — no cost. Our engine is loaded in the delayed phase, so
the eager critical path is unaffected.

**No action needed** — this is an architectural property of the design.
Worth surfacing to anyone reviewing performance reports.
