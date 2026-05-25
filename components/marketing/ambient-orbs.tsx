"use client";

import { motion } from "motion/react";

type Orb = {
  size: number;
  left: string;
  top: string;
  hue: string;
  dx: number;
  dy: number;
  duration: number;
  delay: number;
};

const ORBS: Orb[] = [
  { size: 380, left: "10%", top: "20%", hue: "rgba(201,168,76,0.18)", dx: 60, dy: -40, duration: 14, delay: 0 },
  { size: 480, left: "65%", top: "10%", hue: "rgba(226,196,110,0.14)", dx: -80, dy: 70, duration: 18, delay: 1.5 },
  { size: 320, left: "45%", top: "70%", hue: "rgba(201,168,76,0.16)", dx: 90, dy: -50, duration: 16, delay: 3 },
  { size: 260, left: "85%", top: "60%", hue: "rgba(226,196,110,0.10)", dx: -50, dy: -70, duration: 20, delay: 0.8 },
];

export function AmbientOrbs() {
  const orbs = typeof window !== "undefined" && window.innerWidth < 768 ? ORBS.slice(0, 2) : ORBS;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.size,
            height: o.size,
            left: o.left,
            top: o.top,
            background: `radial-gradient(circle at 30% 30%, ${o.hue} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, o.dx, -o.dx * 0.6, o.dx * 0.4, 0],
            y: [0, o.dy, o.dy * 0.4, -o.dy * 0.6, 0],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
