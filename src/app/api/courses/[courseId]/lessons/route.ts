import { NextRequest } from 'next/server';
import { z } from 'zod';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { requireRole } from '@/server/middleware/auth';
import { createLessonSchema } from '@/server/modules/lessons/schema';
import { createLesson } from '@/server/modules/lessons/service';

type RouteContext = { params: Promise<{ courseId: string }> | { courseId: string } };

export async function POST(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await requireRole('INSTRUCTOR', 'ADMIN')(request);
    const params = await Promise.resolve(context.params);
    const input = await validateBody(request, createLessonSchema.extend({
      courseId: z.string().default(params.courseId),
    }));
    
    const lesson = await createLesson(input, user.userId);
    return jsonResponse(lesson, 201, 'Lesson created successfully');
  });
}

