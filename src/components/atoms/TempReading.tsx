import type { Unit } from "../../types/weather";
import { cToF } from "../../utils/temperature";

export type TempColor = "default" | "hot" | "cold";

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
    return <div className="temp-reading--hero">{value}°</div>;
  }

  return (
    <span className={`temp-reading--large temp-reading--${color} text-lg font-semibold`}>
      {value}°
    </span>
  );
}
