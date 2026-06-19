"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VIDEO_SOURCE = "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SOURCE;
      return;
    }

    if (!Hls.isSupported()) return;

    const hls = new Hls();
    hls.loadSource(VIDEO_SOURCE);
    hls.attachMedia(video);

    return () => {
      hls.destroy();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover opacity-100"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0.58)_56%,rgba(0,0,0,0.92)_100%)]" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
