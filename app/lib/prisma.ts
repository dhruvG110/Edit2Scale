import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global prisma for dev hot reload
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use Prisma Data Proxy in Netlify / serverless builds if needed
const isServerless = process.env.NETLIFY || process.env.VERCEL;

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['query', 'error'],
    ...(isServerless
      ? {
          // Enable Data Proxy for serverless environments
          engine: 'client',
          adapter: 'data-proxy',
        }
      : {}),
  });

if (!isServerless && process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
