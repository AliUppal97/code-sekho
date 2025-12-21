// ============================================================================
// Rate Limiting Middleware
// Enterprise-grade rate limiting using rate-limiter-flexible
// ============================================================================

import { RateLimiterMemory } from 'rate-limiter-flexible';
import { NextRequest } from 'next/server';
import { AppError } from '../core/errors';
import { env } from '../config/env';
import { authenticateRequest } from './auth';

// Create rate limiters for different endpoints
const generalLimiter = new RateLimiterMemory({
  points: env.RATE_LIMIT_MAX_REQUESTS,
  duration: Math.floor(env.RATE_LIMIT_WINDOW_MS / 1000), // Convert to seconds
});

const authLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 60, // per minute
});

const strictLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export type RateLimitType = 'general' | 'auth' | 'strict';

export async function rateLimit(
  request: NextRequest,
  type: RateLimitType = 'general',
): Promise<void> {
  const limiter = 
    type === 'auth' ? authLimiter :
    type === 'strict' ? strictLimiter :
    generalLimiter;

  // Use IP address or user ID as key
  const identifier = await getRateLimitKey(request);
  
  try {
    await limiter.consume(identifier);
  } catch (error) {
    throw AppError.badRequest('Too many requests. Please try again later.', {
      retryAfter: error.msBeforeNext ? Math.ceil(error.msBeforeNext / 1000) : 60,
    });
  }
}

async function getRateLimitKey(request: NextRequest): Promise<string> {
  // Try to get authenticated user ID first
  try {
    const user = await authenticateRequest(request, false);
    if (user) {
      return `user:${user.userId}`;
    }
  } catch {
    // Not authenticated, use IP
  }

  // Fallback to IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  return `ip:${ip}`;
}


