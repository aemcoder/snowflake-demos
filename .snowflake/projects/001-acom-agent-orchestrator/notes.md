# Notes — 001 acom-agent-orchestrator

## Phase: Capture

Fetched `http://127.0.0.1:8080/acom-bespoke-pages/agent-orchestrator/` → 554 lines, 60 KB. Stardust → consonant rendered output (per migration banner self-description).

Fetched 32 assets (1 placeholder per migration banner note). Assets vary 928 B (SVG) to 1.97 MB (MP4). All SVGs under 40 KB cap.

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
 39    <body>
 40-44   <div class="migration-banner">       ← STRIP (dev-tool marker)
 46     <section class="c-hero c-hero--video" data-theme="on-dark"> §0 hero
 63     <section class="c-announcement c-announcement--event">      §1 announce-event
 78     <section class="c-announcement c-announcement--ribbon">     §2 announce-ribbon
 88     <section class="c-text-block">                              §3 intro-tech
100     <section class="c-text-block">                              §4 agent-categories-intro
110     <section class="c-tabs" id="tabs-ao">                       §5 tabs
189     <section class="c-action-icon-grid">                        §6 action-icon-grid
213     <section class="c-text-block" id="how-agent-orchestrator…"> §7 how-it-works-intro
223     <section class="c-card-grid">                               §8 card-grid
266     <section class="c-text-block">                              §9 why-adobe-intro
276     <section class="c-value-prop-grid">                         §10 value-prop-grid
301     <section class="c-text-block">                              §11 learn-more-intro
311     <section class="c-article-card-grid">                       §12 article-card-grid
397     <section class="c-text-cta-strip">                          §13 text-cta-strip
408     <section class="c-form">                                    §14 lead-form
449     <section class="c-text-block">                              §15 faq-intro
459     <section class="c-faq">                                     §16 faq
542     <section class="c-final-cta c-final-cta--with-image">       §17 final-cta
554    </body>
```

No `<header>`, no `<footer>`, no `<main>`. Body holds only the migration banner (strip) and 18 `<section>` siblings. We synthesize `<main>` around the 18 sections; header and footer fragments are written empty.

### First-class collisions

- `c-text-block` appears 6× (§3 §4 §7 §9 §11 §15). Disambiguate by prepending a content-derived label as the new first class. Original classes preserved.
- `c-announcement` appears 2× (§1 §2). Promote the BEM modifier (`c-announcement--event`, `c-announcement--ribbon`) — but `--` in classnames is unusual; switch to `-` form. Final first-classes: `c-announcement-event`, `c-announcement-ribbon`.

Disambiguator map (used as `[firstClass] [original classes…]` in template `<section>` and as the DA block class):

| # | Original first-class | Disambiguator | Final first class |
|---|---|---|---|
| §0  | c-hero | (unique) | `c-hero` |
| §1  | c-announcement | event (BEM modifier) | `c-announcement-event` |
| §2  | c-announcement | ribbon (BEM modifier) | `c-announcement-ribbon` |
| §3  | c-text-block | intro h2 slug | `intro-tech` |
| §4  | c-text-block | intro h2 slug | `agent-categories-intro` |
| §5  | c-tabs | (unique) | `c-tabs` |
| §6  | c-action-icon-grid | (unique) | `c-action-icon-grid` |
| §7  | c-text-block | id attr | `how-it-works-intro` |
| §8  | c-card-grid | (unique) | `c-card-grid` |
| §9  | c-text-block | intro h2 slug | `why-adobe-intro` |
| §10 | c-value-prop-grid | (unique) | `c-value-prop-grid` |
| §11 | c-text-block | intro h2 slug | `learn-more-intro` |
| §12 | c-article-card-grid | (unique) | `c-article-card-grid` |
| §13 | c-text-cta-strip | (unique) | `c-text-cta-strip` |
| §14 | c-form | (unique) | `c-form` |
| §15 | c-text-block | intro h2 slug | `faq-intro` |
| §16 | c-faq | (unique) | `c-faq` |
| §17 | c-final-cta | (unique) | `c-final-cta` |

### Head-level resources to lift

Top of template (`templates/acom-agent-orchestrator.html`), above `<main>`:

- `<script src="https://use.typekit.net/hah7vzn.js"></script>` (Adobe Clean fonts)
- `<script src="https://use.typekit.net/mie2rub.js"></script>` (Adobe Clean Display fonts)
- `<script>try{Typekit.load({async:false});}catch(e){}</script>` (typekit init)
- 11 `<link rel="stylesheet">` for adobecom.github.io/consonant/assets/* CSS (button, icon-button, app-icon, product-lockup, ElasticCard, RichContent, NavFilter, nav-card, nav-card-button, nav-card-shell, iframe)

**Substrate gap surfaced:** the bundled engine only lifts top-level `<link>` elements from templates. Typekit scripts are `<script>` tags. Branch-level fix applied: `scripts/scripts.js applyTemplateOverlay` extended to lift `<script>` elements too (src-bearing and inline). Should be promoted to substrate v1.0.6.

### Inline `<style>` / `<script>` blocks

- Inline `<style>` block at lines 21–37 (page-level style + migration banner style + `:hover`). Extract minus the migration-banner-only rules into `styles/acom-agent-orchestrator.css`.
- Inline tabs `<script>` at lines 169–185 (panel switcher). Extract into `scripts/acom-agent-orchestrator-animations.js`. No CDN deps needed.

### Asset strategy

`vendor` — source is `127.0.0.1` local-only. Copy `input/assets/` (32 files, ~24 MB) into the **repo root** `assets/` directory. Rewrite refs:
- Template / fragments / extracted CSS: root-relative `/assets/<basename>`
- DA body fragment: absolute branch URL `https://acom-agent-orchestrator--snowflake-demos--aemcoder.aem.page/assets/<basename>` (Media Bus requires absolute)

### Strip list

- `<div class="migration-banner">` (lines 40–44): dev-tool dressing, not real content.
- Migration-banner-only CSS rules inside the inline `<style>` (`.migration-banner`, `.migration-banner a`).

### Slot opportunities

Authored content includes 18 sections worth of headings, paragraphs, button labels, images, links, FAQ Q&As. Background-image card tiles in §12 (article-card-grid) — use background-image slot writer. Form fields, tab buttons, value-prop cards: include text and image slots; preserve inline `style` attributes verbatim.

Note: button elements use `<button class="c-button">` (not `<a>`). They have no `href`. Slot just the label `<span class="c-button__label">`.

### Generator placeholder

The migration banner mentions "1 placeholder" — likely the empty knowledge-base card CTA (§8 article #3 has no Learn-more button). No `data-placeholder` attributes present in the source — no special skip-marker handling needed.

### Decisions surfaced by analysis

1. Synthesize `<main>` around all 18 sections.
2. Strip the migration banner and migration-banner CSS rules.
3. Rename first-class on §1, §2, and the 6 `c-text-block` sections as per the disambiguation table. Keep original classes as secondary.
4. Lift the 11 consonant `<link>` and 3 typekit `<script>` (2 src + 1 inline) tags into template top.
5. Apply the substrate `<script>` lifting patch in `scripts/scripts.js`.
6. Asset strategy: vendor all 32 assets into repo `assets/`.
7. Slot identification per section: headings, paragraphs, button labels, images, link hrefs+labels, background-image (article-card-grid).
