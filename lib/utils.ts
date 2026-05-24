import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "Crowned Code",
  url: "https://crownedcode.com",
  description:
    "Custom software for serious businesses. AI integration, internal tools, and systems built to scale.",
  email: "team@crownedcode.com",
} as const;
