# AI Coding Agent Instructions for Housing Price Lab

## Project Overview

**Housing Price Lab** is an MVP web application for analyzing housing prices with filtering and visualization. It consists of two deployable applications:

- **housing-price-lab** (primary): Next.js 15 + React 19 + TypeScript + Echarts frontend with optional PostgreSQL backend
- **ngx-housing-price-lab** (companion): Angular 18 + Tailwind CSS alternative frontend

This guide focuses on `housing-price-lab` (Next.js project).

## Architecture & Data Flow

### Core User Flow
1. User inputs filter criteria (layout, age, location, floor) on home page
2. Form submission queries `/api/houses` with filter parameters
3. API returns filtered house records (from dummy JSON or PostgreSQL)
4. Results page displays statistics and price distribution chart

### Component Hierarchy

```
app/
├── page.tsx (Home - SearchForm)
├── results/page.tsx (Results - SummaryCard + PriceChart)
├── components/
│   ├── SearchForm.tsx (Client) - Input controls, navigation
│   ├── SummaryCard.tsx (Client) - Displays avg/median/min/max/count
│   └── PriceChart.tsx (Client) - Echarts histogram of price buckets
├── lib/
│   ├── calcStats.ts - Statistics calculation (avg, median, min, max)
│   └── db/ - Drizzle ORM database layer (conditional import)
└── api/houses/route.ts - Filtering logic (supports dummy data + PostgreSQL)
```

### Data Models

All filtering logic centers on the `House` interface:

```typescript
interface House {
  id: number;
  age_years: number;
  layout: string; // e.g., "1DK", "2LDK", "3LDK"
  location: string; // e.g., "Shibuya, Tokyo"
  floor: number;
  price_million_yen: number;
}
```

The `Stats` interface is computed from filtered houses:

```typescript
interface Stats {
  avg: number;
  median: number;
  min: number;
  max: number;
  count: number;
}
```

## Critical Developer Workflows

### Running the Application

**Development mode** (dummy data by default):
```bash
npm run dev  # Runs Next.js on http://localhost:3000
```

**With PostgreSQL**:
```bash
DATABASE_URL=postgresql://... USE_DATABASE=true npm run dev
```

### Database Management

- **Generate migrations**: `npm run db:generate` (Drizzle Kit)
- **Run migrations**: `npm run db:migrate`
- **Seed data**: `npm run db:seed` (runs `scripts/seed.ts`)
- **Schema**: [app/lib/db/schema.ts](app/lib/db/schema.ts) defines the `houses` table

Database mode is conditional via environment variable `USE_DATABASE=true` in [app/api/houses/route.ts](app/api/houses/route.ts#L49).

### Testing & Quality

- **Run tests**: `npm test` or `npm run test:watch`
- **Coverage report**: `npm run test:coverage`
- **Linting**: `npm run lint` (zero-warning policy: `--max-warnings 0`)
- **Formatting**: `npm run format` (Prettier) or `npm run format:check`
- **Commit linting**: Uses `commitlint` with conventional commits

Test files are colocated in `app/__tests__/` following Jest config patterns.

## Project-Specific Patterns & Conventions

### Dual-Mode API Design

The `/api/houses` endpoint supports two data sources without code duplication:

- **Default (dummy data)**: Reads from [app/api/dummy-data.json](app/api/dummy-data.json) (803 records)
- **Database mode**: Queries PostgreSQL via Drizzle ORM using same filter parameters

Both paths return identical `House[]` structures. When `USE_DATABASE=false` (default), the dummy JSON is used to avoid database setup friction.

**Example filters applied in both paths**:
- `layout` (exact match string)
- `minYear` / `maxYear` (age_years range, inclusive)
- `location` (exact match string)
- `floor` (exact match integer)

All filter parameters are **optional** and combined with AND logic.

### Client-Side State Management

Search form state is persisted in URL query parameters **AND** encoded as JSON in `state` query param. This enables:
- Browser back/forward navigation
- Bookmark-able results
- Filter reconstruction on results page

Example: `/results?layout=2LDK&location=Shibuya,%20Tokyo&state=%7B...%7D`

### Echarts Implementation

[app/components/PriceChart.tsx](app/components/PriceChart.tsx) manages an Echarts histogram with:
- Automatic bucket generation (8 buckets from min/max range)
- Client-side chart instance initialization (separate from React renders)
- Manual resize handling on window resize events
- Proper cleanup on unmount to prevent memory leaks

Chart binds to a ref div and updates via `setOption()` when data changes. This is the standard Echarts pattern for React.

### Statistics Calculation

[app/lib/calcStats.ts](app/lib/calcStats.ts) handles edge cases:
- Empty arrays return all-zero stats
- Median correctly handles even/odd-length arrays
- Uses spread operator to avoid mutating input array

### "Use Client" Directive

All components that use React hooks (`useState`, `useEffect`, `useRouter`) require `'use client'` directive since they're interactive:
- SearchForm
- PriceChart  
- ResultsPage (ResultsContent)

Avoid server-side data fetching in client components; fetch on client side using native `fetch()` or similar.

## Integration Points & Dependencies

### External Dependencies

- **echarts**: Version 6.0.0+ for charting
- **echarts-for-react**: React wrapper (v3.0.5)
- **drizzle-orm**: ORM for optional PostgreSQL (v0.45.1+)
- **pg**: PostgreSQL driver (v8.16.3+)
- **next**: Framework (v16.1.1+)
- **react**: UI library (v18.3.1+)

### Build & Deploy

- **Build**: `npm run build` → creates `.next/` directory
- **Start**: `npm start` → serves production build
- **Deployment target**: GCP Cloud Run (see [Dockerfile](Dockerfile) and [DEPLOYMENT.md](../DEPLOYMENT.md))

## Common Pitfalls & Solutions

1. **Empty filter edge case**: Ensure `calcStats()` returns zeros when array is empty; don't divide by zero
2. **Echarts not rendering**: Chart must mount in DOM before `init()` call; check `chartRef.current` is not null
3. **Database import errors**: Use dynamic imports in conditional blocks to avoid hard failures when DB is disabled
4. **CORS issues**: API sets CORS headers based on `ALLOWED_ORIGIN` env var (default `http://localhost:4200` for Angular frontend)
5. **Type safety**: Always use House/Stats types from [app/lib/calcStats.ts](app/lib/calcStats.ts) to catch mismatches

## File Locations Reference

| Purpose | File |
|---------|------|
| Home page | [app/page.tsx](app/page.tsx) |
| Results page | [app/results/page.tsx](app/results/page.tsx) |
| Filter form | [app/components/SearchForm.tsx](app/components/SearchForm.tsx) |
| Stats display | [app/components/SummaryCard.tsx](app/components/SummaryCard.tsx) |
| Chart component | [app/components/PriceChart.tsx](app/components/PriceChart.tsx) |
| Calc logic | [app/lib/calcStats.ts](app/lib/calcStats.ts) |
| API filtering | [app/api/houses/route.ts](app/api/houses/route.ts) |
| DB schema | [app/lib/db/schema.ts](app/lib/db/schema.ts) |
| Dummy data | [app/api/dummy-data.json](app/api/dummy-data.json) |
| Specs | [specifications/](specifications/) |
