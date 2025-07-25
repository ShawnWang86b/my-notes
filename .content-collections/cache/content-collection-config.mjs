// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeShiki from "@shikijs/rehype";
var posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional()
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        [
          rehypeShiki,
          {
            themes: {
              light: "github-light",
              dark: "github-dark"
            },
            defaultTheme: "light",
            langs: [
              "javascript",
              "typescript",
              "jsx",
              "tsx",
              "json",
              "css",
              "html",
              "bash",
              "shell",
              "python",
              "java",
              "go",
              "rust",
              "sql",
              "yaml",
              "markdown"
            ]
          }
        ]
      ]
    });
    return {
      ...document,
      mdx
    };
  }
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
