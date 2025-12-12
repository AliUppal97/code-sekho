import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { getFeaturedCourses } from '@/server/modules/courses/service';

export const dynamic = 'force-dynamic';

export function GET() {
  return withErrorHandling(() => jsonResponse(getFeaturedCourses()));
}



