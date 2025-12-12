import { describe, expect, it } from 'vitest';

import { FEATURED_COURSES } from '@/lib/data/courses';
import { AppError } from '@/server/core/errors';

import { getCourseById, getFeaturedCourses, listCourses } from './service';

describe('courses service', () => {
  it('lists courses with pagination defaults', () => {
    const result = listCourses({ page: 1, limit: 2 });
    expect(result.data).toHaveLength(2);
    expect(result.pagination.total).toBe(FEATURED_COURSES.length);
  });

  it('filters by category and search', () => {
    const result = listCourses({ page: 1, limit: 10, category: 'Programming', search: 'C' });
    expect(result.data.every((c) => c.category === 'Programming')).toBe(true);
  });

  it('returns featured courses with discounts', () => {
    const featured = getFeaturedCourses();
    expect(featured.every((c) => c.discountPrice !== undefined)).toBe(true);
  });

  it('gets course by id', () => {
    const course = getCourseById(FEATURED_COURSES[0].id);
    expect(course.id).toBe(FEATURED_COURSES[0].id);
  });

  it('throws not found for invalid id', () => {
    expect(() => getCourseById('missing')).toThrow(AppError);
  });
});


