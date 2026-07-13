import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppHeader } from "./AppHeader";

describe("When AppHeader renders", () => {
  const onCityChange = vi.fn();
  const onUnitChange = vi.fn();

  beforeEach(() => {
    onCityChange.mockReset();
    onUnitChange.mockReset();
  });

  describe("Given default props", () => {
    it("shows the brand, city placeholder, and unit toggle", () => {
      render(
        <AppHeader
          city="Cape Town, ZA"
          unit="C"
          onCityChange={onCityChange}
          onUnitChange={onUnitChange}
        />
      );

      expect(screen.getByText("SkyCast")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Cape Town, ZA")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /°F\s*\/\s*°C/ })).toBeInTheDocument();
    });
  });

  describe("Given the unit toggle is clicked", () => {
    it("requests Fahrenheit when currently Celsius", async () => {
      const user = userEvent.setup();
      render(
        <AppHeader
          city="Cape Town, ZA"
          unit="C"
          onCityChange={onCityChange}
          onUnitChange={onUnitChange}
        />
      );

      await user.click(screen.getByRole("button", { name: /°F\s*\/\s*°C/ }));
      expect(onUnitChange).toHaveBeenCalledWith("F");
    });

    it("requests Celsius when currently Fahrenheit", async () => {
      const user = userEvent.setup();
      render(
        <AppHeader
          city="Cape Town, ZA"
          unit="F"
          onCityChange={onCityChange}
          onUnitChange={onUnitChange}
        />
      );

      await user.click(screen.getByRole("button", { name: /°F\s*\/\s*°C/ }));
      expect(onUnitChange).toHaveBeenCalledWith("C");
    });
  });

  describe("Given the user searches for a city", () => {
    it("calls onCityChange when a suggestion is selected", async () => {
      const user = userEvent.setup();
      render(
        <AppHeader
          city="Cape Town, ZA"
          unit="C"
          onCityChange={onCityChange}
          onUnitChange={onUnitChange}
        />
      );

      const input = screen.getByPlaceholderText("Cape Town, ZA");
      await user.type(input, "London");
      await user.click(screen.getByRole("button", { name: /London, UK/i }));

      expect(onCityChange).toHaveBeenCalledWith("London, UK");
      expect(input).toHaveValue("");
    });

    it("shows no suggestions for a query that matches nothing", async () => {
      const user = userEvent.setup();
      render(
        <AppHeader
          city="Cape Town, ZA"
          unit="C"
          onCityChange={onCityChange}
          onUnitChange={onUnitChange}
        />
      );

      await user.type(screen.getByPlaceholderText("Cape Town, ZA"), "zzzzz");
      expect(screen.queryByRole("button", { name: /London/i })).not.toBeInTheDocument();
      expect(onCityChange).not.toHaveBeenCalled();
    });

    it("clears the query without selecting a city when X is clicked", async () => {
      const user = userEvent.setup();
      render(
        <AppHeader
          city="Cape Town, ZA"
          unit="C"
          onCityChange={onCityChange}
          onUnitChange={onUnitChange}
        />
      );

      const input = screen.getByPlaceholderText("Cape Town, ZA");
      await user.type(input, "Tok");
      expect(input).toHaveValue("Tok");

      const clearButton = input.parentElement?.querySelector("button");
      expect(clearButton).toBeTruthy();
      await user.click(clearButton!);

      expect(input).toHaveValue("");
      expect(onCityChange).not.toHaveBeenCalled();
    });
  });
});
