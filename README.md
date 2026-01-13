# Housing Price Lab MVP

A Next.js application for analyzing housing prices with filtering and visualization using Echarts.

## Tech Stack

- **Frontend**: Next.js 15+, React 19, TypeScript, Tailwind CSS
- **Charts**: Echarts
- **Database**: PostgreSQL with Drizzle ORM (optional)
- **Deployment**: GCP Cloud Run

## Features

- Filter houses by layout, age, location, and floor
- Calculate and display average price, median, price range
- Visualize price distribution with interactive charts
- Responsive design for all devices
- Works with dummy JSON data out of the box
- Optional PostgreSQL integration with Drizzle ORM

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally (Dummy Data)

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

### Run Container Locally

```bash
docker run -p 3000:3000 -e NODE_ENV=production housing-price-lab:latest
```

### Deploy to Cloud Run

Using Terraform:

```bash
cd infra/terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan \
  -var="project_id=YOUR_PROJECT_ID" \
  -var="image_url=gcr.io/YOUR_PROJECT_ID/housing-price-lab:latest"

# Apply
terraform apply \
  -var="project_id=YOUR_PROJECT_ID" \
  -var="image_url=gcr.io/YOUR_PROJECT_ID/housing-price-lab:latest"
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

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database with dummy data

## Testing

The application comes with 100 sample houses across various Japanese cities:
- Tokyo (Shibuya, Chuo)
- Osaka (Kita, Naka)
- Sapporo (Chuo)
- Yokohama (Kohoku)
- Nagoya (Naka)
- Fukuoka (Hakata)
- Kyoto (Sakyo)
- Sendai (Aoba)
- Kobe (Chuo)
- Saitama (Omiya)

### Test Filters

Try these filter combinations:

1. Layout: 2LDK, Location: Shibuya, Tokyo
2. Age Range: 0-10 years
3. Floor: 5+
4. Location: Kita, Osaka + Layout: 3LDK

## Performance

- Stateless API design suitable for serverless
- Efficient filtering with early returns
- Optimized Echarts visualization
- CSS-in-JS with Tailwind for minimal bundle
- NextJS automatic code splitting

## License

See LICENSE file
