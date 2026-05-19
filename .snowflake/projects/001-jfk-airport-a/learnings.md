# Learnings — 001 jfk-airport-a

## 2026-05-19 — Multiple same-purpose panels disambiguated with data-attribute suffix

Context: The JFK page has 5 audience-specific task panels, each `<section class="task-panel">` with a
`data-audience` attribute. All 5 share `task-panel` as first class.

Fix applied: prepend `task-panel-<audience>` as the first class, keep `task-panel` second. CSS still
applies via the existing `.task-panel` class. DA block names map 1:1 to the new first classes.

Generic rule: when multiple sibling sections share a first class and the source has a discriminating
attribute (not just `data-section`), any attribute that yields a unique short slug works as a
disambiguator. The methodology's discriminator hierarchy (data-section → id → eyebrow → positional)
should mention `data-*` attributes generally, not just `data-section`.

Status: project-specific (not yet promoted — the bundled discriminator hierarchy already covers this
via `data-section` as the first option; `data-audience` is a variant of the same pattern).

## 2026-05-19 — Interactive widget panels: slot only the editorial intro, not the widget body

Context: Task panels contain both editorial copy (eyebrow + h2 + p) and interactive widgets
(flight search form, pickup status table, connection info table). Authors should be able to edit
the intro copy, not the widget data.

Approach: slot eyebrow, title (h2), body (p) per panel. Widgets remain as static template DOM.
This is correct for Stardust-generated pages where the widget content is operational/live data,
not editorial content.

Generic rule: for pages with mixed editorial + live-data/widget content, identify the boundary
and only slot the editorial tier. Widget content that changes on a cadence (live data) is better
served by a live data integration, not DA authoring.

Status: project-specific finding.
