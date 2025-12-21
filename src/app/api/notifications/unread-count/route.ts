import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { authenticateRequest } from '@/server/middleware/auth';
import { getUnreadCount } from '@/server/modules/notifications/service';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const count = await getUnreadCount(user.userId);
    return jsonResponse({ count }, 200);
  });
}


