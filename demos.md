# Snowflake demos

Each row below is one snowflake-skill run converting a static
AI-generated page into an Edge Delivery Services overlay page. Every
demo lives on its own branch; `main` stays vanilla so each new demo
starts from a clean boilerplate.

Branches are tagged `snowflake-<NNN>-close` when sealed. The page is
published on the run's own branch (`aem.live` for that branch) — not
on `main`.

> The corresponding `main--…aem.live/<path>` URL may exist for a demo
> (legacy publishes, or shared DA content) but will not render the
> overlay — `main` has no substrate code. Always use the demo URL in
> the table below.

## Stardust Showcase

Source pages are brand homepages uplifted with
[Stardust](https://stardust.style/) — an AI-powered design tool that
generates polished static HTML+CSS from existing brand identities.
Each proposed-A page is the first variant generated for that brand.

| # | Source | Branch | Tag | Demo URL | History |
|---|---|---|---|---|---|
| 001 | [Heathrow proposed-A](https://paolomoz.github.io/stardust-site/samples/heathrow/proposed-A.html) | [`snowflake-001`](https://github.com/aemcoder/snowflake-demos/tree/snowflake-001) | `snowflake-001-close` | <https://snowflake-001--snowflake-demos--aemcoder.aem.live/heathrow/proposed-a> | — |
| 002 | [Vanguard proposed-A](https://paolomoz.github.io/stardust-site/samples/vanguard/proposed-A.html) | [`sd-vanguard-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-vanguard-a) | `sd-vanguard-a-close` | <https://sd-vanguard-a--snowflake-demos--aemcoder.aem.live/vanguard/a> | — |
| 003 | [Stardust Whitepaper proposed-A](https://paolomoz.github.io/stardust-site/samples/stardust-whitepaper/proposed-A.html) | [`sd-stardust-whitepaper-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-stardust-whitepaper-a) | `sd-stardust-whitepaper-a-close` | <https://sd-stardust-whitepaper-a--snowflake-demos--aemcoder.aem.live/stardust-whitepaper/a> | — |
| 004 | [Virgin Atlantic proposed-A](https://paolomoz.github.io/stardust-site/samples/virginatlantic/proposed-A.html) | [`sd-virginatlantic-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-virginatlantic-a) | `sd-virginatlantic-a-close` | <https://sd-virginatlantic-a--snowflake-demos--aemcoder.aem.live/virginatlantic/a> | 2026-05-19: <https://sd-virginatlantic-a-2026-05-19--snowflake-demos--aemcoder.aem.live/virginatlantic/a-2026-05-19> (tag `sd-virginatlantic-a-2026-05-19-close`) |
| 005 | [The Road Home proposed-A](https://paolomoz.github.io/stardust-site/samples/theroadhome/proposed-A.html) | [`sd-theroadhome-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-theroadhome-a) | `sd-theroadhome-a-close` | <https://sd-theroadhome-a--snowflake-demos--aemcoder.aem.live/theroadhome/a> | 2026-05-20: <https://sd-theroadhome-a-2026-05-20--snowflake-demos--aemcoder.aem.live/theroadhome/a-2026-05-20> (tag `sd-theroadhome-a-2026-05-20-close`) |
| 006 | [Patagonia proposed-A](https://paolomoz.github.io/stardust-site/samples/patagonia/proposed-A.html) | [`sd-patagonia-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-patagonia-a) | `sd-patagonia-a-close` | <https://sd-patagonia-a--snowflake-demos--aemcoder.aem.live/patagonia/a> | — |
| 007 | [Festool proposed-A](https://paolomoz.github.io/stardust-site/samples/festool/proposed-A.html) | [`sd-festool-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-festool-a) | `sd-festool-a-close` | <https://sd-festool-a--snowflake-demos--aemcoder.aem.live/festool/a> | — |
| 008 | [Glossier proposed-A](https://paolomoz.github.io/stardust-site/samples/glossier/proposed-A.html) | [`sd-glossier-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-glossier-a) | `sd-glossier-a-close` | <https://sd-glossier-a--snowflake-demos--aemcoder.aem.live/glossier/a> | 2026-05-20: <https://sd-glossier-a-2026-05-20--snowflake-demos--aemcoder.aem.live/glossier/a-2026-05-20> (tag `sd-glossier-a-2026-05-20-close`) |
| 009 | [Aman proposed-A](https://paolomoz.github.io/stardust-site/samples/aman/proposed-A.html) | [`sd-aman-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-aman-a) | `sd-aman-a-close` | <https://sd-aman-a--snowflake-demos--aemcoder.aem.live/aman/a> | — |
| 010 | [Polestar proposed-A](https://paolomoz.github.io/stardust-site/samples/polestar/proposed-A.html) | [`sd-polestar-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-polestar-a) | `sd-polestar-a-close` | <https://sd-polestar-a--snowflake-demos--aemcoder.aem.live/polestar/a> | 2026-05-20: <https://sd-polestar-a-2026-05-20--snowflake-demos--aemcoder.aem.live/polestar/a-2026-05-20> (tag `sd-polestar-a-2026-05-20-close`)<br>2026-05-19: <https://sd-polestar-a-2026-05-19--snowflake-demos--aemcoder.aem.live/polestar/a-2026-05-19> (tag `sd-polestar-a-2026-05-19-close`) |
| 011 | [Oatly proposed-A](https://paolomoz.github.io/stardust-site/samples/oatly/proposed-A.html) | [`sd-oatly-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-oatly-a) | `sd-oatly-a-close` | <https://sd-oatly-a--snowflake-demos--aemcoder.aem.live/oatly/a> | 2026-05-20: <https://sd-oatly-a-2026-05-20--snowflake-demos--aemcoder.aem.live/oatly/a-2026-05-20> (tag `sd-oatly-a-2026-05-20-close`) |
| 012 | [One Medical proposed-A](https://paolomoz.github.io/stardust-site/samples/onemedical/proposed-A.html) | [`sd-onemedical-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-onemedical-a) | `sd-onemedical-a-close` | <https://sd-onemedical-a--snowflake-demos--aemcoder.aem.live/onemedical/a> | — |
| 013 | [Liquid Death proposed-A](https://paolomoz.github.io/stardust-site/samples/liquiddeath/proposed-A.html) | [`sd-liquiddeath-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-liquiddeath-a) | `sd-liquiddeath-a-close` | <https://sd-liquiddeath-a--snowflake-demos--aemcoder.aem.live/liquiddeath/a> | — |
| 014 | [Lemonade proposed-A](https://paolomoz.github.io/stardust-site/samples/lemonade/proposed-A.html) | [`sd-lemonade-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-lemonade-a) | `sd-lemonade-a-close` | <https://sd-lemonade-a--snowflake-demos--aemcoder.aem.live/lemonade/a> | 2026-05-20: <https://sd-lemonade-a-2026-05-20--snowflake-demos--aemcoder.aem.live/lemonade/a-2026-05-20> (tag `sd-lemonade-a-2026-05-20-close`) |
| 015 | [JFK Airport proposed-A](https://paolomoz.github.io/stardust-site/samples/jfk-airport/proposed-A.html) | [`sd-jfk-airport-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-jfk-airport-a) | `sd-jfk-airport-a-close` | <https://sd-jfk-airport-a--snowflake-demos--aemcoder.aem.live/jfk-airport/a> | 2026-05-20: <https://sd-jfk-airport-a-2026-05-20--snowflake-demos--aemcoder.aem.live/jfk-airport/a-2026-05-20> (tag `sd-jfk-airport-a-2026-05-20-close`)<br>2026-05-19: <https://sd-jfk-airport-a-2026-05-19--snowflake-demos--aemcoder.aem.live/jfk-airport/a-2026-05-19> (tag `sd-jfk-airport-a-2026-05-19-close`) |
| 016 | [Lovesac proposed-A](https://paolomoz.github.io/stardust-site/samples/lovesac/proposed-A.html) | [`sd-lovesac-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-lovesac-a) | `sd-lovesac-a-close` | <https://sd-lovesac-a--snowflake-demos--aemcoder.aem.live/lovesac/a> | 2026-05-20: <https://sd-lovesac-a-2026-05-20--snowflake-demos--aemcoder.aem.live/lovesac/a-2026-05-20> (tag `sd-lovesac-a-2026-05-20-close`) |
| 017 | [UPS GB proposed-A](https://paolomoz.github.io/stardust-site/samples/ups-gb/proposed-A.html) | [`sd-ups-gb-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-ups-gb-a) | `sd-ups-gb-a-close` | <https://sd-ups-gb-a--snowflake-demos--aemcoder.aem.live/ups-gb/a> | 2026-05-20: <https://sd-ups-gb-a-2026-05-20--snowflake-demos--aemcoder.aem.live/ups-gb/a-2026-05-20> (tag `sd-ups-gb-a-2026-05-20-close`) |
| 018 | [Nvidia proposed-A](https://paolomoz.github.io/stardust-site/samples/nvidia/proposed-A.html) | [`sd-nvidia-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-nvidia-a) | `sd-nvidia-a-close` | <https://sd-nvidia-a--snowflake-demos--aemcoder.aem.live/nvidia/a> | 2026-05-20: <https://sd-nvidia-a-2026-05-20--snowflake-demos--aemcoder.aem.live/nvidia/a-2026-05-20> (tag `sd-nvidia-a-2026-05-20-close`) |
| 019 | [Frescopa proposed-A](https://paolomoz.github.io/stardust-site/samples/frescopa/proposed-A.html) | [`sd-frescopa-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-frescopa-a) | `sd-frescopa-a-close` | <https://sd-frescopa-a--snowflake-demos--aemcoder.aem.live/frescopa/a> | 2026-05-19: <https://sd-frescopa-a-2026-05-19--snowflake-demos--aemcoder.aem.live/frescopa/a-2026-05-19> (tag `sd-frescopa-a-2026-05-19-close`) |
| 020 | [Digital Innovation proposed-A](https://paolomoz.github.io/stardust-site/samples/digitalinnovation/proposed-A.html) | [`sd-digitalinnovation-a`](https://github.com/aemcoder/snowflake-demos/tree/sd-digitalinnovation-a) | `sd-digitalinnovation-a-close` | <https://sd-digitalinnovation-a--snowflake-demos--aemcoder.aem.live/digitalinnovation/a> | 2026-05-20: <https://sd-digitalinnovation-a-2026-05-20--snowflake-demos--aemcoder.aem.live/digitalinnovation/a-2026-05-20> (tag `sd-digitalinnovation-a-2026-05-20-close`) |

### Block-level feasibility analysis

Standard snowflake preserves the source DOM byte-for-byte via a
page-level template with `[data-slot]` markers. Block-level snowflake
goes further: each content section becomes an independent EDS block
with its own `decorate()` function and CSS, while header/footer stay
as static fragments. Content is fully authorable in DA block tables.

Block-level requires **section independence** across five dimensions:
structure, CSS scope, content model, JS independence, and visual
independence. See `knowledge/block-level-feasibility.md` in the
snowflake skill for the full reference.

#### Proof of concept

Frescopa proposed-A was converted block-level on branch
`test-sf-blocks-01`. Six content blocks (hero, shop-categories,
subscription, location-finder, featured, cta-band) + static
header/footer fragments. Renders pixel-perfect against the source.

#### Feasibility scan — all 19 proposed-A pages (2026-05-27)

| # | Brand | Sections | Structure | CSS | Content | JS | Visual | Verdict |
|---|-------|----------|-----------|-----|---------|-----|--------|---------|
| 1 | aman | 5 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 2 | digitalinnovation | 6 | ✅ | ✅ | ❌ | ❌ | ✅ | **hybrid** |
| 3 | festool | 7 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 4 | frescopa | 6 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 5 | glossier | 5 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 6 | heathrow | 4 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 7 | jfk-airport | 9+ | ✅ | ✅ | ❌ | ❌ | ❌ | **hybrid** |
| 8 | lemonade | 9 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 9 | liquiddeath | 5 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 10 | lovesac | 8 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 11 | nvidia | 9 | ✅ | ✅ | ❌ | ❌ | ✅ | **hybrid** |
| 12 | oatly | 1 | ❌ | ❌ | ❌ | ✅ | ❌ | **page** |
| 13 | onemedical | 9 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 14 | patagonia | 6 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 15 | polestar | 6 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 16 | theroadhome | 10 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 17 | ups-gb | 8 | ✅ | ✅ | ⚠️ | ✅ | ✅ | **hybrid** |
| 18 | vanguard | 9 | ✅ | ✅ | ✅ | ✅ | ✅ | **block** |
| 19 | virginatlantic | 7 | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | **hybrid** |

**Verdicts:** 13 block-level (68%), 5 hybrid (26%), 1 page-level (5%).

#### Hybrid failure details

| Brand | Failing sections | Reason |
|-------|-----------------|--------|
| digitalinnovation | hero, topics | Canvas dot-grid animation (rAF + pointer tracking); animated shader blobs |
| jfk-airport | hero + audience-router + task-panels | Flight search forms, live feed aside, viewTransition coupling between audience tiles and task panels |
| nvidia | all theme carousels | Cross-section carousel JS controller, multi-variant tile system (A/C/E/G) |
| ups-gb | tracking-hero | CSS-only 4-panel tabbed form with hidden radio inputs |
| virginatlantic | booking | 6-field booking widget; -72px negative margin overlapping hero |

In all hybrid cases, the majority of sections are block-level clean.
Only 1–2 sections per page require page-level or fragment treatment.

#### Patterns observed

All 19 pages share the same generator provenance (Stardust) with
consistent conventions: `data-section` attributes, section-scoped CSS,
`:root` design tokens, semantic `<section>` elements. This clean
output biases toward block-level. Real-world pages from WordPress
themes, Tailwind sites, or SPA frameworks would likely have a lower
block-level rate.

**Structure and CSS pass universally** (18/19) — the generator
produces clean, scoped output. The sole exception (Oatly) is a
deliberate art-directed page with no section boundaries.

**Content model and JS are the discriminators.** Every hybrid
verdict traces to either a complex interactive widget (forms,
carousels with shared controllers) or cross-section JavaScript
coupling. These are the checks worth prioritizing during analysis.

## Adobe.com bespoke redesigns

Each row is one snowflake conversion of a bespoke Adobe.com redesign
mockup served from a local-only source. Asset strategy varies per
run (see the `Assets` column):

- **`vendor`** — images, fonts, CSS, JS copied into the branch's
  `/assets/`, `/styles/`, `/scripts/`; EDS Code Bus serves them.
- **`da-media`** — image binaries uploaded to DA `/media/<scope>/`
  via the bundled `tools/da-media-upload.mjs`; referenced via
  `content.da.live` URLs and sideloaded into Media Bus on first
  preview. Fonts still go to Code Bus `/fonts/`.

| # | Source | Branch | Tag | Assets | Demo URL |
|---|---|---|---|---|---|
| 001 | [Agent Orchestrator](http://127.0.0.1:8080/acom-bespoke-pages/agent-orchestrator/) | [`acom-agent-orchestrator`](https://github.com/aemcoder/snowflake-demos/tree/acom-agent-orchestrator) | `acom-agent-orchestrator-close` | `vendor` | <https://acom-agent-orchestrator--snowflake-demos--aemcoder.aem.live/acom/agent-orchestrator/a> |
| 002 | [BizPro Hub](http://127.0.0.1:8080/acom-bespoke-pages/bizpro-hub-prototype/) | [`acom-bizpro-hub`](https://github.com/aemcoder/snowflake-demos/tree/acom-bizpro-hub) | `acom-bizpro-hub-close` | `vendor` | <https://acom-bizpro-hub--snowflake-demos--aemcoder.aem.live/acom/bizpro-hub/a> |
| 003 | [Acrobat Studio Hub](http://127.0.0.1:8081/hub/) | [`acom-hub`](https://github.com/aemcoder/snowflake-demos/tree/acom-hub) | `acom-hub-close` | `da-media` | <https://acom-hub--snowflake-demos--aemcoder.aem.live/acom/hub/a> |
| 004 | [Adobe Express](http://127.0.0.1:8080/express.html) | [`worktree-test-sf-acom-0000`](https://github.com/aemcoder/snowflake-demos/tree/worktree-test-sf-acom-0000) | — | `vendor` | <https://worktree-test-sf-acom-0000--snowflake-demos--aemcoder.aem.page/acom/express/a> |
