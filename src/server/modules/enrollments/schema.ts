// ============================================================================
// Enrollments Schemas
// Zod validation schemas for enrollment endpoints
// ============================================================================

import { z } from 'zod';

export const enrollSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
});

export const updateProgressSchema = z.object({
  lessonId: z.string().min(1, 'Lesson ID is required'),
  progress: z.number().int().min(0).max(100),
  watchTime: z.number().int().nonnegative().optional(),
  watched: z.boolean().optional(),
});

export type EnrollInput = z.infer<typeof enrollSchema>;
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;


