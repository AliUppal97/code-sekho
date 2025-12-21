// ============================================================================
// Payments Schemas
// Zod validation schemas for payment endpoints
// ============================================================================

import { z } from 'zod';

export const createPaymentIntentSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
});

export const paymentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED']).optional(),
});

export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;
export type PaymentQuery = z.infer<typeof paymentQuerySchema>;


