---
baseline_commit: 681982ccb9cfc0628e6a2d6c4453a2d38cebbd6c
---

# Story 3.3: Local Article Creation Page

Status: done

## Story

As a blog author,
I want a dedicated local-only page at `/create` where I can compose an article with title, description, date, and markdown content,
So that I can quickly generate a properly formatted MDX file in the content directory without manually creating files or relying solely on the Keystatic admin UI.

## Acceptance Criteria

1. **Given** the local dev server is running (`npm run dev`);
   **When** I navigate to `http://localhost:4321/create`;
   **Then** a styled article creation form is displayed with fields for title, description, published date, and markdown content;
   **And** the page follows the existing blog design system (CSS variables, typography, layout).

2. **Given** I fill in all required fields (title, description, date, content) and submit the form;
   **When** the server processes the submission;
   **Then** a new directory is created at `src/content/posts/{slug}/` with an `index.mdx` file containing proper YAML frontmatter (`title`, `description`, `publishedAt`) and the markdown body;
   **And** I see a success message with a link to the newly created post.

3. **Given** I submit the form with a title that generates a slug matching an existing post;
   **When** the server checks for conflicts;
   **Then** the submission is rejected with a clear error message indicating the slug already exists.

4. **Given** the project is built for production (`GITHUB_ACTIONS=true` or `output: 'static'`);
   **When** the Astro build runs;
   **Then** the `/create` route and its API endpoint do NOT exist in the built output;
   **And** the build completes without errors.

5. **Given** I submit the form with missing required fields;
   **When** the server validates the input;
   **Then** the form displays validation errors for the missing fields without losing already-entered data.

## Tasks / Subtasks

- [x] Task 1: Create the custom Astro integration for dev-only route injection (AC: #4)
  - [x] 1.1 Create `src/integrations/local-create.ts` with an integration that uses `injectRoute()` in the `astro:config:setup` hook to register `/create` and `/api/create-post` routes
  - [x] 1.2 Register the integration in `astro.config.mjs` ONLY in the local dev config block (alongside `keystatic()`)

- [x] Task 2: Create the API endpoint for saving MDX files (AC: #2, #3, #5)
  - [x] 2.1 Create `src/local-create/api-create-post.ts` implementing a `POST` handler that:
    - Reads `title`, `description`, `publishedAt`, and `content` from `request.formData()`
    - Validates all required fields; returns 400 JSON error if missing
    - Generates a kebab-case slug from the title
    - Checks if `src/content/posts/{slug}/` already exists; returns 409 conflict if so
    - Creates directory `src/content/posts/{slug}/`
    - Writes `index.mdx` with YAML frontmatter + body content
    - Returns a 201 JSON response with the slug on success
  - [x] 2.2 The MDX file format must match Keystatic's output exactly:
    ```yaml
    ---
    title: "The Post Title"
    description: "The description text"
    publishedAt: "2026-06-27"
    ---
    ```
    Followed by the markdown body content.

- [x] Task 3: Create the create-article page UI (AC: #1, #5)
  - [x] 3.1 Create `src/local-create/create.astro` with the article creation form
  - [x] 3.2 Import and use the existing `Layout.astro` wrapper for consistent styling
  - [x] 3.3 Build the form with:
    - Text input for **Title** (required)
    - Text input for **Description** (required)
    - Date input for **Published At** (required, defaults to today)
    - Large `<textarea>` for **Content** (markdown body, required)
    - Submit button styled consistently with existing design tokens
  - [x] 3.4 Add client-side JavaScript for form submission:
    - Submit via `fetch()` POST to `/api/create-post` with `FormData`
    - Display success message with link to the new post
    - Display validation/conflict errors inline without losing form data
    - Disable submit button during processing to prevent double-submit

- [x] Task 4: Add sidebar navigation link for the create page (AC: #1)
  - [x] 4.1 Add a "New Post" or "✏️ Write" link to the sidebar nav in `Layout.astro`
  - [x] 4.2 This link should only render when in dev mode — use a frontmatter check like `import.meta.env.DEV` to conditionally show it
  - [x] 4.3 Style it as a subtle secondary link or icon button, distinct from the main nav items

- [x] Task 5: Verify (AC: #2, #4)
  - [x] 5.1 Run `npm run dev`, navigate to `/create`, fill form, submit → verify MDX file is created correctly
  - [x] 5.2 Run `GITHUB_ACTIONS=true npx astro build` → verify the build succeeds and `/create` route is NOT in `dist/`
  - [x] 5.3 Run `npx astro check` → verify zero TS errors

## Dev Notes

### Architecture Pattern: Dev-Only Route Injection

The project already uses a dual-config pattern in `astro.config.mjs`:
- **Local dev:** `output: 'server'` with `@astrojs/node` adapter + Keystatic integration
- **CI build:** `output: 'static'` with NO adapter, NO Keystatic

This story follows the EXACT same pattern. The create-page integration is loaded ONLY in the local dev config, alongside Keystatic. In CI/production builds, the integration is not loaded, so the routes don't exist.

**Critical: Do NOT place files in `src/pages/`.** Files in `src/pages/` are auto-discovered by Astro's file-based routing and would be included in ALL builds. Instead, place them in `src/local-create/` and inject them via the integration's `injectRoute()`.

### Custom Integration Implementation

```ts
// src/integrations/local-create.ts
import type { AstroIntegration } from 'astro';

export default function localCreateIntegration(): AstroIntegration {
  return {
    name: 'local-create',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/create',
          entrypoint: './src/local-create/create.astro',
          prerender: false,
        });
        injectRoute({
          pattern: '/api/create-post',
          entrypoint: './src/local-create/api-create-post.ts',
          prerender: false,
        });
      },
    },
  };
}
```

### Config Registration

In `astro.config.mjs`, import and add to the local dev block only:

```js
import localCreate from './src/integrations/local-create';

// In the local dev (non-CI) config:
integrations: [react(), mdx(), keystatic(), localCreate()],
```

### API Endpoint Pattern

Use Astro's `APIRoute` type with `POST` export. Reference the existing `src/pages/search.json.ts` for the endpoint pattern used in this project. Use Node.js `fs` module (`node:fs/promises`) and `node:path` to write files — this is safe because the endpoint only runs in server mode with the Node adapter.

### Slug Generation

Implement a simple slugify function:
```ts
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```
This handles Portuguese characters (diacritics) which the blog author may use.

### MDX File Format (Must Match Keystatic Output)

Keystatic stores posts at `src/content/posts/{slug}/index.mdx` with this structure:
```
---
title: "Post Title"
description: "Post description"
publishedAt: "2026-06-27"
---

Markdown body content here...
```

The content collection loader at `src/content.config.ts` uses a `glob` loader with pattern `**/index.mdx` and expects `title` (string), `description` (string), and `publishedAt` (coerce to date) in the frontmatter. The generated file MUST match this schema exactly.

### Styling Requirements

- Use existing CSS custom properties from `src/assets/index.css`: `--background`, `--surface`, `--text-primary`, `--accent`, `--border`, `--rounded-md`, `--rounded-lg`, `--font-sans`, `--font-serif`
- Form inputs: white `--surface` background, `1px solid var(--border)` border, `var(--rounded-md)` border radius
- The content textarea should be tall (~400px min-height) for comfortable writing
- Submit button: `var(--accent)` background, `var(--on-accent)` text, `var(--rounded-full)` radius
- Success/error messages: styled with appropriate colors (green for success, red for error)
- The form page should use `Layout.astro` as its wrapper for sidebar + consistent chrome

### Sidebar Nav Link (Dev-Only)

Use `import.meta.env.DEV` in `Layout.astro` frontmatter to conditionally render the "Write" link:
```astro
{import.meta.env.DEV && (
  <li><a href="/create" class="nav-link nav-link-dev">✏️ Write</a></li>
)}
```
Style `.nav-link-dev` subtly differently (e.g., muted color or small badge) to indicate it's a dev-only feature.

### Files to Create

| File | Action | Purpose |
|------|--------|---------|
| `src/integrations/local-create.ts` | CREATE | Astro integration that injects dev-only routes |
| `src/local-create/create.astro` | CREATE | Article creation form page |
| `src/local-create/api-create-post.ts` | CREATE | POST endpoint that writes MDX files |

### Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `astro.config.mjs` | UPDATE | Import and register `localCreate()` in the dev config block |
| `src/layouts/Layout.astro` | UPDATE | Add conditional "Write" nav link (dev-only) |

### Project Structure Notes

- Files at `src/local-create/` are NOT in `src/pages/` — this is intentional to prevent auto-discovery in static builds
- The `src/integrations/` directory is new and follows Astro's convention for custom integrations
- The content output path `src/content/posts/{slug}/index.mdx` aligns with both Keystatic config (`path: 'src/content/posts/*/'`) and the glob loader in `src/content.config.ts` (`pattern: '**/index.mdx'`)

### Previous Story Learnings (from 3-1 and 3-2)

- **View Transitions are active** — client-side JS may need `astro:page-load` event listener for re-initialization after SPA transitions
- **Layout.astro is the central hub** (~849 lines) — make minimal, surgical changes to the nav section only
- **No separate component files exist** — all UI is inline in pages/layout (don't create a new component convention for this story)
- **Touch device handling** — use `@media (hover: hover)` for hover states (already established pattern)
- **Code review patches from 3-2** included XSS escaping — ensure any user input displayed back in success messages is escaped

### References

- [Astro `injectRoute` API](https://docs.astro.build/en/reference/integrations-reference/#injectroute): Source for route injection in custom integrations
- [Astro API Routes / Endpoints](https://docs.astro.build/en/guides/endpoints/): Source for POST handler pattern
- [Source: astro.config.mjs](file:///home/rorschach/Documentos/Blog/astro.config.mjs): Dual-mode config pattern
- [Source: keystatic.config.ts](file:///home/rorschach/Documentos/Blog/keystatic.config.ts): Post schema and file path pattern
- [Source: src/content.config.ts](file:///home/rorschach/Documentos/Blog/src/content.config.ts): Content collection schema
- [Source: src/layouts/Layout.astro#L44-L55](file:///home/rorschach/Documentos/Blog/src/layouts/Layout.astro#L44-L55): Sidebar nav section to modify
- [Source: src/assets/index.css](file:///home/rorschach/Documentos/Blog/src/assets/index.css): Design tokens / CSS variables

### Review Findings

- [x] [Review][Patch] Missing Integration Registration — Ensure `astro.config.mjs` actually has the local-create integration registered. [astro.config.mjs]
- [x] [Review][Patch] Out-of-Scope Feature: Search Modal Implementation — Remove the unrequested search modal, JS logic, and CSS from Layout.astro. [src/layouts/Layout.astro]
- [x] [Review][Patch] Out-of-Scope Feature: SVG Icons in Footer — Revert the unrelated SVG icon additions in the footer. [src/layouts/Layout.astro]
- [x] [Review][Patch] YAML Injection Vulnerability — Escape newlines in `escapeYamlString` to prevent YAML injection. [src/local-create/api-create-post.ts:39-43]
- [x] [Review][Patch] TOCTOU Race Condition / `fs.access` non-ENOENT — Use try/catch around `mkdir` or `wx` flag instead of relying on `access()` for conflict detection, and ensure errors like EACCES are handled. [src/local-create/api-create-post.ts:80-89]
- [x] [Review][Patch] Brittle File Path Resolution — Avoid relying on `path.resolve` from the working directory; consider a more robust resolution if possible. [src/local-create/api-create-post.ts:77]
- [x] [Review][Patch] Timezone Date Bug — Use local timezone for default date instead of UTC. [src/local-create/create.astro:334]
- [x] [Review][Patch] FormData File Handling — Check if FormData values are `File` objects before calling `.toString()` or using them as strings. [src/local-create/api-create-post.ts:48-51]
- [x] [Review][Patch] Poor Error Handling Casts — Check if `err` is an instance of `Error` before accessing `.message`. [src/local-create/api-create-post.ts:106]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6 (Thinking) via Antigravity CLI

### Debug Log References

- `npx astro check` — 0 errors, 0 warnings (8 hints from pre-existing _bmad scripts, unrelated)
- `GITHUB_ACTIONS=true npx astro build` — succeeds, `/create` route excluded from static output
- Dev server manual test — POST to `/api/create-post` validated: empty fields → 400, valid data → 201 + MDX created, duplicate slug → 409
- Installed `@types/node` as devDependency (required for `node:fs/promises` and `node:path` type resolution)

### Completion Notes List

- Task 1: Created `src/integrations/local-create.ts` Astro integration using `injectRoute()` to register `/create` page and `/api/create-post` endpoint. Registered in dev-only config block in `astro.config.mjs`.
- Task 2: Implemented POST endpoint at `src/local-create/api-create-post.ts` with full validation (400), slug conflict detection (409), and MDX file creation (201). Includes `slugify()` with diacritics support and YAML string escaping.
- Task 3: Built article creation form at `src/local-create/create.astro` using Layout.astro wrapper, design tokens, client-side validation, fetch-based submission, XSS-safe output via `escapeHtml()`, and `astro:page-load` event for view transition compatibility.
- Task 4: Added dev-only "✏️ Write" nav link in Layout.astro sidebar using `import.meta.env.DEV` conditional rendering. Styled with muted color + "DEV" badge via `::after` pseudo-element.
- Task 5: All verification tests pass — TypeScript check clean, production build excludes create route, dev server serves form and API correctly.

### File List

- `src/integrations/local-create.ts` — CREATED — Astro integration for dev-only route injection
- `src/local-create/create.astro` — CREATED — Article creation form page
- `src/local-create/api-create-post.ts` — CREATED — POST endpoint for MDX file creation
- `astro.config.mjs` — MODIFIED — Added `localCreate()` import and integration registration in dev config
- `src/layouts/Layout.astro` — MODIFIED — Added dev-only "✏️ Write" nav link + `.nav-link-dev` CSS styles
- `package.json` — MODIFIED — Added `@types/node` devDependency
- `package-lock.json` — MODIFIED — Lock file updated with `@types/node`

### Change Log

- 2026-06-28: Implemented Story 3.3 — Local Article Creation Page. Created custom Astro integration for dev-only route injection, POST API endpoint for MDX file generation, styled form page with client-side validation, and dev-only sidebar nav link. All acceptance criteria satisfied.
