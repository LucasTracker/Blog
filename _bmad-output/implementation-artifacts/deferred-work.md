# Deferred Work

## Deferred from: code review of 1-1-configuracao-inicial-do-projeto-astro (2026-06-27)

- No `engines` field in `package.json` — low priority, doesn't affect functionality, can be added at project hardening time.
- `keystatic.config.ts` uses `fields.text` for the MDX `contentField` — schema mismatch that needs to be fixed as part of Story 1.2 (Keystatic integration).
- Keystatic collection `path` is missing trailing slash (`src/content/posts/*` should be `src/content/posts/*/`) — fix in Story 1.2.
- No `src/content/config.ts` Astro content collection schema — required for type-safe `getCollection()` queries; scoped to Story 1.3.

## Deferred from: sprint planning (2026-06-27)

- **Story 3.3 (Original): Automated Deployment to GitHub Pages (CI/CD)** — Replaced by "Local Article Creation Page" story. GitHub Actions deploy workflow (`deploy.yml`) deferred to a future epic or sprint.

