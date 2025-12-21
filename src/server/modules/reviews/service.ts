// ============================================================================
// Reviews Service
// Enterprise-grade review and rating management
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import type { CreateReviewInput, UpdateReviewInput, ReviewQuery } from './schema';
import { Prisma } from '@prisma/client';

export interface ReviewListResult {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function createReview(input: CreateReviewInput, userId: string): Promise<any> {
  // Check if course exists
  const course = await db.course.findUnique({
    where: { id: input.courseId },
  });

  if (!course) {
    throw AppError.notFound('Course not found');
  }

  // Check if user is enrolled
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: input.courseId,
      },
    },
  });

  if (!enrollment) {
    throw AppError.forbidden('You must be enrolled in this course to leave a review');
  }

  // Check if review already exists
  const existingReview = await db.review.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: input.courseId,
      },
    },
  });

  if (existingReview) {
    throw AppError.badRequest('You have already reviewed this course');
  }

  // Create review
  const review = await db.review.create({
    data: {
      userId,
      courseId: input.courseId,
      rating: input.rating,
      comment: input.comment,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // Update course rating
  await updateCourseRating(input.courseId);

  return review;
}

export async function updateReview(input: UpdateReviewInput, userId: string): Promise<any> {
  const { id, ...updateData } = input;

  // Check if review exists
  const existingReview = await db.review.findUnique({
    where: { id },
  });

  if (!existingReview) {
    throw AppError.notFound('Review not found');
  }

  // Check permissions
  if (existingReview.userId !== userId) {
    throw AppError.forbidden('You can only update your own reviews');
  }

  // Update review
  const review = await db.review.update({
    where: { id },
    data: {
      ...(updateData.rating !== undefined && { rating: updateData.rating }),
      ...(updateData.comment !== undefined && { comment: updateData.comment }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // Update course rating
  await updateCourseRating(existingReview.courseId);

  return review;
}

export async function deleteReview(id: string, userId: string, userRole: string): Promise<void> {
  const review = await db.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw AppError.notFound('Review not found');
  }

  // Check permissions
  if (userRole !== 'ADMIN' && review.userId !== userId) {
    throw AppError.forbidden('You can only delete your own reviews');
  }

  const courseId = review.courseId;

  await db.review.delete({
    where: { id },
  });

  // Update course rating
  await updateCourseRating(courseId);
}

async function updateCourseRating(courseId: string): Promise<void> {
  // Calculate average rating
  const result = await db.review.aggregate({
    where: { courseId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  const averageRating = result._avg.rating || 0;
  const reviewCount = result._count.rating || 0;

  // Update course
  await db.course.update({
    where: { id: courseId },
    data: {
      rating: averageRating,
      reviewCount,
    },
  });
}

export async function listReviews(params: ReviewQuery): Promise<ReviewListResult> {
  const { page, limit, courseId, userId, rating } = params;

  const where: Prisma.ReviewWhereInput = {};

  if (courseId) {
    where.courseId = courseId;
  }

  if (userId) {
    where.userId = userId;
  }

  if (rating) {
    where.rating = rating;
  }

  const total = await db.review.count({ where });

  const reviews = await db.review.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
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
    data: reviews,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getReviewById(id: string): Promise<any> {
  const review = await db.review.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!review) {
    throw AppError.notFound('Review not found');
  }

  return review;
}


