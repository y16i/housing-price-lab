# Demo: Housing Price Analysis
A Next.js application for analyzing housing prices with filtering and visualization using Echarts.

## Tech Stack

- **Frontend**: Next.js 15+, React 19, TypeScript, Tailwind CSS, EChart
- **Backend**: Next.js 15+, React 19, Typescript
- **Deployment**: Github action, terraform and GCP Cloud Run

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

The app will work with dummy JSON data by default at `/app/api/dummy-data.json`.

### 3. Optional: Setup PostgreSQL with Drizzle

#### Prerequisites
- PostgreSQL database running
- `DATABASE_URL` environment variable set

#### Setup Steps

1. Create `.env.local`:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/housing_db
USE_DATABASE=true
```

2. Generate and run migrations:
```bash
npm run db:generate
npm run db:migrate
```

3. Seed the database with dummy data:
```bash
npm run db:seed
```

4. Start the app:
```bash
npm run dev
```

## Database Schema

The application uses a single `houses` table with the following structure:

```
houses
├── id: serial (primary key)
├── age_years: integer
├── layout: varchar (e.g., "2LDK", "3LDK")
├── location: varchar (e.g., "Shibuya, Tokyo")
├── floor: integer
└── price_million_yen: integer
```

## API Endpoints

### GET `/api/houses`

Returns filtered house data.

**Query Parameters:**
- `layout`: Filter by layout type
- `minYear`: Minimum building age
- `maxYear`: Maximum building age
- `location`: Filter by location
- `floor`: Filter by floor number

**Example:**
```bash
GET /api/houses?layout=2LDK&location=Shibuya,%20Tokyo&minYear=5&maxYear=15
```

## Building for Cloud Run

The application includes a Dockerfile optimized for GCP Cloud Run.

### Build Docker Image

```bash
docker build -t housing-price-lab:latest .
```

### Deploy to Cloud Run
Github actions

```bash
.github/workflows/deploy.yml
```

Terraform:

```bash
infra/terraform
```

## Project Structure

```
app/
├── page.tsx                 # Home/search page
├── results/page.tsx         # Results page
├── api/
│   ├── houses/route.ts      # API endpoint with DB fallback
│   └── dummy-data.json      # Sample data (100 houses)
├── components/
│   ├── SearchForm.tsx       # Filter form
│   ├── SummaryCard.tsx      # Statistics display
│   └── PriceChart.tsx       # Price visualization
├── lib/
│   ├── calcStats.ts         # Statistical calculations
│   └── db/                  # Drizzle database setup
│       ├── index.ts         # Database client
│       ├── schema.ts        # Table definitions
│       └── migrations/      # Generated migrations
├── globals.css              # Global styles
└── layout.tsx               # Root layout

infra/terraform/
├── providers.tf             # GCP provider config
├── variables.tf             # Terraform variables
├── cloudrun.tf              # Cloud Run resources
└── outputs.tf               # Output values

scripts/
└── seed.ts                  # Database seeding script
```

## Environment Variables

```env
# Required for PostgreSQL
DATABASE_URL=postgresql://user:password@host:port/database

# Enable database usage (defaults to false = dummy data)
USE_DATABASE=true

# Node.js
NODE_ENV=production
PORT=3000
```

## Related Project

- [housing-price-lab](https://github.com/y16i/ngx-housing-price-lab) - Angular frontend that consumes this Next.js backend
