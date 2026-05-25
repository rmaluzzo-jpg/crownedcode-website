import type { Metadata } from "next";
import { ArrowRight, Sparkles, FileSearch, Bot, Wand2 } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";
import { TiltCard } from "@/components/marketing/tilt-card";
import { MagneticButton } from "@/components/marketing/magnetic-button";
import { AuroraSpotlight } from "@/components/marketing/aurora-spotlight";
import { LetterMaskReveal } from "@/components/marketing/letter-mask-reveal";

export const metadata: Metadata = {
  title: "AI Integration for Businesses",
  description:
    "We integrate AI into the systems your business already runs on — internal copilots, RAG over your docs, agent workflows, and document automation. Built to be measurable, not magical.",
};

const workloads = [
  {
    icon: FileSearch,
    title: "RAG over your knowledge",
    body: "Your SOPs, contracts, manuals, ticket history — searchable and conversational. Your team gets answers grounded in your actual documents, not a public model's guesses.",
  },
  {
    icon: Bot,
    title: "Agent workflows",
    body: "Multi-step automations that read, decide, and act across your tools. Lead qualification, ticket triage, report generation, follow-up drafting.",
  },
  {
    icon: Sparkles,
    title: "Internal copilots",
    body: "Domain-specific AI assistants embedded into the software your team already uses. The opposite of \"open ChatGPT and copy-paste.\"",
  },
  {
    icon: Wand2,
    title: "Document automation",
    body: "Extract, classify, and route the paper your business runs on — invoices, POs, applications, contracts. Pipe the structured output straight into your systems.",
  },
];

const principles = [
  {
    n: "01",
    h: "We measure outcomes, not tokens.",
    p: "Every engagement opens with a measurable target — time saved per ticket, response time, lift on a specific KPI. If we can't measure it, we don't build it.",
  },
  {
    n: "02",
    h: "We pick the right model, not the loudest one.",
    p: "Multi-provider routing through AI Gateway means you get the best price/performance for each workload — not a single-vendor lock-in.",
  },
  {
    n: "03",
    h: "We build for the day after launch.",
    p: "Eval suites, prompt versioning, fallback behavior, cost dashboards. The systems we ship survive model upgrades and adversarial users.",
  },
];

export default function AIIntegrationPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pt-20 pb-20 md:px-15 md:pt-28 md:pb-24">
        <AuroraSpotlight />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="glow-gold text-[12px] font-semibold uppercase tracking-[2px] text-gold">
              AI Integration
            </p>
          </Reveal>
          <h1 className="mt-3 text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            <LetterMaskReveal text="AI that actually" delay={0.05} />
            <br />
            <span className="glow-gold inline-block">
              <LetterMaskReveal text="does the work." delay={0.35} gradient />
            </span>
          </h1>
          <Reveal delay={0.7}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-[1.7] text-text-secondary">
              We don&apos;t hand you a chatbot and call it transformation. We
              integrate AI into your real workflows, measure what changes, and
              ship something your team uses on Monday morning.
            </p>
          </Reveal>
          <Reveal delay={0.75}>
            <div className="mt-10 flex justify-center">
              <MagneticButton href="/contact" variant="primary">
                Scope a project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="glow-gold text-[12px] font-semibold uppercase tracking-[2px] text-gold">
              What we build
            </p>
            <h2 className="mt-3 text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.025em]">
              Four shapes of work we ship constantly.
            </h2>
          </div>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-5 md:grid-cols-2">
          {workloads.map((w) => {
            const Icon = w.icon;
            return (
              <RevealItem key={w.title}>
                <TiltCard className="h-full p-9">
                  <div className="bloom-gold mb-5 flex size-11 items-center justify-center rounded-xl bg-gold-dim text-gold">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-[18px] font-bold tracking-tight">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-text-secondary">
                    {w.body}
                  </p>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="glow-gold text-[12px] font-semibold uppercase tracking-[2px] text-gold">
                How we think about it
              </p>
              <h2 className="mt-3 text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.025em]">
                Engineering principles, not prompt tricks.
              </h2>
            </div>
          </Reveal>

          <RevealStagger className="mt-12 grid gap-5 md:grid-cols-3">
            {principles.map((p) => (
              <RevealItem key={p.n}>
                <TiltCard className="h-full p-8">
                  <div className="mb-4 text-[13px] font-semibold tracking-widest text-gold">
                    {p.n}
                  </div>
                  <h3 className="text-[17px] font-bold leading-snug tracking-tight">
                    {p.h}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-text-secondary">
                    {p.p}
                  </p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container-page py-24 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
              Tell us where AI should be doing the work.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-md text-text-secondary">
              One call. We&apos;ll tell you what&apos;s realistic, what
              isn&apos;t, and what we&apos;d build first.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/contact" variant="primary">
                Book a call <ArrowRight className="size-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
