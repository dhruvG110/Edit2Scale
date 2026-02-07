import { getOrCreateDBUser } from '../auth';
import { getCourseById } from '../services/course.service';
import { createRazorpayOrder } from '../services/razorpay.service';
import { hasPurchased } from '../services/purchase.service';
import { prisma } from '../prisma';

export async function checkout(courseId: string, promoCode?: string) {
  // 1️⃣ Ensure user is authenticated
  const user = await getOrCreateDBUser();
  if (!user) throw new Error('Unauthorized');

  // 2️⃣ Ensure course exists
  const course = await getCourseById(courseId);
  if (!course) throw new Error('Course not found');

  // 3️⃣ Check existing purchase
  const existingPurchase = await hasPurchased(user.id, courseId);
  if (existingPurchase?.status === 'SUCCESS') throw new Error('Course already purchased');

  // 4️⃣ Handle promo code
  let discount = 0;
  let promo: any = null;
  if (promoCode) {
    promo = await prisma.promoCode.findUnique({ where: { code: promoCode } });
    if (!promo) throw new Error('Invalid promo code');
    discount = promo.discount;
  }

  // 5️⃣ Create Razorpay order with discount applied
  const finalAmount = course.price - discount;
  const order = await createRazorpayOrder(user.id, course, finalAmount);

  return { order, discount, appliedPromo: promo?.salesperson || null };
}
