import { saveProgress } from '../../lib/api/progress';

export async function POST(req: Request) {
  try {
    const { courseId, progress } = await req.json();
    await saveProgress(courseId, progress);
    return Response.json({ success: true });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
}
