import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useForecast } from "./useForecast";
import type { OpenMeteoResponse } from "../types/weather";

vi.mock("../api/openMeteo", () => ({
  fetchForecast: vi.fn(),
}));

import { fetchForecast } from "../api/openMeteo";

const fetchForecastMock = vi.mocked(fetchForecast);

function makeForecast(overrides?: Partial<OpenMeteoResponse>): OpenMeteoResponse {
  const hours = Array.from({ length: 48 }, (_, i) => i);
  return {
    latitude: -33.92,
    longitude: 18.42,
    utc_offset_seconds: 7200,
    timezone: "Africa/Johannesburg",
    timezone_abbreviation: "GMT+2",
    elevation: 17,
    current: {
      time: "2026-07-08T12:00",
      interval: 900,
      temperature_2m: 18.5,
      weather_code: 0,
    },
    hourly: {
      time: hours.map((h) => `2026-07-0${h < 24 ? 7 : 8}T${String(h % 24).padStart(2, "0")}:00`),
      temperature_2m: hours.map(() => 15),
      precipitation_probability: hours.map((_, i) => (i < 24 ? 10 : 40)),
      weather_code: hours.map(() => 0),
    },
    daily: {
      time: ["2026-07-07", "2026-07-08"],
      weather_code: [3, 0],
      temperature_2m_max: [17, 20],
      temperature_2m_min: [10, 12],
    },
    ...overrides,
  };
}

describe("When useForecast is called", () => {
  beforeEach(() => {
    fetchForecastMock.mockReset();
  });

  describe("Given a successful forecast response", () => {
    it("starts in loading, then returns success with derived days", async () => {
      const payload = makeForecast();
      fetchForecastMock.mockResolvedValue(payload);

      const { result } = renderHook(() => useForecast("Cape Town, ZA"));

      expect(result.current.status).toBe("loading");
      expect(result.current.data).toBeNull();
      expect(result.current.days).toEqual([]);
      expect(result.current.error).toBeNull();
      expect(fetchForecastMock).toHaveBeenCalledWith("Cape Town, ZA");

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });

      expect(result.current.error).toBeNull();
      expect(result.current.data).toEqual(payload);
      expect(result.current.days).toHaveLength(2);
      expect(result.current.days.find((d) => d.is_today)?.id).toBe("today");
      expect(result.current.days.find((d) => d.is_today)?.temperature).toBe(18.5);
    });
  });

  describe("Given the forecast request fails", () => {
    it("returns an error state", async () => {
      fetchForecastMock.mockRejectedValue(new Error("Open-Meteo request failed: 500"));

      const { result } = renderHook(() => useForecast("Nowhere"));

      await waitFor(() => {
        expect(result.current.status).toBe("error");
      });

      expect(result.current.data).toBeNull();
      expect(result.current.days).toEqual([]);
      expect(result.current.error).toBe("Open-Meteo request failed: 500");
    });

    it("uses a fallback message for non-Error rejections", async () => {
      fetchForecastMock.mockRejectedValue("boom");

      const { result } = renderHook(() => useForecast("Nowhere"));

      await waitFor(() => {
        expect(result.current.status).toBe("error");
      });

      expect(result.current.error).toBe("Failed to load forecast");
    });
  });

  describe("Given the city changes", () => {
    it("refetches and returns the new city's forecast", async () => {
      fetchForecastMock
        .mockResolvedValueOnce(makeForecast({ latitude: -33.92 }))
        .mockResolvedValueOnce(makeForecast({ latitude: 40.71 }));

      const { result, rerender } = renderHook(
        ({ city }) => useForecast(city),
        { initialProps: { city: "Cape Town, ZA" } }
      );

      await waitFor(() => {
        expect(result.current.status).toBe("success");
      });
      expect(result.current.data?.latitude).toBe(-33.92);

      rerender({ city: "New York, NY" });

      await waitFor(() => {
        expect(fetchForecastMock).toHaveBeenLastCalledWith("New York, NY");
        expect(result.current.data?.latitude).toBe(40.71);
      });

      expect(fetchForecastMock).toHaveBeenCalledTimes(2);
      expect(result.current.status).toBe("success");
    });
  });

  describe("Given the hook unmounts before the request finishes", () => {
    it("does not update state after cancellation", async () => {
      let resolveForecast!: (value: OpenMeteoResponse) => void;
      fetchForecastMock.mockImplementation(
        () =>
          new Promise<OpenMeteoResponse>((resolve) => {
            resolveForecast = resolve;
          })
      );

      const { result, unmount } = renderHook(() => useForecast("Cape Town, ZA"));
      expect(result.current.status).toBe("loading");

      unmount();

      await act(async () => {
        resolveForecast(makeForecast());
      });

      expect(result.current.status).toBe("loading");
      expect(result.current.data).toBeNull();
    });
  });
});
