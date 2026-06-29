import type { APIRoute } from 'astro';
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeYamlString(value: string): string {
  // Wrap in double quotes and escape internal double quotes, backslashes, and newlines
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  return `"${escaped}"`;
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const getStr = (key: string) => {
    const val = data.get(key);
    return typeof val === 'string' ? val : '';
  };

  const title = getStr('title').trim();
  const description = getStr('description').trim();
  const publishedAt = getStr('publishedAt').trim();
  const content = getStr('content');

  // Validate required fields
  const errors: Record<string, string> = {};
  if (!title) errors.title = 'Title is required';
  if (!description) errors.description = 'Description is required';
  if (!publishedAt) errors.publishedAt = 'Published date is required';
  if (!content.trim()) errors.content = 'Content is required';

  if (Object.keys(errors).length > 0) {
    return new Response(
      JSON.stringify({ success: false, errors }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const slug = slugify(title);

  if (!slug) {
    return new Response(
      JSON.stringify({ success: false, errors: { title: 'Title must produce a valid slug (contain at least one alphanumeric character)' } }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Resolve path relative to project root robustly
  const postsDir = path.resolve(process.cwd(), 'src/content/posts', slug);

  // Build MDX content matching Keystatic's output format
  const mdxContent = `---
title: ${escapeYamlString(title)}
description: ${escapeYamlString(description)}
publishedAt: "${publishedAt}"
---

${content}
`;

  try {
    await mkdir(postsDir, { recursive: true });
    // Use 'wx' flag to fail if the file already exists, mitigating TOCTOU
    await writeFile(path.join(postsDir, 'index.mdx'), mdxContent, { encoding: 'utf-8', flag: 'wx' });
  } catch (err: any) {
    if (err.code === 'EEXIST') {
      return new Response(
        JSON.stringify({ success: false, errors: { title: `A post with slug "${slug}" already exists` } }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ success: false, errors: { _form: `Failed to write file: ${errorMessage}` } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true, slug }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  );
};
