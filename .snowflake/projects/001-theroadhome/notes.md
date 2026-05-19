# Notes — 001 theroadhome

## Phase: Capture

Fetched 36421 bytes from https://paolomoz.github.io/stardust-site/samples/theroadhome/proposed-A.html
Stardust 0.2.0, variant A — Conservative refresh.
No external CSS or JS files. Single inline `<style>` block.
All images are absolute URLs pointing to theroadhome.org CDN.

## Phase: Analyze

### Structural map

```
Line   Element
─────  ──────────────────────────────────────
1      <!doctype html>
8-30   <!-- _provenance: stardust 0.2.0 -->
31-525 <style> (inline CSS, lines 31-525)
527    <body>
529-543  <header data-section="site-header"> → HEADER FRAGMENT
545-570  <section data-section="hero"> → Section 1 (hero)
572-579  <section class="section section-banner" data-section="join-our-team"> → Section 2
581-606  <section class="section" data-section="get-involved"> → Section 3
608-630  <section class="section" data-section="impact"> → Section 4
632-635  <section data-section="road-divider"> → Section 5
637-644  <section class="section section-banner" data-section="programs"> → Section 6
646-671  <section class="section" data-section="housing-resources"> → Section 7
673-689  <section class="section" data-section="heritage"> → Section 8
691-732  <section class="section" data-section="stories"> → Section 9
734-751  <section class="section" data-section="newsletter"> → Section 10
753-802  <footer data-section="site-footer"> → FOOTER FRAGMENT
```

### Section inventory

| # | data-section       | first-class           | Note |
|---|--------------------|-----------------------|------|
| 1 | hero               | hero                  | background-image slot |
| 2 | join-our-team      | join-our-team         | placeholder body |
| 3 | get-involved       | get-involved          | 3 cards with placeholders |
| 4 | impact             | impact                | 3 stat placeholders |
| 5 | road-divider       | road-divider          | decorative, no slots |
| 6 | programs           | programs              | placeholder body |
| 7 | housing-resources  | housing-resources     | 3 resource cards with placeholders |
| 8 | heritage           | heritage              | static content |
| 9 | stories            | stories               | 6 story cards, BG imgs |
| 10| newsletter         | newsletter            | form |

### Placeholder convention

Stardust 0.2.0: `data-placeholder` attribute without value (bare attribute, not `data-placeholder="true"`).
These elements get `data-slot-skip="placeholder"` in the template.

### First-class uniqueness

All sections use `data-section` as unique discriminator, so each first class derives from that.
The source uses:
- `<section data-section="hero">` → first class needs to be "hero"
- `<section class="section section-banner" data-section="join-our-team">` → reorder to first class = "join-our-team"
- `<section class="section" data-section="get-involved">` → reorder to first class = "get-involved"
- etc.

### Slot decisions

**Hero (section 1):**
- `.hero__photo` div has inline `style="background-image: url(...)"` → background-image slot "hero.photo"
- `.hero__eyebrow` p → text slot "hero.eyebrow"
- `.hero__h1` h1 → text slot "hero.title"
- `.hero__sub` p → text slot "hero.sub"
- `.help-card:nth-child(1) .help-card__q` → text slot "help-1.q"
- `.help-card:nth-child(1) .help-card__cta` → link slot "help-1.cta"
- `.help-card:nth-child(2) .help-card__q` → text slot "help-2.q"
- `.help-card:nth-child(2) .help-card__cta` → link slot "help-2.cta"
- `.help-card.is-phone .help-card__q a` → link slot "help-3.phone" (text is link)
- (the "if you have any other questions" p is static)

**Join-our-team (section 2):**
- `.section-banner__h2` h2 → text slot "title"
- `.section-banner__sub` p → data-placeholder, mark data-slot-skip
- `.section-banner__cta` a → link slot "cta"

**Get-involved (section 3):**
- `.feature-3up__heading` h2 → text slot "heading"
- card 1: `.feature-card:nth-child(1) .feature-card__icon img` → image slot "card-1.icon"
- card 1: `.feature-card:nth-child(1) .feature-card__h3` → text slot "card-1.title"
- card 1: `.feature-card:nth-child(1) .feature-card__body` → data-placeholder, skip
- card 1: `.feature-card:nth-child(1) .feature-card__link` → link slot "card-1.link"
- card 2: same pattern, prefix "card-2"
- card 3: same pattern, prefix "card-3"

**Impact (section 4):**
- `.impact-row__h2` h2 → text slot "heading"
- stat 1: `.impact-stat:nth-child(1) .impact-stat__icon img` → image slot "stat-1.icon"
- stat 1: `.impact-stat:nth-child(1) .impact-stat__n` → data-placeholder, skip
- stat 1: `.impact-stat:nth-child(1) .impact-stat__label` → data-placeholder, skip
- stat 2: same pattern, prefix "stat-2"
- stat 3: same pattern, prefix "stat-3"

**Road-divider (section 5):**
No slots — purely decorative CSS.

**Programs (section 6):**
- `.section-banner__h2` h2 → text slot "title"
- `.section-banner__sub` p → data-placeholder, skip
- `.section-banner__cta` a → link slot "cta"

**Housing-resources (section 7):**
- `.housing-resources__h2` h2 → text slot "heading"
- resource 1: `.resource-card:nth-child(1) .resource-card__icon img` → image slot "card-1.icon"
- resource 1: `.resource-card:nth-child(1) .resource-card__h3` → text slot "card-1.title"
- resource 1: `.resource-card:nth-child(1) .resource-card__body` → data-placeholder, skip
- resource 1: `.resource-card:nth-child(1) .resource-card__link` → link slot "card-1.link"
- resource 2, 3: same pattern

**Heritage (section 8):**
- `.heritage__eyebrow` → text slot "eyebrow"
- `.heritage__h2` → text slot "title"
- `.heritage__body` → text slot "body"
- `.heritage__cn img` → image slot "cn-logo"
(The 100-years badge is static CSS)

**Stories (section 9):**
- `.stories__h2` h2 → text slot "heading"
- `.stories__sub` p → data-placeholder, skip
- story 1: `.story-card:nth-child(1) .story-card__photo` → background-image slot "story-1.photo"
- story 1: `.story-card:nth-child(1) .story-card__name` → text slot "story-1.name"
- story 1: `.story-card:nth-child(1) .story-card__quote` → data-placeholder, skip
- story 1: `.story-card:nth-child(1) .story-card__read a` → link slot "story-1.read"
- stories 2-6: only photo + name (no quote/read on non-active cards in DOM)
- `.stories__more a` → link slot "more-cta"

**Newsletter (section 10):**
- `.newsletter__h2` h2 → text slot "heading"
- `.newsletter__sub` p → text slot "sub"
(form fields are static — placeholder text, not slots)

### Head-level resources

No external `<link>` tags. Font is HarmoniaSans (system font for Adobe/nonprofit orgs), 
no Google Fonts or CDN link elements. No external scripts either.

### Asset strategy

All images in template/fragments are absolute URLs to theroadhome.org CDN.
Asset strategy: "absolute" — no rewriting needed.
For DA cells: already absolute → Media Bus will process them correctly.

### Inline `<script>` blocks

None. No animations JS file needed.

## Phase: Round-trip

### Production round-trip outcome

- DA PUT: 200 OK → https://content.da.live/aemcoder/snowflake-demos/theroadhome/a
- Preview POST: 200 OK → https://sd-theroadhome-a--snowflake-demos--aemcoder.aem.page/theroadhome/a
- Live POST: 200 OK → https://sd-theroadhome-a--snowflake-demos--aemcoder.aem.live/theroadhome/a
- Code Sync probe: all 4 paths returned 200 immediately (< 1s)
- Local round-trip: skipped per autonomous-mode instructions

### Decisions surfaced by analysis

1. All 10 main sections use `data-section` attr as unique first-class discriminator.
2. Sections currently using `data-section` attribute but NOT having it as first class need reorder.
   Most source sections look like `<section class="section" data-section="X">` → rewrite first class to "X section".
3. The source `<header>` and `<footer>` go to fragments.
4. No `<main>` in source — must synthesize one wrapping all 10 sections.
5. `data-placeholder` (bare attribute, Stardust 0.2.0) → `data-slot-skip="placeholder"`.
6. Background-image slots needed for: hero photo, story card photos.
7. No external assets to vendor — all absolute URLs.
8. No animations JS needed.
