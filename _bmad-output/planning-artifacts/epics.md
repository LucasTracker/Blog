---
stepsCompleted:
  - step-01
  - step-02
  - step-03
inputDocuments:
  - _bmad-output/planning-artifacts/ux-designs/ux-lucas-souza-blog-2026-06-27/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-lucas-souza-blog-2026-06-27/EXPERIENCE.md
  - _bmad-output/planning-artifacts/architecture/architecture-lucas-souza-blog-2026-06-27/ARCHITECTURE-SPINE.md
---

# Lucas Souza - Blog - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Lucas Souza - Blog, decomposing the requirements from the PRD (derived from UX), UX Design spine pair, and Architecture spine into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Home / Blog List Page displaying a paginated feed of post cards.
FR2: Post detail page rendered dynamically from MDX files.
FR3: Projects page displaying a grid of portfolio project cards with repository and demo links.
FR4: About page displaying a professional biography, skills cloud, and social media/contact links.
FR5: Category tag filtering that dynamically filters the blog feed when clicking tags.
FR6: Interactive Code Blocks with a "Copy" utility button copying raw text.
FR7: Command Palette search modal (activated by ⌘K / Ctrl+K) filtering posts and categories in real-time.
FR9: Collapsing mobile navigation menu drawer triggered by a header bar button.

### NonFunctional Requirements

NFR1: Permanent Zero-Cost Hosting using GitHub Pages.
NFR2: Astro framework static compilation (SSG) to achieve maximum loading speeds (target Lighthouse score > 95).
NFR3: Accessibility compliance aiming for WCAG 2.1 AA contrast levels (minimum 4.5:1 ratio) and keyboard navigation.
NFR4: Local-first CMS authoring using Keystatic Local Mode, committing Markdown/MDX files straight to Git.

### Additional Requirements

- **ARCH-R1**: Astro framework `@latest` or `^4.16.0` configuration.
- **ARCH-R2**: Keystatic integrated in Local Mode, running under `localhost:3000/admin` in development.
- **ARCH-R3**: GitHub Actions workflow (`deploy.yml`) executing static build and pushing to the `gh-pages` branch on every main push.

### UX Design Requirements

UX-DR1: Clean, text-focused, minimalist light mode aesthetic using custom CSS variables (like background `#faf9f6` and surface `#ffffff`).
UX-DR2: Typography styling using Playfair Display/Lora for headings and Inter for body copy/UI labels.
UX-DR3: Flexible layout combining a fixed left sidebar (`280px`) and main content window (max `780px` expanding to `1024px` on screen widths above `1200px`).
UX-DR4: Diffused ambient hover shadows (`box-shadow: 0 4px 20px rgba(30, 41, 59, 0.04)`) and subtle card lifting on hover.

### FR Coverage Map

FR1: Epic 2 - Home Page with feed in grid of 3 cards per row on desktop.
FR2: Epic 1 - Dynamic post detail rendering from MDX files.
FR3: Epic 2 - Portfolio projects page with link layout.
FR4: Epic 2 - About bio and social contact page.
FR5: Epic 1 - Category tag filtering inside MDX collections.
FR6: Epic 3 - Code block Copy button functionality.
FR7: Epic 3 - Command Palette search modal (⌘K / Ctrl+K).
FR9: Epic 2 - Mobile sidebar navigation drawer.

## Epic List

### Epic 1: Blog Foundation & Local Writing (Astro & Keystatic CMS)
Establish the project skeleton and the local writing platform so the author can write and preview articles locally.
**FRs covered:** FR2, FR5

### Epic 2: Reader Interface & Navigation (Layout & Pages)
Build all the visual pages and layouts (Home feed, Projects page, About page, mobile nav) that allow readers to browse the content in English.
**FRs covered:** FR1, FR3, FR4, FR9

### Epic 3: Interactive Features & Deployment (Search, Code & Git Deploy)
Add advanced interactive features (Command Palette search, code block copy button) and deploy the blog live to GitHub Pages.
**FRs covered:** FR6, FR7

---

## Epic 1: Blog Foundation & Local Writing (Astro & Keystatic CMS)

Establish the project skeleton and the local writing platform so the author can write and preview articles locally.
**FRs covered:** FR2, FR5

### Story 1.1: Configuração Inicial do Projeto Astro
As a developer,
I want to initialize the project with Astro and TypeScript,
So that I have the basic folder structure and dependencies ready for coding.

**Acceptance Criteria:**
**Given** a clean workspace;
**When** running the development server via `npm run dev`;
**Then** the Astro development server starts successfully on port 4321;
**And** TypeScript compilation executes with zero errors.

### Story 1.2: Integração do Keystatic em Modo Local (localhost)
As a writer,
I want to use a visual local writing interface under `/admin`,
So that I can compose and save posts visually without manually editing Markdown files.

**Acceptance Criteria:**
**Given** Keystatic packages are configured;
**When** navigating to `http://localhost:4321/admin` in local development;
**Then** the Keystatic dashboard displays the "Posts" collection;
**And** saving a new post generates the corresponding `.mdx` file inside `src/content/posts/{slug}.mdx` and saves media files in the static asset directory.

### Story 1.3: Renderização Dinâmica do Detalhe do Post (SSG)
As a reader,
I want to open the URL `/posts/{slug}` of an article,
So that I can read the formatted content.

**Acceptance Criteria:**
**Given** an article `.mdx` file exists in the content folder;
**When** navigating to `/posts/{slug}`;
**Then** the page renders the post title, category, publication date, and body HTML;
**And** navigating to a non-existent slug returns a custom styled 404 error page.

---

## Epic 2: Reader Interface & Navigation (Layout & Pages)

Build all the visual pages and layouts (Home feed, Projects page, About page, mobile nav) that allow readers to browse the content in English.
**FRs covered:** FR1, FR3, FR4, FR9

### Story 2.1: Stylized and Responsive Global Layout
As a developer,
I want to create the default page layout file `Layout.astro` with CSS variable tokens,
So that all pages share the same sidebar and styling in English.

**Acceptance Criteria:**
**Given** the global Astro layout is configured;
**When** accessing any public page;
**Then** the site displays the fixed left sidebar containing the avatar, bio, social links, and navigation items ("Blog", "Projects", "About") in English;
**And** the styling applies Playfair Display/Lora for headings, Inter for body copy/UI labels, and the `#faf9f6` background.

### Story 2.2: Home Page and Blog Post Feed in a 3-Column Grid
As a reader,
I want to see the latest articles organized as cards on the home page in English,
So that I can easily scan and read posts.

**Acceptance Criteria:**
**Given** multiple articles exist in the content folder;
**When** viewing the Home page on desktop;
**Then** posts are rendered as cards in a responsive grid of up to 3 columns (max content width `1024px` on screens >1200px);
**And** the card footer renders metadata in English (e.g., "Oct 26, 2023 · 8 min read" and "Read Post" link);
**And** hovering over a card shifts it up by 2px and intensifies the ambient shadow.

### Story 2.3: Projects and About Pages
As a reader,
I want to access the Projects and About sections in English,
So that I can see the author's AI projects, professional skills, and contact info.

**Acceptance Criteria:**
**Given** `/projects` and `/about` routes are created;
**When** navigating to `/projects`;
**Then** the page renders project cards with descriptions and tech tags in English;
**And** navigating to `/about` displays the professional biography and skills cloud in English.

### Story 2.4: Mobile Responsiveness and Navigation Drawer
As a mobile reader,
I want the layout to adapt to smaller screens and collapse the sidebar into a menu drawer,
So that article content is readable on mobile.

**Acceptance Criteria:**
**Given** screen viewport width is less than 768px;
**When** loading the blog;
**Then** the sidebar is hidden and a mobile header bar with the logo and menu icon ("☰") is visible;
**And** clicking the menu icon opens a sliding drawer with navigation options in English;
**And** post and project grids stack into a single vertical column.

---

## Epic 3: Interactive Features & Deployment (Search, Code & Git Deploy)

Add advanced interactive features (Command Palette search, code block copy button) and deploy the blog live to GitHub Pages.
**FRs covered:** FR6, FR7

### Story 3.1: Copy Code Button inside Articles
As a technical reader,
I want to click a copy button inside article code blocks,
So that I can save AI code examples to my clipboard without manually selecting them.

**Acceptance Criteria:**
**Given** an article page is rendered with pre-formatted code blocks;
**When** I hover over a code block;
**Then** a "Copy" button must appear in the top-right corner of the code box;
**And** clicking the button copies the raw text code to the clipboard, changing the button text to "Copied!" for 2 seconds.

### Story 3.2: Command Palette Search Modal (⌘K / Ctrl+K)
As a recurring reader,
I want to search posts and tags via a global shortcut menu,
So that I can navigate extremely fast without using the mouse.

**Acceptance Criteria:**
**Given** I am on any page of the blog;
**When** I press `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) or click the search box;
**Then** a modal search overlay must open, focusing the input automatically;
**And** typing filters posts by title and tags in real-time;
**And** `Arrow Keys` navigate results, `Enter` opens the selected post, and `Escape` closes the search palette.

### Story 3.3: Local Article Creation Page
As a blog author,
I want a dedicated local-only page at `/create` where I can compose an article with title, description, date, and markdown content,
So that I can quickly generate a properly formatted MDX file in the content directory without manually creating files or relying solely on the Keystatic admin UI.

**Acceptance Criteria:**
**Given** the local dev server is running;
**When** I navigate to `/create`;
**Then** a styled article creation form is displayed with fields for title, description, date, and markdown content;
**And** submitting the form generates a new MDX file at `src/content/posts/{slug}/index.mdx` with proper frontmatter;
**And** this page does NOT exist in the production GitHub Pages build (excluded via Astro integration injection).
