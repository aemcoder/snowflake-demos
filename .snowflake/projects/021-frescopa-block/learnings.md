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

## `aem content` DA flow (user-requested, replaces curl Source API)

The user asked to push DA content via `aem content` instead of the skill's
default `curl -X PUT admin.da.live/source/...`. Findings:

- **Auth**: `aem content clone --path /<path>` opens a browser IMS login and
  writes a fresh 24h token to `.hlx/.da-token.json` (NOT `~/.aem/da-token.json`,
  which is where `da-auth` writes — the phase-5 token fallback should check both).
- **Workflow is git-like**: `clone` → edit files in `content/` → `add` →
  `commit -m` → `push`. `status`/`diff` mirror git semantics. The `content/`
  dir is its own git repo with a `refs/da/synced` ref, and is gitignored from
  the main repo.
- **⚠️ Path-mapping quirk (cost a re-do)**: cloning with `--path /sd-frescopa-block-a`
  writes `.da-config.json` with `rootPath:"/sd-frescopa-block-a"`, which scopes
  the *clone* — but `push` maps `content/<relpath>` → DA `/<relpath>` (relative
  to the **org/repo root**, ignoring rootPath as a push prefix). So putting the
  doc at `content/home-a.html` published it to the repo root `/home-a.html`, NOT
  `/sd-frescopa-block-a/home-a.html`. **Fix**: mirror the full intended DA path
  inside `content/` — place the file at `content/sd-frescopa-block-a/home-a.html`.
  `aem content status` shows the effective DA path (`/sd-frescopa-block-a/home-a.html`)
  — always check it before pushing. Verify post-push with the Source API
  (`admin.da.live/source/<org>/<repo>/<path>`) to catch a misplacement.
- **Preview/publish still uses admin.hlx.page** — `aem content` only handles
  the Source side; preview + live are separate POSTs (per the methodology override,
  on the run's own branch). DA path segment is doubled in the admin URL because
  branch == da-root: `.../preview/<org>/<repo>/<branch>/sd-frescopa-block-a/home-a`.

## Production round-trip — verified ✅

- Branch pushed; Code Sync deployed all block code in ~1s.
- DA doc at `/sd-frescopa-block-a/home-a.html` (5315b, 7 blocks).
- preview + live POSTs both 200.
- Production page: body.appear, all 6 blocks `loaded`, **0 console errors**.
- **Media Bus**: every authored `<img>` rewritten to `./media_<sha>.<ext>?width…&format…&optimize…`;
  shop-categories cards now serve `webply` via `<picture>` (the review fix paid
  off — bare-img handling would have dropped these). Hero bg sideloaded from the
  absolute stardust.style URL → branch-host `media_<sha>.png`. Confirms the
  `absolute` asset strategy works end-to-end with Media Bus.
- Production hero/header/shop-categories visually identical to source.

URLs:
- Live: https://sd-frescopa-block-a--snowflake-demos--aemcoder.aem.live/sd-frescopa-block-a/home-a
- Preview: https://sd-frescopa-block-a--snowflake-demos--aemcoder.aem.page/sd-frescopa-block-a/home-a
- DA editor: https://da.live/edit#/aemcoder/snowflake-demos/sd-frescopa-block-a/home-a
