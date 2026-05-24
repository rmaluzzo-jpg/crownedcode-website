# Cinematic assets

This directory holds the cinematic media used on `/`. Components auto-detect what's here and swap from code fallbacks to real assets.

## Drop-in slots

| Filename | Used by | What it is |
|---|---|---|
| `crown.glb` *(preferred)* | `Hero3D` in `app/page.tsx` | Stylized 3D crown model, gold PBR material. |
| `crown.stl` *(alternate)* | `Hero3D` | Same as above but geometry-only — gold material applied in code. |
| `hero-loop.mp4` | `CinematicBackground` (hero) | Seamless looping atmospheric clip behind hero text. |
| `hero-loop.webm` *(optional)* | `CinematicBackground` | Smaller WebM sibling for browsers that support it. |
| `hero-poster.jpg` *(optional)* | `CinematicBackground` | First-frame poster; shown before video loads + for reduced-motion users. |
| `how-we-work.mp4` | `ScrollVideo` wrapping `HowWeWork` section | 4-beat scrubbed sequence matching Discovery → Scope → Build → Handoff. |

Anything missing → component renders its code-only fallback. Nothing breaks if the folder is empty.

## Encoding standards

### 3D crown

- Format: **GLB** (preferred; web-standard compressed GLTF with materials embedded) or **STL** (geometry only).
- Style: low-poly / stylized, **not** photoreal. Matches brand, stays fast.
- Material (GLB only): gold PBR — `metalness ≈ 0.9`, `roughness ≈ 0.2`. Base color `#c9a84c`.
- Size budget: **GLB ≤ 200 KB ideal**, ≤ 500 KB acceptable. **STL ≤ 1 MB**.
- Origin: model centered at world origin; `Hero3D` auto-centers + scales STL.
- Reference: existing 2D crown silhouette in `legacy/index.html`, lines 682–684.

### Cinematic videos

| Property | Value |
|---|---|
| Container | MP4 (H.264) — primary. WebM (VP9) optional sibling. |
| Resolution | 1920×1080 max. |
| Framerate | 24–30 fps. |
| Bitrate | VBR ~3 Mbps target. |
| Audio | **None.** No audio track at all — saves bytes, no muted-autoplay edge cases. |
| Color | Dark on dark, gold accents. Avoid bright whites that conflict with film-grain overlay. |
| Sizes | Hero loop ≤ 1.5 MB. Scroll-scrub videos ≤ 4 MB. |

### Hero loop specifics

- Length 8–12 seconds.
- **First and last frame must be identical** for seamless looping.
- Subject suggestions: drifting gold particles in deep space, abstract liquid-gold flow, slow rotation of stylized crown.

### Scroll-scrub video specifics

- `how-we-work.mp4`: 6–10 seconds, structured as 4 visual beats matching the four steps in the existing `ScrollyStory` data.
- Should read well at any single frame (since scrub means the user can stop on any frame).

## How to swap an asset in

1. Produce the file per the specs above.
2. Drop it into this directory using the exact filename from the table.
3. Refresh the dev server / redeploy. Components pick it up automatically — **no code changes**.

## Production workflow reference

Per the source tutorial: GPT Image 2 → cinematic stills, ElevenLabs Seedance 2.0 → animate stills into clips, Canva → merge / trim, drop the final mp4 here. Spline for the 3D crown (web-based, GLB export). Blender works too.
