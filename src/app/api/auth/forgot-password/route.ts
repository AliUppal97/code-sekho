import { forgotPasswordHandler } from '@/server/modules/auth/route';

export async function POST(request: Request) {
  return forgotPasswordHandler(request as any);
}


