import { loginHandler } from '@/server/modules/auth/route';

export async function POST(request: Request) {
  return loginHandler(request as any);
}


