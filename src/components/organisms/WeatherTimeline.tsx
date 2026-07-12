import { DayTile } from "../../components/molecules/DayTile";
import { type DayWeather, type Unit } from "../../types/weather";

interface WeatherTimelineProps {
  days: DayWeather[];
  selectedId: string;
  unit: Unit;
  onSelect: (id: string) => void;
}

export function WeatherTimeline({ days, selectedId, unit, onSelect }: WeatherTimelineProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="grid grid-cols-7 text-[9px] tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#4e6e90" }}
      >
        <div className="col-span-3 text-center">← 3-Day History</div>
        <div className="text-center" style={{ color: "#00c4ff" }}>Today</div>
        <div className="col-span-3 text-center">3-Day Forecast →</div>
      </div>

      <div className="grid grid-cols-[3fr_1px_1fr_1px_3fr] items-center">
        <div className="h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,196,255,0.2))" }} />
        <div className="w-px h-3" style={{ background: "rgba(0,196,255,0.2)" }} />
        <div />
        <div className="w-px h-3" style={{ background: "rgba(0,196,255,0.2)" }} />
        <div className="h-px" style={{ background: "linear-gradient(to left, transparent, rgba(0,196,255,0.2))" }} />
      </div>

      <div className="overflow-x-auto -mx-4 px-4 pb-1">
        <div className="grid grid-cols-7 gap-2 min-w-[560px]">
          {days.map((day) => (
            <DayTile
              key={day.id}
              day={day}
              isSelected={day.id === selectedId}
              unit={unit}
              onSelect={() => onSelect(day.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
