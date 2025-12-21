import { changePasswordHandler } from '@/server/modules/auth/route';

export async function POST(request: Request) {
  return changePasswordHandler(request as any);
}


