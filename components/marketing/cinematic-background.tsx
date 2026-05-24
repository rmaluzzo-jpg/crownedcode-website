"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Path under /public, e.g. "/cinematic/hero-loop.mp4". If omitted, renders the children fallback (or null). */
  src?: string;
  /** Optional WebM sibling for smaller file. */
  srcWebm?: string;
  /** Static poster image rendered for reduced-motion or before video loads. */
  poster?: string;
  className?: string;
  /** Anything to render when no video src is provided (e.g. a Hero3D fallback). */
  children?: React.ReactNode;
};

/**
 * Drop-in cinematic video background. Autoplay, muted, loop, plays inline.
 * - prefers-reduced-motion → renders poster only.
 * - No src → renders children (allows graceful fallback to Hero3D).
 */
export function CinematicBackground({
  src,
  srcWebm,
  poster,
  className,
  children,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = () => setReduce(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!src) {
    return <>{children}</>;
  }

  if (reduce) {
    return poster ? (
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-cover bg-center",
          className,
        )}
        style={{ backgroundImage: `url(${poster})` }}
      />
    ) : (
      <>{children}</>
    );
  }

  return (
    <video
      ref={ref}
      className={cn("absolute inset-0 -z-10 size-full object-cover", className)}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
    >
      {srcWebm && <source src={srcWebm} type="video/webm" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
