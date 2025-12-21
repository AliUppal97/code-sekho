import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { requireRole } from '@/server/middleware/auth';
import { getAnalyticsOverview } from '@/server/modules/analytics/service';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    await requireRole('ADMIN')(request);
    const overview = await getAnalyticsOverview();
    return jsonResponse(overview, 200);
  });
}


