import type { Metadata } from "next";
import { Reveal, RevealStagger, RevealItem } from "@/components/marketing/reveal";
import { TiltCard } from "@/components/marketing/tilt-card";
import { LetterMaskReveal } from "@/components/marketing/letter-mask-reveal";
import { AmbientOrbs } from "@/components/marketing/ambient-orbs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Crowned Code is a two-founder custom software studio building serious systems for serious businesses.",
};

const founders = [
  {
    initials: "RA",
    name: "Richard Aluzzo",
    role: "Co-Founder",
    bio: "Operator-minded engineer. Ships software that businesses actually adopt — the difference between a demo and a deployment.",
  },
  {
    initials: "SM",
    name: "Steven Milano",
    role: "Co-Founder",
    bio: "Background spans accounting, operations, and engineering. Builds systems that handle the boring stuff so the team can do the work that matters.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative container-page pt-20 pb-12 text-center md:pt-28">
        <AmbientOrbs />
        <Reveal>
          <p className="glow-gold text-[12px] font-semibold uppercase tracking-[2px] text-gold">
            About
          </p>
        </Reveal>
        <h1 className="mx-auto mt-3 max-w-3xl text-balance text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em]">
          <LetterMaskReveal text="A two-founder studio" delay={0.05} />
          <br />
          <span className="glow-gold inline-block">
            <LetterMaskReveal text="that ships." delay={0.35} gradient />
          </span>
        </h1>
        <Reveal delay={0.7}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-[17px] leading-[1.7] text-text-secondary">
            Crowned Code is an independent software studio. We take on the
            projects we&apos;re uniquely good at, ship them properly, and move on
            to the next. No long benches, no junior layers, no surprise
            invoices.
          </p>
        </Reveal>
      </section>

      <section className="container-page py-20">
        <RevealStagger className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {founders.map((f) => (
            <RevealItem key={f.name}>
              <TiltCard className="p-9 text-center">
                <div className="bloom-gold mx-auto mb-5 flex size-20 items-center justify-center rounded-full border-2 border-gold/30 bg-gradient-to-br from-gold-dim to-transparent text-[26px] font-bold tracking-tight text-gold">
                  {f.initials}
                </div>
                <h2 className="text-[20px] font-bold tracking-tight">{f.name}</h2>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[1.5px] text-gold">
                  {f.role}
                </p>
                <p className="mt-4 text-[14px] leading-[1.7] text-text-secondary">
                  {f.bio}
                </p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="container-page py-20">
          <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
            <Reveal>
              <div>
                <p className="glow-gold text-[12px] font-semibold uppercase tracking-[2px] text-gold">
                  How we work
                </p>
                <h2 className="mt-3 text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold leading-[1.15] tracking-[-0.02em]">
                  Small team, full ownership.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-[15px] leading-[1.75] text-text-secondary">
                <p>
                  Every project we take on is staffed by founders who write the
                  code, talk to the stakeholders, and own the outcome. No
                  hand-offs between sales and delivery, no junior teams running
                  your engagement.
                </p>
                <p>
                  We work in short, demoable cycles, write code you can read,
                  and hand off everything we build — code, accounts,
                  documentation — with the intention that you don&apos;t need us
                  forever.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
