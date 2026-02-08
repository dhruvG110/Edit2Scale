'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false });

type Lesson = {
  id: string;
  title: string;
  muxPlaybackId: string;
};

export default function VideoPlayer({ lesson }: { lesson: Lesson }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
      <MuxPlayer
        playbackId={lesson.muxPlaybackId}
        streamType="on-demand"
        className="w-full h-full rounded-xl"
      />

      <div className="absolute top-3 right-3 text-white/30 text-xs pointer-events-none">
        user@email.com • {time}
      </div>
    </div>
  );
}
