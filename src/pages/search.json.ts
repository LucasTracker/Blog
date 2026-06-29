import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  
  // Sort posts by published date descending
  const sorted = posts.sort((a, b) => {
    return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
  });

  const searchIndex = sorted.map(p => ({
    id: p.id,
    title: p.data.title,
    description: p.data.description,
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
