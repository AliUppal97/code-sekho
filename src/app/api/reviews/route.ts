import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody, validateQuery } from '@/server/middleware/validation';
import { authenticateRequest } from '@/server/middleware/auth';
import { createReviewSchema, reviewQuerySchema } from '@/server/modules/reviews/schema';
import { createReview, listReviews } from '@/server/modules/reviews/service';

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const input = await validateBody(request, createReviewSchema);
    
    const review = await createReview(input, user.userId);
    return jsonResponse(review, 201, 'Review created successfully');
  });
}

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const query = await validateQuery(request, reviewQuerySchema);
    const result = await listReviews(query);
    return jsonResponse(result, 200);
  });
}


