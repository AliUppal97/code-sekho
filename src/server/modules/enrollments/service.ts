// ============================================================================
// Enrollments Service
// Enterprise-grade enrollment and progress tracking
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import type { EnrollInput, UpdateProgressInput } from './schema';

export async function enrollInCourse(input: EnrollInput, userId: string): Promise<any> {
  // Check if course exists
  const course = await db.course.findUnique({
    where: { id: input.courseId },
  });

  if (!course) {
    throw AppError.notFound('Course not found');
  }

  if (!course.isPublished) {
    throw AppError.badRequest('Course is not published');
  }

  // Check if already enrolled
  const existingEnrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: input.courseId,
      },
    },
  });

  if (existingEnrollment) {
    throw AppError.badRequest('Already enrolled in this course');
  }

  // Create enrollment
  const enrollment = await db.enrollment.create({
    data: {
      userId,
      courseId: input.courseId,
      progress: 0,
      completed: false,
    },
    include: {
      course: {
        include: {
          category: true,
          instructor: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  // Create course progress
  await db.courseProgress.create({
    data: {
      userId,
      courseId: input.courseId,
      progress: 0,
    },
  });

  // Update course enrollment count
  await db.course.update({
    where: { id: input.courseId },
    data: {
      enrollmentCount: {
        increment: 1,
      },
    },
  });

  return enrollment;
}

export async function unenrollFromCourse(courseId: string, userId: string): Promise<void> {
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  if (!enrollment) {
    throw AppError.notFound('Enrollment not found');
  }

  // Delete enrollment and progress
  await db.enrollment.delete({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  await db.courseProgress.deleteMany({
    where: {
      userId,
      courseId,
    },
  });

  await db.videoProgress.deleteMany({
    where: {
      userId,
      lesson: {
        courseId,
      },
    },
  });

  // Update course enrollment count
  await db.course.update({
    where: { id: courseId },
    data: {
      enrollmentCount: {
        decrement: 1,
      },
    },
  });
}

export async function updateVideoProgress(
  input: UpdateProgressInput,
  userId: string,
): Promise<any> {
  // Check if lesson exists
  const lesson = await db.lesson.findUnique({
    where: { id: input.lessonId },
    include: {
      course: true,
    },
  });

  if (!lesson) {
    throw AppError.notFound('Lesson not found');
  }

  // Check if user is enrolled
  const enrollment = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: lesson.courseId,
      },
    },
  });

  if (!enrollment) {
    throw AppError.forbidden('You must be enrolled in this course');
  }

  // Update or create video progress
  const videoProgress = await db.videoProgress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId: input.lessonId,
      },
    },
    create: {
      userId,
      lessonId: input.lessonId,
      progress: input.progress,
      watchTime: input.watchTime || 0,
      watched: input.watched || input.progress >= 90,
    },
    update: {
      progress: input.progress,
      watchTime: input.watchTime,
      watched: input.watched !== undefined ? input.watched : input.progress >= 90,
    },
  });

  // Update course progress
  await updateCourseProgress(userId, lesson.courseId);

  return videoProgress;
}

async function updateCourseProgress(userId: string, courseId: string): Promise<void> {
  // Get all lessons in course
  const lessons = await db.lesson.findMany({
    where: { courseId },
    select: { id: true },
  });

  if (lessons.length === 0) {
    return;
  }

  // Get all video progress for this course
  const videoProgresses = await db.videoProgress.findMany({
    where: {
      userId,
      lessonId: {
        in: lessons.map((l) => l.id),
      },
    },
  });

  // Calculate overall progress
  const totalLessons = lessons.length;
  const completedLessons = videoProgresses.filter((vp) => vp.watched).length;
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  // Update enrollment progress
  await db.enrollment.update({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    data: {
      progress: overallProgress,
      completed: overallProgress === 100,
    },
  });

  // Update course progress
  await db.courseProgress.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    create: {
      userId,
      courseId,
      progress: overallProgress,
      lastAccessedAt: new Date(),
    },
    update: {
      progress: overallProgress,
      lastAccessedAt: new Date(),
    },
  });
}

export async function getUserEnrollments(userId: string): Promise<any[]> {
  const enrollments = await db.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          category: true,
          instructor: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              lessons: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return enrollments.map((enrollment) => ({
    ...enrollment,
    course: {
      ...enrollment.course,
      price: Number(enrollment.course.price),
      discountPrice: enrollment.course.discountPrice
        ? Number(enrollment.course.discountPrice)
        : null,
      totalLessons: enrollment.course._count.lessons,
      _count: undefined,
    },
  }));
}

export async function getCourseProgress(userId: string, courseId: string): Promise<any> {
  const progress = await db.courseProgress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              videoProgress: {
                where: { userId },
              },
            },
          },
        },
      },
    },
  });

  if (!progress) {
    throw AppError.notFound('Progress not found');
  }

  return {
    ...progress,
    course: {
      ...progress.course,
      price: Number(progress.course.price),
      discountPrice: progress.course.discountPrice
        ? Number(progress.course.discountPrice)
        : null,
      lessons: progress.course.lessons.map((lesson) => ({
        ...lesson,
        videoProgress: lesson.videoProgress[0] || null,
      })),
    },
  };
}


