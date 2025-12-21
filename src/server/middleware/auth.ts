// ============================================================================
// Authentication Middleware
// Enterprise-grade JWT authentication middleware
// ============================================================================

import { NextRequest } from 'next/server';
import { AppError } from '../core/errors';
import { extractTokenFromHeader, verifyToken, type JWTPayload } from '../core/auth';
import { db } from '../db/client';

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export async function authenticateRequest(
  request: NextRequest,
  requireAuth = true,
): Promise<JWTPayload | null> {
  const authHeader = request.headers.get('authorization');
  const token = extractTokenFromHeader(authHeader);

  if (!token) {
    if (requireAuth) {
      throw AppError.unauthorized('Authentication required');
    }
    return null;
  }

  try {
    const payload = verifyToken(token);
    
    // Verify user still exists and is active
    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      throw AppError.unauthorized('User not found');
    }

    return payload;
  } catch (error) {
    if (requireAuth) {
      throw error;
    }
    return null;
  }
}

export function requireRole(...allowedRoles: string[]) {
  return async (request: NextRequest): Promise<JWTPayload> => {
    const user = await authenticateRequest(request, true);
    
    if (!allowedRoles.includes(user.role)) {
      throw AppError.forbidden('Insufficient permissions');
    }
    
    return user;
  };
}


