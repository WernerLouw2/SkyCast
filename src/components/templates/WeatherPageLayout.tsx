import type { ReactNode } from "react";

interface WeatherPageLayoutProps {
  header: ReactNode;
  mainCard: ReactNode;
}


export function WeatherPageLayout({ header, mainCard }: WeatherPageLayoutProps) {
 

  return (
    <div
      className="min-h-screen bg-[#05101f] text-[#c8dff5]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      

      {/* Page content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6 min-h-screen">
        {header}
        {mainCard}
        
      </div>
    </div>
  );
}
