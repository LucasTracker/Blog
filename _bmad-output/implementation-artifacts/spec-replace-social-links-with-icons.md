---
title: 'Replace Social Links with Icons'
type: 'feature'
created: '2026-06-28T23:19:16-03:00'
status: 'done'
baseline_commit: '681982ccb9cfc0628e6a2d6c4453a2d38cebbd6c'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Social links currently use text initials ("GH", "LN", "TW") instead of recognizable icons, which is less visually appealing and harder to parse at a glance.

**Approach:** Replace the text nodes for GitHub, LinkedIn, and Twitter in `Layout.astro` and `about.astro` with inline SVG icons that match standard design patterns.

## Boundaries & Constraints

**Always:** Use lightweight, accessible inline SVGs with appropriate `aria-hidden="true"` attributes so screen readers rely on the parent anchor's `aria-label`.
**Ask First:** If an icon library needs to be installed, ask the user before adding new dependencies to `package.json`.
**Never:** Break the existing link targets or CSS classes.

</frozen-after-approval>

## Code Map

- `src/layouts/Layout.astro` -- Contains the main "GH", "LN", "TW" text links.
- `src/pages/about.astro` -- Contains "GitHub" and "LinkedIn" text links.

## Tasks & Acceptance

**Execution:**
- [x] `src/layouts/Layout.astro` -- Replace "GH", "LN", "TW" with SVG icons -- To improve visual design.
- [x] `src/pages/about.astro` -- Replace "GitHub" and "LinkedIn" text with SVG icons -- For consistency across the site.

**Acceptance Criteria:**
- Given a user viewing the site layout and about page, when they look at the social links, then they see recognizable icons instead of text.
- Given a screen reader user, when they focus on the links, then they hear the `aria-label` correctly and the icons are hidden from the reader.

## Verification

**Commands:**
- `npm run build` -- expected: Build completes successfully without Astro errors.

**Manual checks (if no CLI):**
- Run `npm run dev`, open the browser, and visually confirm the icons render correctly and maintain previous styling hooks.

## Suggested Review Order

- Inline SVGs replace text initials
  [`Layout.astro:57`](../../src/layouts/Layout.astro#L57)

- Inline SVGs replace full text
  [`about.astro:47`](../../src/pages/about.astro#L47)
