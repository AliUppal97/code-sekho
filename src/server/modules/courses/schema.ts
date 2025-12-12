import { z } from 'zod';

export const courseQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  category: z.string().trim().optional(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  search: z.string().trim().optional(),
});

export type CourseQuery = z.infer<typeof courseQuerySchema>;


