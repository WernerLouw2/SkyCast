import type { ReactNode } from "react";

export type StatLabelVariant = "muted" | "primary";

interface StatLabelProps {
  children: ReactNode;
  variant?: StatLabelVariant;
}

export function StatLabel({ children, variant = "muted" }: StatLabelProps) {
  return (
    <span
      className={`stat-label text-[9px] tracking-widest uppercase ${
        variant === "primary" ? "stat-label--primary" : ""
      }`}
    >
      {children}
    </span>
  );
}
