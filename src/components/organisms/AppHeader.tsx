import { Logo } from "../atoms/Logo";
import { SearchBar } from "../molecules/SearchBar";
import { UnitToggle } from "../molecules/UnitToggle";
import type { Unit } from "../../types/weather";

interface AppHeaderProps {
  city: string;
  unit: Unit;
  onCityChange: (city: string) => void;
  onUnitChange: (unit: Unit) => void;
}

export function AppHeader({ city, unit, onCityChange, onUnitChange }: AppHeaderProps) {
  return (
    <header className="flex items-center gap-3 flex-wrap">
      <Logo />
      <SearchBar currentCity={city} onSelect={onCityChange} />
      <UnitToggle unit={unit} onChange={onUnitChange} />
    </header>
  );
}
