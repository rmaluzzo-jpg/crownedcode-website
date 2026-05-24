"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Hero background. Always-on ambient aurora that slowly drifts, plus a
 * cursor-following gold spotlight when the user moves over the section.
 */
export function AuroraSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 50, damping: 22, mass: 0.8 });
  const sy = useSpring(my, { stiffness: 50, damping: 22, mass: 0.8 });

  const cursorBg = useTransform([sx, sy], ([x, y]) => {
    const X = (x as number) * 100;
    const Y = (y as number) * 100;
    return `radial-gradient(ellipse 45% 30% at ${X}% ${Y}%, rgba(201,168,76,0.22) 0%, transparent 55%)`;
  });

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {/* Always-on drifting aurora (no interaction needed) */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 70% 50% at 20% 20%, rgba(201,168,76,0.18) 0%, transparent 60%), radial-gradient(ellipse 55% 40% at 80% 60%, rgba(201,168,76,0.10) 0%, transparent 60%)",
            "radial-gradient(ellipse 65% 45% at 70% 30%, rgba(201,168,76,0.20) 0%, transparent 60%), radial-gradient(ellipse 60% 45% at 25% 80%, rgba(201,168,76,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse 75% 55% at 50% 70%, rgba(201,168,76,0.16) 0%, transparent 60%), radial-gradient(ellipse 55% 35% at 85% 25%, rgba(201,168,76,0.14) 0%, transparent 60%)",
            "radial-gradient(ellipse 70% 50% at 20% 20%, rgba(201,168,76,0.18) 0%, transparent 60%), radial-gradient(ellipse 55% 40% at 80% 60%, rgba(201,168,76,0.10) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      {/* Cursor-following spotlight (layered on top) */}
      <motion.div className="absolute inset-0" style={{ background: cursorBg }} />
    </div>
  );
}
