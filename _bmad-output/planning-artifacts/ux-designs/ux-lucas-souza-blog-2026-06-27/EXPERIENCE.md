---
name: Lucas Souza - Minimalist Blog
status: final
sources:
  - {planning_artifacts}/ux-designs/ux-lucas-souza-blog-2026-06-27/DESIGN.md
updated: 2026-06-27
---

# Lucas Souza - Blog — Experience Spine

This document defines how the blog behaves, its information architecture, navigation structures, accessibility patterns, and core user flows, complementing the visual design rules in `DESIGN.md`.

→ Interactive prototype reference: [mockups/index.html](file:///home/rorschach/Documentos/Blog/_bmad-output/planning-artifacts/ux-designs/ux-lucas-souza-blog-2026-06-27/mockups/index.html). Spines win on conflict.

## Foundation

The blog is built as a single-surface responsive web application (supporting desktop, tablet, and mobile views). It uses semantic HTML5 and vanilla JavaScript/CSS (or React/Next.js depending on final build choices) to achieve fast loading times and smooth transitions. The behavioral design system is light-weight, emphasizing instant interactions, keyboard navigation, and clutter-free screen layouts.

## Information Architecture

| Surface | Reached from | Purpose |
|---|---|---|
| Home / Blog List | Root `/` / Nav "Blog" | Main landing page. Displays lists of articles with sidebar navigation and category tags. |
| Post Detail | Article Row/Card / URL `/posts/{slug}` | Reading page for a single article. Text-optimized layout. |
| Projects | Nav "Projects" / URL `/projects` | Showcase of personal projects, side projects, and contributions. |
| About | Nav "About" / URL `/about` | Professional bio, skills, resume download, and contact links. |
| Category View | Clicking any Tag / URL `/category/{name}` | Filters the blog list to only show articles matching the tag. |

### Layout Framework

- **Desktop (md+):** Fixed left sidebar (`280px`) + main content window (max `780px` on standard desktop, expanding to `1024px` on screen widths above `1200px`) + optional right sidebar for secondary widgets (categories).
- **Mobile (sm):** Stacks vertically. The sidebar becomes a collapsing slide-out navigation bar triggered by a top-screen header icon.

## Voice and Tone

Microcopy is clear, confident, and direct. It avoids tech jargon where simple words work, but maintains developer authenticity.

| Do | Don't |
|---|---|
| "Written on October 26, 2023 · 8 min read" | "Published: 10/26/23 | Est. Reading Duration: 8 Minutes" |
| "Search articles..." | "Find content you might like here..." |
| "Copied to clipboard!" | "URL copied successfully to system clipboard." |
| "Thanks for subscribing!" | "Your email has been registered in our database." |

## Component Patterns

### Post Card
- **Behavior:** The entire card is clickable to navigate to the article. Hovering lifts the card (translateY `-2px`) and intensifies the drop shadow. Featured images scale up slightly (1.05x) within their container using a smooth transition (`300ms ease`).
- **Interaction:** Category tag link within the card stops propagation so clicking the tag filters the feed directly, instead of opening the post.

### Code Block
- **Behavior:** Positioned inside markdown content. Displays a "Copy" button on the top-right corner.
- **Interaction:** Clicking "Copy" changes text to "Copied!" for 2 seconds before reverting. The action copies raw text without styling.

### Command Palette (⌘K / Ctrl+K)
- **Behavior:** Universal search menu. Opens a modal overlay with input focused immediately.
- **Interaction:** Typahead filters posts and categories. Arrow keys navigate the results, `Enter` opens the item, `Escape` closes the palette.

## State Patterns

### Loading / Transition
- **Behavior:** Initial load shows skeleton cards with pulsating text blocks and image placeholders to reduce perceived latency.

### Post Not Found
- **Behavior:** Displays a clean 404 message: *"Sorry, this article doesn't exist anymore."* below a serif headline. Offers a single primary button: *"Back to Blog"*.


## Interaction Primitives

- **Keyboard navigation:**
  - `⌘K` / `Ctrl+K` — Open Command Palette
  - `Esc` — Close modals / palettes
  - `Tab` / `Shift+Tab` — Cycle through focusable elements (cards, tags, inputs)
- **Touch / Gesture:** Left-to-right swipe on mobile opens the left navigation drawer; right-to-left swipe closes it.
- **Hover effects:** Disabled on touch devices to prevent sticky hover states.

## Accessibility Floor

- **Semantic HTML:** Outlines use logical header levels (`<h1>` for site title/post title, `<h2>` for sections, etc.).
- **Focus Rings:** Focus indicators are highly visible against both the `{colors.background}` and `{colors.surface}`.
- **Contrast:** Core text colors guarantee a minimum contrast ratio of 4.5:1 against their backgrounds (conforming to WCAG 2.1 AA).
- **ARIA:** Modals use `role="dialog"`, search inputs use `aria-label="Search articles"`, and icons have `aria-hidden="true"`.

## Key Flows

### Flow 1 — Reading and copying a code block
1. A developer lands on the blog home page and sees a post card titled *"Mastering React Query"*.
2. They click the card. The page transitions smoothly to the Post Detail view.
3. They scroll down to find a code block demonstrating Query Client setup.
4. They hover over the block, click the "Copy" button.
5. The button displays "Copied!" and the code is saved to their clipboard. They exit the page.

### Flow 2 — Filtering by Tag
1. A reader wants to see only Next.js posts.
2. They click the "Next.js" tag pill in the sidebar.
3. The blog list filters instantly, updating the header to *"Articles tag: Next.js"* and showing only relevant cards.
4. To reset, the reader clicks the "Clear filter" inline link.
