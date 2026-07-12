import { WeatherPageLayout } from './components/templates/WeatherPageLayout'
import { AppHeader } from './components/organisms/AppHeader'
import { useEffect, useState } from 'react';
import type { Unit } from './types/weather';
import { MainWeatherCard } from './components/organisms/MainWeatherCard';
import { useForecast } from "./hooks/useForecast";
import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { WeatherTimeline } from './components/organisms/WeatherTimeline';


function App() {
  const [selectedId, setSelectedId] = useState<string>(
    () => localStorage.getItem("skycast_day") || "today"
  );
  const [unit, setUnit] = useState<Unit>(
    () => (localStorage.getItem("skycast_unit") as Unit) || "C"
  );
  const [city, setCity] = useState<string>(
    () => localStorage.getItem("skycast_city") || "Cape Town, ZA"
  );

  useEffect(() => { localStorage.setItem("skycast_unit", unit); }, [unit]);
  useEffect(() => { localStorage.setItem("skycast_city", city); }, [city]);
  useEffect(() => { localStorage.setItem("skycast_day", selectedId); }, [selectedId]);

  const forecast = useForecast();
  const days = forecast.days;
  const selectedDay = days.find((d) => d.id === selectedId) ?? days.find((d) => d.is_today) ?? days[0];
  
  const handleCityChange = (nextCity: string) => {
    setCity(nextCity);
    setSelectedId("today");
  };

  const mainCard =
    forecast.status === "loading" ? (
      <div className="status-panel rounded-2xl p-6">
        Loading forecast…
      </div>
    ) : forecast.status === "error" ? (
      <div className="status-panel status-panel--error rounded-2xl p-6">
        <div className="font-medium text-error-soft">Failed to load forecast</div>
        <div className="mt-2 text-sm text-soft">{forecast.error}</div>
      </div>
    ) : selectedDay ? (
      <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          >
            <MainWeatherCard day={selectedDay} unit={unit} city={city} />
          </motion.div>
        </AnimatePresence>
    ) : (
      <div className="status-panel rounded-2xl p-6">
        No data.
      </div>
    );

  return (
    <WeatherPageLayout
      header={
        <AppHeader
          city={city}
          unit={unit}
          onCityChange={handleCityChange}
          onUnitChange={setUnit}
        />
      }
      mainCard={mainCard}
      timeline={
        <WeatherTimeline 
          days={days} 
          selectedId={selectedId} 
          unit={unit} onSelect={setSelectedId} 
          />
        }
    />
  )
}

export default App
