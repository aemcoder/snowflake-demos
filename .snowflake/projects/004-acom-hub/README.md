# 004 — acom-hub

Source: http://127.0.0.1:8081/hub/ (local-only)
Captured: 2026-05-22
Status: round-trip complete (waiting for user to close iteration)

URLs:
- Local:      http://localhost:3000/drafts/a.html
- Production: https://acom-hub--snowflake-demos--aemcoder.aem.page/acom/hub/a
- DA editor:  https://da.live/edit#/aemcoder/snowflake-demos/acom/hub/a

Branch: `acom-hub`
DA path: `/acom/hub/a.html`

Adobe.com bespoke prototype for the Acrobat Studio Hub page. Hand-coded from
Figma. Complex scroll-pinned hero with image grid that morphs into a hub-
router carousel; editorial bento section. Includes desktop mega-nav and
mobile nav overlay; no `<footer>` element in source.

Asset strategy: **DA `/media/acom-hub/`** for 29 binaries (PNG/SVG/JPG).
Adobe Clean Display OTF fonts (3) go in Code Bus `/fonts/` (eds-da-content
§13.2 decision tree).
