"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type Card = {
  id: string;
  icon: ReactNode;
  title: string;
  body: string;
};

/**
 * Sticky stacking cards — each card pins as you scroll, and the next card
 * stacks on top with a slight scale-down on the card behind.
 */
export function StackingCards({
  cards,
  eyebrow,
  heading,
}: {
  cards: Card[];
  eyebrow?: string;
  heading?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="container-page py-24">
        {eyebrow && (
          <p className="text-center text-[12px] font-semibold uppercase tracking-[2px] text-gold">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            {heading}
          </h2>
        )}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cards.map((c) => (
            <article key={c.id} className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 text-gold">{c.icon}</div>
              <h3 className="text-[20px] font-bold">{c.title}</h3>
              <p className="mt-2 text-text-secondary">{c.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="container-page py-24">
      {(eyebrow || heading) && (
        <div className="mx-auto mb-16 max-w-2xl text-center">
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

      <div className="relative mx-auto max-w-4xl">
        {cards.map((c, i) => (
          <StackCard key={c.id} card={c} index={i} total={cards.length} />
        ))}
      </div>
    </section>
  );
}

function StackCard({
  card,
  index,
  total,
}: {
  card: Card;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scale & opacity tail-down as the next card stacks over this one.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.04]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.4]);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${80 + index * 24}px`, marginBottom: "8vh" }}
    >
      <motion.article
        style={{ scale, opacity }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-12"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.20) 0%, transparent 70%)",
          }}
        />
        <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-gold-dim text-gold">
            {card.icon}
          </div>
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-text-muted">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
            <h3 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em]">
              {card.title}
            </h3>
            <p className="mt-4 text-[16px] leading-[1.7] text-text-secondary">
              {card.body}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
