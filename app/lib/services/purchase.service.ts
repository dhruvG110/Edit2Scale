import { prisma } from '../prisma';
import { redirect } from 'next/navigation';
import { getOrCreateDBUser } from '../auth';

/**
 * Check if user has a purchase record for a course
 */
export async function hasPurchased(userId: string, courseId: string) {
  return prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });
}

/**
 * Create OR update a pending purchase safely
 * - Handles retries
 * - Handles double clicks
 * - Respects unique constraint (userId + courseId)
 */
export async function createOrUpdatePendingPurchase(
  userId: string,
  courseId: string,
  razorpayPaymentId?: string
) {
  return prisma.purchase.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {
      razorpayPaymentId,
      status: 'PENDING',
    },
    create: {
      userId,
      courseId,
      razorpayPaymentId,
      status: 'PENDING',
    },
  });
}

/**
 * Mark purchase as successful after payment verification
 */
export async function markPurchaseSuccess(
  userId: string,
  courseId: string
) {
  return prisma.purchase.update({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    data: {
      status: 'SUCCESS',
    },
  });
}

/**
 * 🔐 HARD PROTECTION
 * Use this in course content pages
 * - Redirects if not logged in
 * - Redirects if course not purchased
 */
export async function requirePurchase(courseId: string) {
  const user = await getOrCreateDBUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  if(!courseId){
    redirect('/courses');
  }
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId,
      },
    },
  });

  if (!purchase || purchase.status !== 'SUCCESS') {
    redirect('/courses');
  }

  return user;
}
