# Learnings — 021 frescopa-block (block-level conversion)

First **block-level** snowflake run in this repo (prior runs are all page-level
overlay). Source is the canonical block-level example from
`block-level-feasibility.md`. DA interaction via `aem content` (user request).

## What worked

- **Pristine block-level source.** Stardust Frescopa passes all 5 feasibility
  checks trivially: 9 body-level children (2 header + 6 section + 1 footer),
  every section class-prefixed in CSS, zero `<script>`, no placeholders, each
  section self-backed + self-padded. No cross-section coupling at all.
- **No overlay substrate needed.** Block-level uses standard EDS decoration
  (`decorateSections` → `decorateBlocks` → block `decorate()`). Phase 0 stamped
  `.snowflake/config.json` with `substrateInstalled:false` and skipped the
  substrate installer entirely. The bundled substrate is a page-level concern.
- **Global/per-section CSS split** mapped cleanly: `:root` tokens + base type +
  `.btn`/`.eyebrow`/`.editorial`/`.label`/`.catalog` + reduced-motion → global
  `styles/styles.css`; each section's scoped rules → `blocks/<name>/<name>.css`.
- **CTA pipeline ordering.** `decorateButtons()` (sync, in `decorateMain`) runs
  BEFORE block `decorate()` (async, in `loadSection`). So authored
  `<strong><a>` / `<em><a>` are already `a.button.primary` / `a.button.secondary`
  by decorate-time. Each block re-classes `block...querySelector('a')` to the
  right source `.btn` variant. Verified working for all 6 CTAs.

## Gotchas (candidates for cross-project promotion)

1. **Worktree dev-server port is NOT 3000.** In a git worktree, `aem up` picks a
   branch-specific port (here **3487**) and prints it ("Using port 3487 for
   branch sd-frescopa-block-a"). Read the dev-server startup output for the port
   instead of assuming 3000. The phase-5 prompt hardcodes `localhost:3000`.

2. **Metadata block 404s on the drafts page.** `aem up --html-folder drafts`
   serves files verbatim — it does NOT run the DA pipeline that lifts the
   `metadata` block to `<head>` and removes it from `<main>`. So a `<div
   class="metadata">` left in the drafts `<body>` makes `decorateBlocks` try to
   load `/blocks/metadata/metadata.{js,css}` → two 404s + two pipeline errors.
   Fix: keep the metadata block in the DA doc (production needs it), but REMOVE
   it from the drafts body. The `transform-da-to-eds.mjs` step already writes the
   `<meta>` tags into the drafts `<head>`, so nothing is lost.
   (This is block-level-specific: page-level overlay pages route metadata
   through the engine differently.)

3. **playwright-cli screenshot caches across cross-origin `goto`.** After
   navigating from localhost to the source host (or vice versa) in the same
   session, `screenshot` returned a stale buffer (byte-identical MD5 for two
   visibly-different pages). Reliable captures: tight `eval(scroll)` →
   `screenshot` on a single origin, or `close` + fresh `open` before capturing
   the other origin. `--filename <abspath>` is honored loosely; the canonical
   output lands in `.playwright-cli/page-<ts>.png`.

4. **`querySelector('picture, img')` for ALL authored images in block
   decorators.** On production, Media Bus rewrites authored `<img>` into
   `<picture><source…><img></picture>`. A decorator that does
   `querySelector('img')` and appends only the inner `<img>` orphans the
   `<picture>` and discards the optimized/responsive sources. Not a hard break
   (fallback `src` still renders) but defeats the image pipeline. Use
   `querySelector('picture, img')` and append `media.closest('picture') || media`.
   Caught by the review on shop-categories (the lone block that diverged from
   the sibling-block convention); fixed.

## Stylelint friction (block-level only)

Block CSS (`blocks/**/*.css`) IS linted by stylelint-config-standard (unlike
page-level's vendored `styles/<template>.css` which the ignore patterns exclude).
So the source's compact one-liners and legacy color syntax must be normalized:
- `rgba(r,g,b,a)` → `rgb(r g b / N%)` (modern notation)
- multi-declaration single-line rules → one declaration per line
  (`declaration-block-single-line-max-declarations`)
- unquoted single-word font names (`Fraunces` not `'Fraunces'`)
- `no-descending-specificity`: order anchor selectors by ascending specificity
  (plain `a` before `a:hover` / `.x .y a`)
`lint:fix` handles the font-quote case; the rest are hand-fixes. eslint
(airbnb-base) passed the decorators with no changes needed.

## Pending

Production round-trip + `aem content` push blocked on expired DA token
(expired 2026-05-22, run date 2026-05-28). User opted to pause before production.
