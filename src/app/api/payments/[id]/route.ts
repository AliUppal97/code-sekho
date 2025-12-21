import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { authenticateRequest } from '@/server/middleware/auth';
import { getPaymentById } from '@/server/modules/payments/service';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> | { id: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    
    const payment = await getPaymentById(params.id, user.userId);
    return jsonResponse(payment, 200);
  });
}


