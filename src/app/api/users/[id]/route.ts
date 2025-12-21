import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { authenticateRequest, requireRole } from '@/server/middleware/auth';
import { updateProfileSchema, updateRoleSchema } from '@/server/modules/users/schema';
import { getUserById, updateProfile, updateUserRole } from '@/server/modules/users/service';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> | { id: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    const params = await Promise.resolve(context.params);
    const user = await getUserById(params.id);
    return jsonResponse(user, 200);
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    const user = await authenticateRequest(request, true);
    const params = await Promise.resolve(context.params);
    
    // Check if updating own profile or admin updating role
    const body = await request.json();
    
    if (body.role && params.id !== user.userId) {
      // Updating role - requires admin
      await requireRole('ADMIN')(request);
      const input = await validateBody(request, updateRoleSchema);
      const updated = await updateUserRole(input, user.userId);
      return jsonResponse(updated, 200, 'User role updated successfully');
    } else if (params.id === user.userId) {
      // Updating own profile
      const input = await validateBody(request, updateProfileSchema);
      const updated = await updateProfile(user.userId, input);
      return jsonResponse(updated, 200, 'Profile updated successfully');
    } else {
      throw new Error('Forbidden');
    }
  });
}


