import type { OpenMeteoResponse } from "../types/weather";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchForecastCapeTown(): Promise<OpenMeteoResponse> {
  const params = new URLSearchParams({
    latitude: "-33.9249",
    longitude: "18.4241",
    timezone: "Africa/Johannesburg",
    past_days: "3",
    forecast_days: "4",
    current: "temperature_2m,weather_code",
    hourly: "temperature_2m,precipitation_probability,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
  });

  const res = await fetch(`${FORECAST_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Open-Meteo request failed: ${res.status}`);
  return (await res.json()) as OpenMeteoResponse;
}

