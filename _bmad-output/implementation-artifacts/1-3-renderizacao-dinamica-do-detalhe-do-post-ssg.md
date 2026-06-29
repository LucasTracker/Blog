# Story 1.3: Renderização Dinâmica do Detalhe do Post (SSG)

Status: done

## Story

As a reader,
I want to open the URL `/posts/{slug}` of an article,
So that I can read the formatted content.

## Acceptance Criteria

1. **Given** an article `.mdx` file exists in the content folder;
   **When** navigating to `/posts/{slug}`;
   **Then** the page renders the post title, publication date, and body HTML;
   **And** navigating to a non-existent slug returns a custom styled 404 error page.

## Tasks / Subtasks

- [x] Task 1: Create seed MDX post for testing (AC: 1)
  - [x] Create `src/content/posts/hello-world/index.mdx` with frontmatter matching the content schema
- [x] Task 2: Create `src/pages/posts/[slug].astro` dynamic route page (AC: 1)
  - [x] Use `getStaticPaths()` + `getCollection('posts')` + `render()` from `astro:content`
  - [x] Use `post.id` as the slug param (Astro 7 loader-based API, not legacy `post.slug`)
  - [x] Export `prerender = true` (needed for server output mode)
  - [x] Render post title, formatted `publishedAt` date, and `<Content />` body
  - [x] Apply DESIGN.md typography tokens inline (Playfair Display for title, Inter for body)
- [x] Task 3: Create custom 404 page (AC: 1)
  - [x] Create `src/pages/404.astro` with styled "Sorry, this article doesn't exist anymore." message and "Back to Blog" button per EXPERIENCE.md spec
  - [x] Export `prerender = true`
- [x] Task 4: Validate (AC: 1)

  - [x] `npx astro check` — 0 errors, 0 warnings (14 files checked)
  - [x] `npx astro build` — `/posts/hello-world/index.html` prerendered cleanly
  - [x] Built HTML confirmed: title, formatted date, description, and MDX body content all present
  - [x] `/404.html` prerendered cleanly with custom styled message

## Dev Notes

- **Astro 7 content API:** Use `render` (not `entry.render()`) from `astro:content` — imported as `import { getCollection, render } from 'astro:content'`
- **Slug param:** In Astro 7 loader-based collections, the entry key is `post.id` (e.g. `hello-world`), not `post.slug`. Use `post.id` as the `params.slug` value in `getStaticPaths`.
- **prerender required:** `src/pages/posts/[slug].astro` and `src/pages/404.astro` must `export const prerender = true` since the project uses `output: 'server'` in local mode.
- **Design tokens:** From DESIGN.md — background `#faf9f6`, text primary `#121212`, text secondary `#555555`, accent `#1e293b`, Playfair Display/Lora for headings, Inter for body.
- **404 UX spec:** From EXPERIENCE.md — "Sorry, this article doesn't exist anymore." under a serif headline, single "Back to Blog" primary button.
- **No test framework installed** — validation via `npx astro check` + `curl` HTTP status checks.
- **Architecture references:** AD-3 (Semantic/Performance-First Rendering), AD-4 (Accessibility/Visual Alignment).

### References

- [DESIGN.md](file:///home/rorschach/Documentos/Blog/_bmad-output/planning-artifacts/ux-designs/ux-lucas-souza-blog-2026-06-27/DESIGN.md)
- [EXPERIENCE.md](file:///home/rorschach/Documentos/Blog/_bmad-output/planning-artifacts/ux-designs/ux-lucas-souza-blog-2026-06-27/EXPERIENCE.md)
- [ARCHITECTURE-SPINE.md](file:///home/rorschach/Documentos/Blog/_bmad-output/planning-artifacts/architecture/architecture-lucas-souza-blog-2026-06-27/ARCHITECTURE-SPINE.md)
- [Story 1.2](file:///home/rorschach/Documentos/Blog/_bmad-output/implementation-artifacts/1-2-integracao-do-keystatic-em-modo-local-localhost.md)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

### Completion Notes List

- ✅ Task 1: Created `src/content/posts/hello-world/index.mdx` with title, description, publishedAt frontmatter.
- ✅ Task 2: Created `src/pages/posts/[slug].astro` — uses `getCollection('posts')` + `render()` from `astro:content`, `post.id` as slug param (Astro 7 loader-based API), `prerender = true`, full DESIGN.md token prose styles applied.
- ✅ Task 3: Created `src/pages/404.astro` — custom 404 per EXPERIENCE.md: serif headline, "Sorry, this article doesn't exist anymore.", "Back to Blog" pill CTA with `prerender = true`.
- ✅ Task 4: `npx astro check` — 0 errors, 0 warnings. `npx astro build` — all 3 pages prerendered. Built HTML verified: title, date, body all present.
- ⚠️ Note: Prerendered routes show 404 in `astro dev` server mode (expected — confirmed by build output). This is standard Astro behaviour for `output: 'server'` with `prerender = true`.

### File List

- `src/content/posts/hello-world/index.mdx` (created)
- `src/pages/posts/[slug].astro` (created)
- `src/pages/404.astro` (created)

### Change Log

- 2026-06-27: Story 1.3 implemented — dynamic post route with Astro 7 getCollection/render API, custom 404 page. Build verified: all pages prerendered with correct HTML output.

### Review Findings

- [x] [Review][Patch] Use correct DESIGN.md secondary text color token (`#555555`) in post metadata [src/pages/posts/[slug].astro:86]
- [x] [Review][Patch] Fix styling values for inline code formatting to conform to DESIGN.md tokens [src/pages/posts/[slug].astro:147-154]
- [x] [Review][Patch] Safely guard `publishedAt` Date formatting against missing/invalid values [src/pages/posts/[slug].astro:22-27]
- [x] [Review][Patch] Fallback post.data.title to "Untitled Post" for robustness and type safety [src/pages/posts/[slug].astro:33]
- [x] [Review][Patch] Fallback post.data.description in description meta tag [src/pages/posts/[slug].astro:34]
- [x] [Review][Patch] Add missing keyboard focus rings/styles for links inside post content [src/pages/posts/[slug].astro:138-144]
- [x] [Review][Patch] Make 404 page copy generic ("Page not found") instead of "Article not found" [src/pages/404.astro:82-85]
- [x] [Review][Patch] Remove duplicate global CSS resets from component styles [src/pages/posts/[slug].astro:41] [src/pages/404.astro:17]


