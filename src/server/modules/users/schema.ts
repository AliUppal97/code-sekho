// ============================================================================
// Users Schemas
// Zod validation schemas for user endpoints
// ============================================================================

import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  avatar: z.string().url().optional(),
});

export const updateRoleSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']),
});

export const userQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']).optional(),
  search: z.string().trim().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateRoleInput = z.infer<typeof updateRoleSchema>;
export type UserQuery = z.infer<typeof userQuerySchema>;


