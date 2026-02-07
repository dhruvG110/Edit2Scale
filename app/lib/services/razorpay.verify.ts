import crypto from 'crypto';
import { prisma } from '../prisma';
import { markPurchaseSuccess } from './purchase.service';

export async function verifyRazorpayPayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  promoCode, // optional
}: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  promoCode?: string;
}) {
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    throw new Error('Invalid Razorpay signature');
  }

  // Update payment status
  const payment = await prisma.razorpayPayment.update({
    where: { razorpayOrderId: razorpay_order_id },
    data: {
      razorpayPaymentId: razorpay_payment_id,
      status: 'SUCCESS',
    },
  });

  // Mark purchase as successful
  await markPurchaseSuccess(payment.userId, payment.courseId);

  // Increment promo code usage
  if (promoCode) {
    await prisma.promoCode.update({
      where: { code: promoCode },
      data: { usedCount: { increment: 1 } },
    });
  }

  return payment;
}
