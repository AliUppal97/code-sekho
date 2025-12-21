import { resetPasswordHandler } from '@/server/modules/auth/route';

export async function POST(request: Request) {
  return resetPasswordHandler(request as any);
}


