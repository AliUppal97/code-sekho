// ============================================================================
// Notifications Schemas
// Zod validation schemas for notification endpoints
// ============================================================================

import { z } from 'zod';

export const createNotificationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR']),
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(1000),
  actionUrl: z.string().url().optional(),
});

export const notificationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  read: z.coerce.boolean().optional(),
  type: z.enum(['INFO', 'SUCCESS', 'WARNING', 'ERROR']).optional(),
});

export const markAsReadSchema = z.object({
  ids: z.array(z.string()).min(1, 'At least one notification ID is required'),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type NotificationQuery = z.infer<typeof notificationQuerySchema>;
export type MarkAsReadInput = z.infer<typeof markAsReadSchema>;


