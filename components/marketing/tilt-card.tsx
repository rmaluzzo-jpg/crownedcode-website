"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const glowX = useMotionTemplate`${useMotionValue(50)}%`;
  const glowY = useMotionTemplate`${useMotionValue(50)}%`;

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    rotX.set((0.5 - y) * 8);
    rotY.set((x - 0.5) * 8);
    el.style.setProperty("--glow-x", `${x * 100}%`);
    el.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={cn(
        "group relative rounded-2xl border border-border bg-card transition-colors duration-300",
        "hover:border-gold/30",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-300 before:content-['']",
        "hover:before:opacity-100",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(201,168,76,0.08), transparent 45%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
      <div style={{ transform: "translateZ(20px)" }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}
