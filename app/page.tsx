import { ArrowRight, Brain, Wrench, Workflow, Database, Smartphone, Sparkles } from "lucide-react";
import { AmbientOrbs } from "@/components/marketing/ambient-orbs";
import { AnimatedGrid } from "@/components/marketing/animated-grid";
import { ShimmerText } from "@/components/marketing/shimmer-text";
import { LetterMaskReveal } from "@/components/marketing/letter-mask-reveal";
import { Reveal } from "@/components/marketing/reveal";
import { MagneticButton } from "@/components/marketing/magnetic-button";
import { Marquee } from "@/components/marketing/marquee";
import { ScaleReveal } from "@/components/marketing/scale-reveal";
import { ScrollyStory } from "@/components/marketing/scrolly-story";
import { StackingCards } from "@/components/marketing/stacking-cards";
import { Hero3D } from "@/components/marketing/hero-3d";
import { CinematicBackground } from "@/components/marketing/cinematic-background";
import { ScrollVideo } from "@/components/marketing/scroll-video";

export default function HomePage() {
  return (
    <>
      {/* Persistent fixed-canvas crown rides the full page scroll, swinging L↔R between sections */}
      <Hero3D persistent />
      <Hero />
      <CapabilityMarquee />
      <Statement />
      <HowWeWork />
      <CapabilityStack />
      <ClosingCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden px-6 pt-24 pb-32 md:px-15 md:pt-32 md:pb-40">
      {/* Crown lives at the page root now — hero only needs ambient layers + (optional) video */}
      <CinematicBackground
        src={undefined /* set to "/cinematic/hero-loop.mp4" once produced */}
        poster="/cinematic/hero-poster.jpg"
      />
      <AmbientOrbs />
      <AnimatedGrid />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="bloom-gold mb-9 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-dim/80 px-4 py-1.5 text-[13px] font-medium tracking-wide text-gold-light backdrop-blur-md">
            <span className="cc-pulse-dot size-1.5 rounded-full bg-gold" />
            B2B Custom Software Studio
          </div>
        </Reveal>

        <h1 className="text-balance text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[1.03] tracking-[-0.025em]">
          <LetterMaskReveal text="Custom software for" />
          <br />
          <span className="glow-gold cc-float inline-block">
            <LetterMaskReveal
              text="serious businesses."
              delay={0.4}
              gradient
            />
          </span>
        </h1>

        <Reveal delay={1.4}>
          <p className="mx-auto mt-7 max-w-xl text-balance text-[17px] leading-[1.7] text-text-secondary">
            We design and build the software your business needs to operate
            faster, sell smarter, and ship without limits. AI integration,
            internal tools, and systems built to last.
          </p>
        </Reveal>

        <Reveal delay={1.55}>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <MagneticButton href="/services/ai-integration" variant="primary">
              Start with AI Integration
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href="/contact" variant="secondary">
              Talk to us
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      <Reveal delay={1.7}>
        <div className="relative mt-20 flex items-center justify-center gap-6 text-[11px] uppercase tracking-[2px] text-text-muted">
          <span className="flex items-center gap-2">
            <span className="cc-pulse-dot size-1.5 rounded-full bg-gold" />
            Currently shipping
          </span>
          <span className="hidden h-px w-12 bg-border md:inline-block" />
          <span className="hidden md:inline-flex items-center gap-2">
            Booking projects · Q3 2026
          </span>
        </div>
      </Reveal>
    </section>
  );
}

function CapabilityMarquee() {
  const items = [
    "AI Integration",
    "Internal Tools",
    "Custom Software",
    "Workflow Automation",
    "Systems Integration",
    "iOS & Apple Ecosystem",
    "Document Automation",
    "Agent Workflows",
  ];
  return (
    <section className="border-y border-border bg-surface/80 backdrop-blur-sm">
      <Marquee items={items} />
    </section>
  );
}

function Statement() {
  return (
    <section className="relative px-6 py-32 md:px-15 md:py-44">
      <ScaleReveal className="mx-auto max-w-5xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[2px] text-gold">
          The promise
        </p>
        <h2 className="mt-4 text-balance text-[clamp(2.25rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">
          Software that{" "}
          <ShimmerText>does the work</ShimmerText>
          {" "}so your business{" "}
          <ShimmerText>does more.</ShimmerText>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-balance text-[17px] leading-[1.7] text-text-secondary">
          No demos that die in the lab. No platforms you can&apos;t leave. Just
          the working software your business has been waiting for someone to
          build properly.
        </p>
      </ScaleReveal>
    </section>
  );
}

function HowWeWork() {
  const steps = [
    {
      number: "Step 01",
      eyebrow: "Discovery",
      title: "We start with the business, not the stack.",
      body: (
        <>
          Every engagement opens with a working session where we map the real
          problem — what&apos;s broken, what&apos;s slow, what&apos;s costing
          you. Tech choices come after.
        </>
      ),
    },
    {
      number: "Step 02",
      eyebrow: "Scope",
      title: "We write down the number we're moving.",
      body: (
        <>
          Before a single line of code, we agree on a measurable target —
          response time, conversion, cost per transaction. If we can&apos;t
          measure success, we&apos;ll tell you.
        </>
      ),
    },
    {
      number: "Step 03",
      eyebrow: "Build",
      title: "We ship working software, weekly.",
      body: (
        <>
          Weekly demos. Deployable artifacts every sprint. You see progress in
          your hands — not in status reports.
        </>
      ),
    },
    {
      number: "Step 04",
      eyebrow: "Handoff",
      title: "We hand off, we don't hand-cuff.",
      body: (
        <>
          You own the code, the cloud accounts, the data. We document
          everything, train your team, and design for the day you don&apos;t
          need us.
        </>
      ),
    },
  ];

  const fallback = (
    <ScrollyStory
      eyebrow="How we work"
      heading={
        <>
          Built like <ShimmerText>operators,</ShimmerText> not contractors.
        </>
      }
      steps={steps}
    />
  );

  // Once user produces /cinematic/how-we-work.mp4, set the src prop below.
  return (
    <ScrollVideo
      src={undefined}
      approxDuration={8}
      overlay={
        <div className="container-page text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[2px] text-gold">
            How we work
          </p>
          <h2 className="mt-3 text-balance text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">
            Built like <ShimmerText>operators,</ShimmerText> not contractors.
          </h2>
        </div>
      }
    >
      {fallback}
    </ScrollVideo>
  );
}

function CapabilityStack() {
  const cards = [
    {
      id: "ai",
      icon: <Brain className="size-7" />,
      title: "AI Integration",
      body: "RAG over your documents, internal copilots, agent workflows, document automation. Embedded into systems your team already uses — not yet another tab to open.",
    },
    {
      id: "internal",
      icon: <Wrench className="size-7" />,
      title: "Internal Tools",
      body: "Replace the spreadsheets, Airtables, and brittle scripts your team is duct-taping together. Custom dashboards, admin tools, and ops software designed around how your team actually works.",
    },
    {
      id: "automation",
      icon: <Workflow className="size-7" />,
      title: "Workflow Automation",
      body: "End-to-end flows that connect your CRM, ERP, email, payments, and everything in between. Built to be debuggable, observable, and operable — not magical.",
    },
    {
      id: "integration",
      icon: <Database className="size-7" />,
      title: "Systems Integration",
      body: "Two systems that should talk and don't? We build the connective tissue — APIs, ETL pipelines, webhook handlers, data sync layers — so your stack actually stacks.",
    },
    {
      id: "ios",
      icon: <Smartphone className="size-7" />,
      title: "iOS & Apple Ecosystem",
      body: "Native Swift, App Store-ready iOS apps, Mac apps, and tight integrations with the Apple ecosystem your customers and team already live in.",
    },
    {
      id: "anything",
      icon: <Sparkles className="size-7" />,
      title: "Anything else.",
      body: "The category your problem doesn't fit in. If it ships as software and runs on a computer, we'll scope it. Start with a conversation — we'll tell you straight whether we're the right fit.",
    },
  ];
  return (
    <section className="border-t border-border bg-surface/80 backdrop-blur-sm">
      <StackingCards
        eyebrow="What we build"
        heading={<>Six shapes of work, <ShimmerText>one studio.</ShimmerText></>}
        cards={cards}
      />
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <AnimatedGrid size={80} />
      <div className="container-page relative py-24 text-center md:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.03em]">
            Have a project that&apos;s been waiting too long?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-md text-text-secondary">
            One conversation. No pitch deck. We&apos;ll tell you straight if we
            can help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex justify-center">
            <MagneticButton href="/contact" variant="primary">
              Book a call <ArrowRight className="size-4" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
