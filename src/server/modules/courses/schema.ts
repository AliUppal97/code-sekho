// ============================================================================
// Courses Schemas
// Zod validation schemas for course endpoints
// ============================================================================

import { z } from 'zod';

export const courseQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(12),
  category: z.string().trim().optional(),
  categoryId: z.string().optional(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  search: z.string().trim().optional(),
  instructorId: z.string().optional(),
  isPublished: z.coerce.boolean().optional(),
  isFeatured: z.coerce.boolean().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sortBy: z.enum(['createdAt', 'rating', 'price', 'enrollmentCount']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const createCourseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDescription: z.string().min(10).max(500),
  thumbnail: z.string().url('Invalid thumbnail URL'),
  categoryId: z.string().min(1, 'Category is required'),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  duration: z.number().int().positive('Duration must be positive'),
  price: z.number().nonnegative('Price must be non-negative'),
  discountPrice: z.number().nonnegative().optional(),
  isFeatured: z.boolean().default(false).optional(),
  isPublished: z.boolean().default(false).optional(),
  tags: z.array(z.string()).default([]).optional(),
});

export const updateCourseSchema = createCourseSchema.partial().extend({
  id: z.string().min(1),
});

export type CourseQuery = z.infer<typeof courseQuerySchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;


