import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MainWeatherCard } from "./MainWeatherCard";
import { makeDay } from "../../test/fixtures/weather";
import { cToF } from "../../utils/temperature";

describe("When MainWeatherCard renders", () => {
  describe("Given today with a live temperature", () => {
    it("shows LIVE badge, city, live temp, and Celsius label", () => {
      render(
        <MainWeatherCard
          day={makeDay()}
          unit="C"
          city="Cape Town, ZA"
        />
      );

      expect(screen.getByText("LIVE · NOW")).toBeInTheDocument();
      expect(screen.getByText("Cape Town, ZA")).toBeInTheDocument();
      expect(screen.getByText("Celsius")).toBeInTheDocument();
      expect(screen.getByText("Sunny")).toBeInTheDocument();
      expect(screen.getByText("Clear Sky")).toBeInTheDocument();
      expect(screen.getByText("18.5°")).toBeInTheDocument();
      expect(screen.getByText("15%")).toBeInTheDocument();
    });

    it("converts the live temperature when unit is Fahrenheit", () => {
      render(
        <MainWeatherCard
          day={makeDay({ temperature: 18.5 })}
          unit="F"
          city="New York, NY"
        />
      );

      expect(screen.getByText("Fahrenheit")).toBeInTheDocument();
      expect(screen.getByText(`${cToF(18.5)}°`)).toBeInTheDocument();
      expect(screen.getByText(`${cToF(20)}°`)).toBeInTheDocument();
      expect(screen.getByText(`${cToF(12)}°`)).toBeInTheDocument();
    });
  });

  describe("Given today without a live temperature", () => {
    it("falls back to the daily high for the hero reading", () => {
      render(
        <MainWeatherCard
          day={makeDay({ temperature: undefined, high_temp: 22 })}
          unit="C"
          city="Cape Town, ZA"
        />
      );

      expect(screen.getByText("LIVE · NOW")).toBeInTheDocument();
      expect(screen.getAllByText("22°").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Given a past day", () => {
    it("shows HISTORY badge and uses high temp as the hero reading", () => {
      render(
        <MainWeatherCard
          day={makeDay({
            id: "d-1",
            date: "2026-07-07",
            is_today: false,
            is_past: true,
            temperature: undefined,
            high_temp: 16,
            low_temp: 10,
            weather_code: 61,
            weather_descriptions: ["Slight Rain"],
            precip_chance: 70,
          })}
          unit="C"
          city="Cape Town, ZA"
        />
      );

      expect(screen.getByText("HISTORY")).toBeInTheDocument();
      expect(screen.queryByText("LIVE · NOW")).not.toBeInTheDocument();
      expect(screen.getByText("Rain")).toBeInTheDocument();
      expect(screen.getByText("Slight Rain")).toBeInTheDocument();
      expect(screen.getByText("70%")).toBeInTheDocument();
      expect(screen.getAllByText("16°").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Given a future day", () => {
    it("shows FORECAST badge and thunderstorm condition", () => {
      render(
        <MainWeatherCard
          day={makeDay({
            id: "d+1",
            date: "2026-07-09",
            is_today: false,
            is_past: false,
            temperature: undefined,
            high_temp: 19,
            weather_code: 95,
            weather_descriptions: ["Thunderstorm"],
            precip_chance: 80,
          })}
          unit="C"
          city="Berlin, DE"
        />
      );

      expect(screen.getByText("FORECAST")).toBeInTheDocument();
      expect(screen.getAllByText("Thunderstorm").length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText("Berlin, DE")).toBeInTheDocument();
      expect(screen.getByText("80%")).toBeInTheDocument();
    });
  });

  describe("Given cloudy and precip edge values", () => {
    it("renders cloudy label and 0% precip", () => {
      render(
        <MainWeatherCard
          day={makeDay({
            weather_code: 3,
            weather_descriptions: ["Overcast"],
            precip_chance: 0,
          })}
          unit="C"
          city="Cape Town, ZA"
        />
      );

      expect(screen.getByText("Cloudy")).toBeInTheDocument();
      expect(screen.getByText("Overcast")).toBeInTheDocument();
      expect(screen.getByText("0%")).toBeInTheDocument();
    });

    it("renders 100% precip chance", () => {
      render(
        <MainWeatherCard
          day={makeDay({ precip_chance: 100 })}
          unit="C"
          city="Cape Town, ZA"
        />
      );

      expect(screen.getByText("100%")).toBeInTheDocument();
    });
  });

  describe("Given an empty weather description", () => {
    it("still renders the card without crashing", () => {
      render(
        <MainWeatherCard
          day={makeDay({ weather_descriptions: [] })}
          unit="C"
          city="Cape Town, ZA"
        />
      );

      expect(screen.getByText("LIVE · NOW")).toBeInTheDocument();
      expect(screen.getByText("Cape Town, ZA")).toBeInTheDocument();
    });
  });
});
