"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Words to render in gold highlight style. Matched case-insensitively against whole-word tokens. */
  highlight?: string[];
};

export function WordReveal({
  text,
  className,
  delay = 0,
  highlight = [],
}: WordRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const highlightSet = new Set(highlight.map((h) => h.toLowerCase()));

  return (
    <span
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isHL = highlightSet.has(word.toLowerCase().replace(/[.,!?]$/, ""));
        const Word = (
          <span
            className={cn(
              "inline-block",
              isHL && "bg-clip-text text-transparent",
            )}
            style={
              isHL
                ? {
                    backgroundImage:
                      "linear-gradient(135deg, #c9a84c 0%, #e2c46e 50%, #c9a84c 100%)",
                  }
                : undefined
            }
          >
            {word}
          </span>
        );
        return (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            {reduce ? (
              <span className="inline-block">{Word}</span>
            ) : (
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: delay + i * 0.065,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {Word}
              </motion.span>
            )}
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}
