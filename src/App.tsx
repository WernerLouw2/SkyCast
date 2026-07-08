import { WeatherPageLayout } from './components/templates/WeatherPageLayout'
import { AppHeader } from './components/organisms/AppHeader'
import { useEffect, useState } from 'react';
import type { Unit } from './types/weather';

function App() {
  const [unit, setUnit] = useState<Unit>(
    () => (localStorage.getItem("skycast_unit") as Unit) || "C"
  );
  const [city, setCity] = useState<string>(
    () => localStorage.getItem("skycast_city") || "Cape Town, ZA"
  );

  useEffect(() => { localStorage.setItem("skycast_unit", unit); }, [unit]);
  useEffect(() => { localStorage.setItem("skycast_city", city); }, [city]);

  return (
    <WeatherPageLayout
      header={
        <AppHeader
          city={city}
          unit={unit}
          onCityChange={setCity}
          onUnitChange={setUnit}
        />
      }
    />
  )
}

export default App
