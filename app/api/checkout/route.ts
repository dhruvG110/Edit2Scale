// app/api/checkout/route.ts
export async function POST(req: Request) {
  try {
    const { courseId, promoCode } = await req.json();

    // Dynamic import to avoid Prisma being initialized at build
    const { checkout } = await import('../../lib/api/checkout');

    const order = await checkout(courseId, promoCode);

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}
