import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { authenticateRequest } from '@/server/middleware/auth';
import { db } from '@/server/db/client';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    const userPayload = await authenticateRequest(request, true);
    
    const user = await db.user.findUnique({
      where: { id: userPayload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return jsonResponse(user, 200);
  });
}


