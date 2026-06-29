---
name: Lucas Souza - Minimalist Blog
status: final
updated: 2026-06-27
description: Visual token specifications for the Lucas Souza Minimalist & Clean Developer Blog design.
colors:
  background: '#faf9f6'
  surface: '#ffffff'
  on-background: '#121212'
  on-surface: '#1a1a1a'
  text-primary: '#121212'
  text-secondary: '#555555'
  text-muted: '#777777'
  accent: '#1e293b'
  on-accent: '#ffffff'
  border: '#e2e8f0'
  divider: '#f1f5f9'
  shadow-tint: 'rgba(30, 41, 59, 0.04)'
typography:
  display-title:
    fontFamily: Playfair Display, Lora, Georgia, serif
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  post-title:
    fontFamily: Playfair Display, Lora, Georgia, serif
    fontSize: 22px
    fontWeight: '700'
    lineHeight: '1.3'
  body:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  metadata:
    fontFamily: Inter, system-ui, sans-serif
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0.05em'
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  sidebar-width: 280px
  content-max-width: 780px
  gutter: 24px
  padding-desktop: 40px
  padding-mobile: 20px
---

## Brand & Style

The design system of **Lucas Souza - Blog** is rooted in the aesthetics of clean, high-contrast, text-first developer blogs. It values readability, deliberate whitespace, and structured simplicity. By using a sophisticated serif typeface for headlines and titles, it creates a personal, authoritative, and editorial feel, while the sans-serif body type ensures modern digital legibility.

The tone is professional, technical, yet highly approachable. It avoids flashy decorative elements, relying instead on structural alignment, layout proportions, and subtle micro-interactions to create a premium, calm, and trustworthy environment.

## Colors

- **Background (#faf9f6):** A warm off-white that reduces glare and eye strain during long reading sessions compared to pure white.
- **Surface (#ffffff):** Used for code blocks, input elements, cards, and highlighted containers to stand out from the soft background.
- **On-Background (#121212) / On-Surface (#1a1a1a):** High-contrast off-black for body texts and critical headings, ensuring readability.
- **Text-Secondary (#555555) / Text-Muted (#777777):** Used for metadata (dates, reading times), secondary navigation, and descriptions.
- **Border (#e2e8f0) / Divider (#f1f5f9):** Soft grays that define borders and structural breaks without adding visual noise.
- **Accent (#1e293b):** Deep slate/charcoal used for call-to-actions, tag backgrounds, and focus rings.

## Typography

- **Playfair Display / Lora:** Used for main branding titles, article headlines, and page section headers. It brings a polished, editorial weight to the content.
- **Inter:** The functional core of the blog. Used for body text, tags, navigation items, code block interface elements, and general UI labels.
- **Letter Spacing & Heights:** Metadata labels use uppercase letters with `0.05em` tracking to give a neat, structured appearance. Page titles use tight line heights (`1.2`) to prevent large headlines from splitting awkwardly across lines.

## Layout & Spacing

The blog layout uses a **Responsive Side-by-Side Grid** on desktop and transitions to a **Stacked Flow** on mobile:
- **Left Sidebar:** A fixed width of `280px` containing the author's card (photo, name, bio, social links) and principal navigation.
- **Main Content Area:** A flexible container with a maximum width of `780px` on standard screens, expanding to `1024px` on screen widths above `1200px` (large desktops). The blog feed utilizes a **3-column responsive card grid** (up to 3 cards per row) that collapses dynamically to 2 columns on tablets and 1 column on mobile screens.
- **Padding:** 40px padding on desktop, reducing to 20px on mobile screens.

## Elevation & Depth

- Depth is achieved by contrast and soft lighting rather than steep overlays.
- Cards use an extremely diffused ambient shadow: `box-shadow: 0 4px 20px rgba(30, 41, 59, 0.04)`.
- Cards transition on hover with a subtle lift: a 2px vertical translation (`transform: translateY(-2px)`) and a shadow increase (`rgba(30, 41, 59, 0.08)`).
- Normal containers, inputs, and sidebars are flat with standard `1px` borders in `{colors.border}`.

## Shapes

- Corner styling is **Minimal & Structured**.
- Cards, code blocks, and primary containers use `{rounded.lg}` (12px) or `{rounded.md}` (8px) corner radii.
- Interactive pills (categories, buttons) use `{rounded.full}` for a distinct, pill-like interactive cue.

## Components

- **Post Card:** Features a featured image placeholder (which scales smoothly on hover), article category tag, `post-title` header, short text snippet, and metadata footer (date + reading time).
- **Profile Card:** Rounded avatar image, typography headline, short descriptive bio, and a row of monochrome social icon links (GitHub, LinkedIn, Twitter, Link).
- **Category Tags:** Rounded pills with a light gray border and text. On hover, they fill with `{colors.accent}` and white text.
- **Code Block:** Dark mode terminal theme by default to maintain developer familiarity. Uses Fira Code or JetBrains Mono, complete with a "Copy" utility button on the top right.

## Do's and Don'ts

- **DO** use generous vertical margins (e.g. 40px–60px) between blog posts to let the content breathe.
- **DO** keep code blocks readable by limiting horizontal scrolling with appropriate container sizing.
- **DON'T** introduce heavy card borders or dark backgrounds for the layout itself—this defeats the minimalist, light-weight aesthetic.
- **DON'T** use generic hover effects (like bold color fills) that distract the reader from the reading flow. Use soft shadow lifts or light text transitions.
