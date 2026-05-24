"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/**
 * Always-visible soft gold glow that follows the cursor across the viewport.
 * Sits at z-0 behind content; pointer-events: none.
 */
export function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 80, damping: 25, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 80, damping: 25, mass: 0.5 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(201,168,76,0.10) 0%, rgba(201,168,76,0.04) 30%, transparent 60%)",
        filter: "blur(20px)",
      }}
    />
  );
}
