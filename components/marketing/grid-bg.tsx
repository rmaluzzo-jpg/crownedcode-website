export function GridBg({ size = 60 }: { size?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
        maskImage:
          "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
      }}
    />
  );
}
