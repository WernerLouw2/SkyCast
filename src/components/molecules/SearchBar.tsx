import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, MapPin, X } from "lucide-react";
import { CITIES } from "../../data/cities";

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
      <div className="search-bar__field flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-200 focus-within:shadow-[0_0_0_1px_rgba(0,196,255,0.35)]">
        <MapPin size={13} className="text-primary shrink-0" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={currentCity}
          className="search-bar__input bg-transparent text-foreground placeholder:text-muted-foreground outline-none flex-1"
        />
        {query ? (
          <button onClick={() => { setQuery(""); setOpen(false); }}>
            <X size={13} className="text-muted hover:text-foreground transition-colors" />
          </button>
        ) : (
          <Search size={13} className="text-muted" />
        )}
      </div>

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="search-bar__dropdown absolute top-full mt-2 left-0 right-0 rounded-xl overflow-hidden z-50"
          >
            {suggestions.map((city) => (
              <button
                key={city}
                onClick={() => handleSelect(city)}
                className="flex items-center gap-2 w-full px-4 py-3 text-left transition-colors hover:bg-[rgba(0,196,255,0.07)]"
              >
                <MapPin size={11} className="text-primary shrink-0" />
                <span className="search-bar__option">{city}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
