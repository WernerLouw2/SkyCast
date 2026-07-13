import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import type { OpenMeteoResponse } from "./types/weather";
import { makeWeek } from "./test/fixtures/weather";

vi.mock("./api/openMeteo", () => ({
  fetchForecast: vi.fn(),
}));

import { fetchForecast } from "./api/openMeteo";

const fetchForecastMock = vi.mocked(fetchForecast);

function makeForecast(): OpenMeteoResponse {
  const days = makeWeek();
  const hours = Array.from({ length: days.length * 24 }, (_, i) => i);

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
      time: hours.map((h) => `2026-07-08T${String(h % 24).padStart(2, "0")}:00`),
      temperature_2m: hours.map(() => 15),
      precipitation_probability: hours.map(() => 10),
      weather_code: hours.map(() => 0),
    },
    daily: {
      time: days.map((d) => d.date),
      weather_code: days.map((d) => d.weather_code),
      temperature_2m_max: days.map((d) => d.high_temp),
      temperature_2m_min: days.map((d) => d.low_temp),
    },
  };
}

describe("When App renders", () => {
  beforeEach(() => {
    localStorage.clear();
    fetchForecastMock.mockReset();
    fetchForecastMock.mockResolvedValue(makeForecast());
    Element.prototype.scrollIntoView = vi.fn();
  });

  describe("Given local storage is empty", () => {
    it("persists the default unit, city, and day after mount", async () => {
      render(<App />);

      await waitFor(() => {
        expect(localStorage.getItem("skycast_unit")).toBe("C");
        expect(localStorage.getItem("skycast_city")).toBe("Cape Town, ZA");
        expect(localStorage.getItem("skycast_day")).toBe("today");
      });

      expect(screen.getByPlaceholderText("Cape Town, ZA")).toBeInTheDocument();
    });
  });

  describe("Given local storage already has values", () => {
    it("hydrates App state from those values", async () => {
      localStorage.setItem("skycast_unit", "F");
      localStorage.setItem("skycast_city", "New York, NY");
      localStorage.setItem("skycast_day", "d+1");

      render(<App />);

      expect(screen.getByPlaceholderText("New York, NY")).toBeInTheDocument();

      await waitFor(() => {
        expect(localStorage.getItem("skycast_unit")).toBe("F");
        expect(localStorage.getItem("skycast_city")).toBe("New York, NY");
        expect(localStorage.getItem("skycast_day")).toBe("d+1");
      });
    });
  });

  describe("Given the user changes preferences", () => {
    it("updates local storage when the unit is toggled", async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(localStorage.getItem("skycast_unit")).toBe("C");
      });

      await user.click(screen.getByRole("button", { name: /°F\s*\/\s*°C/ }));

      await waitFor(() => {
        expect(localStorage.getItem("skycast_unit")).toBe("F");
      });
    });

    it("updates city and resets the selected day when a city is chosen", async () => {
      const user = userEvent.setup();
      render(<App />);

      await waitFor(() => {
        expect(localStorage.getItem("skycast_city")).toBe("Cape Town, ZA");
      });

      const input = screen.getByPlaceholderText("Cape Town, ZA");
      await user.type(input, "London");
      await user.click(screen.getByRole("button", { name: /London, UK/i }));

      await waitFor(() => {
        expect(localStorage.getItem("skycast_city")).toBe("London, UK");
        expect(localStorage.getItem("skycast_day")).toBe("today");
      });
    });
  });
});
