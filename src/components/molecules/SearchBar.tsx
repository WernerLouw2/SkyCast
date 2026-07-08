import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, X } from "lucide-react";
import { CITIES } from "../../data/weatherData";

interface SearchBarProps {
  currentCity: string;
  onSelect: (city: string) => void;
}

export function SearchBar({ currentCity, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = CITIES.filter(
    (c) => c.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (city: string) => {
    onSelect(city);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex-1 min-w-[180px]">
      {/* Input row */}
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-200 focus-within:shadow-[0_0_0_1px_rgba(0,196,255,0.35)]"
        style={{ background: "#091526", border: "1px solid rgba(0,196,255,0.12)" }}
      >
        <MapPin size={13} style={{ color: "#00c4ff" }} className="shrink-0" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={currentCity}
          className="bg-transparent text-[#c8dff5] placeholder-[#4e6e90] outline-none flex-1"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}
        />
        {query ? (
          <button onClick={() => { setQuery(""); setOpen(false); }}>
            <X size={13} className="text-[#4e6e90] hover:text-[#c8dff5] transition-colors" />
          </button>
        ) : (
          <Search size={13} className="text-[#4e6e90]" />
        )}
      </div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full mt-2 left-0 right-0 rounded-xl overflow-hidden z-50"
            style={{
              background: "#091526",
              border: "1px solid rgba(0,196,255,0.15)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            }}
          >
            {suggestions.map((city) => (
              <button
                key={city}
                onClick={() => handleSelect(city)}
                className="flex items-center gap-2 w-full px-4 py-3 text-left transition-colors hover:bg-[rgba(0,196,255,0.07)]"
              >
                <MapPin size={11} style={{ color: "#00c4ff" }} className="shrink-0" />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "#c8dff5" }}>
                  {city}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
