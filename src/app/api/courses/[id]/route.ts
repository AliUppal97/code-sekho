import { NextRequest } from 'next/server';
import { z } from 'zod';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { getCourseById, updateCourse, deleteCourse } from '@/server/modules/courses/service';
import { updateCourseSchema } from '@/server/modules/courses/schema';
import { validateBody } from '@/server/middleware/validation';
import { authenticateRequest } from '@/server/middleware/auth';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> | { id: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const params = await Promise.resolve(context.params);
    let userId: string | undefined;
    
    try {
      const user = await authenticateRequest(request, false);
      userId = user?.userId;
    } catch {
      // Not authenticated, continue
    }
    
    const course = await getCourseById(params.id, userId);
    return jsonResponse(course, 200);
  });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    const input = await validateBody(request, updateCourseSchema.extend({ id: z.string() }));
    
    const course = await updateCourse({ ...input, id: params.id }, user.userId, user.role);
    return jsonResponse(course, 200, 'Course updated successfully');
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    
    await deleteCourse(params.id, user.userId, user.role);
    return jsonResponse(null, 200, 'Course deleted successfully');
  });
}






