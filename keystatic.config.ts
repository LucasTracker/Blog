import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
        }),
        description: fields.text({
          label: 'Description',
          description: 'Short summary shown in the post card on the home page.',
          validation: { isRequired: true },
        }),
        publishedAt: fields.date({
          label: 'Published At',
          description: 'Publication date of the post.',
          validation: { isRequired: true },
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            image: {
              // Images are stored at src/assets/posts/
              // publicPath is relative to the MDX file at src/content/posts/{slug}/index.mdx
              // ../../../ navigates: {slug}/ → posts/ → content/ → src/ then into assets/posts/
              directory: 'src/assets/posts',
              publicPath: '../../../assets/posts/',
            },
          },
        }),
      },
    }),
  },
});
