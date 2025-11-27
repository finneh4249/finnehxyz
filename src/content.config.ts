import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const architecture = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/architecture",
  }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["PROPOSED", "ACCEPTED", "REJECTED", "DEPRECATED"]),
    date: z.coerce.date(),
    author: z.string().default("Ethan Cornwill"),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, architecture };
