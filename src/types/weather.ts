export type Condition = "sunny" | "partly-cloudy" | "cloudy" | "rain" | "thunderstorm";
export type Unit = "F" | "C";

export interface DayWeather {
  id: string;
  date: string;
  is_today: boolean;
  is_past: boolean;
  temperature?: number;
  high_temp: number;
  low_temp: number;
  weather_code: number;
  weather_descriptions: string[];
  precip_chance: number;
}

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
