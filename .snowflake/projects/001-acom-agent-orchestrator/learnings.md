# Learnings — 001 acom-agent-orchestrator

## 2026-05-20 — Substrate needs to lift `<script>` from templates, not just `<link>` [promoted]

### Context

Source page (`stardust → consonant` rendered Adobe.com prototype) loads
Adobe Clean / Adobe Clean Display fonts via Typekit, which delivers
fonts by running a `<script src="https://use.typekit.net/<kit>.js">`
that injects `@font-face` rules into `<head>` at runtime. The substrate
engine's `applyTemplateOverlay` lifts top-level `<link>` elements but
ignores `<script>` elements.

### Visible symptom (if not fixed)

The template emits the typekit scripts inside the parsed-template
`<body>` (since `<script>` tags placed there persist after the engine
sets `main.innerHTML = newMain.innerHTML`). However, **scripts inserted
via `innerHTML` do not execute in modern browsers**. So neither path
worked without the patch: Typekit never runs, fonts fall back to
Trebuchet MS, the page looks subtly off — same headings, different
glyph shapes.

### Fix applied (branch level)

`scripts/scripts.js`: after the existing `<link>` lift in
`applyTemplateOverlay`, added a parallel block that lifts top-level
`<script>` elements:

```js
const existingScripts = [...document.head.querySelectorAll('script[src]')]
  .map((s) => s.src);
doc.body.querySelectorAll(':scope > script').forEach((script) => {
  const src = script.getAttribute('src');
  if (src) {
    if (existingScripts.includes(new URL(src, document.baseURI).href)) return;
    const s = document.createElement('script');
    s.src = src;
    if (script.async) s.async = true;
    if (script.defer) s.defer = true;
    document.head.appendChild(s);
    existingScripts.push(s.src);
  } else {
    const s = document.createElement('script');
    s.textContent = script.textContent;
    document.head.appendChild(s);
  }
});
```

19 lines. Dedupe by URL for `src` scripts; inline scripts run verbatim
(idempotency is the template author's concern).

### Generic rule [promoted]

The substrate engine should treat `<script>` and `<link>` as a single
class of head-level resources templates can declare. Promote to
substrate v1.0.6. Common triggers:
- Typekit / Adobe Fonts kit scripts (font delivery)
- Cloud.typography / Hoefler & Co. (font delivery)
- Any analytics tag the source page chose (RUM, Adobe Launch)
- Any third-party widget the source bundles inline (chatbot loaders,
  cookie consent SDKs)

A future template author should be able to list ALL `<head>` resources
the source page declared, of any tag type, at the top of their
template file and have them lift uniformly.

## 2026-05-20 — BEM-modifier disambiguator preserves CSS while making first-class unique [promoted]

### Context

Two sections shared base class `c-announcement` with BEM modifiers
`c-announcement--event` and `c-announcement--ribbon`. They share the
first class so the overlay engine cannot tell them apart.

### Generic rule

When the source uses BEM-style classes, the modifier-suffixed form is
the natural unique-first-class candidate. Strip the `--` separator
(uncommon in EDS post-pipeline class lists, sometimes confusing in DA
block-table labels) and use `<base>-<modifier>`:

```
<section class="c-announcement c-announcement--event">
  →
<section class="c-announcement-event c-announcement c-announcement--event">
```

Original classes preserved as secondary so existing CSS rules still
match. DA block class = `c-announcement-event`. Slot keys are scoped
to that block.

This complements the existing discriminator priority list (data-section
→ id → eyebrow → positional). Add as: data-section → id → BEM modifier
→ eyebrow → positional. Position the BEM modifier check ahead of
eyebrow because it preserves the source's semantic naming.

## 2026-05-20 — Article cards with `<a>` wrappers + nested image + text slots

### Context

The article-card-grid (§12) has 9 cards. Each card is:

```html
<a href="..." class="c-article-card">
  <div style="background-image:url(...)">
    <img src="...">
  </div>
  <div>
    <p>Blog</p>
    <p>Title text</p>
  </div>
</a>
```

The temptation was to slot the outer `<a>` (giving authors a single
"set the link" field). Per the container-vs-children rule, this
would have caused the link-writer to set `<a>.innerHTML` to just the
DA cell's anchor inner — wiping all 4 nested slots (background, icon,
eyebrow, title).

### Fix applied

Slot the 4 nested children individually; leave the `<a>`'s `href`
static in the template. Author-UX consequence: authors cannot edit
the article link's `href` from the DA editor. Acceptable trade-off
for this template — the article URLs are stable Adobe.com blog posts.

### When to relax

If an author needs to swap which article is shown without an
engineering deploy, a single slot per card (image+title bundled) on
the `<a>` is the alternative, but it requires the DA cell value to be
a full `<a href><img></a><p>` markup string — clunkier for authors.
Hybrid is theoretically possible (slot the link's href as an attribute
slot) but no current `writeSlot` case handles `href` updates without
also overwriting `innerHTML`. Future substrate work.

## 2026-05-20 — `c-text-block` ×6 — disambiguate by heading slug, not `data-section`

### Context

Six sections share first class `c-text-block`. None had `data-section`
or eyebrow `<p class="label">` — just an `<h2>` headline. One had `id`.

### Fix applied

For each `c-text-block`, derive a kebab-case slug from the section's
purpose:
- `intro-tech` — "The agentic technology transforming..."
- `agent-categories-intro` — "Explore the agents helping you..."
- `how-it-works-intro` — id was `how-agent-orchestrator-works`
- `why-adobe-intro` — "Why Adobe?"
- `learn-more-intro` — "Learn more about..."
- `faq-intro` — "Questions? We have answers."

The slug doesn't have to mirror the headline word-for-word — it just
has to be unique within the template and readable in the DA block-
class label.

### Generic rule

Extend the discriminator priority list to include "heading text slug"
between `id` and `eyebrow`:

1. `data-section` attribute (Stardust)
2. `id` attribute on section
3. BEM modifier (this run's addition)
4. Slug from primary heading (`<h1>`-`<h3>`) — this addition
5. Slug from eyebrow / label
6. Positional `section-N`

The heading slug needs to be content-derived (semantically meaningful)
rather than mechanical first-N-words; the converter LLM is fine for
this.
