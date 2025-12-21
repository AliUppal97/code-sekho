// ============================================================================
// Users Service
// Enterprise-grade user management
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import type { UpdateProfileInput, UpdateRoleInput, UserQuery } from './schema';
import { Prisma } from '@prisma/client';

export interface UserListResult {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput,
): Promise<any> {
  const user = await db.user.update({
    where: { id: userId },
    data: {
      ...(input.name && { name: input.name }),
      ...(input.avatar !== undefined && { avatar: input.avatar }),
    },
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

  return user;
}

export async function updateUserRole(
  input: UpdateRoleInput,
  adminId: string,
): Promise<any> {
  // Verify admin
  const admin = await db.user.findUnique({
    where: { id: adminId },
  });

  if (!admin || admin.role !== 'ADMIN') {
    throw AppError.forbidden('Only admins can update user roles');
  }

  const user = await db.user.update({
    where: { id: input.userId },
    data: {
      role: input.role,
    },
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

  return user;
}

export async function listUsers(params: UserQuery): Promise<UserListResult> {
  const { page, limit, role, search } = params;

  const where: Prisma.UserWhereInput = {};

  if (role) {
    where.role = role;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  const total = await db.user.count({ where });

  const users = await db.user.findMany({
    where,
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data: users.map((user) => ({
      ...user,
      enrollmentCount: user._count.enrollments,
      _count: undefined,
    })),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getUserById(id: string): Promise<any> {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          enrollments: true,
          reviews: true,
        },
      },
    },
  });

  if (!user) {
    throw AppError.notFound('User not found');
  }

  return {
    ...user,
    enrollmentCount: user._count.enrollments,
    reviewCount: user._count.reviews,
    _count: undefined,
  };
}


