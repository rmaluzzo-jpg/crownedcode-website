"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("./hero-3d-scene"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

type Props = {
  className?: string;
  /**
   * If true, mounts as a fixed-position page-wide overlay so the crown
   * persists across all scroll positions. Used for the home-page hero+story.
   */
  persistent?: boolean;
};

export function Hero3D({ className, persistent = false }: Props) {
  return (
    <div
      className={cn(
        persistent
          ? "pointer-events-none fixed inset-0 -z-10 motion-reduce:hidden"
          : "pointer-events-none absolute inset-0 -z-10 motion-reduce:hidden",
        className,
      )}
    >
      <Scene />
    </div>
  );
}

function StaticFallback() {
  return (
    <div
      className="size-full"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.18) 0%, transparent 60%)",
      }}
    />
  );
}
