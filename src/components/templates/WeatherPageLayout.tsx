import type { ReactNode } from "react";

interface WeatherPageLayoutProps {
  header: ReactNode;
  mainCard: ReactNode;
  timeline: ReactNode;
}

export function WeatherPageLayout({ header, mainCard, timeline }: WeatherPageLayoutProps) {
  return (
    <div className="font-sans min-h-screen bg-background text-foreground">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6 min-h-screen">
        {header}
        {mainCard}
        {timeline}
      </div>
    </div>
  );
}
