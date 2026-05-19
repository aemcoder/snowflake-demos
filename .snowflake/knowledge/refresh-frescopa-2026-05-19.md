# Investigation — frescopa refresh divergence from source

Date: 2026-05-19
Branch: `sd-frescopa-a`
Source: https://paolomoz.github.io/stardust-site/samples/frescopa/proposed-A.html
Converted: https://sd-frescopa-a--snowflake-demos--aemcoder.aem.live/frescopa/a

## Symptom

User report: the refreshed frescopa page is visually different from the
original source. Initial screenshot comparison showed:

- Hero content positioned much lower in converted (text starts ~225 px down vs ~70 px in source)
- Subtitle "Four questions, your roast." not visible in 1280×800 viewport
- CTA buttons "Take the quiz" / "Browse coffee" below the fold
- Empty space below the hero before the next section

## Investigation

### 1. Side-by-side screenshot (pre-fix)

Both pages at 1280×800. Source: full hero visible with text + subtitle.
Converted: text rendered higher but only partial — subtitle/CTAs missing.

### 2. DOM equality scope=body

Visible text matched character-for-character (1445 = 1445 chars).
Element count differed by +5 (EDS structural wrappers — expected).
Tag sequence differed at position 0 (EDS header landmark vs source promo strip — expected).
**Two specific issues surfaced from deeper inspection:**

### 3. Issue #1 — empty `<h1>` from heading-in-heading writeSlot bug

```html
<!-- expected -->
<h1 data-slot="title">Find your <em>perfect</em> coffee in four questions.</h1>

<!-- actual (rendered) -->
<h1 data-slot="title"></h1>
<h1 id="find-your-perfect-coffee-in-four">Find your <em>perfect</em> coffee in four questions.</h1>
```

**Root cause:** the DA cell value for `title` was wrapped in `<h1>...</h1>`.
The `writeSlot` text fallback does `el.innerHTML = value` — the browser
parser auto-closes the outer `<h1>` before opening the inner one, producing
two heading elements: an empty template `<h1>` and an orphaned sibling `<h1>`.

**Note:** the same bug was found and fixed at branch level for lovesac-a
(run 016) but never promoted to the substrate. The refresh installed
v1.0.2 (without the heading fix) and reproduced the bug.

### 4. Issue #2 — EDS `<header>` 227 px tall vs source 28 px

Measured element heights:

| Element | Source | Converted |
|---|---|---|
| Hero `<section>` y-position | 99 px | 227 px (+128 px) |
| Hero `<section>` height | 889 px | 889 px (identical) |
| `<header>` total height | 28 px | 227 px (+199 px) |
| CTA primary bottom y | 875 px (within 800-px viewport edge) | 1003 px (below fold) |

**Root cause:** the page CSS at `styles/frescopa-a.css` contains:

```css
section, header, footer {
  padding: var(--section-padding) var(--spacing-lg);
}
```

`--section-padding` resolves to 64 px. In the source page, the actual
`<header>` element has class `.promo-strip` (and a sibling `<header class="site-header">`), each with their own class-level padding overrides:

```css
.promo-strip { padding: 8px var(--spacing-lg); height: 28px; ... }
.site-header { padding: var(--spacing-md) var(--spacing-lg); ... }
```

Class-selector specificity (0,1,0) wins over the tag-selector rule (0,0,3),
so the generic 64-px padding never applies to the actual source headers.

In the converted EDS page, the EDS landmark `<header>` is a bare `<header>`
wrapper — no `.promo-strip` or `.site-header` class on it (those classes
are on inner elements within the fetched fragment). The generic
`section, header, footer { padding: 64px }` fires on the bare landmark
with full force, adding 64 px top + 64 px bottom = 128 px padding the
source never had. Same applies to `<footer>`.

## Fixes applied

### Fix 1 — writeSlot heading-in-heading unwrap (substrate v1.0.3)

In `substrate/scripts/scripts.js` `writeSlot()`, add a heading branch
before the default text handler:

```js
if (/^H[1-6]$/.test(tagName)) {
  const tmp = document.createElement('div');
  tmp.innerHTML = value;
  const inner = tmp.querySelector(tagName.toLowerCase());
  el.innerHTML = inner ? inner.innerHTML : value;
  return;
}
```

Promoted from the lovesac branch-level fix that was never landed in the substrate.

### Fix 2 — EDS landmark padding reset (substrate v1.0.4)

In `substrate/styles/styles.css`, add:

```css
body > header,
body > footer {
  padding: 0;
  margin: 0;
}
```

`body > header` specificity (0,0,2) wins over plain `header` (0,0,1) — no
`!important` needed. Only affects the EDS landmark wrappers, not the
fragment-internal `.promo-strip` / `.site-header` elements which keep
their own class-level padding.

## Verification

After both fixes deployed to `sd-frescopa-a`:

| Metric | Pre-fix | Post-fix | Source |
|---|---|---|---|
| `<header>` height | 227 px | 99 px | 28 px ⚠️ |
| Hero y-position | 227 px | 99 px | 99 px ✓ |
| H1 count in hero | 2 (one empty) | 1 ✓ | 1 ✓ |
| Hero H1 text | (empty, content in orphan) | "Find your perfect coffee in four questions." ✓ | matches ✓ |

The converted hero now starts at the SAME y-position as the source (99 px).
The `<header>` is 99 px (vs source 28 px) because the converted page has
two `<header>` siblings (`.promo-strip` 28 px + `.site-header` 71 px)
inside the EDS landmark, whereas the source has them as TOP-LEVEL siblings
of the body, not nested in a wrapper. Both are visually identical from the
user's perspective — the 71 px nav bar sits below the 28 px promo strip
in both cases.

Visual side-by-side: see `/Users/catalan/repos/ai/aemcoder/snowflake-demos/frescopa-diff-v3.png`.

## Lessons learned

1. **Branch-level patches don't survive `snowflake refresh`.** The lovesac
   heading-in-heading fix was applied to the branch but not to the
   substrate. When frescopa refreshed under the substrate, the bug
   reappeared. Promote generic fixes to the substrate immediately.

2. **The dom-equality script with `--scope body` couldn't distinguish
   "expected EDS structural overhead" from "real layout regression".** Both
   show as element-count + tag-sequence divergence at position 0. A more
   useful diff would be `--scope main` (after subtracting EDS landmarks),
   plus per-section text/dimension comparison.

3. **Refreshes are the canary** for substrate gaps. Run-once conversions
   work because they're fixed locally; refreshes blow up because the fixes
   never made it back. Make the refresh workflow part of the regular
   testing cycle for any substrate change.

4. **Page CSS leakage into EDS landmarks is a recurring pattern.** Already
   documented for `footer > .footer { visibility: hidden }` (polestar).
   Now adding generic tag-selector padding rules to that list. Substrate
   should pre-emptively reset known leak points for the EDS landmark
   elements.
