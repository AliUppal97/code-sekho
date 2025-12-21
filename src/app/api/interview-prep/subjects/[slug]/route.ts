import { NextRequest } from 'next/server';
import { z } from 'zod';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { requireRole } from '@/server/middleware/auth';
import { updateSubjectSchema } from '@/server/modules/interview-prep/schema';
import { getSubjectBySlug, updateSubject, deleteSubject } from '@/server/modules/interview-prep/service';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ slug: string }> | { slug: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    const params = await Promise.resolve(context.params);
    const subject = await getSubjectBySlug(params.slug);
    return jsonResponse(subject, 200);
  });
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    await requireRole('ADMIN')(request);
    const params = await Promise.resolve(context.params);
    // For update, we'd need the ID, so this is simplified
    // In production, you'd fetch by slug first to get ID
    throw AppError.badRequest('Update by slug not implemented. Use ID instead.');
  });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    await requireRole('ADMIN')(request);
    const params = await Promise.resolve(context.params);
    // Similar to PUT, would need to fetch by slug first
    throw AppError.badRequest('Delete by slug not implemented. Use ID instead.');
  });
}


