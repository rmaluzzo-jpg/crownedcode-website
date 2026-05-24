"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[15px] font-semibold transition-shadow";
  const styles =
    variant === "primary"
      ? "bg-gold text-black hover:shadow-[0_8px_28px_rgba(201,168,76,0.35)]"
      : "border border-border bg-transparent text-text-primary hover:border-border-strong hover:bg-white/[0.04]";

  return (
    <motion.span
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <Link ref={ref} href={href} className={cn(base, styles, className)}>
        {children}
      </Link>
    </motion.span>
  );
}
