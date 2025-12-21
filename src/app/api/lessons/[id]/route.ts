import { NextRequest } from 'next/server';
import { z } from 'zod';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { authenticateRequest, requireRole } from '@/server/middleware/auth';
import { updateLessonSchema } from '@/server/modules/lessons/schema';
import { getLessonById, updateLesson, deleteLesson } from '@/server/modules/lessons/service';

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
    
    const lesson = await getLessonById(params.id, userId);
    return jsonResponse(lesson, 200);
  });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await requireRole('INSTRUCTOR', 'ADMIN')(request);
    const params = await Promise.resolve(context.params);
    const input = await validateBody(request, updateLessonSchema.extend({ id: z.string() }));
    
    const lesson = await updateLesson({ ...input, id: params.id }, user.userId);
    return jsonResponse(lesson, 200, 'Lesson updated successfully');
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await requireRole('INSTRUCTOR', 'ADMIN')(request);
    const params = await Promise.resolve(context.params);
    
    await deleteLesson(params.id, user.userId);
    return jsonResponse(null, 200, 'Lesson deleted successfully');
  });
}


