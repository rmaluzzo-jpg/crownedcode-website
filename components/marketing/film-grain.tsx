/**
 * Global cinematic overlay: SVG noise grain + radial vignette.
 * Server component — no JS, pure CSS/SVG. ~2kb total.
 */
export function FilmGrain() {
  return (
    <>
      {/* SVG noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[55] mix-blend-overlay"
        style={{
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            `<svg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'>
              <filter id='n'>
                <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
                <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.85 0'/>
              </filter>
              <rect width='100%' height='100%' filter='url(#n)'/>
            </svg>`,
          )}")`,
          backgroundSize: "240px 240px",
        }}
      />
      {/* radial vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[54]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </>
  );
}
