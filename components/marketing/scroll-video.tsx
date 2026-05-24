"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Path under /public, e.g. "/cinematic/how-we-work.mp4". If omitted, renders children (fallback section). */
  src?: string;
  /** Approximate length in seconds. Lets us match scroll-distance to video duration. */
  approxDuration?: number;
  /** Tailwind className for the pinned video wrapper. */
  videoClassName?: string;
  /** Optional poster shown before video metadata loads. */
  poster?: string;
  /** Optional overlay content (e.g. headings, captions) layered above the pinned video. */
  overlay?: React.ReactNode;
  /** Children rendered as the fallback when no src is provided. */
  children?: React.ReactNode;
};

/**
 * Apple AirPods-style scroll-scrubbed video.
 * - Section is `approxDuration` × 100vh tall.
 * - Video pins to viewport; scroll position drives video.currentTime.
 * - With no src, renders children (lets us keep the ScrollyStory fallback).
 */
export function ScrollVideo({
  src,
  approxDuration = 8,
  videoClassName,
  poster,
  overlay,
  children,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = () => setReduce(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!src || reduce) return;
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let rafId = 0;
    let targetTime = 0;
    let lastSet = -1;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total > 0) {
        const progress = Math.min(
          1,
          Math.max(0, -rect.top / total),
        );
        const dur = video.duration || approxDuration;
        targetTime = progress * dur;
        if (Math.abs(targetTime - lastSet) > 0.02) {
          video.currentTime = targetTime;
          lastSet = targetTime;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [src, approxDuration, reduce]);

  if (!src || reduce) {
    return <>{children}</>;
  }

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${Math.max(2, approxDuration) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          className={cn("absolute inset-0 size-full object-cover", videoClassName)}
          muted
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
        {overlay && (
          <div className="relative z-10 flex h-full items-center">
            {overlay}
          </div>
        )}
      </div>
    </section>
  );
}
