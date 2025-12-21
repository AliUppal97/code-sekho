import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateQuery, validateBody } from '@/server/middleware/validation';
import { authenticateRequest, requireRole } from '@/server/middleware/auth';
import { notificationQuerySchema, createNotificationSchema, markAsReadSchema } from '@/server/modules/notifications/schema';
import { listNotifications, createNotification, markAsRead, markAllAsRead, getUnreadCount } from '@/server/modules/notifications/service';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const query = await validateQuery(request, notificationQuerySchema);
    
    const result = await listNotifications(query, user.userId);
    return jsonResponse(result, 200);
  });
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    // Only admins can create notifications
    await requireRole('ADMIN')(request);
    const input = await validateBody(request, createNotificationSchema);
    
    const notification = await createNotification(input);
    return jsonResponse(notification, 201, 'Notification created successfully');
  });
}

export async function PATCH(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    
    const user = await authenticateRequest(request, true);
    const body = await request.json();
    
    // Check if marking all as read
    if (body.markAllAsRead === true) {
      await markAllAsRead(user.userId);
      return jsonResponse(null, 200, 'All notifications marked as read');
    }
    
    // Otherwise, mark specific notifications
    const input = await validateBody(request, markAsReadSchema);
    await markAsRead(input, user.userId);
    return jsonResponse(null, 200, 'Notifications marked as read');
  });
}


