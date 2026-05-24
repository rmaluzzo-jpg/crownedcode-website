"use client";

import { motion } from "motion/react";

/**
 * Grid background with a constantly running diagonal scan-line sweep.
 */
export function AnimatedGrid({ size = 60 }: { size?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: `${size}px ${size}px`,
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        }}
      />
      <motion.div
        className="absolute -inset-x-10 h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.12) 50%, transparent 100%)",
        }}
        animate={{ y: ["-20%", "120vh"] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
