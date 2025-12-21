import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { authenticateRequest } from '@/server/middleware/auth';
import { deleteNotification } from '@/server/modules/notifications/service';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> | { id: string } };

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    
    await deleteNotification(params.id, user.userId);
    return jsonResponse(null, 200, 'Notification deleted successfully');
  });
}


