'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false });

export default function VideoPlayer() {
  const [time, setTime] = useState("");

  // Live time for watermark
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const muxPlaybackId = "HUYtXLBfFC5uhGWcr5VQJu61GnzE8Ygmgn4hD9qfWF8";

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
      {/* MUX Player */}
      <MuxPlayer
        playbackId={muxPlaybackId}
        streamType="on-demand"
        className="w-full h-full rounded-xl"
      />

      {/* Custom watermark */}
      <div className="absolute top-3 right-3 text-white/30 text-xs pointer-events-none">
        user@email.com • {time}
      </div>
    </div>
  );
}
