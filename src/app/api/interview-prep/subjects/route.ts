import { NextRequest } from 'next/server';
import { jsonResponse, withErrorHandling } from '@/server/core/http';
import { rateLimit } from '@/server/middleware';
import { validateBody } from '@/server/middleware/validation';
import { requireRole } from '@/server/middleware/auth';
import { createSubjectSchema } from '@/server/modules/interview-prep/schema';
import { listSubjects, createSubject } from '@/server/modules/interview-prep/service';

export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request);
    const subjects = await listSubjects();
    return jsonResponse(subjects, 200);
  });
}

export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    await rateLimit(request, 'strict');
    await requireRole('ADMIN')(request);
    const input = await validateBody(request, createSubjectSchema);
    const subject = await createSubject(input);
    return jsonResponse(subject, 201, 'Subject created successfully');
  });
}


