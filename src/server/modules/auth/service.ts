// ============================================================================
// Authentication Service
// Enterprise-grade authentication business logic
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import { hashPassword, verifyPassword, generateToken, validatePasswordStrength } from '../../core/auth';
import { sendVerificationEmail, sendPasswordResetEmail } from '../../utils/email';
import crypto from 'crypto';
import type { RegisterInput, LoginInput, ResetPasswordInput, ChangePasswordInput } from './schema';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    role: string;
    emailVerified: boolean;
  };
  token: string;
}

// Generate email verification token
function generateEmailToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Generate password reset token
function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  // Validate password strength
  const passwordValidation = validatePasswordStrength(input.password);
  if (!passwordValidation.valid) {
    throw AppError.badRequest('Password validation failed', {
      errors: passwordValidation.errors.join(', '),
    });
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (existingUser) {
    throw AppError.badRequest('Email already registered');
  }

  // Hash password
  const hashedPassword = await hashPassword(input.password);

  // Generate verification token
  const verificationToken = generateEmailToken();

  // Create user
  const user = await db.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      password: hashedPassword,
      role: input.role || 'STUDENT',
      emailVerified: false,
    },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      emailVerified: true,
    },
  });

  // Send verification email (async, don't wait)
  sendVerificationEmail(user.email, verificationToken).catch((error) => {
    console.error('Failed to send verification email:', error);
  });

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user,
    token,
  };
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  // Find user
  const user = await db.user.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user) {
    throw AppError.unauthorized('Invalid email or password');
  }

  // Verify password
  const isValidPassword = await verifyPassword(input.password, user.password);
  if (!isValidPassword) {
    throw AppError.unauthorized('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      emailVerified: user.emailVerified,
    },
    token,
  };
}

export async function verifyEmail(token: string): Promise<void> {
  // In a production app, you'd store this token in the database
  // For now, we'll use a simple approach with a token table or cache
  // This is a simplified version - you should implement proper token storage
  
  // For now, we'll just mark the user as verified if they have a valid token
  // In production, you'd verify the token from a database
  throw AppError.badRequest('Email verification not fully implemented. Please implement token storage.');
}

export async function forgotPassword(email: string): Promise<void> {
  const user = await db.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    // Don't reveal if user exists for security
    return;
  }

  // Generate reset token
  const resetToken = generateResetToken();
  
  // In production, store this token in database with expiration
  // For now, we'll just send the email
  // You should create a PasswordResetToken model in Prisma
  
  await sendPasswordResetEmail(user.email, resetToken);
}

export async function resetPassword(input: ResetPasswordInput): Promise<void> {
  // Validate password strength
  const passwordValidation = validatePasswordStrength(input.password);
  if (!passwordValidation.valid) {
    throw AppError.badRequest('Password validation failed', {
      errors: passwordValidation.errors.join(', '),
    });
  }

  // In production, verify token from database
  // For now, this is a placeholder
  throw AppError.badRequest('Password reset not fully implemented. Please implement token verification.');
}

export async function changePassword(
  userId: string,
  input: ChangePasswordInput,
): Promise<void> {
  // Get user
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw AppError.notFound('User not found');
  }

  // Verify current password
  const isValidPassword = await verifyPassword(input.currentPassword, user.password);
  if (!isValidPassword) {
    throw AppError.badRequest('Current password is incorrect');
  }

  // Validate new password strength
  const passwordValidation = validatePasswordStrength(input.newPassword);
  if (!passwordValidation.valid) {
    throw AppError.badRequest('Password validation failed', {
      errors: passwordValidation.errors.join(', '),
    });
  }

  // Hash new password
  const hashedPassword = await hashPassword(input.newPassword);

  // Update password
  await db.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}


