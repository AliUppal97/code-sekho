// ============================================================================
// Lessons Schemas
// Zod validation schemas for lesson endpoints
// ============================================================================

import { z } from 'zod';

export const createLessonSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().optional(),
  duration: z.number().int().positive('Duration must be positive'),
  videoUrl: z.string().url('Invalid video URL'),
  thumbnailUrl: z.string().url('Invalid thumbnail URL').optional(),
  order: z.number().int().nonnegative('Order must be non-negative'),
  isPreview: z.boolean().default(false).optional(),
  resources: z.array(z.object({
    title: z.string().min(1),
    type: z.enum(['PDF', 'CODE', 'LINK', 'FILE']),
    url: z.string().url(),
  })).optional(),
});

export const updateLessonSchema = createLessonSchema.partial().extend({
  id: z.string().min(1),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;


