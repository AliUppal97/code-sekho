import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { validateQuery, validateBody, rateLimit } from '@/server/middleware';
import { courseQuerySchema, createCourseSchema } from '@/server/modules/courses/schema';
import { listCourses, createCourse } from '@/server/modules/courses/service';
import { authenticateRequest, requireRole } from '@/server/middleware/auth';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const query = await validateQuery(request, courseQuerySchema);
    
    // Try to get user if authenticated
    let userId: string | undefined;
    try {
      const user = await authenticateRequest(request, false);
      userId = user?.userId;
    } catch {
      // Not authenticated, continue
    }
    
    const result = await listCourses(query, userId);
    return jsonResponse(result, 200);
  });
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await requireRole('INSTRUCTOR', 'ADMIN')(request);
    const input = await validateBody(request, createCourseSchema);
    
    const course = await createCourse(input, user.userId);
    return jsonResponse(course, 201, 'Course created successfully');
  });
}

