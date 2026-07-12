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
      className={`day-tile relative flex flex-col items-center gap-1 rounded-2xl p-2.5 pt-4 cursor-pointer outline-none ${
        isSelected ? "day-tile--selected" : ""
      }`}
    >
    
      <StatLabel variant={isSelected ? "primary" : "muted"}>{dayName}</StatLabel>
      <span className="font-mono text-dim text-[9px]">{monthDay}</span>

      <div className="my-0.5">
        <WeatherIcon condition={condition} size={34} />
      </div>

      <span className="font-mono text-hot text-[13px] font-semibold">
        {displayTemp(day.high_temp, unit)}°
      </span>
      <span className="font-mono text-cool text-[11px]">
        {displayTemp(day.low_temp, unit)}°
      </span>

      <div className="flex items-center gap-0.5 mt-0.5">
        <Droplets size={8} className="text-muted" />
        <span className="font-mono text-muted text-[9px]">{day.precip_chance}%</span>
      </div>
    </motion.button>
  );
}
