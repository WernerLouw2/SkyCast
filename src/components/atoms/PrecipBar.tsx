interface PrecipBarProps {
  percent: number;
}

export function PrecipBar({ percent }: PrecipBarProps) {
  return (
    <div
      className="h-1 rounded-full overflow-hidden"
      style={{ width: "4rem", background: "#0d1e35" }}
    >
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%`, background: "#64b5f6" }}
      />
    </div>
  );
}
