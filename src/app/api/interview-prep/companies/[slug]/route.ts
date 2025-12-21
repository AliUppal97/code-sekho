import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { requireRole } from '@/server/middleware/auth';
import { AppError } from '@/server/core/errors';
import { getCompanyBySlug } from '@/server/modules/interview-prep/service';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ slug: string }> | { slug: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    const params = await Promise.resolve(context.params);
    const company = await getCompanyBySlug(params.slug);
    return jsonResponse(company, 200);
  });
}


