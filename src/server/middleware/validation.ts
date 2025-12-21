// ============================================================================
// Validation Middleware
// Zod schema validation for request data
// ============================================================================

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { AppError } from '../core/errors';

export async function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
  source: 'body' | 'query' | 'params' = 'body',
): Promise<T> {
  let data: unknown;

  try {
    if (source === 'body') {
      data = await request.json();
    } else if (source === 'query') {
      const url = new URL(request.url);
      data = Object.fromEntries(url.searchParams.entries());
    } else {
      // params - handled by Next.js route handlers
      data = {};
    }

    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors.reduce((acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {} as Record<string, string>);

      throw AppError.badRequest('Validation failed', details);
    }
    throw error;
  }
}

export function validateQuery<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
): Promise<T> {
  return validateRequest(request, schema, 'query');
}

export function validateBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>,
): Promise<T> {
  return validateRequest(request, schema, 'body');
}


