// ============================================================================
// Courses Service
// Enterprise-grade course management with Prisma
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import { generateSlug, ensureUniqueSlug } from '../../utils/slug';
import type { CourseQuery, CreateCourseInput, UpdateCourseInput } from './schema';
import { Prisma } from '@prisma/client';
import type { Decimal } from '@prisma/client/runtime/library';

export interface CourseListResult {
  data: any[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function listCourses(params: CourseQuery, userId?: string): Promise<CourseListResult> {
  const {
    page,
    limit,
    category,
    categoryId,
    level,
    search,
    instructorId,
    isPublished,
    isFeatured,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = params;

  // Build where clause
  const where: Prisma.CourseWhereInput = {};

  if (categoryId) {
    where.categoryId = categoryId;
  } else if (category) {
    const categoryRecord = await db.courseCategory.findFirst({
      where: { slug: category },
    });
    if (categoryRecord) {
      where.categoryId = categoryRecord.id;
    }
  }

  if (level) {
    where.level = level;
  }

  if (instructorId) {
    where.instructorId = instructorId;
  }

  if (isPublished !== undefined) {
    where.isPublished = isPublished;
  } else {
    // Default to only published courses for non-instructors
    if (!userId) {
      where.isPublished = true;
    }
  }

  if (isFeatured !== undefined) {
    where.isFeatured = isFeatured;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { shortDescription: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) {
      where.price.gte = new Prisma.Decimal(minPrice);
    }
    if (maxPrice !== undefined) {
      where.price.lte = new Prisma.Decimal(maxPrice);
    }
  }

  // Build order by
  const orderBy: Prisma.CourseOrderByWithRelationInput = {};
  orderBy[sortBy] = sortOrder;

  // Get total count
  const total = await db.course.count({ where });

  // Get courses
  const courses = await db.course.findMany({
    where,
    include: {
      category: true,
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      tags: true,
      _count: {
        select: {
          lessons: true,
          enrollments: true,
          reviews: true,
        },
      },
    },
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });

  // Transform data
  const data = courses.map((course) => ({
    ...course,
    price: Number(course.price),
    discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
    totalLessons: course._count.lessons,
    enrollmentCount: course._count.enrollments,
    reviewCount: course._count.reviews,
    _count: undefined,
  }));

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getCourseById(id: string, userId?: string): Promise<any> {
  const course = await db.course.findUnique({
    where: { id },
    include: {
      category: true,
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      tags: true,
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          resources: true,
          _count: {
            select: {
              videoProgress: true,
            },
          },
        },
      },
      _count: {
        select: {
          enrollments: true,
          reviews: true,
        },
      },
    },
  });

  if (!course) {
    throw AppError.notFound('Course not found');
  }

  // Check if user is enrolled (if userId provided)
  let enrollment = null;
  if (userId) {
    enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: id,
        },
      },
    });
  }

  return {
    ...course,
    price: Number(course.price),
    discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
    enrollmentCount: course._count.enrollments,
    reviewCount: course._count.reviews,
    isEnrolled: !!enrollment,
    enrollmentProgress: enrollment?.progress || 0,
    _count: undefined,
  };
}

export async function getCourseBySlug(slug: string, userId?: string): Promise<any> {
  const course = await db.course.findUnique({
    where: { slug },
    include: {
      category: true,
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
          email: true,
        },
      },
      tags: true,
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          resources: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
          reviews: true,
        },
      },
    },
  });

  if (!course) {
    throw AppError.notFound('Course not found');
  }

  // Check if user is enrolled
  let enrollment = null;
  if (userId) {
    enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: course.id,
        },
      },
    });
  }

  return {
    ...course,
    price: Number(course.price),
    discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
    enrollmentCount: course._count.enrollments,
    reviewCount: course._count.reviews,
    isEnrolled: !!enrollment,
    enrollmentProgress: enrollment?.progress || 0,
    _count: undefined,
  };
}

export async function getFeaturedCourses(limit = 6): Promise<any[]> {
  const courses = await db.course.findMany({
    where: {
      isFeatured: true,
      isPublished: true,
    },
    include: {
      category: true,
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      tags: true,
      _count: {
        select: {
          lessons: true,
          enrollments: true,
          reviews: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
  });

  return courses.map((course) => ({
    ...course,
    price: Number(course.price),
    discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
    totalLessons: course._count.lessons,
    enrollmentCount: course._count.enrollments,
    reviewCount: course._count.reviews,
    _count: undefined,
  }));
}

export async function createCourse(input: CreateCourseInput, instructorId: string): Promise<any> {
  // Verify category exists
  const category = await db.courseCategory.findUnique({
    where: { id: input.categoryId },
  });

  if (!category) {
    throw AppError.notFound('Category not found');
  }

  // Generate unique slug
  const baseSlug = generateSlug(input.title);
  const slug = await ensureUniqueSlug(baseSlug, async (s) => {
    const existing = await db.course.findUnique({ where: { slug: s } });
    return !existing;
  });

  // Create course
  const course = await db.course.create({
    data: {
      title: input.title,
      slug,
      description: input.description,
      shortDescription: input.shortDescription,
      thumbnail: input.thumbnail,
      categoryId: input.categoryId,
      instructorId,
      level: input.level,
      duration: input.duration,
      price: new Prisma.Decimal(input.price),
      discountPrice: input.discountPrice ? new Prisma.Decimal(input.discountPrice) : null,
      isFeatured: input.isFeatured || false,
      isPublished: input.isPublished || false,
      tags: {
        create: (input.tags || []).map((tag) => ({
          name: tag,
        })),
      },
    },
    include: {
      category: true,
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      tags: true,
    },
  });

  return {
    ...course,
    price: Number(course.price),
    discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
  };
}

export async function updateCourse(input: UpdateCourseInput, userId: string, userRole: string): Promise<any> {
  const { id, ...updateData } = input;

  // Check if course exists
  const existingCourse = await db.course.findUnique({
    where: { id },
  });

  if (!existingCourse) {
    throw AppError.notFound('Course not found');
  }

  // Check permissions (instructor can only update their own courses, admin can update any)
  if (userRole !== 'ADMIN' && existingCourse.instructorId !== userId) {
    throw AppError.forbidden('You can only update your own courses');
  }

  // If title changed, update slug
  let slug = existingCourse.slug;
  if (updateData.title && updateData.title !== existingCourse.title) {
    const baseSlug = generateSlug(updateData.title);
    slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await db.course.findUnique({ where: { slug: s } });
      return !existing || existing.id === id;
    });
  }

  // Prepare update data
  const data: any = {
    ...(updateData.title && { title: updateData.title, slug }),
    ...(updateData.description && { description: updateData.description }),
    ...(updateData.shortDescription && { shortDescription: updateData.shortDescription }),
    ...(updateData.thumbnail && { thumbnail: updateData.thumbnail }),
    ...(updateData.categoryId && { categoryId: updateData.categoryId }),
    ...(updateData.level && { level: updateData.level }),
    ...(updateData.duration !== undefined && { duration: updateData.duration }),
    ...(updateData.price !== undefined && { price: new Prisma.Decimal(updateData.price) }),
    ...(updateData.discountPrice !== undefined && {
      discountPrice: updateData.discountPrice ? new Prisma.Decimal(updateData.discountPrice) : null,
    }),
    ...(updateData.isFeatured !== undefined && { isFeatured: updateData.isFeatured }),
    ...(updateData.isPublished !== undefined && { isPublished: updateData.isPublished }),
  };

  // Update tags if provided
  if (updateData.tags) {
    // Delete existing tags
    await db.courseTag.deleteMany({
      where: { courseId: id },
    });

    // Create new tags
    if (updateData.tags.length > 0) {
      data.tags = {
        create: updateData.tags.map((tag) => ({
          name: tag,
        })),
      };
    }
  }

  const course = await db.course.update({
    where: { id },
    data,
    include: {
      category: true,
      instructor: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      tags: true,
    },
  });

  return {
    ...course,
    price: Number(course.price),
    discountPrice: course.discountPrice ? Number(course.discountPrice) : null,
  };
}

export async function deleteCourse(id: string, userId: string, userRole: string): Promise<void> {
  const course = await db.course.findUnique({
    where: { id },
  });

  if (!course) {
    throw AppError.notFound('Course not found');
  }

  // Check permissions
  if (userRole !== 'ADMIN' && course.instructorId !== userId) {
    throw AppError.forbidden('You can only delete your own courses');
  }

  await db.course.delete({
    where: { id },
  });
}

