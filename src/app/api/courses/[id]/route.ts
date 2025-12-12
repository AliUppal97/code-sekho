import { NextRequest } from 'next/server';

import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { getCourseById } from '@/server/modules/courses/service';

export const dynamic = 'force-dynamic';

type RouteContext = { params: { id: string } };

export function GET(_request: NextRequest, context: RouteContext) {
  return withErrorHandling(() => {
    const course = getCourseById(context.params.id);
    return jsonResponse(course);
  });
}




