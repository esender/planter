import { defineCollection, z } from 'astro:content';

const waterEnum = z.enum([
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'rarely',
  'keep moist',
]);

const lightAmountEnum = z.enum([
  'low',
  'medium',
  'bright',
]);

const lightTypeEnum = z.enum([
  'direct',
  'indirect',
]);

const difficultyEnum = z.enum(['easy', 'medium', 'hard']);

const plants = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    water: waterEnum,
    lightAmount: lightAmountEnum,
    lightType: lightTypeEnum,
    difficulty: difficultyEnum.default('easy'),
  }),
});

export const collections = { plants };
