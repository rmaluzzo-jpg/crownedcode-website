"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

export function Marquee({
  items,
  speed = 35,
}: {
  items: string[];
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const set = (
    <div className="flex shrink-0 items-center gap-12 px-6">
      {items.map((i) => (
        <Fragment key={i}>
          <span className="text-[15px] font-medium text-text-secondary">{i}</span>
          <span className="size-1 rounded-full bg-gold/60" aria-hidden />
        </Fragment>
      ))}
    </div>
  );

  if (reduce) {
    return (
      <div className="relative overflow-hidden py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((i) => (
            <span key={i} className="text-[15px] font-medium text-text-secondary">
              {i}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {set}
        {set}
      </motion.div>
    </div>
  );
}
