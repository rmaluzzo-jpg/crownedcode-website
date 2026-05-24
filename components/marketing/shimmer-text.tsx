"use client";

import { cn } from "@/lib/utils";

/**
 * Gold gradient text with a constantly running shimmer sweep.
 * Animates entirely in CSS for performance.
 */
export function ShimmerText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-block bg-clip-text text-transparent",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #c9a84c 0%, #e2c46e 25%, #fff5cf 50%, #e2c46e 75%, #c9a84c 100%)",
        backgroundSize: "200% 100%",
        animation: "cc-shimmer 6s linear infinite",
      }}
    >
      {children}
    </span>
  );
}
