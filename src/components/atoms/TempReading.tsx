import type { Unit } from "../../types/weather";
import { cToF } from "../../utils/temperature";

export type TempColor = "default" | "hot" | "cold";

const COLOR_MAP: Record<TempColor, string> = {
  default: "#c8dff5",
  hot: "#ff7043",
  cold: "#64b5f6",
};

interface TempReadingProps {
  celsius: number;
  unit: Unit;
  size?: "hero" | "large";
  color?: TempColor;
}

export function TempReading({
  celsius,
  unit,
  size = "hero",
  color = "default",
}: TempReadingProps) {
  const value = unit === "C" ? celsius : cToF(celsius);

  if (size === "hero") {
    return (
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(4rem, 10vw, 6rem)",
          fontWeight: 300,
          lineHeight: 1,
          color: "#f0f8ff",
          letterSpacing: "-0.04em",
        }}
      >
        {value}°
      </div>
    );
  }

  return (
    <span
      className="text-lg font-semibold"
      style={{ fontFamily: "'JetBrains Mono', monospace", color: COLOR_MAP[color] }}
    >
      {value}°
    </span>
  );
}
