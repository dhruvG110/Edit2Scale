'use client';

import { useState } from "react";
import Image from "next/image";
import CoursePlayer from "./_components/CoursePlayer";
import Link from "next/link";

type Lesson = {
  id: string;
  title: string;
  muxPlaybackId: string; // For future MUX videos
};

export default function SingleCoursePage() {
  // Randomly generate 12 lessons for now
  const lessons: Lesson[] = Array.from({ length: 12 }, (_, i) => ({
    id: `lesson-${i + 1}`,
    title: `Lesson ${i + 1}`,
    muxPlaybackId: "pzyhpUhcTfGR59Hr1GWeMjoa09pGAjGInusqW2QVsto", // background.mp4
  }));

  const courseInfo = {
    title: "Alight Motion Course Mastery",
    description: "Learn motion graphics, transitions, VFX, and real-world projects.",
    coverImage: "/course-cover.jpg", // Replace with actual image later
  };

  return (
    <div className="max-h-screen bg-[#07080f] text-white">
      {/* Course Header */}
      <div className="text-lg text-zinc-300 ml-5 mt-5 p-2 rounded-md border-2 border-purple-500 border-pink-500 w-32 h-12 text-center 
                transition-all duration-300
                hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 
                hover:text-white  hover:shadow-lg">
  <Link href="/courses" className="hover:text-white transition">
    All Courses
  </Link>
</div>

      
      <div className="relative h-72 md:h-96 w-full bg-black flex items-center justify-center overflow-hidden mb-8">
        <div className="relative text-center z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{courseInfo.title}</h1>
          <p className="text-zinc-300 text-lg md:text-xl">{courseInfo.description}</p>
        </div>
      </div>

      {/* Course Lessons */}
      <CoursePlayer lessons={lessons} />
    </div>
  );
}
