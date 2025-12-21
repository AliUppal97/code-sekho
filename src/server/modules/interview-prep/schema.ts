// ============================================================================
// Interview Prep Schemas
// Zod validation schemas for interview prep endpoints
// ============================================================================

import { z } from 'zod';

export const createSubjectSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(1000).optional(),
  icon: z.string().url().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex code').optional(),
});

export const createCompanySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(2000).optional(),
  logo: z.string().url().optional(),
  industry: z.string().min(1),
  expectedSalary: z.string().optional(),
  applicationLink: z.string().url().optional(),
  hireDate: z.string().optional(),
  interviewTips: z.array(z.string()).optional(),
});

export const updateSubjectSchema = createSubjectSchema.partial().extend({
  id: z.string().min(1),
});

export const updateCompanySchema = createCompanySchema.partial().extend({
  id: z.string().min(1),
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;


