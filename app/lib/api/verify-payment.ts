/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyRazorpayPayment } from '../services/razorpay.verify';

export async function verifyPayment(data: any) {
  return verifyRazorpayPayment(data);
}
