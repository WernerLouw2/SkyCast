import type { Unit } from "../types/weather";

export const cToF = (c: number): number => Math.round((c * 9) / 5 + 32);

export const displayTemp = (c: number, unit: Unit): number =>
  unit === "C" ? c : cToF(c);

export const tempStr = (c: number, unit: Unit): string =>
  `${displayTemp(c, unit)}°`;

