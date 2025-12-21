import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { authenticateRequest } from '@/server/middleware/auth';
import { enrollSchema } from '@/server/modules/enrollments/schema';
import { enrollInCourse, getUserEnrollments } from '@/server/modules/enrollments/service';

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const input = await validateBody(request, enrollSchema);
    
    const enrollment = await enrollInCourse(input, user.userId);
    return jsonResponse(enrollment, 201, 'Successfully enrolled in course');
  });
}

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const enrollments = await getUserEnrollments(user.userId);
    return jsonResponse(enrollments, 200);
  });
}


