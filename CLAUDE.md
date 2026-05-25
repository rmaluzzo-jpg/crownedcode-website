# Claude project notes — crownedcode-website

This file is read by Claude Code (or Claude in any other tool that respects `CLAUDE.md`) at the start of every conversation in this repo. Whichever of us (Steven or Rich) is working, both of our Claude sessions see the same instructions.

## Who works here

Two founders — **Steven Milano** and **Richard Aluzzo**. Either of us may be the one running Claude at any given moment. Asynchronous git-based collaboration; no real-time pairing. Don't assume which of us is in the chat — ask if it matters for context.

## The `plans/` directory is how we share roadmap

We pass design docs and roadmap intent back and forth through `plans/`, not Slack / docs / DMs. Treat it as the canonical source of "what are we building and why."

**Convention** (also documented in `plans/README.md`):

- One plan per file, named `YYYY-MM-<short-slug>.md` (date-prefix gives chronological order).
- First line is always a `Status:` field — `active`, `completed`, `shelved`, or `superseded-by: <other-file>`.
- Plans are **intent + design**, not status updates. Day-to-day progress belongs in commit messages or the in-conversation task list.
- Plans evolve as we learn — edit freely, commit the change.

## How Claude should interact with `plans/`

When the user asks you to plan something substantial:

1. **Check `plans/` first** — if an existing active or related plan covers it, propose updating that file rather than starting a new one.
2. **When drafting a new plan**, use the filename convention above and put it in `plans/`. Don't write plans to scratch locations.
3. **Don't mark a plan `completed` on your own** — wait for explicit user confirmation, since "done" is a judgment call.
4. **When executing on a plan**, reference it in commit messages where useful (`plan: 2026-05-cinematic-home — wire HowWeWork through ScrollVideo`).
5. **Don't dump implementation detail into plans after the fact.** Plans capture the decision; the code is the implementation. A plan getting longer over time is a smell.

If the user is doing exploratory thinking and isn't ready for a structured plan, don't force one — keep the conversation in-chat until intent crystallizes.

## Other project context

- Live at https://crownedcode.com (Vercel hosting, Neon Postgres, Resend email, PostHog + Vercel Analytics).
- Stack: Next.js 16 (App Router) + Tailwind v4 + Motion + react-three-fiber.
- The original umbrella repo `CLAUDE.md` at `../CLAUDE.md` covers SSH/account setup. Don't duplicate that here.
- Cinematic asset slots live in `public/cinematic/` — see that directory's README for encoding standards if asked to add a hero video or update the crown model.
- `.env.local` is gitignored and holds local-only secrets (DB URL, Resend key, PostHog key). Mirror these into Vercel's environment variables for production.
