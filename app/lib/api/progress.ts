export async function saveProgress(courseId: string, progress: number) {
  // Dynamically import DB helpers to prevent build-time Prisma execution
  const { getOrCreateDBUser } = await import('../auth');
  const { updateCourseProgress } = await import('../services/progress.service');

  const user = await getOrCreateDBUser();
  if (!user) throw new Error('Unauthorized');

  return updateCourseProgress(user.id, courseId, progress);
}
