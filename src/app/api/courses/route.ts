import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { AppError } from '@/server/core/errors';
import { courseQuerySchema } from '@/server/modules/courses/schema';
import { listCourses } from '@/server/modules/courses/service';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  return withErrorHandling(() => {
    const parsed = courseQuerySchema.safeParse(
      Object.fromEntries(request.nextUrl.searchParams.entries()),
    );

    if (!parsed.success) {
      throw AppError.badRequest('Invalid course query parameters', formatZodErrors(parsed.error));
    }

    const result = listCourses(parsed.data);
    return jsonResponse(result);
  });
}

function formatZodErrors(error: ZodError) {
  const formatted: Record<string, string> = {};
  const issues = error.flatten().fieldErrors;
  Object.entries(issues).forEach(([field, messages]) => {
    if (messages && messages.length > 0) {
      formatted[field] = messages[0];
    }
  });
  return formatted;
}



