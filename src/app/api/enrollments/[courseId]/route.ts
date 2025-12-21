import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { authenticateRequest } from '@/server/middleware/auth';
import { unenrollFromCourse, getCourseProgress } from '@/server/modules/enrollments/service';

type RouteContext = { params: Promise<{ courseId: string }> | { courseId: string } };

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    
    await unenrollFromCourse(params.courseId, user.userId);
    return jsonResponse(null, 200, 'Successfully unenrolled from course');
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    
    const progress = await getCourseProgress(user.userId, params.courseId);
    return jsonResponse(progress, 200);
  });
}


