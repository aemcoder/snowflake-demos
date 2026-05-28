# Cross-project learnings

Findings from completed snowflake runs that apply to any future project, regardless of source generator.

---

## 2026-05-28 — Drop `header { height: 0 }` when using a custom sticky header

The EDS boilerplate `styles.css` includes `header { height: 0; }`. This is intentional for
the stock EDS nav block, which sets `--nav-height` and accounts for it. But for block-level
snowflake projects that ship a custom sticky header fragment (not the stock nav), this rule
collapses the `<header>` element to zero height, causing `<main>` to start at page-top and
the sticky header bar to overlap the first content section (usually the hero).

**Rule:** when the source design has its own sticky header (not EDS nav-block), remove
`header { height: 0; }` from `styles/styles.css` during Phase 3 (B.1 — global styles
extraction).

---

## 2026-05-28 — `aem content clone` syntax

`aem content clone` takes `--path` as a flag, NOT positional args.

**Correct:**
```bash
npx @adobe/aem-cli content clone --path /my-da-folder
```

**Wrong (produces "Unknown commands" error):**
```bash
npx @adobe/aem-cli content clone org/repo /path
```

The CLI infers `org/repo` from the git remote in the current directory. Run from the repo root.

---

## 2026-05-28 — `decorateAnimations` must be called from `decorateMain`

When exporting a shared `decorateAnimations(container)` utility from `scripts/scripts.js`,
it MUST be called inside `decorateMain`:

```js
export function decorateMain(main) {
  // ... other decorators ...
  decorateAnimations(main);
}
```

If only exported and not called, elements with `[data-anim]` start at `opacity: 0` (CSS sets this)
and never transition to `.is-visible` — the page renders blank for those elements.

---

## 2026-05-28 — `da-media-upload.mjs` uploads fonts too (harmless but unnecessary)

When pointing `--src-dir` at a folder that contains both `media/` and `fonts/` subdirs, the uploader
uploads everything including fonts. Fonts uploaded to DA `/media/` are harmless (they get a
`content.da.live` URL) but are wasted — fonts should be served from Code Bus `/fonts/` for
same-origin access and optimal caching. Either `--src-dir` at just the `media/` subfolder, or
pre-filter. This doesn't break anything.

---

## 2026-05-28 — BEM CSS in EDS requires `selector-class-pattern` disable

EDS stylelint config enforces kebab-case class names, which rejects BEM double-underscore
(`__`) and double-dash (`--`) selectors. Add this at the top of every block CSS file that uses BEM:

```css
/* stylelint-disable selector-class-pattern */
```

The `header.css` block already did this in prior runs (003-aman). Make it standard practice for
all block CSS files with BEM naming.

---

## 2026-05-28 — `content.da.live` 401 on direct `curl` is expected

`https://content.da.live/<org>/<repo>/media/...` returns 401 on unauthenticated curl requests.
This is NOT a broken asset — the EDS pipeline uses its own credentials to sideload images into
Media Bus during preview. Confirmed working by checking the rendered page for `media_<hash>` URLs.

---

## 2026-05-28 — Page-level overlay source reveals DA content model directly

When the source URL is itself a snowflake page-level overlay (has `<meta name="template">`),
fetching the URL with `curl` returns the raw DA block table HTML rather than a rendered page.
This makes Capture trivial: no scraping needed, the content model is explicit.

---

## 2026-05-28 — `no-descending-specificity` for modifier + pseudo-class combos

When CSS uses both modifier selectors and pseudo-class selectors on the same element hierarchy:

```css
/* WRONG order */
.card:hover .card__bg { transform: scale(1.08); }     /* higher specificity */
.card--variant .card__bg { background-image: url(); } /* lower specificity — FAIL */

/* RIGHT order */
.card--variant .card__bg { background-image: url(); } /* lower specificity first */
.card:hover .card__bg { transform: scale(1.08); }     /* higher specificity after */
```

Stylelint `no-descending-specificity` requires lower-specificity rules to appear before
higher-specificity rules that share the same descendant selector. Reordering fixes it without
any visual change.
