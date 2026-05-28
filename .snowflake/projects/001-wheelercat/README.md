# 001-wheelercat

**Source URL:** https://main--uplift-wheelercat-eds--paolomoz.aem.live/
**Capture date:** 2026-05-28
**Generator:** AEM EDS + Snowflake page-level overlay (template: `wheelercat-home`)
**Page intent:** Wheeler Cat — Construction Equipment, Tool & Trailer Rental & Sales homepage
**Conversion level:** block-level
**Asset strategy:** da-media
**Branch:** wheelercat-001

## Notable structure

The source page is itself a snowflake page-level overlay serving DA-format content
directly. Fetching the URL with curl returns the raw DA block table HTML.
Template/CSS/fragments served from the same origin.

6 main content sections: hero, finance, services, blog-cards, brand-logos, locations.
Header: 3-part (utility-strip + site-header + mega-nav). Footer: 4-column grid.
CSS: 788 lines, clean `:root` design tokens, BEM-style section-scoped selectors.
Icon font: icomoon (4 verbs — buy, rent, service, parts — plus menu/phone/social icons).
