---
baseline_commit: 681982ccb9cfc0628e6a2d6c4453a2d38cebbd6c
---

# Story 3.2: Command Palette Search Modal (⌘K / Ctrl+K)

Status: done

## Story

As a recurring reader,
I want to search posts and tags via a global shortcut menu,
So that I can navigate extremely fast without using the mouse.

## Acceptance Criteria

1. **Given** I am on any page of the blog;
   **When** I press `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) or click the search box;
   **Then** a modal search overlay must open, focusing the input automatically;
   **And** typing filters posts by title and tags in real-time;
   **And** `Arrow Keys` navigate results, `Enter` opens the selected post, and `Escape` closes the search palette.

## Tasks / Subtasks

- [x] Task 1: Generate Search Index JSON
  - [x] Implement a static endpoint (e.g., `src/pages/search.json.ts` or a build script) that returns sorted blog posts data (title, slug/id, description, tags).
- [x] Task 2: Build Command Palette Modal Component
  - [x] Create search markup dialog (`<dialog>` or modal container) inside `src/layouts/Layout.astro`.
  - [x] Add the search icon/box trigger button to the sidebar navigation panel.
- [x] Task 3: Implement Keyboard Navigation and Filtering Logic
  - [x] Listen to `keydown` globally for `Meta+k` and `Control+k` triggers.
  - [x] Fetch the static search index dynamically on modal open (and cache it in memory).
  - [x] Handle modal accessibility (restoring focus, closing on `Escape`, focusing search input on open, and setting up dynamic arrow-key tracking).
- [x] Task 4: Verify
  - [x] Run `npx astro check` to validate TS types and components.
  - [x] Run `npm run build` to verify static HTML compiles correctly.


## Dev Notes

- **Keyboard Focus Management:** Ensure modal accessibility rules are met. Trap focus when search is open and restore focus when closed.
- **Search JSON Endpoint:** Use standard Astro API endpoint output:
  ```ts
  import { getCollection } from 'astro:content';
  export async function GET() {
    const posts = await getCollection('posts');
    return new Response(JSON.stringify(posts.map(p => ({
      id: p.id,
      title: p.data.title,
      description: p.data.description,
      tags: p.data.tags || []
    }))), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  ```

## Dev Agent Record

### Agent Model Used

Gemini 3.5 Flash (Low)

### Debug Log References

None

### Completion Notes List

- Implemented dynamic API endpoint `src/pages/search.json.ts` returning serialized blog collection payloads.
- Added centering flex overlays, backdrop blurs, trigger links, and modal `<dialog>` markup to `Layout.astro`.
- Configured keyboard bindings globally capturing `Cmd+K`/`Ctrl+K` and trapping vertical focus hooks using arrow keys.
- Executed compilation builds and TS checks successfully.

### File List

- `src/pages/search.json.ts` (created)
- `src/layouts/Layout.astro` (modified)

### Change Log

- 2026-06-27: Story 3.2 implemented — Command Palette modal search completed.
- 2026-06-27: Code review patches applied — view transition re-binding, XSS escaping, optional description guard, stale state reset, duplicate ID→class fix.

