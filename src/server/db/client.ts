// ============================================================================
// Database Client - Prisma Singleton
// Enterprise-grade database connection management
// ============================================================================

import { PrismaClient } from '@prisma/client';
import { logger } from '../logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect();
  logger.info('Database connection closed');
});

export default db;


