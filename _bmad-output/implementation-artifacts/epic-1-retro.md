# Retrospective: Epic 1: Blog Foundation & Local Writing (Astro & Keystatic CMS)

**Date:** 2026-06-27

## 1. Epic Outcomes

* **Goal:** Establish the project skeleton and the local writing platform so the author can write and preview articles locally.
* **Stories Completed:** `3/3` (100%)
  * [1-1-configuracao-inicial-do-projeto-astro.md](file:///home/rorschach/Documentos/Blog/_bmad-output/implementation-artifacts/1-1-configuracao-inicial-do-projeto-astro.md) — Done
  * [1-2-integracao-do-keystatic-em-modo-local-localhost.md](file:///home/rorschach/Documentos/Blog/_bmad-output/implementation-artifacts/1-2-integracao-do-keystatic-em-modo-local-localhost.md) — Done
  * [1-3-renderizacao-dinamica-do-detalhe-do-post-ssg.md](file:///home/rorschach/Documentos/Blog/_bmad-output/implementation-artifacts/1-3-renderizacao-dinamica-do-detalhe-do-post-ssg.md) — Done

## 2. Key Learnings & Improvements

* **Framework Upgrades:** Migrated the project skeleton successfully to Astro 7 and TypeScript 6, ensuring that Vite configurations compile correctly.
* **Astro 7 Loaders:** Configured content collection schemas in `src/content.config.ts` using glob loaders, which cleanly fetch metadata attributes (e.g., date coercion, description strings).
* **MDX & Keystatic CMS Integrations:** Switched from Markdoc to MDX syntax inside Keystatic configuration variables, matching output directories to `src/content/posts/*/` and assets targets.

## 3. Review Fixes Applied

* Removed JSX overrides from `tsconfig.json` since `@astrojs/react` processes transpiles directly inside Vite.
* Safely coerced post date strings to Date structures using Zod schemas (`z.coerce.date()`).
* Fixed relative image paths (`publicPath` levels) inside `keystatic.config.ts`.
