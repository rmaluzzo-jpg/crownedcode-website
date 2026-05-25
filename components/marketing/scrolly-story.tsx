"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StoryStep = {
  number: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
};

/**
 * Sticky scroll-driven story section.
 * The section pins to viewport for `steps.length * vhPerStep` of scroll,
 * and each step fades / slides in & out based on scroll progress.
 *
 * Use for narrative sections — "How we work", a 4-step process, etc.
 */
export function ScrollyStory({
  steps,
  vhPerStep = 90,
  eyebrow,
  heading,
}: {
  steps: StoryStep[];
  vhPerStep?: number;
  eyebrow?: string;
  heading?: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
        <div className="mt-14 space-y-12">
          {steps.map((s) => (
            <article key={s.number} className="rounded-2xl border border-border bg-card p-9">
              <div className="text-[13px] font-semibold tracking-widest text-gold">{s.number}</div>
              <h3 className="mt-4 text-[24px] font-bold">{s.title}</h3>
              <p className="mt-3 text-text-secondary">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${steps.length * vhPerStep + 50}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* ambient backdrop that shifts subtly per step */}
        <BackdropPulse progress={scrollYProgress} stepCount={steps.length} />

        <div className="container-page relative w-full pt-20">
          {(eyebrow || heading) && (
            <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
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

          <div className="relative mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_2fr]">
            {/* progress rail */}
            <ProgressRail
              progress={scrollYProgress}
              steps={steps}
            />

            {/* stacked step content */}
            <div className="relative min-h-[280px] md:min-h-[340px]">
              {steps.map((step, i) => (
                <StepPanel
                  key={step.number}
                  step={step}
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepPanel({
  step,
  index,
  total,
  progress,
}: {
  step: StoryStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // each step occupies 1/total of the scroll. Add a small fade overlap.
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const fadeIn = 0.15 * segment;
  const fadeOut = 0.15 * segment;

  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - fadeIn),
      start + fadeIn,
      end - fadeOut,
      Math.min(1, end + fadeOut),
    ],
    index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [Math.max(0, start - fadeIn), start + fadeIn, end - fadeOut, Math.min(1, end + fadeOut)],
    index === total - 1 ? [40, 0, 0, 0] : [40, 0, 0, -40],
  );

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="text-[12px] font-semibold uppercase tracking-[2px] text-gold-light">
        {step.eyebrow}
      </div>
      <h3 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.025em]">
        {step.title}
      </h3>
      <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-text-secondary">
        {step.body}
      </p>
    </motion.article>
  );
}

function ProgressRail({
  progress,
  steps,
}: {
  progress: MotionValue<number>;
  steps: StoryStep[];
}) {
  return (
    <div className="hidden md:block">
      <div className="relative">
        {/* track */}
        <div className="absolute left-3 top-0 h-full w-px bg-border" />
        {/* fill */}
        <motion.div
          style={{ scaleY: progress, transformOrigin: "top" }}
          className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-gold via-gold-light to-gold"
        />
        <ul className="space-y-10">
          {steps.map((s, i) => (
            <RailDot
              key={s.number}
              step={s}
              index={i}
              total={steps.length}
              progress={progress}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function RailDot({
  step,
  index,
  total,
  progress,
}: {
  step: StoryStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const lo = Math.max(0, start - 0.05);
  const hi = Math.min(1, start + 0.05);
  const range: [number, number] = lo === hi ? [lo, Math.min(1, lo + 0.001)] : [lo, hi];
  const dotOpacity = useTransform(progress, range, [0.35, 1]);
  const dotScale = useTransform(progress, range, [1, 1.35]);
  return (
    <li className="relative pl-10">
      <motion.span
        style={{ opacity: dotOpacity, scale: dotScale }}
        className="absolute left-1.5 top-1 size-3 rounded-full border-2 border-gold bg-bg"
      />
      <div className="text-[11px] font-semibold uppercase tracking-[2px] text-text-muted">
        {step.number}
      </div>
      <div className="mt-1 text-[14px] font-medium text-text-primary">
        {step.eyebrow}
      </div>
    </li>
  );
}

function BackdropPulse({
  progress,
  stepCount,
}: {
  progress: MotionValue<number>;
  stepCount: number;
}) {
  const x = useTransform(
    progress,
    [0, 0.5, 1],
    ["20%", "60%", "30%"],
  );
  const y = useTransform(
    progress,
    [0, 0.5, 1],
    ["30%", "70%", "40%"],
  );
  const bg = useTransform([x, y], ([X, Y]) =>
    `radial-gradient(ellipse 55% 45% at ${X} ${Y}, rgba(201,168,76,0.14) 0%, transparent 60%)`,
  );
  // referenced to satisfy lint
  void stepCount;
  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none absolute inset-0"
    />
  );
}

export function buildSteps(steps: StoryStep[]) {
  return steps;
}
