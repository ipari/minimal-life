import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const language = z.enum(["ko", "en"]);
const localizedPage = {
  layout: z.string().optional(),
  title: z.string(),
  lang: language,
  permalink: z.string(),
  alternate_url: z.string(),
};

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    ...localizedPage,
    translation_key: z.string(),
    date: z.coerce.date(),
  }),
});

const items = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/items" }),
  schema: z.object({
    ...localizedPage,
    kind: z.literal("item"),
    translation_key: z.string(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
    model: z.string().optional(),
    status: z.string(),
    category: z.string(),
    item_order: z.number().optional(),
    acquired_date: z.coerce.date().optional(),
    reviewed_date: z.coerce.date().optional(),
    review_summary: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object(localizedPage),
});

export const collections = { posts, items, pages };
