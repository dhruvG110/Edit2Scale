import { checkout } from '../../lib/api/checkout';

export async function POST(req: Request) {
  try {
    const { courseId } = await req.json();

    const order = await checkout(courseId);

    return Response.json(order);
  } catch (err: any) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      
      { status: 400 }
    );
  }
}
