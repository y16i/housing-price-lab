import { NextRequest, NextResponse } from 'next/server';
import dummyData from '../dummy-data.json';
import { House } from '@/app/lib/calcStats';

// This endpoint works with dummy JSON data by default
// To use PostgreSQL + Drizzle, set USE_DATABASE=true environment variable
// and run: npm run db:generate && npm run db:migrate && npm run db:seed

// CORS headers for local development and production
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || 'http://localhost:4200',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Get filter parameters
    const layout = searchParams.get('layout');
    const minYear = searchParams.get('minYear');
    const maxYear = searchParams.get('maxYear');
    const location = searchParams.get('location');
    const floor = searchParams.get('floor');

    // Filter function
    const filterDummyData = (): House[] => {
      return (dummyData as House[]).filter((house) => {
        if (layout && house.layout !== layout) {
          return false;
        }

        if (minYear && house.age_years < parseInt(minYear)) {
          return false;
        }

        if (maxYear && house.age_years > parseInt(maxYear)) {
          return false;
        }

        if (location && house.location !== location) {
          return false;
        }

        if (floor && house.floor !== parseInt(floor)) {
          return false;
        }

        return true;
      });
    };

    // Check if we should use database or dummy data
    const useDatabase = process.env.USE_DATABASE === 'true';

    let filtered: House[];

    if (useDatabase) {
      try {
        // Dynamic import to avoid errors when DB is not configured
        const { db } = await import('@/app/lib/db');
        const { houses } = await import('@/app/lib/db/schema');
        const { and, eq, gte, lte } = await import('drizzle-orm');

        // Build query conditions
        const conditions = [];

        if (layout) {
          conditions.push(eq(houses.layout, layout));
        }

        if (minYear) {
          conditions.push(gte(houses.age_years, parseInt(minYear)));
        }

        if (maxYear) {
          conditions.push(lte(houses.age_years, parseInt(maxYear)));
        }

        if (location) {
          conditions.push(eq(houses.location, location));
        }

        if (floor) {
          conditions.push(eq(houses.floor, parseInt(floor)));
        }

        // Execute query
        const result = await db.query.houses.findMany({
          where: conditions.length > 0 ? and(...conditions) : undefined,
        });

        filtered = result as House[];
      } catch (dbError) {
        console.warn('Database error, falling back to dummy data:', dbError);
        filtered = filterDummyData();
      }
    } else {
      filtered = filterDummyData();
    }

    return NextResponse.json(filtered, { headers: corsHeaders });
  } catch (error) {
    const errorCode = 'HOUSES_FETCH_ERROR';
    console.error('Error fetching houses:', { error, errorCode });
    return NextResponse.json(
      { error: 'Failed to fetch houses', errorCode },
      { status: 500, headers: corsHeaders }
    );
  }
}
