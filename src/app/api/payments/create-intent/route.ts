import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { authenticateRequest } from '@/server/middleware/auth';
import { createPaymentIntentSchema } from '@/server/modules/payments/schema';
import { createPaymentIntent } from '@/server/modules/payments/service';

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const input = await validateBody(request, createPaymentIntentSchema);
    
    const result = await createPaymentIntent(input, user.userId);
    return jsonResponse(result, 201, 'Payment intent created successfully');
  });
}


