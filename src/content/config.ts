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

const toxicityEnum = z.enum(['toxic', 'non-toxic', 'unknown']);

const humidityEnum = z.enum(['low', 'medium', 'high']);

const fertilizerEnum = z.enum(['monthly', 'biweekly', 'rarely', 'none']);

const growthRateEnum = z.enum(['slow', 'medium', 'fast']);

const plants = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    water: waterEnum,
    lightAmount: lightAmountEnum,
    lightType: lightTypeEnum,
    difficulty: difficultyEnum.default('easy'),
    toxicity: toxicityEnum.default('unknown'),
    humidity: humidityEnum.optional(),
    fertilizer: fertilizerEnum.optional(),
    origin: z.string().optional(),
    growthRate: growthRateEnum.optional(),
  }),
});

export const collections = { plants };
