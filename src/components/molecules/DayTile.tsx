import { motion } from "motion/react";
import { Droplets } from "lucide-react";
import { WeatherIcon } from "../atoms/WeatherIcon";
import { StatLabel } from "../atoms/StatLabel";
import { type DayWeather, type Unit } from "../../types/weather";
import { displayTemp } from "../../utils/temperature";
import { weatherCodeToCondition } from "../../utils/wmo";

interface DayTileProps {
  day: DayWeather;
  isSelected: boolean;
  unit: Unit;
  onSelect: () => void;
}

export function DayTile({ day, isSelected, unit, onSelect }: DayTileProps) {
  const condition = weatherCodeToCondition(day.weather_code);

  const dt = new Date(day.date + "T12:00:00");
  const dayName = dt.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = `${dt.getMonth() + 1}/${dt.getDate()}`;

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative flex flex-col items-center gap-1 rounded-2xl p-2.5 pt-4 cursor-pointer outline-none"
      style={{
        background: isSelected
          ? "linear-gradient(145deg, rgba(0,196,255,0.12), rgba(0,100,200,0.08))"
          : "rgba(9, 21, 38, 0.8)",
        border: `1px solid ${isSelected ? "rgba(0,196,255,0.4)" : "rgba(0,196,255,0.07)"}`,
        boxShadow: isSelected
          ? "0 0 20px rgba(0,196,255,0.12), inset 0 0 20px rgba(0,196,255,0.04)"
          : "none",
      }}
    >
      {day.is_today && (
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold px-2 py-0.5 rounded-full"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            background: "#00c4ff",
            color: "#05101f",
            letterSpacing: "0.1em",
          }}
        >
          NOW
        </span>
      )}
      {day.is_past && (
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4e6e90" }}
        >
          HIST
        </span>
      )}

      <StatLabel color={isSelected ? "#00c4ff" : "#4e6e90"}>{dayName}</StatLabel>
      <span
        className="text-[9px]"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#2d4a68" }}
      >
        {monthDay}
      </span>

      <div className="my-0.5">
        <WeatherIcon condition={condition} size={34} />
      </div>

      <span
        className="text-[13px] font-semibold"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#ff7043" }}
      >
        {displayTemp(day.high_temp, unit)}°
      </span>
      <span
        className="text-[11px]"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#5b8ab0" }}
      >
        {displayTemp(day.low_temp, unit)}°
      </span>

      <div className="flex items-center gap-0.5 mt-0.5">
        <Droplets size={8} style={{ color: "#4e6e90" }} />
        <span
          className="text-[9px]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4e6e90" }}
        >
          {day.precip_chance}%
        </span>
      </div>
    </motion.button>
  );
}
