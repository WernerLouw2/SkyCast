import type { Unit } from "../../types/weather";

interface UnitToggleProps {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <button
      onClick={() => onChange(unit === "F" ? "C" : "F")}
      className="flex items-center rounded-xl px-4 py-2.5 transition-all duration-200 hover:shadow-[0_0_0_1px_rgba(0,196,255,0.25)] shrink-0"
      style={{
        background: "#091526",
        border: "1px solid rgba(0,196,255,0.12)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.85rem",
        fontWeight: 600,
      }}
    >
      <span style={{ color: unit === "F" ? "#00c4ff" : "#4e6e90" }}>°F</span>
      <span className="mx-1.5" style={{ color: "#2d4a68" }}>/</span>
      <span style={{ color: unit === "C" ? "#00c4ff" : "#4e6e90" }}>°C</span>
    </button>
  );
}
