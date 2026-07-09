import React from "react";

export type BadgeVariant = "cyan" | "muted" | "amber";

const STYLES: Record<BadgeVariant, React.CSSProperties> = {
  cyan: {
    background: "rgba(0,196,255,0.15)",
    color: "#00c4ff",
    border: "1px solid rgba(0,196,255,0.25)",
  },
  muted: {
    background: "rgba(100,130,170,0.12)",
    color: "#7b9db5",
    border: "1px solid rgba(100,130,170,0.2)",
  },
  amber: {
    background: "rgba(255,180,50,0.1)",
    color: "#ffb83f",
    border: "1px solid rgba(255,180,50,0.2)",
  },
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "cyan" }: BadgeProps) {
  return (
    <span
      className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        ...STYLES[variant],
      }}
    >
      {children}
    </span>
  );
}
