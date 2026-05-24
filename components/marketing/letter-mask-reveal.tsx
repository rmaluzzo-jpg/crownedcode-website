"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  gradient?: boolean;
  /** Reveal direction — top-down by default. */
  from?: "top" | "bottom" | "left";
};

/**
 * Cinematic text reveal: a clip-path window sweeps open to reveal text
 * with an optional gold gradient + shimmer. Slower, more deliberate than
 * the per-word stagger of WordReveal.
 */
export function LetterMaskReveal({
  text,
  className,
  delay = 0,
  gradient = false,
  from = "top",
}: Props) {
  const reduce = useReducedMotion();

  const initialClip =
    from === "top"
      ? "inset(0 0 100% 0)"
      : from === "bottom"
        ? "inset(100% 0 0 0)"
        : "inset(0 100% 0 0)";

  const animateClip = "inset(0 0 0 0)";

  const inner = gradient ? (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(110deg, #c9a84c 0%, #e2c46e 25%, #fff5cf 50%, #e2c46e 75%, #c9a84c 100%)",
        backgroundSize: "200% 100%",
        animation: "cc-shimmer 6s linear infinite",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
      }}
    >
      {text}
    </span>
  ) : (
    text
  );

  if (reduce) {
    return <span className={cn("inline-block", className)}>{inner}</span>;
  }

  return (
    <span className={cn("relative inline-block align-baseline", className)}>
      {/* invisible sizer so layout is reserved */}
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <motion.span
        aria-label={text}
        className="absolute inset-0"
        initial={{ clipPath: initialClip }}
        animate={{ clipPath: animateClip }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        {inner}
      </motion.span>
    </span>
  );
}
