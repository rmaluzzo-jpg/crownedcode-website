Status: completed (shipped 2026-05-25, live on https://crownedcode.com)

# Cinematic home page upgrade

## Context

The home page (`app/page.tsx`) was built and had good motion — ambient orbs, scroll-driven sticky `ScrollyStory`, stacking cards, magnetic buttons, shimmer text. User reaction: *good, not cinematic.* Reference: AI-generated cinematic videos used as scroll-driven backgrounds (Apple-AirPods-Pro pattern, but with AI-gen footage).

This subtask upgraded `/` to feel like a $10k brand site without rewriting the existing components. Everything was layered on top. Other pages (`/services`, `/about`, `/blog`, `/contact`) were out of scope for this pass.

## What we added

| # | Layer | What it does | Asset needed | Status |
|---|---|---|---|---|
| 1 | **Lenis smooth scroll** | Site-wide momentum scroll. Single biggest "filmic" upgrade per kb. | none | ✓ |
| 2 | **Film grain + vignette overlay** | Global SVG noise (~3% opacity) + radial vignette. Instant cinematic feel. | none | ✓ |
| 3 | **Bloom on gold elements** | CSS multi-layer `box-shadow` + `drop-shadow` glow utility. Lens-flare on gold. | none | ✓ |
| 4 | **3D hero centerpiece** | `react-three-fiber` scene — gold crown model loaded from `public/cinematic/crown.glb`, scroll-linked camera dolly. Dynamic-imported. Falls back to procedural shards if no GLB present. | `crown.glb` provided | ✓ |
| 5 | **Letter-mask hero text reveal** | Replaces `WordReveal` — clip-path sweep over gold gradient. Slower, more deliberate. | none | ✓ |
| 6 | **`<CinematicBackground>` slot** | Autoplay/muted/looping `<video>` with poster fallback for hero. Asset slot — falls back to `Hero3D` until video dropped. | optional mp4 | ✓ scaffold; mp4 pending |
| 7 | **`<ScrollVideo>` slot** | Wraps "How we work" section. Pinned video where scroll drives `video.currentTime` (Apple-style). Falls back to existing `ScrollyStory` when no video present. | optional mp4 | ✓ scaffold; mp4 pending |
| 8 | **Depth-of-field on stacking cards** | CSS `filter: blur()` on the card behind so it reads as a real camera focal plane. | none | (utility class shipped; not yet applied to StackingCards) |
| 9 | **View Transitions API** | Next.js 16 native, no deps. Crossfade between routes. | none | ✓ |
| 10 | **Persistent scroll-choreographed crown** *(added mid-build)* | Crown lives at the page root (fixed canvas), scroll progress drives X position keyframes — swings hero center → left at statement → right at "How we work" → back center for CTA. | none | ✓ |

## Critical files (as built)

**Components in `components/marketing/`:**
- `cinematic-background.tsx` — autoplay/muted/looping `<video>` with poster fallback. Respects `prefers-reduced-motion`.
- `scroll-video.tsx` — pins a video to viewport, drives `currentTime` from scroll. Children render as fallback when no `src`.
- `film-grain.tsx` — fixed SVG noise + radial vignette overlay. Mounted in `app/layout.tsx`.
- `hero-3d.tsx` — entry component, dynamic-imports the canvas.
- `hero-3d-scene.tsx` — the actual r3f scene. `ScrollDolly` drives X position keyframes against page scroll. Auto-loads `crown.glb` or `crown.stl` from `public/cinematic/`, else procedural shards.
- `letter-mask-reveal.tsx` — clip-path-swept gold gradient reveal.

**Provider in `components/providers/`:**
- `lenis-provider.tsx` — initializes Lenis + runs RAF loop. No-op under `prefers-reduced-motion`.

**Files modified:**
- `app/layout.tsx` — mounts `LenisProvider` and `FilmGrain` globally.
- `app/page.tsx` — renders `Hero3D persistent` at root level. Hero uses `LetterMaskReveal` + `CinematicBackground` (with `Hero3D` as fallback). `HowWeWork` wrapped in `ScrollVideo` (with `ScrollyStory` as fallback).
- `app/globals.css` — bloom + vignette + dof-blur utilities. Removed `scroll-behavior: smooth` (Lenis handles it). View Transitions default crossfade.
- `next.config.ts` — `experimental.viewTransition: true`.

**Dependencies added:** `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`. r3f stack dynamic-imported.

## Asset specs (still relevant for future asset drops)

**3D crown** (already provided):
- `.glb` format (web-standard compressed GLTF). `.stl` also supported.
- Low-poly / stylized, not photoreal.
- Material applied in code (gold PBR: metalness ~0.92, roughness ~0.2) — no need to bake in the source.
- ≤ 200 KB GLB ideal, ≤ 500 KB acceptable.
- Place at `public/cinematic/crown.glb`.
- Note: source GLBs over 1 MB should be compressed with `npx @gltf-transform/cli optimize source.glb opt.glb` first. The current `crown.glb` (353 KB) was compressed from a 27.5 MB source.

**Cinematic videos** (not yet produced):
- MP4 (H.264), optional WebM/VP9 sibling for smaller size.
- 1920×1080 max, 24–30 fps, VBR ~3 Mbps.
- **Muted** (no audio track at all).
- **Hero loop**: 8–12 s, **first and last frame must match** for seamless loop, ≤ 1.5 MB encoded.
- **"How we work" scrub**: 6–10 s with four visual beats matching Discovery → Scope → Build → Handoff.
- Place at `public/cinematic/hero-loop.mp4`, `public/cinematic/how-we-work.mp4`.
- See `public/cinematic/README.md` for full encoding standards.

## Performance guardrails (met)

- `Hero3D` and `ScrollVideo` are `next/dynamic` with `ssr: false`.
- `prefers-reduced-motion`: Lenis disabled, 3D swapped for static SVG, scroll videos swapped for poster.
- Video assets: `preload="metadata"` (hero loop allowed `preload="auto"` if ≤ 1.5 MB).

## Open items (not blockers, future passes)

- Produce hero loop mp4 + drop in `public/cinematic/hero-loop.mp4`.
- Produce "how we work" scroll-scrub mp4 + drop in `public/cinematic/how-we-work.mp4`.
- Apply `dof-blur-1` / `dof-blur-2` utility to `StackingCards` for camera focal-plane effect (utility shipped but not yet wired into the component).
- Mobile particle / postprocessing tuning after first real-device measurement.
- Carry cinematic treatment into `/services`, `/services/ai-integration`, `/about`, `/blog`.

## Verification (done)

- `npm run build` clean.
- Live at https://crownedcode.com (apex 307 → `www.crownedcode.com`, SSL via Let's Encrypt).
- Contact form end-to-end: form → Drizzle/Neon `leads` table + Resend → `team@crownedcode.com` (Rich's inbox). Verified with two test submissions.
- DNS: GoDaddy A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`. Resend TXT records (SPF + DKIM) added by GoDaddy ↔ Resend integration.
