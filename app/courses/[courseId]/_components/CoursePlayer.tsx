'use client';

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

type Lesson = {
  id: string;
  title: string;
  muxPlaybackId: string; // For MUX video
};

export default function CoursePlayer({ lessons }: { lessons: Lesson[] }) {
  if (!lessons || lessons.length === 0) {
    return <div className="p-10 text-white">No lessons available.</div>;
  }

  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  const goToNextLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex < lessons.length - 1) {
      setActiveLesson(lessons[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080f] text-white flex flex-col md:flex-row">

      {/* Sidebar Lessons */}
      <aside className="w-full md:w-80 lg:w-64 border-r border-white/10 p-4 space-y-1 md:h-screen md:sticky md:top-0 overflow-y-auto">
        {lessons.map((lesson, index) => (
          <div key={lesson.id}>
            <button
              onClick={() => setActiveLesson(lesson)}
              className={`w-full text-left px-4 py-2 flex justify-between items-center text-sm rounded transition
                ${
                  activeLesson.id === lesson.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                }`}
            >
              <span>{index + 1}. {lesson.title}</span>
              {activeLesson.id === lesson.id && (
                <span className="text-xs text-pink-400">Playing</span>
              )}
            </button>

            {/* Show video only for active lesson in mobile */}
            <div className="md:hidden mt-2">
              {activeLesson.id === lesson.id && <VideoPlayer lesson={lesson} />}
            </div>
          </div>
        ))}
      </aside>

      {/* Main Player Area */}
      <main className="flex-1 p-4 md:p-6">
        {/* Video Player for desktop/tablet */}
        <div className="hidden md:block">
          <VideoPlayer lesson={activeLesson} />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={goToNextLesson}
            disabled={lessons.findIndex(l => l.id === activeLesson.id) === lessons.length - 1}
            className="px-5 py-2 rounded-lg text-sm font-medium
              bg-gradient-to-r from-pink-500 to-purple-500
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:opacity-90 transition"
          >
            Next Lesson →
          </button>
        </div>
      </main>

    </div>
  );
}
