# Structural Analysis — 001-frescopa-a

## Source metadata
- Generator: Stardust 0.2.0 (prototype)
- Font deck: bauhaus-functional + Cormorant Garamond + IBM Plex Sans + Fraunces (hero only)
- Body has `data-template="landing"` attribute
- No `<main>` element — sections are direct children of `<body>`

## Header boundary (everything before main content)
- **promo-strip** (lines 617-622): `<header data-section="promo-strip">` — announcement bar
- **site-header** (lines 625-645): `<header data-section="header">` — sticky nav with logo, primary nav, secondary nav (search/account/cart/signin)

Both become the header fragment.

## Main sections (content to wrap in synthesized `<main>`)
1. **hero** (lines 648-660): Full-bleed photographic hero with bg-image, H1 (Fraunces italic), subhead, 2 CTAs
2. **shop-categories** (lines 663-697): 5-card grid with product images, titles, catalog lines
3. **subscription-card-on-bay** (lines 700-714): Split layout card — text left, photo right
4. **locations-finder** (lines 717-727): Centered search form with text + button
5. **featured-coffee** (lines 730-742): Split layout — photo left, text+CTA right (Porcelain ground)
6. **rewards-cta-band** (lines 745-752): Centered CTA band with heading + paragraph + button

## Footer boundary (everything after main content)
- **site-footer** (lines 755-812): `<footer data-section="footer">` — 5-column grid with brand info + nav columns + legal line

## Section uniqueness check
All sections already have unique `data-section` attributes AND unique first classes. Good to go:
- hero, shop-categories, subscription-card-on-bay, locations-finder, featured-coffee, rewards-cta-band

## Slot identification per section

### hero
- eyebrow text: "MyBarista coffee quiz" → text slot `hero.eyebrow`
- h1 innerHTML: "Find your <em>perfect</em> coffee..." → text slot `hero.heading`
- subhead: "Four questions, your roast." → text slot `hero.subhead`
- CTA 1 (a.btn-primary-on-bay): "Take the quiz" → link slot `hero.cta-primary`
- CTA 2 (a.btn-secondary): "Browse coffee" → link slot `hero.cta-secondary`
- Background image (CSS): hero-B-generated.png → background-image slot `hero.bg-image`

### shop-categories
- eyebrow: "Shop" → text slot `shop-categories.eyebrow`
- h2: "Shop all Frescopa products." → text slot `shop-categories.heading`
- card 1: img + title + catalog-line → `shop-categories.card-1.image`, `.card-1.title`, `.card-1.catalog`
- card 2-5: same pattern indexed

### subscription-card-on-bay
- eyebrow: "Subscription" → text slot
- h3: "Coffee, every week." → text slot
- p: description → text slot
- CTA: "Start your subscription" → link slot
- photo: subscription delivery image → image slot

### locations-finder
- eyebrow: "Locations" → text slot
- h2: "Find a Frescopa near you." → text slot
- p: description → text slot
- input placeholder: "ZIP CODE · CITY · STATE" → skip (interactive)
- button: "Browse all locations" → text slot (form target)

### featured-coffee
- photo: Morning Muse coffee → image slot
- eyebrow: "Featured" → text slot
- h3: "Elevate your coffee game." → text slot
- p: description → text slot
- CTA: "Shop coffee" → link slot

### rewards-cta-band
- eyebrow: "Rewards" → text slot
- h2: "Rewards waiting." → text slot
- p: description → text slot
- CTA: "Claim rewards" → link slot

## Asset strategy
Source is localhost (127.0.0.1:8080) — assets not publicly reachable.
Decision: **vendor** — copy assets into repo `/assets/frescopa-a/` directory.
- Template/fragment refs → root-relative `/assets/frescopa-a/...`
- DA cell image refs → absolute branch URLs

## Head-level links to lift
- `<link rel="preconnect" href="https://fonts.googleapis.com">`
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`
- `<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">`

## Stardust conventions detected
- `data-section` on every section element — use as first-class discriminator ✓
- No `data-placeholder="true"` attributes detected (Stardust 0.2.0 doesn't use that)
- `data-intent`, `data-layout`, `data-media`, `data-items` are informational only
