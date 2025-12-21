// ============================================================================
// Lessons Service
// Enterprise-grade lesson management
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import type { CreateLessonInput, UpdateLessonInput } from './schema';

export async function createLesson(input: CreateLessonInput, instructorId: string): Promise<any> {
  // Verify course exists and belongs to instructor
  const course = await db.course.findUnique({
    where: { id: input.courseId },
  });

  if (!course) {
    throw AppError.notFound('Course not found');
  }

  if (course.instructorId !== instructorId) {
    throw AppError.forbidden('You can only add lessons to your own courses');
  }

  // Create lesson with resources
  const lesson = await db.lesson.create({
    data: {
      courseId: input.courseId,
      title: input.title,
      description: input.description,
      duration: input.duration,
      videoUrl: input.videoUrl,
      thumbnailUrl: input.thumbnailUrl,
      order: input.order,
      isPreview: input.isPreview || false,
      resources: input.resources ? {
        create: input.resources,
      } : undefined,
    },
    include: {
      resources: true,
    },
  });

  // Update course duration
  const totalDuration = await db.lesson.aggregate({
    where: { courseId: input.courseId },
    _sum: { duration: true },
  });

  await db.course.update({
    where: { id: input.courseId },
    data: {
      duration: totalDuration._sum.duration || 0,
    },
  });

  return lesson;
}

export async function updateLesson(input: UpdateLessonInput, instructorId: string): Promise<any> {
  const { id, ...updateData } = input;

  // Check if lesson exists
  const existingLesson = await db.lesson.findUnique({
    where: { id },
    include: {
      course: true,
    },
  });

  if (!existingLesson) {
    throw AppError.notFound('Lesson not found');
  }

  // Check permissions
  if (existingLesson.course.instructorId !== instructorId) {
    throw AppError.forbidden('You can only update lessons in your own courses');
  }

  // Update lesson
  const lesson = await db.lesson.update({
    where: { id },
    data: {
      ...(updateData.title && { title: updateData.title }),
      ...(updateData.description !== undefined && { description: updateData.description }),
      ...(updateData.duration !== undefined && { duration: updateData.duration }),
      ...(updateData.videoUrl && { videoUrl: updateData.videoUrl }),
      ...(updateData.thumbnailUrl !== undefined && { thumbnailUrl: updateData.thumbnailUrl }),
      ...(updateData.order !== undefined && { order: updateData.order }),
      ...(updateData.isPreview !== undefined && { isPreview: updateData.isPreview }),
    },
    include: {
      resources: true,
    },
  });

  // Update resources if provided
  if (updateData.resources) {
    // Delete existing resources
    await db.resource.deleteMany({
      where: { lessonId: id },
    });

    // Create new resources
    if (updateData.resources.length > 0) {
      await db.resource.createMany({
        data: updateData.resources.map((resource) => ({
          lessonId: id,
          ...resource,
        })),
      });
    }

    // Reload lesson with resources
    return db.lesson.findUnique({
      where: { id },
      include: {
        resources: true,
      },
    });
  }

  // Update course duration
  const totalDuration = await db.lesson.aggregate({
    where: { courseId: existingLesson.courseId },
    _sum: { duration: true },
  });

  await db.course.update({
    where: { id: existingLesson.courseId },
    data: {
      duration: totalDuration._sum.duration || 0,
    },
  });

  return lesson;
}

export async function deleteLesson(id: string, instructorId: string): Promise<void> {
  const lesson = await db.lesson.findUnique({
    where: { id },
    include: {
      course: true,
    },
  });

  if (!lesson) {
    throw AppError.notFound('Lesson not found');
  }

  // Check permissions
  if (lesson.course.instructorId !== instructorId) {
    throw AppError.forbidden('You can only delete lessons in your own courses');
  }

  await db.lesson.delete({
    where: { id },
  });

  // Update course duration
  const totalDuration = await db.lesson.aggregate({
    where: { courseId: lesson.courseId },
    _sum: { duration: true },
  });

  await db.course.update({
    where: { id: lesson.courseId },
    data: {
      duration: totalDuration._sum.duration || 0,
    },
  });
}

export async function getLessonById(id: string, userId?: string): Promise<any> {
  const lesson = await db.lesson.findUnique({
    where: { id },
    include: {
      course: {
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      resources: true,
    },
  });

  if (!lesson) {
    throw AppError.notFound('Lesson not found');
  }

  // Check if user has access (enrolled or is instructor)
  let hasAccess = false;
  if (userId) {
    if (lesson.course.instructorId === userId) {
      hasAccess = true;
    } else {
      const enrollment = await db.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: lesson.courseId,
          },
        },
      });
      hasAccess = !!enrollment || lesson.isPreview;
    }
  } else {
    hasAccess = lesson.isPreview;
  }

  if (!hasAccess) {
    throw AppError.forbidden('You must enroll in this course to access this lesson');
  }

  // Get video progress if user is enrolled
  let videoProgress = null;
  if (userId) {
    videoProgress = await db.videoProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId: id,
        },
      },
    });
  }

  return {
    ...lesson,
    videoProgress: videoProgress ? {
      progress: videoProgress.progress,
      watched: videoProgress.watched,
      watchTime: videoProgress.watchTime,
    } : null,
  };
}


