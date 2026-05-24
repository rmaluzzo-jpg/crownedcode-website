import { cn } from "@/lib/utils";

export function CrownIcon({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        "size-7 text-gold",
        animated && "cc-crown-anim",
        className,
      )}
    >
      <path d="M2 22h28M5 22l2.5-10 5.5 5.5L16 8l3 9.5 5.5-5.5L27 22" />
    </svg>
  );
}
