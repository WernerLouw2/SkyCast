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
      className={`main-card relative rounded-2xl overflow-hidden bg-gradient-to-br ${CONDITION_BG[condition]}`}
    >
      <div className="main-card__glow absolute inset-0" />

      <div className="relative p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <Badge variant={dayBadgeVariant(day)}>{badgeLabel}</Badge>
          <span className="font-mono text-muted text-sm">{dateLabel}</span>
          <span className="font-mono text-primary ml-auto text-sm">{city}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-6">
          <div className="flex items-center gap-6">
            <div className="main-card__icon">
              <WeatherIcon condition={condition} size={100} />
            </div>
            <div>
              <TempReading celsius={heroC} unit={unit} size="hero" />
              <div className="font-mono text-soft mt-1.5 text-sm">
                {unit === "C" ? "Celsius" : "Fahrenheit"}
              </div>
              <div className="text-mist mt-2 text-lg font-medium">
                {CONDITION_LABEL[condition]}
              </div>
              <div className="text-muted mt-0.5 text-sm max-w-xs">
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

              <div className="main-card__divider col-span-2 border-t" />

              <div className="col-span-2 flex flex-col items-end gap-1">
                <StatLabel>Precip. Chance</StatLabel>
                <div className="flex items-center gap-2">
                  <PrecipBar percent={day.precip_chance} />
                  <span className="font-mono text-ice text-sm font-medium">
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
