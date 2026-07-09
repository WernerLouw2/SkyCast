import React from "react";

interface StatLabelProps {
  children: React.ReactNode;
  color?: string;
}

export function StatLabel({ children, color = "#4e6e90" }: StatLabelProps) {
  return (
    <span
      className="text-[9px] tracking-widest uppercase"
      style={{ fontFamily: "'JetBrains Mono', monospace", color }}
    >
      {children}
    </span>
  );
}
