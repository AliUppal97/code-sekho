import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { env } from '@/server/config/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  return withErrorHandling(() =>
    jsonResponse({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
    }),
  );
}



