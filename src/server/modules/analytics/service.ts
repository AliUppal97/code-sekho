// ============================================================================
// Analytics Service
// Enterprise-grade analytics and reporting
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import { Prisma } from '@prisma/client';

export interface AnalyticsOverview {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  completionRate: number;
  avgRating: number;
  growth: {
    students: number;
    revenue: number;
    courses: number;
  };
}

export async function getAnalyticsOverview(): Promise<AnalyticsOverview> {
  const [
    totalStudents,
    totalCourses,
    totalEnrollments,
    completedEnrollments,
    totalRevenue,
    avgRating,
    studentsLastMonth,
    revenueLastMonth,
    coursesLastMonth,
  ] = await Promise.all([
    db.user.count({ where: { role: 'STUDENT' } }),
    db.course.count({ where: { isPublished: true } }),
    db.enrollment.count(),
    db.enrollment.count({ where: { completed: true } }),
    db.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    }),
    db.course.aggregate({
      where: { isPublished: true },
      _avg: { rating: true },
    }),
    db.user.count({
      where: {
        role: 'STUDENT',
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    db.payment.aggregate({
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      _sum: { amount: true },
    }),
    db.course.count({
      where: {
        isPublished: true,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  const completionRate = totalEnrollments > 0
    ? (completedEnrollments / totalEnrollments) * 100
    : 0;

  return {
    totalStudents,
    totalCourses,
    totalRevenue: Number(totalRevenue._sum.amount || 0),
    completionRate: Math.round(completionRate * 100) / 100,
    avgRating: Number(avgRating._avg.rating || 0),
    growth: {
      students: studentsLastMonth,
      revenue: Number(revenueLastMonth._sum.amount || 0),
      courses: coursesLastMonth,
    },
  };
}

export async function trackEvent(
  userId: string | null,
  eventType: string,
  metadata?: Record<string, any>,
): Promise<void> {
  await db.analyticsEvent.create({
    data: {
      userId: userId || null,
      eventType,
      metadata: metadata || {},
    },
  });
}

export async function getEventAnalytics(
  eventType: string,
  startDate?: Date,
  endDate?: Date,
): Promise<number> {
  const where: Prisma.AnalyticsEventWhereInput = {
    eventType,
  };

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt.gte = startDate;
    }
    if (endDate) {
      where.createdAt.lte = endDate;
    }
  }

  return db.analyticsEvent.count({ where });
}


