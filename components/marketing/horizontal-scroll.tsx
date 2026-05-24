"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Pins a section while vertical scroll translates a horizontal strip.
 * Effective for "browse our capabilities" / "case study reel" style layouts.
 */
export function HorizontalScroll({
  children,
  panelCount,
  eyebrow,
  heading,
}: {
  children: ReactNode;
  panelCount: number;
  eyebrow?: string;
  heading?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Move horizontally by (panelCount - 1) panel widths.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((panelCount - 1) / panelCount) * 100}%`],
  );

  if (reduce) {
    return (
      <section className="container-page py-24">
        {eyebrow && (
          <p className="text-[12px] font-semibold uppercase tracking-[2px] text-gold">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="mt-3 text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            {heading}
          </h2>
        )}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{children}</div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${panelCount * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {(eyebrow || heading) && (
          <div className="container-page mb-10 text-center">
            {eyebrow && (
              <p className="text-[12px] font-semibold uppercase tracking-[2px] text-gold">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="mt-3 text-balance text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
                {heading}
              </h2>
            )}
          </div>
        )}
        <motion.div
          style={{ x, width: `${panelCount * 100}%` }}
          className="flex"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function HScrollPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-screen shrink-0 items-center justify-center px-6 md:px-15">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
