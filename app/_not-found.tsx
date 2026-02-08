// app/_not-found.tsx
import { prisma } from './lib/prisma';
import React from 'react';

export default async function NotFoundPage() {
  // Example: fetch total courses just to show safe server-side Prisma usage
  let totalCourses = 0;
  try {
    totalCourses = await prisma.course.count();
  } catch (err) {
    console.error('Prisma error on _not-found:', err);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#07080f]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-4">Page Not Found</p>
      <p className="text-zinc-400">Total courses available: {totalCourses}</p>
    </div>
  );
}
