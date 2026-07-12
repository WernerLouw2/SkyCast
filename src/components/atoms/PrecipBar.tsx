interface PrecipBarProps {
  percent: number;
}

export function PrecipBar({ percent }: PrecipBarProps) {
  const width = `${Math.min(100, Math.max(0, percent))}%`;

  return (
    <div className="precip-bar h-1 rounded-full overflow-hidden">
      <div
        className="precip-bar__fill h-full rounded-full transition-all duration-700"
        style={{ width }}
      />
    </div>
  );
}
