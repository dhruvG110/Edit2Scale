import { verifyPayment } from '../../lib/api/verify-payment';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await verifyPayment(body);
    return Response.json({ success: true });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
}
