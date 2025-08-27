import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      date: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      category: z.string().optional(),
      cover: image(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).optional(),
      repository: z.string().url().optional(),
      live: z.string().url().optional(),
    }),
});

export const collections = {
  projects,
};
