import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateQuery } from '@/server/middleware/validation';
import { requireRole } from '@/server/middleware/auth';
import { userQuerySchema } from '@/server/modules/users/schema';
import { listUsers } from '@/server/modules/users/service';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    await requireRole('ADMIN')(request);
    const query = await validateQuery(request, userQuerySchema);
    const result = await listUsers(query);
    return jsonResponse(result, 200);
  });
}


