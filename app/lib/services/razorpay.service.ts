import Razorpay from 'razorpay';
import { prisma } from '../prisma';
import { createOrUpdatePendingPurchase } from './purchase.service';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayOrder(
  userId: string,
  course: { id: string; title: string; price: number },
  amount: number
) {
  const order = await razorpay.orders.create({
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: `course_${course.id}_${Date.now()}`,
  });

  const payment = await prisma.razorpayPayment.create({
    data: {
      userId,
      courseId: course.id,
      razorpayOrderId: order.id,
      amount,
      currency: 'INR',
      status: 'PENDING',
    },
  });

  await createOrUpdatePendingPurchase(userId, course.id, payment.id);

  return order;
}
