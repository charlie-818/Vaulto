"use client";

import { useEffect, useRef, useState } from "react";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [reduceMotion]);

  return (
    <div
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/landing-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={(e) => {
          const v = e.currentTarget;
          v.pause();
          v.currentTime = v.duration;
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `linear-gradient(to right, var(--video-gradient-left) 0%, var(--video-gradient-mid1) 42%, var(--video-gradient-mid2) 68%, var(--video-gradient-mid3) 88%, var(--video-gradient-right) 100%)`,
        }}
        aria-hidden
      />
      {reduceMotion && (
        <div
          className="absolute inset-0 z-[1] bg-[var(--vaulto-bg)] pointer-events-none"
          aria-hidden
        />
      )}
    </div>
  );
}
