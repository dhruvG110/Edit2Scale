// app/api/purchased-course/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    // Dynamic import prisma to avoid build-time execution
    const { prisma } = await import("../../lib/prisma");

    // Get Clerk user from session
    const { userId } = getAuth(req); // automatically gets user from request/session

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Fetch user from Prisma using clerkId
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        purchases: {
          where: { status: "SUCCESS" },
          select: { courseId: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const courses = user.purchases.map((p) => p.courseId);

    return NextResponse.json({ courses });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
