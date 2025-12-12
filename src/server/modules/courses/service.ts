import { FEATURED_COURSES, type Course } from '@/lib/data/courses';
import { AppError } from '@/server/core/errors';

import type { CourseQuery } from './schema';

type CourseListResult = {
  data: Course[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const COURSES: Course[] = FEATURED_COURSES;

export function listCourses(params: CourseQuery): CourseListResult {
  const { page, limit, category, level, search } = params;

  let filtered = [...COURSES];

  if (category) {
    filtered = filtered.filter((course) => course.category.toLowerCase() === category.toLowerCase());
  }

  if (level) {
    filtered = filtered.filter((course) => course.level === level);
  }

  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term),
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    pagination: { page, limit, total, totalPages },
  };
}

export function getCourseById(id: string): Course {
  const course = COURSES.find((item) => item.id === id);
  if (!course) {
    throw AppError.notFound(`Course with id ${id} not found`);
  }
  return course;
}

export function getFeaturedCourses(): Course[] {
  return COURSES.filter((course) => course.discountPrice !== undefined);
}



