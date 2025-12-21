import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateQuery } from '@/server/middleware/validation';
import { authenticateRequest } from '@/server/middleware/auth';
import { paymentQuerySchema } from '@/server/modules/payments/schema';
import { listPayments } from '@/server/modules/payments/service';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const query = await validateQuery(request, paymentQuerySchema);
    
    const result = await listPayments(query, user.userId);
    return jsonResponse(result, 200);
  });
}


