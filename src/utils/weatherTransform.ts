import type { DayWeather, HourlyPoint, OpenMeteoResponse } from "../types/weather";
import { wmoDescription } from "./wmo";

export function deriveDays(data: OpenMeteoResponse): DayWeather[] {
  const currentDate = data.current.time.split("T")[0];
  const todayIndex = data.daily.time.indexOf(currentDate);

  return data.daily.time.map((date, i) => {
    const isToday = date === currentDate;
    const isPast = i < todayIndex;
    const offset = i - todayIndex;
    const id = isToday ? "today" : `d${offset > 0 ? "+" : ""}${offset}`;

    const hourStart = i * 24;
    const dayPrecip = data.hourly.precipitation_probability.slice(hourStart, hourStart + 24);
    const precipChance = Math.max(...dayPrecip);

    return {
      id,
      date,
      is_today: isToday,
      is_past: isPast,
      temperature: isToday ? data.current.temperature_2m : undefined,
      high_temp: data.daily.temperature_2m_max[i],
      low_temp: data.daily.temperature_2m_min[i],
      weather_code: data.daily.weather_code[i],
      weather_descriptions: [wmoDescription(data.daily.weather_code[i])],
      precip_chance: precipChance,
    };
  });
}

export function getDayHourlyTemps(data: OpenMeteoResponse, date: string): HourlyPoint[] {
  const dayIndex = data.daily.time.indexOf(date);
  if (dayIndex === -1) return [];
  const start = dayIndex * 24;
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    temp: data.hourly.temperature_2m[start + i],
  }));
}

export function locationDisplay(data: OpenMeteoResponse): string {
  return `${data.timezone} · ${data.latitude.toFixed(2)}°, ${data.longitude.toFixed(2)}°`;
}

export function todayDate(data: OpenMeteoResponse): Date {
  const currentDate = data.current.time.split("T")[0];
  return new Date(currentDate);
}

