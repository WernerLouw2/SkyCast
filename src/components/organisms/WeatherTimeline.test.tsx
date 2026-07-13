import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WeatherTimeline } from "./WeatherTimeline";
import { makeWeek, makeDay } from "../../test/fixtures/weather";

describe("When WeatherTimeline renders", () => {
  const onSelect = vi.fn();
  const scrollIntoViewMock = vi.fn<(arg?: boolean | ScrollIntoViewOptions) => void>();

  beforeEach(() => {
    onSelect.mockReset();
    scrollIntoViewMock.mockReset();
    Element.prototype.scrollIntoView = scrollIntoViewMock;
  });

  afterEach(() => {
    scrollIntoViewMock.mockReset();
  });

  describe("Given a full week of days", () => {
    it("renders a tile for each day", () => {
      const days = makeWeek();
      render(
        <WeatherTimeline
          days={days}
          selectedId="today"
          unit="C"
          onSelect={onSelect}
        />
      );

      expect(screen.getByText("← 3-Day History")).toBeInTheDocument();
      expect(screen.getByText("Today")).toBeInTheDocument();
      expect(screen.getByText("3-Day Forecast →")).toBeInTheDocument();

      for (const day of days) {
        expect(document.querySelector(`[data-day-id="${day.id}"]`)).toBeInTheDocument();
      }
    });

    it("marks today with data-is-today and selected tile class", () => {
      render(
        <WeatherTimeline
          days={makeWeek()}
          selectedId="today"
          unit="C"
          onSelect={onSelect}
        />
      );

      const todayWrap = document.querySelector('[data-day-id="today"]');
      expect(todayWrap).toHaveAttribute("data-is-today", "true");
      expect(todayWrap?.querySelector(".day-tile--selected")).toBeTruthy();

      const pastWrap = document.querySelector('[data-day-id="d-1"]');
      expect(pastWrap).not.toHaveAttribute("data-is-today");
      expect(pastWrap?.querySelector(".day-tile--selected")).toBeNull();
    });

    it("scrolls the selected day into view on mount", () => {
      render(
        <WeatherTimeline
          days={makeWeek()}
          selectedId="today"
          unit="C"
          onSelect={onSelect}
        />
      );

      expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    it("calls onSelect with the day id when a tile is clicked", async () => {
      const user = userEvent.setup();
      render(
        <WeatherTimeline
          days={makeWeek()}
          selectedId="today"
          unit="C"
          onSelect={onSelect}
        />
      );

      const futureWrap = document.querySelector('[data-day-id="d+1"]');
      expect(futureWrap).toBeTruthy();
      const button = within(futureWrap as HTMLElement).getByRole("button");
      await user.click(button);

      expect(onSelect).toHaveBeenCalledWith("d+1");
    });

    it("shows Fahrenheit values when unit is F", () => {
      render(
        <WeatherTimeline
          days={[makeDay({ high_temp: 20, low_temp: 10 })]}
          selectedId="today"
          unit="F"
          onSelect={onSelect}
        />
      );

      expect(screen.getByText("68°")).toBeInTheDocument();
      expect(screen.getByText("50°")).toBeInTheDocument();
    });
  });

  describe("Given an empty days list", () => {
    it("renders labels but no day tiles and does not scroll", () => {
      render(
        <WeatherTimeline
          days={[]}
          selectedId="today"
          unit="C"
          onSelect={onSelect}
        />
      );

      expect(screen.getByText("← 3-Day History")).toBeInTheDocument();
      expect(document.querySelectorAll("[data-day-id]")).toHaveLength(0);
      expect(scrollIntoViewMock).not.toHaveBeenCalled();
    });
  });

  describe("Given a selectedId that does not exist", () => {
    it("falls back to scrolling today into view", () => {
      render(
        <WeatherTimeline
          days={makeWeek()}
          selectedId="missing-id"
          unit="C"
          onSelect={onSelect}
        />
      );

      expect(scrollIntoViewMock).toHaveBeenCalled();
      expect(document.querySelector(".day-tile--selected")).toBeNull();
    });
  });

  describe("Given selectedId changes", () => {
    it("updates selection class and scrolls again", () => {
      const { rerender } = render(
        <WeatherTimeline
          days={makeWeek()}
          selectedId="today"
          unit="C"
          onSelect={onSelect}
        />
      );

      expect(document.querySelector('[data-day-id="today"] .day-tile--selected')).toBeTruthy();

      scrollIntoViewMock.mockClear();
      rerender(
        <WeatherTimeline
          days={makeWeek()}
          selectedId="d+2"
          unit="C"
          onSelect={onSelect}
        />
      );

      expect(document.querySelector('[data-day-id="d+2"] .day-tile--selected')).toBeTruthy();
      expect(document.querySelector('[data-day-id="today"] .day-tile--selected')).toBeNull();
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });
});
