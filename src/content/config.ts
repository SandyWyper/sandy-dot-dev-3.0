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

const workExamples = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string().optional(),
      url: z.string().url().optional(),
      image: image(),
      tags: z.array(z.string()).optional(),
      thumb: image(),
    }),
});

export const collections = {
  projects,
  work: workExamples,
};
