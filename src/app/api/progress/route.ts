import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { authenticateRequest } from '@/server/middleware/auth';
import { updateProgressSchema } from '@/server/modules/enrollments/schema';
import { updateVideoProgress } from '@/server/modules/enrollments/service';

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const input = await validateBody(request, updateProgressSchema);
    
    const progress = await updateVideoProgress(input, user.userId);
    return jsonResponse(progress, 200, 'Progress updated successfully');
  });
}


