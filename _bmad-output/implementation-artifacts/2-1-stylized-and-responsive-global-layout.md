---
baseline_commit: b836733cda782b019be1076d00a29b2a10e3fe71
---

# Story 2.1: Stylized and Responsive Global Layout

Status: done

## Story

As a developer,
I want to create the default page layout file `Layout.astro` with CSS variable tokens,
So that all pages share the same sidebar and styling in English.

## Acceptance Criteria

1. **Given** the global Astro layout is configured;
   **When** accessing any public page;
   **Then** the site displays the fixed left sidebar containing the avatar, bio, social links, and navigation items ("Blog", "Projects", "About") in English;
   **And** the styling applies Playfair Display/Lora for headings, Inter for body copy/UI labels, and the `#faf9f6` background.

## Tasks / Subtasks

- [x] Task 1: Create global styles sheet at `src/assets/index.css`
  - [x] Define custom properties matching DESIGN.md tokens: colors (`--background`, `--surface`, `--text-primary`, `--text-secondary`, `--accent`, `--border`), typography fonts and weights.
  - [x] Configure global reset and accessibility focus styling rules.
- [x] Task 2: Create Layout wrapper component at `src/layouts/Layout.astro`
  - [x] Setup HTML5 base structure with viewport tags and Google Fonts links (Playfair Display, Inter).
  - [x] Implement responsive layout container: fixed left sidebar (`280px`) and main content area (max `780px` / `1024px`).
  - [x] Build Profile Card inside Sidebar: placeholder for avatar (img), biography, Navigation menu links ("Blog", "Projects", "About"), and social media links (GitHub, LinkedIn, Twitter/X).
  - [x] Include `<slot />` inside the main content container to inject page-specific layouts.
  - [x] Apply semantic layout tags (`<aside>`, `<main>`, `<nav>`, `<header>`).
- [x] Task 3: Migrate existing pages to use Layout wrapper
  - [x] Update `src/pages/posts/[slug].astro` and `src/pages/404.astro` to wrap content inside `<Layout>...</Layout>`.
  - [x] Ensure they remove duplicated metadata definitions, preconnect links, and base styling resets.
- [x] Task 4: Verify
  - [x] `npx astro check` is successful with zero errors.
  - [x] `npm run build` succeeds and outputs correct page files using the new layout.

### Review Findings

- [x] [Review][Patch] Keyboard focus can land on sidebar navigation menu items when the sidebar drawer is closed on mobile layout [src/layouts/Layout.astro:252-257]
- [x] [Review][Patch] Avoid duplicate drawer-overlay elements when script re-executes on transition [src/layouts/Layout.astro:70-75]




## Dev Notes

- **CSS Variables:** Colors to define:
  - `--background: #faf9f6;`
  - `--surface: #ffffff;`
  - `--on-background: #121212;`
  - `--on-surface: #1a1a1a;`
  - `--text-primary: #121212;`
  - `--text-secondary: #555555;`
  - `--text-muted: #777777;`
  - `--accent: #1e293b;`
  - `--border: #e2e8f0;`
  - `--divider: #f1f5f9;`
- **Layout Widths:** Desktop uses sidebar `280px`, main content max `780px` (or `1024px` on screen widths > 1200px) with gutter spacing.
- **Sidebar Profile Card:**
  - Avatar: Use a standard rounded-full img block (placeholder for now).
  - Bio: "AI Engineer & Tech Writer based in Brazil."
  - Nav links: Home (`/`), Projects (`/projects`), About (`/about`).
- **Typography:** Lora/Playfair Display for headers, Inter for body copy and UI tags.

## Dev Agent Record

### Agent Model Used

Gemini 3.5 Flash (Low)

### Debug Log References

None

### Completion Notes List

- Created `src/assets/index.css` incorporating the variables, structural values, resetting global HTML behaviors, and configuring accessiblity focus-visible rules.
- Created `src/layouts/Layout.astro` layout wrapper component, building the fixed sidebar layout on desktop (incorporating author profile data and navigation) and rendering responsive stacked column behaviors inside mobile views along with a menu toggle overlay drawer.
- Refactored `src/pages/posts/[slug].astro` and `src/pages/404.astro` to wrap content inside `<Layout>`, removing duplicate boilerplate meta tags, Google Web fonts setups, and global overrides.
- Executed `npm run build` and `npx astro check` to verify output diagnostics.

### File List

- `src/assets/index.css` (created)
- `src/layouts/Layout.astro` (created)
- `src/pages/posts/[slug].astro` (modified)
- `src/pages/404.astro` (modified)

### Change Log

- 2026-06-27: Story 2.1 implemented — stylized and responsive layout established. Build and typecheck verified.

