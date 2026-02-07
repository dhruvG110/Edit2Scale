import { prisma } from '../prisma';

export async function getAllCourses() {
  return prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCourseById(courseId: string) {
  return prisma.course.findUnique({
    where: { id: courseId },
  });
}
