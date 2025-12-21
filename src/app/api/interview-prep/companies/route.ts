import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { requireRole } from '@/server/middleware/auth';
import { createCompanySchema } from '@/server/modules/interview-prep/schema';
import { listCompanies, createCompany } from '@/server/modules/interview-prep/service';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    const companies = await listCompanies();
    return jsonResponse(companies, 200);
  });
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    await requireRole('ADMIN')(request);
    const input = await validateBody(request, createCompanySchema);
    const company = await createCompany(input);
    return jsonResponse(company, 201, 'Company created successfully');
  });
}


