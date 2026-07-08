export type Condition = "sunny" | "partly-cloudy" | "cloudy" | "rain" | "thunderstorm";
export type Unit = "F" | "C";

/** Derived per-day shape used throughout the UI */
export interface DayWeather {
  /** App-level key — not in the raw API */
  id: string;
  /** ISO date string e.g. "2026-07-08" */
  date: string;
  is_today: boolean;
  is_past: boolean;
  /** Live current temperature in °C — only present for today */
  temperature?: number;
  /** Daily high in °C — from daily.temperature_2m_max */
  high_temp: number;
  /** Daily low in °C — from daily.temperature_2m_min */
  low_temp: number;
  /** WMO weather code */
  weather_code: number;
  /** Human-readable description derived from weather_code */
  weather_descriptions: string[];
  /** Max hourly precipitation probability for the day (%) */
  precip_chance: number;
}

/** Raw Open-Meteo API response shape */
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export interface HourlyPoint {
  hour: number;
  temp: number;
}
