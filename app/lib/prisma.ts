import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global prisma for dev hot reload
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Only Node.js runtime (skip serverless / edge adapters)
export const prisma =
  global.prisma ??
  new PrismaClient();

// Reuse Prisma client during dev hot reload
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
