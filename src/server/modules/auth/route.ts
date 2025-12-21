// ============================================================================
// Authentication API Routes
// RESTful endpoints for authentication
// ============================================================================

import { NextRequest } from 'next/server';
import { jsonResponse, errorResponse, withErrorHandling } from '../../core/http';
import { validateBody, rateLimit } from '../../middleware';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema } from './schema';
import { registerUser, loginUser, forgotPassword, resetPassword, changePassword } from './service';
import { authenticateRequest } from '../../middleware/auth';

// POST /api/auth/register
export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'auth');
    
    const input = await validateBody(request, registerSchema);
    const result = await registerUser(input);
    
    return jsonResponse(result, 201, 'Account created successfully');
  });
}

// POST /api/auth/login
export async function loginHandler(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'auth');
    
    const input = await validateBody(request, loginSchema);
    const result = await loginUser(input);
    
    return jsonResponse(result, 200, 'Login successful');
  });
}

// POST /api/auth/forgot-password
export async function forgotPasswordHandler(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'auth');
    
    const input = await validateBody(request, forgotPasswordSchema);
    await forgotPassword(input.email);
    
    return jsonResponse(null, 200, 'If an account exists, a password reset email has been sent');
  });
}

// POST /api/auth/reset-password
export async function resetPasswordHandler(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'auth');
    
    const input = await validateBody(request, resetPasswordSchema);
    await resetPassword(input);
    
    return jsonResponse(null, 200, 'Password reset successfully');
  });
}

// POST /api/auth/change-password
export async function changePasswordHandler(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    
    const user = await authenticateRequest(request, true);
    const input = await validateBody(request, changePasswordSchema);
    await changePassword(user.userId, input);
    
    return jsonResponse(null, 200, 'Password changed successfully');
  });
}


