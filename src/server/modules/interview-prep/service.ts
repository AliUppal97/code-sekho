// ============================================================================
// Interview Prep Service
// Enterprise-grade interview preparation management
// ============================================================================

import { db } from '../../db/client';
import { AppError } from '../../core/errors';
import { generateSlug, ensureUniqueSlug } from '../../utils/slug';
import type { CreateSubjectInput, CreateCompanyInput, UpdateSubjectInput, UpdateCompanyInput } from './schema';

export async function listSubjects(): Promise<any[]> {
  return db.interviewSubject.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getSubjectBySlug(slug: string): Promise<any> {
  const subject = await db.interviewSubject.findUnique({
    where: { slug },
  });

  if (!subject) {
    throw AppError.notFound('Subject not found');
  }

  return subject;
}

export async function createSubject(input: CreateSubjectInput): Promise<any> {
  const baseSlug = generateSlug(input.name);
  const slug = await ensureUniqueSlug(baseSlug, async (s) => {
    const existing = await db.interviewSubject.findUnique({ where: { slug: s } });
    return !existing;
  });

  return db.interviewSubject.create({
    data: {
      name: input.name,
      slug,
      description: input.description,
      icon: input.icon || '',
      color: input.color || '#4F46E5',
    },
  });
}

export async function updateSubject(input: UpdateSubjectInput): Promise<any> {
  const { id, ...updateData } = input;

  const existing = await db.interviewSubject.findUnique({
    where: { id },
  });

  if (!existing) {
    throw AppError.notFound('Subject not found');
  }

  let slug = existing.slug;
  if (updateData.name && updateData.name !== existing.name) {
    const baseSlug = generateSlug(updateData.name);
    slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await db.interviewSubject.findUnique({ where: { slug: s } });
      return !existing || existing.id === id;
    });
  }

  return db.interviewSubject.update({
    where: { id },
    data: {
      ...updateData,
      slug,
    },
  });
}

export async function deleteSubject(id: string): Promise<void> {
  const subject = await db.interviewSubject.findUnique({
    where: { id },
  });

  if (!subject) {
    throw AppError.notFound('Subject not found');
  }

  await db.interviewSubject.delete({
    where: { id },
  });
}

export async function listCompanies(): Promise<any[]> {
  return db.interviewCompany.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getCompanyBySlug(slug: string): Promise<any> {
  const company = await db.interviewCompany.findUnique({
    where: { slug },
  });

  if (!company) {
    throw AppError.notFound('Company not found');
  }

  return company;
}

export async function createCompany(input: CreateCompanyInput): Promise<any> {
  const baseSlug = generateSlug(input.name);
  const slug = await ensureUniqueSlug(baseSlug, async (s) => {
    const existing = await db.interviewCompany.findUnique({ where: { slug: s } });
    return !existing;
  });

  return db.interviewCompany.create({
    data: {
      name: input.name,
      slug,
      description: input.description,
      logo: input.logo || '',
      industry: input.industry,
      expectedSalary: input.expectedSalary,
      applicationLink: input.applicationLink,
      hireDate: input.hireDate,
      interviewTips: input.interviewTips || [],
    },
  });
}

export async function updateCompany(input: UpdateCompanyInput): Promise<any> {
  const { id, ...updateData } = input;

  const existing = await db.interviewCompany.findUnique({
    where: { id },
  });

  if (!existing) {
    throw AppError.notFound('Company not found');
  }

  let slug = existing.slug;
  if (updateData.name && updateData.name !== existing.name) {
    const baseSlug = generateSlug(updateData.name);
    slug = await ensureUniqueSlug(baseSlug, async (s) => {
      const existing = await db.interviewCompany.findUnique({ where: { slug: s } });
      return !existing || existing.id === id;
    });
  }

  return db.interviewCompany.update({
    where: { id },
    data: {
      ...updateData,
      slug,
    },
  });
}

export async function deleteCompany(id: string): Promise<void> {
  const company = await db.interviewCompany.findUnique({
    where: { id },
  });

  if (!company) {
    throw AppError.notFound('Company not found');
  }

  await db.interviewCompany.delete({
    where: { id },
  });
}


