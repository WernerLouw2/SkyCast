import type { Condition } from "../types/weather";

export const weatherCodeToCondition = (code: number): Condition => {
  if (code <= 1) return "sunny";
  if (code === 2) return "partly-cloudy";
  if (code === 3 || code === 45 || code === 48) return "cloudy";
  if (code === 95 || code === 96 || code === 99) return "thunderstorm";
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
  sunny: "Sunny",
  "partly-cloudy": "Partly Cloudy",
  cloudy: "Cloudy",
  rain: "Rain",
  thunderstorm: "Thunderstorm",
};

