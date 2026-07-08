import type { Condition, DayWeather, HourlyPoint, OpenMeteoResponse, Unit } from "../types/weather";
import rawData from "./weather-data.json";

// ── Raw API response (Open-Meteo format) ───────────────────────────────────

export const WEATHER_DATA = rawData as OpenMeteoResponse;

// ── Temperature helpers ────────────────────────────────────────────────────
// API is metric (°C). Convert to °F when unit === "F".

export const cToF = (c: number): number => Math.round(c * 9 / 5 + 32);

export const displayTemp = (c: number, unit: Unit): number =>
  unit === "C" ? c : cToF(c);

export const tempStr = (c: number, unit: Unit): string =>
  `${displayTemp(c, unit)}°`;

// ── WMO code → Condition ───────────────────────────────────────────────────

export const weatherCodeToCondition = (code: number): Condition => {
  if (code <= 1) return "sunny";
  if (code === 2) return "partly-cloudy";
  if (code === 3 || code === 45 || code === 48) return "cloudy";
  if (code === 95 || code === 96 || code === 99) return "thunderstorm";
  // 51-82: drizzle, rain, showers, snow
  return "rain";
};

const WMO_DESCRIPTIONS: Record<number, string> = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Icy Fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  80: "Slight Showers",
  81: "Moderate Showers",
  82: "Heavy Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with Hail",
  99: "Severe Thunderstorm",
};

export const wmoDescription = (code: number): string =>
  WMO_DESCRIPTIONS[code] ?? "Unknown";

export const CONDITION_LABEL: Record<Condition, string> = {
  "sunny": "Sunny",
  "partly-cloudy": "Partly Cloudy",
  "cloudy": "Cloudy",
  "rain": "Rain",
  "thunderstorm": "Thunderstorm",
};

// ── Derive 7-day DayWeather[] from raw response ────────────────────────────

const currentDate = WEATHER_DATA.current.time.split("T")[0]; // "2026-07-08"
const todayIndex = WEATHER_DATA.daily.time.indexOf(currentDate);

export const DAYS: DayWeather[] = WEATHER_DATA.daily.time.map((date, i) => {
  const isToday = date === currentDate;
  const isPast = i < todayIndex;
  const offset = i - todayIndex;
  const id = isToday ? "today" : `d${offset > 0 ? "+" : ""}${offset}`;

  // Max hourly precipitation probability for this day
  const hourStart = i * 24;
  const dayPrecip = WEATHER_DATA.hourly.precipitation_probability.slice(hourStart, hourStart + 24);
  const precipChance = Math.max(...dayPrecip);

  return {
    id,
    date,
    is_today: isToday,
    is_past: isPast,
    temperature: isToday ? WEATHER_DATA.current.temperature_2m : undefined,
    high_temp: WEATHER_DATA.daily.temperature_2m_max[i],
    low_temp: WEATHER_DATA.daily.temperature_2m_min[i],
    weather_code: WEATHER_DATA.daily.weather_code[i],
    weather_descriptions: [wmoDescription(WEATHER_DATA.daily.weather_code[i])],
    precip_chance: precipChance,
  };
});

// ── Hourly temperature data for a given date ───────────────────────────────

export function getDayHourlyTemps(date: string): HourlyPoint[] {
  const dayIndex = WEATHER_DATA.daily.time.indexOf(date);
  if (dayIndex === -1) return [];
  const start = dayIndex * 24;
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    temp: WEATHER_DATA.hourly.temperature_2m[start + i],
  }));
}

// ── Location display ───────────────────────────────────────────────────────

export const LOCATION_DISPLAY = `${WEATHER_DATA.timezone} · ${WEATHER_DATA.latitude.toFixed(2)}°, ${WEATHER_DATA.longitude.toFixed(2)}°`;

export const TODAY = new Date(currentDate);

export const CITIES: string[] = [
  "Cape Town, ZA", "Johannesburg, ZA", "New York, NY", "London, UK",
  "Tokyo, Japan", "Paris, France", "Sydney, Australia", "Mumbai, India",
  "Dubai, UAE", "São Paulo, BR", "Toronto, Canada", "Berlin, DE",
];
