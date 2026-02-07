/*
  Warnings:

  - You are about to drop the column `stripePaymentId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `StripeCustomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripePayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RazorpayPaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- DropForeignKey
ALTER TABLE "StripeCustomer" DROP CONSTRAINT "StripeCustomer_userId_fkey";

-- DropForeignKey
ALTER TABLE "StripePayment" DROP CONSTRAINT "StripePayment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "StripePayment" DROP CONSTRAINT "StripePayment_userId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "stripePaymentId",
ADD COLUMN     "razorpayPaymentId" TEXT;

-- DropTable
DROP TABLE "StripeCustomer";

-- DropTable
DROP TABLE "StripePayment";

-- DropEnum
DROP TYPE "StripePaymentStatus";

-- CreateTable
CREATE TABLE "RazorpayCustomer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "razorpayCustId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RazorpayCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RazorpayPayment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "razorpayOrderId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "RazorpayPaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RazorpayPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RazorpayCustomer_userId_key" ON "RazorpayCustomer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RazorpayCustomer_razorpayCustId_key" ON "RazorpayCustomer"("razorpayCustId");

-- CreateIndex
CREATE UNIQUE INDEX "RazorpayPayment_razorpayOrderId_key" ON "RazorpayPayment"("razorpayOrderId");

-- AddForeignKey
ALTER TABLE "RazorpayCustomer" ADD CONSTRAINT "RazorpayCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RazorpayPayment" ADD CONSTRAINT "RazorpayPayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RazorpayPayment" ADD CONSTRAINT "RazorpayPayment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
