import { NextRequest } from 'next/server';
import { z } from 'zod';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { authenticateRequest } from '@/server/middleware/auth';
import { updateReviewSchema } from '@/server/modules/reviews/schema';
import { getReviewById, updateReview, deleteReview } from '@/server/modules/reviews/service';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> | { id: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const params = await Promise.resolve(context.params);
    const review = await getReviewById(params.id);
    return jsonResponse(review, 200);
  });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    const input = await validateBody(request, updateReviewSchema.extend({ id: z.string() }));
    
    const review = await updateReview({ ...input, id: params.id }, user.userId);
    return jsonResponse(review, 200, 'Review updated successfully');
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    
    await deleteReview(params.id, user.userId, user.role);
    return jsonResponse(null, 200, 'Review deleted successfully');
  });
}


