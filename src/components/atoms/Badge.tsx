import type { ReactNode } from "react";

export type BadgeVariant = "cyan" | "muted" | "amber";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "cyan" }: BadgeProps) {
  return (
    <span className={`badge badge--${variant} text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full`}>
      {children}
    </span>
  );
}
