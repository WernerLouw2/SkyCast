import type { OpenMeteoResponse } from "../types/weather";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

const CAPE_TOWN = {
  lat: -33.9249,
  lon: 18.4241,
  timezone: "Africa/Johannesburg",
};

type ResolvedLocation = {
  lat: number;
  lon: number;
  timezone: string;
};

type GeocodingResult = {
  results?: Array<{
    latitude: number;
    longitude: number;
    timezone?: string;
  }>;
};

async function resolveCity(city: string): Promise<ResolvedLocation> {
  const name = city.split(",")[0]?.trim() || city;
  const params = new URLSearchParams({
    name,
    count: "1",
  });

  const res = await fetch(`${GEOCODING_URL}?${params.toString()}`);
  if (!res.ok) return CAPE_TOWN;

  const json = (await res.json()) as GeocodingResult;
  const match = json.results?.[0];
  if (!match) return CAPE_TOWN;

  return {
    lat: match.latitude,
    lon: match.longitude,
    timezone: match.timezone ?? "auto",
  };
}

export async function fetchForecast(city: string): Promise<OpenMeteoResponse> {
  const location = await resolveCity(city).catch(() => CAPE_TOWN);

  const params = new URLSearchParams({
    latitude: String(location.lat),
    longitude: String(location.lon),
    timezone: location.timezone,
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
