import { useEffect, useMemo, useState } from "react";
import type { DayWeather, OpenMeteoResponse } from "../types/weather";
import { fetchForecastCapeTown } from "../api/openMeteo";
import { deriveDays } from "../utils/weatherTransform";

type ForecastState =
  | { status: "loading"; data: null; days: DayWeather[]; error: null }
  | { status: "error"; data: null; days: DayWeather[]; error: string }
  | { status: "success"; data: OpenMeteoResponse; days: DayWeather[]; error: null };

export function useForecast(): ForecastState {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ForecastState["status"]>("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setError(null);

    fetchForecastCapeTown()
      .then((json) => {
        if (cancelled) return;
        setData(json);
        setStatus("success");
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setData(null);
        setError(e instanceof Error ? e.message : "Failed to load forecast");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const days = useMemo(() => (data ? deriveDays(data) : []), [data]);

  if (status === "success" && data) return { status, data, days, error: null };
  if (status === "error") return { status, data: null, days: [], error: error ?? "Failed to load forecast" };
  return { status: "loading", data: null, days: [], error: null };
}

