import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function getOrCreateDBUser() {
  const user = await currentUser();
  if (!user) return null;

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) return null;

  return prisma.user.upsert({
    where: {
      clerkId: user.id,
    },
    update: {
      email,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      imageUrl: user.imageUrl,
    },
    create: {
      clerkId: user.id,
      email,
      name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      imageUrl: user.imageUrl,
    },
  });
}
