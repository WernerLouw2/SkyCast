import { Badge, type BadgeVariant } from "../atoms/Badge";
import { WeatherIcon } from "../atoms/WeatherIcon";
import { TempReading } from "../atoms/TempReading";
import { PrecipBar } from "../atoms/PrecipBar";
import { StatLabel } from "../atoms/StatLabel";

import type { DayWeather, Condition, Unit } from "../../types/weather";
import { weatherCodeToCondition, CONDITION_LABEL } from "../../utils/wmo";

const CONDITION_BG: Record<Condition, string> = {
  "sunny":         "from-[#1a1200] via-[#0c1a2e] to-[#071525]",
  "partly-cloudy": "from-[#0c1a2e] via-[#091626] to-[#071525]",
  "cloudy":        "from-[#0a1520] via-[#091626] to-[#071525]",
  "rain":          "from-[#081520] via-[#081c2e] to-[#071525]",
  "thunderstorm":  "from-[#0d0f1f] via-[#0d1426] to-[#071525]",
};

const dayBadgeVariant = (day: DayWeather): BadgeVariant => {
  if (day.is_today) return "cyan";
  if (day.is_past) return "muted";
  return "amber";
};

interface MainWeatherCardProps {
  day: DayWeather;
  unit: Unit;
  city: string;
}

export function MainWeatherCard({ day, unit, city }: MainWeatherCardProps) {
  const condition = weatherCodeToCondition(day.weather_code);
  const badgeLabel = day.is_today ? "LIVE · NOW" : day.is_past ? "HISTORY" : "FORECAST";
  const heroC = day.is_today && day.temperature !== undefined ? day.temperature : day.high_temp;

  const dt = new Date(day.date + "T12:00:00");
  const dateLabel = dt.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${CONDITION_BG[condition]}`}
      style={{ border: "1px solid rgba(0,196,255,0.12)" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(0,196,255,0.06) 0%, transparent 60%)" }}
      />

      <div className="relative p-6 md:p-8">

        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <Badge variant={dayBadgeVariant(day)}>{badgeLabel}</Badge>
          <span
            className="text-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4e6e90" }}
          >
            {dateLabel}
          </span>
          <span
            className="ml-auto text-sm"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#00c4ff" }}
          >
            {city}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-6">

          <div className="flex items-center gap-6">
            <div style={{ filter: "drop-shadow(0 0 24px rgba(255,200,0,0.2))" }}>
              <WeatherIcon condition={condition} size={100} />
            </div>
            <div>
              <TempReading celsius={heroC} unit={unit} size="hero" />
              <div
                className="mt-1.5 text-sm"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#7b9db5" }}
              >
                {unit === "C" ? "Celsius" : "Fahrenheit"}
              </div>
              <div className="mt-2 text-lg font-medium" style={{ color: "#9fc3e0" }}>
                {CONDITION_LABEL[condition]}
              </div>
              <div className="mt-0.5 text-sm max-w-xs" style={{ color: "#4e6e90" }}>
                {day.weather_descriptions[0]}
              </div>
            </div>
          </div>

          <div className="md:ml-auto flex flex-col gap-3 shrink-0">
            <div className="grid grid-cols-2 gap-2.5">

              <div className="flex flex-col items-end">
                <StatLabel>High</StatLabel>
                <TempReading celsius={day.high_temp} unit={unit} size="large" color="hot" />
              </div>
              <div className="flex flex-col items-end">
                <StatLabel>Low</StatLabel>
                <TempReading celsius={day.low_temp} unit={unit} size="large" color="cold" />
              </div>

              <div className="col-span-2 border-t" style={{ borderColor: "rgba(0,196,255,0.08)" }} />

              <div className="col-span-2 flex flex-col items-end gap-1">
                <StatLabel>Precip. Chance</StatLabel>
                <div className="flex items-center gap-2">
                  <PrecipBar percent={day.precip_chance} /> 
                  <span
                    className="text-sm font-medium"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#64b5f6" }}
                  >
                    {day.precip_chance}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
