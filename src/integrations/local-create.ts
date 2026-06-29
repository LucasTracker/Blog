import type { AstroIntegration } from 'astro';

export default function localCreateIntegration(): AstroIntegration {
  return {
    name: 'local-create',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/create',
          entrypoint: './src/local-create/create.astro',
          prerender: false,
        });
        injectRoute({
          pattern: '/api/create-post',
          entrypoint: './src/local-create/api-create-post.ts',
          prerender: false,
        });
      },
    },
  };
}
