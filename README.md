# SkyCast

A small React weather app that shows current conditions, a 7-day timeline (3 past + today + 3 forecast), and unit/city preferences. Forecast data comes from the [Open-Meteo](https://open-meteo.com/) API.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Vitest + Testing Library
- [Lucide React](https://lucide.dev/) for icons
- shadcn-style theming (CSS variables / design tokens in `src/styles/theme.css`)
- Motion for light UI animation

## Prerequisites

- Node.js 20+ (recommended)
- [pnpm](https://pnpm.io/)

## Setup

```bash
pnpm install
```

## Run

```bash
# Development server (default: http://localhost:5173)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview
```

## Test

```bash
# Watch mode
pnpm test

# Single run
pnpm test --run
```

## Lint

```bash
pnpm lint
```

## Project structure

```
src/
  api/           Open-Meteo fetch + geocoding
  components/    Atomic design: atoms → molecules → organisms → templates
  hooks/         React hooks (e.g. useForecast)
  styles/        Tailwind entry + theme tokens
  utils/         Temperature, WMO mapping, response transforms
  test/          Test setup + fixtures
```

## Design decisions and trade-offs

### Atomic design components
UI is split into atoms, molecules, organisms, and templates so pieces stay small and reusable. Trade-off: more files and a bit more wiring, but clearer ownership when styling or testing a single piece (e.g. `DayTile` vs the whole timeline).

### shadcn-inspired theme + Lucide icons
Styling follows a shadcn-style token system (CSS variables for color, radius, fonts) with Tailwind utilities on top, and [Lucide React](https://lucide.dev/) for icons. Trade-off: we did not pull in the full `shadcn/ui` component library—tokens and patterns are used, while components are custom. That keeps the bundle smaller and the UI fully tailored to SkyCast, at the cost of not getting ready-made accessible primitives out of the box.

### Open-Meteo JSON over the FlatBuffers SDK
The app uses plain `fetch` against the Open-Meteo JSON forecast and geocoding endpoints. Trade-off: the official `openmeteo` npm package is FlatBuffers-oriented and a poorer fit for our typed JSON models. JSON is easier to inspect and map into UI types; FlatBuffers would be more efficient for large payloads we don’t need yet.

### City search = local list + geocoding
Search suggestions come from a fixed city list; selecting one geocodes the name, then loads forecast. If geocoding fails, the API falls back to Cape Town. Trade-off: fast and offline-friendly suggestions, but not a full world search. Expanding later would mean live geocoding suggestions instead of a static list.

### Preferences in `localStorage`
Unit, city, and selected day are stored in `localStorage` so they survive refresh. Trade-off: simple and dependency-free; no sync across devices or accounts.

### Custom weather icons (SVG) instead of icon packs
Condition icons are hand-built SVGs with light SMIL/CSS motion. Trade-off: distinct look and no extra weather-icon dependency; more work to maintain and less variety than a large icon set.

### Testing focus
Core flows are covered at the App / organism / hook level. Pure utils (`temperature`, `wmo`, `weatherTransform`) and the Open-Meteo client still need dedicated unit tests—see the project test checklist if you extend coverage.

## Notes

- First load may prompt for browser location depending on how you wire the forecast hook; city search always works from the header.
- No API key is required for Open-Meteo’s free forecast/geocoding endpoints.
