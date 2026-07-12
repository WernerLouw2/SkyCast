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
      <div className="timeline__labels grid grid-cols-7 text-[9px] tracking-widest uppercase">
        <div className="col-span-3 text-center">← 3-Day History</div>
        <div className="text-center text-primary">Today</div>
        <div className="col-span-3 text-center">3-Day Forecast →</div>
      </div>

      <div className="grid grid-cols-[3fr_1px_1fr_1px_3fr] items-center">
        <div className="timeline__rule--fade-right h-px" />
        <div className="timeline__rule w-px h-3" />
        <div />
        <div className="timeline__rule w-px h-3" />
        <div className="timeline__rule--fade-left h-px" />
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
