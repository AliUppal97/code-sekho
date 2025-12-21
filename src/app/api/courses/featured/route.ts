import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { getFeaturedCourses } from '@/server/modules/courses/service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    const courses = await getFeaturedCourses();
    return jsonResponse(courses, 200);
  });
}







