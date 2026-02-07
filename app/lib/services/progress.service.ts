import { prisma } from '../prisma';

export async function getCourseProgress(
  userId: string,
  courseId: string
) {
  return prisma.courseProgress.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });
}

export async function updateCourseProgress(
  userId: string,
  courseId: string,
  progress: number
) {
  return prisma.courseProgress.upsert({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
    update: {
      progress,
      completed: progress >= 100,
    },
    create: {
      userId,
      courseId,
      progress,
      completed: progress >= 100,
    },
  });
}
