import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { db } from '@/server/db/client';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    const categories = await db.courseCategory.findMany({
      orderBy: { name: 'asc' },
    });
    return jsonResponse(categories, 200);
  });
}


