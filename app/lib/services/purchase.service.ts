import { redirect } from "next/navigation";

export async function hasPurchased(userId: string, courseId: string) {
  const { prisma } = await import("../prisma");
  return prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });
}

export async function createOrUpdatePendingPurchase(
  userId: string,
  courseId: string,
  razorpayPaymentId?: string
) {
  const { prisma } = await import("../prisma");
  return prisma.purchase.upsert({
    where: {
      userId_courseId: { userId, courseId },
    },
    update: {
      razorpayPaymentId,
      status: "PENDING",
    },
    create: {
      userId,
      courseId,
      razorpayPaymentId,
      status: "PENDING",
    },
  });
}

export async function markPurchaseSuccess(userId: string, courseId: string) {
  const { prisma } = await import("../prisma");
  return prisma.purchase.update({
    where: {
      userId_courseId: { userId, courseId },
    },
    data: { status: "SUCCESS" },
  });
}

export async function requirePurchase(courseId: string) {
  const { prisma } = await import("../prisma");
  const { getOrCreateDBUser } = await import("../auth");

  const user = await getOrCreateDBUser();
  if (!user) redirect("/sign-in");
  if (!courseId) redirect("/courses");

  const purchase = await prisma.purchase.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  });

  if (!purchase || purchase.status !== "SUCCESS") redirect("/courses");

  return user;
}
