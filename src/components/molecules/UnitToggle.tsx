import type { Unit } from "../../types/weather";

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <button
      onClick={() => onChange(unit === "F" ? "C" : "F")}
      className="unit-toggle flex items-center rounded-xl px-4 py-2.5 transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(0,196,255,0.25)] shrink-0"
    >
      <span className={unit === "F" ? "text-primary" : "text-muted"}>°F</span>
      <span className="unit-toggle__sep mx-1.5">/</span>
      <span className={unit === "C" ? "text-primary" : "text-muted"}>°C</span>
    </button>
  );
}
