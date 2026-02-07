import { getOrCreateDBUser } from '../auth';
import { updateCourseProgress } from '../services/progress.service';

export async function saveProgress(courseId: string, progress: number) {
  const user = await getOrCreateDBUser();
  if (!user) throw new Error('Unauthorized');

  return updateCourseProgress(user.id, courseId, progress);
}
