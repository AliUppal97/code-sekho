// ============================================================================
// Reviews Schemas
// Zod validation schemas for review endpoints
// ============================================================================

import { z } from 'zod';

export const createReviewSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000).optional(),
});

export const updateReviewSchema = createReviewSchema.partial().extend({
  id: z.string().min(1),
});

export const reviewQuerySchema = z.object({
  courseId: z.string().optional(),
  userId: z.string().optional(),
  rating: z.coerce.number().int().min(1).max(5).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
export type UpdateReviewInput = z.infer<typeof updateReviewSchema>;
export type ReviewQuery = z.infer<typeof reviewQuerySchema>;


