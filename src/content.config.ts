import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  // Load MDX files from the Keystatic directory-based collection structure.
  // Keystatic fields.mdx writes each post as: src/content/posts/{slug}/index.mdx
  loader: glob({ base: './src/content/posts', pattern: '**/index.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // z.coerce.date() safely converts the ISO string from Keystatic's date field to a Date object,
    // enabling correct date sorting in Story 2.2 without manual new Date() calls.
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { posts };
