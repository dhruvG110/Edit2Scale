/* eslint-disable @typescript-eslint/no-explicit-any */
export async function POST(req: Request) {
  try {
    const { courseId, progress } = await req.json();

    // Dynamically import saveProgress
    const { saveProgress } = await import('../../lib/api/progress');
    await saveProgress(courseId, progress);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
