---
baseline_commit: 40ce46ab4ac92cc7a84ca27cb63564e9bc90b2fb
---

# Story 2.2: Home Page and Blog Post Feed in a 3-Column Grid

Status: done

## Story

As a reader,
I want to see the latest articles organized as cards on the home page in English,
So that I can easily scan and read posts.

## Acceptance Criteria

1. **Given** multiple articles exist in the content folder;
   **When** viewing the Home page on desktop;
   **Then** posts are rendered as cards in a responsive grid of up to 3 columns (max content width `1024px` on screens >1200px);
   **And** the card footer renders metadata in English (e.g., "Oct 26, 2023 · 8 min read" and "Read Post" link);
   **And** hovering over a card shifts it up by 2px and intensifies the ambient shadow.

## Tasks / Subtasks

- [x] Task 1: Fetch and sort articles in `src/pages/index.astro`
  - [x] Use `getCollection('posts')` to fetch all MDX posts.
  - [x] Sort posts by `publishedAt` date in descending order (newest first).
- [x] Task 2: Build Post Card markup and styles
  - [x] Integrate post cards in a flexible grid container matching the CSS styling variables.
  - [x] Implement card layouts containing post title, description, category tag, and date footer.
  - [x] Configure card hover effects: `translateY(-2px)` vertical lift and shadow intensification using transitions (`300ms ease`).
  - [x] Render date format using UTC components to prevent timezone offset shifts.
- [x] Task 3: Wrap index page inside global Layout component
  - [x] Replace placeholder page structure in `src/pages/index.astro` with `<Layout>...</Layout>`.
  - [x] Set dynamic page title and description metadata properties.
- [x] Task 4: Verify
  - [x] Run `npx astro check` to validate TS types and collections queries.
  - [x] Run `npm run build` to verify static HTML compiles correctly.

### Review Findings

- [x] [Review][Patch] Potential RangeError or unstable sorting when `publishedAt` contains invalid dates [src/pages/index.astro:13-28]
- [x] [Review][Patch] Potential TypeError if getCollection('posts') returns undefined [src/pages/index.astro:10]
- [x] [Review][Patch] Text overflow container leak on extremely long words or links inside post cards [src/pages/index.astro:152-160]
- [x] [Review][Patch] Fallback system font rule for h1-h6 headings variables in index.css [src/assets/index.css:48-52]




## Dev Notes

- **Astro collections fetching:** Use standard `import { getCollection } from 'astro:content';`.
- **Card grid layout:** On desktop, use a 3-column css grid:
  ```css
  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--gutter);
  }
  ```
- **Grid breakpoints:** Mobile/Tablets should transition down to 1 or 2 columns based on device screen sizes.
- **Card hover transitions:**
  - Ambient shadow: `box-shadow: 0 4px 20px rgba(30, 41, 59, 0.04)`
  - Hover shadow: `box-shadow: 0 8px 30px rgba(30, 41, 59, 0.08)`
  - Transition duration: `transition: transform 300ms ease, box-shadow 300ms ease;`

## Dev Agent Record

### Agent Model Used

Gemini 3.5 Flash (Low)

### Debug Log References

None

### Completion Notes List

- Implemented `src/pages/index.astro` using the `<Layout>` wrapper, pulling post data from Astro collections and sorting entries descending by `publishedAt`.
- Built CSS variables-driven post cards utilizing semantic tags (`<article>`), rendering categories, titles, snippets, date metadata formatting (in UTC to prevent offset changes), and hover shadow/lift transitions.
- Executed `npm run build` and `npx astro check` to verify output diagnostics.

### File List

- `src/pages/index.astro` (modified)

### Change Log

- 2026-06-27: Story 2.2 implemented — home page post feed grid established. Build and diagnostics verified.

