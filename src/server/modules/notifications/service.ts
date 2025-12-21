// ============================================================================
// Notifications Service
// Enterprise-grade notification management
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import type { CreateNotificationInput, NotificationQuery, MarkAsReadInput } from './schema';
import { Prisma } from '@prisma/client';

export interface NotificationListResult {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    unreadCount: number;
  };
}

export async function createNotification(input: CreateNotificationInput): Promise<any> {
  // Verify user exists
  const user = await db.user.findUnique({
    where: { id: input.userId },
  });

  if (!user) {
    throw AppError.notFound('User not found');
  }

  const notification = await db.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      message: input.message,
      actionUrl: input.actionUrl,
      read: false,
    },
  });

  return notification;
}

export async function listNotifications(
  params: NotificationQuery,
  userId: string,
): Promise<NotificationListResult> {
  const { page, limit, read, type } = params;

  const where: Prisma.NotificationWhereInput = {
    userId,
  };

  if (read !== undefined) {
    where.read = read;
  }

  if (type) {
    where.type = type;
  }

  const [total, unreadCount, notifications] = await Promise.all([
    db.notification.count({ where }),
    db.notification.count({
      where: {
        ...where,
        read: false,
      },
    }),
    db.notification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  return {
    data: notifications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      unreadCount,
    },
  };
}

export async function markAsRead(input: MarkAsReadInput, userId: string): Promise<void> {
  // Verify all notifications belong to user
  const notifications = await db.notification.findMany({
    where: {
      id: {
        in: input.ids,
      },
      userId,
    },
  });

  if (notifications.length !== input.ids.length) {
    throw AppError.forbidden('Some notifications not found or do not belong to you');
  }

  await db.notification.updateMany({
    where: {
      id: {
        in: input.ids,
      },
      userId,
    },
    data: {
      read: true,
    },
  });
}

export async function markAllAsRead(userId: string): Promise<void> {
  await db.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
}

export async function deleteNotification(id: string, userId: string): Promise<void> {
  const notification = await db.notification.findUnique({
    where: { id },
  });

  if (!notification) {
    throw AppError.notFound('Notification not found');
  }

  if (notification.userId !== userId) {
    throw AppError.forbidden('You can only delete your own notifications');
  }

  await db.notification.delete({
    where: { id },
  });
}

export async function getUnreadCount(userId: string): Promise<number> {
  return db.notification.count({
    where: {
      userId,
      read: false,
    },
  });
}


