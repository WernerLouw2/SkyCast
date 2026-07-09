import { useMemo } from "react";
import type { Condition } from "../../types/weather";

// ── Sun ────────────────────────────────────────────────────────────────────

function SunSVG({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" overflow="visible">
      <g>
        <animateTransform
          attributeName="transform" type="rotate"
          from="0 50 50" to="360 50 50"
          dur="14s" repeatCount="indefinite"
        />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="46" y="4" width="8" height="16" rx="4"
            fill="#FFD600" transform={`rotate(${i * 45} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="23" fill="#FF9800">
        <animate attributeName="r" values="23;25;23" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="18" fill="#FFD600" />
      <circle cx="43" cy="43" r="5.5" fill="#FFF9C4" opacity="0.45" />
    </svg>
  );
}

// ── Partly Cloudy ──────────────────────────────────────────────────────────

function PartlyCloudySVG({ size }: { size: number }) {
  const uid = useMemo(() => Math.random().toString(36).slice(2, 7), []);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <style>{`
          .pc-${uid}-sun { transform-box:fill-box; transform-origin:center; animation:pcSpin-${uid} 16s linear infinite; }
          @keyframes pcSpin-${uid} { to { transform: rotate(360deg); } }
          .pc-${uid}-cloud { animation: pcDrift-${uid} 5s ease-in-out infinite; }
          @keyframes pcDrift-${uid} { 0%,100%{transform:translateX(0)} 50%{transform:translateX(3px)} }
        `}</style>
      </defs>
      <circle cx="36" cy="35" r="17" fill="#FF9800" opacity="0.9" />
      <circle cx="36" cy="35" r="13" fill="#FFD600" />
      <g className={`pc-${uid}-sun`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x="33.5" y="12" width="5" height="10" rx="2.5"
            fill="#FFD600" transform={`rotate(${i * 60} 36 35)`} opacity="0.75" />
        ))}
      </g>
      <g className={`pc-${uid}-cloud`}>
        <ellipse cx="60" cy="68" rx="28" ry="14" fill="#7B9DB5" />
        <circle cx="45" cy="62" r="14" fill="#7B9DB5" />
        <circle cx="62" cy="56" r="18" fill="#9BBACF" />
        <circle cx="76" cy="63" r="12" fill="#7B9DB5" />
      </g>
    </svg>
  );
}

// ── Cloudy / Mist ──────────────────────────────────────────────────────────

function CloudySVG({ size }: { size: number }) {
  const uid = useMemo(() => Math.random().toString(36).slice(2, 7), []);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <style>{`
          .cl-${uid}-a { animation: clDrift-${uid} 6s ease-in-out infinite; }
          .cl-${uid}-b { animation: clDrift-${uid} 6s ease-in-out infinite 1s; }
          @keyframes clDrift-${uid} { 0%,100%{transform:translateX(0)} 50%{transform:translateX(4px)} }
        `}</style>
      </defs>
      {/* Back cloud */}
      <g className={`cl-${uid}-b`} opacity="0.55">
        <ellipse cx="62" cy="58" rx="26" ry="12" fill="#546E7A" />
        <circle cx="48" cy="52" r="13" fill="#546E7A" />
        <circle cx="66" cy="47" r="16" fill="#607D8B" />
        <circle cx="78" cy="54" r="11" fill="#546E7A" />
      </g>
      {/* Front cloud */}
      <g className={`cl-${uid}-a`}>
        <ellipse cx="50" cy="68" rx="30" ry="14" fill="#78909C" />
        <circle cx="34" cy="62" r="15" fill="#78909C" />
        <circle cx="54" cy="55" r="20" fill="#90A4AE" />
        <circle cx="70" cy="63" r="13" fill="#78909C" />
      </g>
    </svg>
  );
}

// ── Rain ───────────────────────────────────────────────────────────────────

function RainSVG({ size }: { size: number }) {
  const uid = useMemo(() => Math.random().toString(36).slice(2, 7), []);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <style>{`
          @keyframes rn-${uid} { 0%{transform:translateY(-6px);opacity:0} 35%{opacity:.9} 100%{transform:translateY(18px);opacity:0} }
          .rn-${uid}-1{animation:rn-${uid} 1.3s ease-in infinite 0s}
          .rn-${uid}-2{animation:rn-${uid} 1.3s ease-in infinite .32s}
          .rn-${uid}-3{animation:rn-${uid} 1.3s ease-in infinite .65s}
          .rn-${uid}-4{animation:rn-${uid} 1.3s ease-in infinite .18s}
          .rn-${uid}-5{animation:rn-${uid} 1.3s ease-in infinite .48s}
        `}</style>
      </defs>
      {/* Cloud */}
      <ellipse cx="50" cy="42" rx="32" ry="14" fill="#546E7A" />
      <circle cx="34" cy="38" r="15" fill="#546E7A" />
      <circle cx="54" cy="31" r="19" fill="#607D8B" />
      <circle cx="68" cy="39" r="13" fill="#546E7A" />
      {/* Rain drops */}
      <line className={`rn-${uid}-1`} x1="32" y1="62" x2="29" y2="74" stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round" />
      <line className={`rn-${uid}-2`} x1="46" y1="60" x2="43" y2="72" stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round" />
      <line className={`rn-${uid}-3`} x1="60" y1="62" x2="57" y2="74" stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round" />
      <line className={`rn-${uid}-4`} x1="74" y1="60" x2="71" y2="72" stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round" />
      <line className={`rn-${uid}-5`} x1="39" y1="66" x2="36" y2="78" stroke="#64B5F6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Thunderstorm ───────────────────────────────────────────────────────────

function ThunderstormSVG({ size }: { size: number }) {
  const uid = useMemo(() => Math.random().toString(36).slice(2, 7), []);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <style>{`
          @keyframes tsRain-${uid} { 0%{transform:translateY(-6px);opacity:0} 35%{opacity:.9} 100%{transform:translateY(16px);opacity:0} }
          @keyframes tsFlash-${uid} { 0%,75%,100%{opacity:1} 80%,93%{opacity:.08} }
          .ts-${uid}-r1{animation:tsRain-${uid} 1.1s ease-in infinite 0s}
          .ts-${uid}-r2{animation:tsRain-${uid} 1.1s ease-in infinite .27s}
          .ts-${uid}-r3{animation:tsRain-${uid} 1.1s ease-in infinite .55s}
          .ts-${uid}-r4{animation:tsRain-${uid} 1.1s ease-in infinite .13s}
          .ts-${uid}-bolt{animation:tsFlash-${uid} 2.9s ease-in-out infinite}
        `}</style>
      </defs>
      <ellipse cx="50" cy="39" rx="34" ry="15" fill="#34495E" />
      <circle cx="32" cy="35" r="16" fill="#34495E" />
      <circle cx="54" cy="28" r="21" fill="#435F73" />
      <circle cx="72" cy="37" r="14" fill="#34495E" />
      <path d="M55 51 L45 68 L53 68 L43 87 L62 65 L53 65 Z" fill="#FFE135" className={`ts-${uid}-bolt`} />
      <line className={`ts-${uid}-r1`} x1="27" y1="60" x2="24" y2="73" stroke="#82B1FF" strokeWidth="2.5" strokeLinecap="round" />
      <line className={`ts-${uid}-r2`} x1="72" y1="58" x2="69" y2="71" stroke="#82B1FF" strokeWidth="2.5" strokeLinecap="round" />
      <line className={`ts-${uid}-r3`} x1="35" y1="64" x2="32" y2="77" stroke="#82B1FF" strokeWidth="2.5" strokeLinecap="round" />
      <line className={`ts-${uid}-r4`} x1="79" y1="56" x2="76" y2="69" stroke="#82B1FF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Public atom ────────────────────────────────────────────────────────────

interface WeatherIconProps {
  condition: Condition;
  size?: number;
}

export function WeatherIcon({ condition, size = 80 }: WeatherIconProps) {
  if (condition === "sunny") return <SunSVG size={size} />;
  if (condition === "partly-cloudy") return <PartlyCloudySVG size={size} />;
  if (condition === "cloudy") return <CloudySVG size={size} />;
  if (condition === "rain") return <RainSVG size={size} />;
  return <ThunderstormSVG size={size} />;
}
