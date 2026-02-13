import { defineCollection, z } from 'astro:content';

const plants = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    water: z.string(),
    light: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
  }),
});

export const collections = { plants };
