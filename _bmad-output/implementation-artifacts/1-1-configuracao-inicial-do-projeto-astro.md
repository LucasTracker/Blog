# Story 1.1: Configuração Inicial do Projeto Astro

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want to initialize the project with Astro and TypeScript,
so that I have the basic folder structure and dependencies ready for coding.

## Acceptance Criteria

1. **Given** a clean workspace;
   **When** running the development server via `npm run dev`;
   **Then** the Astro development server starts successfully on port 4321;
   **And** TypeScript compilation executes with zero errors.

## Tasks / Subtasks

- [ ] Task 1: Setup npm project and configure dependencies (AC: 1)
  - [ ] Create `package.json` with version constraints for Astro, TypeScript, React, and Keystatic.
  - [ ] Install package dependencies: `astro`, `typescript`, `@keystatic/core`, `@keystatic/astro`, `react`, `react-dom`.
- [ ] Task 2: Configure TypeScript and Astro config (AC: 1)
  - [ ] Create `tsconfig.json` with standard Astro TypeScript configurations.
  - [ ] Create `astro.config.mjs` integrating React and Keystatic integrations.
- [ ] Task 3: Create initial directory structure and mock landing page (AC: 1)
  - [ ] Create directories: `src/pages/`, `src/layouts/`, `src/components/`, `src/content/posts/`, `src/assets/`.
  - [ ] Create `src/pages/index.astro` rendering a simple placeholder "Lucas Souza - Blog" to confirm server rendering.
- [ ] Task 4: Verify dev server execution and type checks (AC: 1)
  - [ ] Verify `npm run dev` boots successfully and resolves on port 4321.
  - [ ] Run typescript check to verify compile success with zero errors.

## Dev Notes

- **Astro version:** `^7.0.3` (upgraded from `^4.16.0` per user request)
- **React version:** `^19.2.7` (upgraded from `^18.3.0`)
- **TypeScript version:** `^6.0.3` (upgraded from `^5.0.0`)
- Note: Story spec referenced older versions — project was intentionally upgraded to latest before review.
- Custom CSS variables and initial styles should be pre-planned but will be finalized in Epic 2.
- Testing: Execute Astro dev mode locally.

### Project Structure Notes

We target creating the following baseline layout structure:
- `package.json`
- `tsconfig.json`
- `astro.config.mjs`
- `src/pages/index.astro`

### References

- Cite: [ARCHITECTURE-SPINE.md](file:///home/rorschach/Documentos/Blog/_bmad-output/planning-artifacts/architecture/architecture-lucas-souza-blog-2026-06-27/ARCHITECTURE-SPINE.md#Stack)

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List

- `package.json`
- `astro.config.mjs`
- `tsconfig.json`
- `src/pages/index.astro`
- `src/env.d.ts`
- `keystatic.config.ts`
- `src/assets/` (dir)
- `src/components/` (dir)
- `src/content/posts/` (dir)
- `src/layouts/` (dir)

### Review Findings

- [x] [Review][Decision→Patch] tsconfig.json root-level JSX override — removed `jsx`/`jsxImportSource`; `@astrojs/react` handles JSX via Vite [tsconfig.json] ✅ fixed
- [x] [Review][Patch] `adapter: undefined` passed explicitly in static production config — replaced inline ternaries with two clean config objects [astro.config.mjs] ✅ fixed
- [x] [Review][Patch] No `prerender = true` on `index.astro` — added `export const prerender = true` [src/pages/index.astro] ✅ fixed
- [x] [Review][Patch] `isProdBuild` conflates CI env (`GITHUB_ACTIONS`) with `NODE_ENV=production` — renamed to `isCiBuild`, checks only `GITHUB_ACTIONS` [astro.config.mjs] ✅ fixed
- [x] [Review][Patch] Story Dev Notes reference stale Astro/React version numbers — updated in this review ✅ fixed
- [x] [Review][Defer] No `engines` field in `package.json` — not blocking, low priority [package.json] — deferred, pre-existing
- [x] [Review][Defer] `keystatic.config.ts` uses `fields.text` for MDX `contentField` — schema mismatch, scoped to Story 1.2 [keystatic.config.ts] — deferred, pre-existing
- [x] [Review][Defer] Keystatic `path` missing trailing slash (`src/content/posts/*` → `src/content/posts/*/`) — scoped to Story 1.2 [keystatic.config.ts] — deferred, pre-existing
- [x] [Review][Defer] No `src/content/config.ts` content collection schema — needed for Story 1.3 getCollection queries [src/content/] — deferred, pre-existing
