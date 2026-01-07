'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SummaryCard from '@/app/components/SummaryCard';
import PriceChart from '@/app/components/PriceChart';
import { calcStats, House } from '@/app/lib/calcStats';

interface Filters {
  layout?: string | null;
  minYear?: string | null;
  maxYear?: string | null;
  location?: string | null;
  floor?: string | null;
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        // Get filter parameters from URL
        const layout = searchParams.get('layout');
        const minYear = searchParams.get('minYear');
        const maxYear = searchParams.get('maxYear');
        const location = searchParams.get('location');
        const floor = searchParams.get('floor');

        if (layout) params.append('layout', layout);
        if (minYear) params.append('minYear', minYear);
        if (maxYear) params.append('maxYear', maxYear);
        if (location) params.append('location', location);
        if (floor) params.append('floor', floor);

        const response = await fetch(`/api/houses?${params.toString()}`);
        const houses = await response.json();

        setData(houses);
        setFilters({ layout, minYear, maxYear, location, floor });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  const stats = calcStats(data);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analysis Results</h1>
          <p className="text-gray-600">
            {data.length > 0
              ? `Found ${data.length} properties matching your criteria`
              : 'No properties found matching your criteria'}
          </p>
        </div>

        {/* Summary Statistics */}
        {data.length > 0 && <SummaryCard stats={stats} filters={filters} />}

        {/* Chart */}
        {data.length > 0 && <PriceChart data={data} />}

        {/* Empty State */}
        {data.length === 0 && (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <p className="text-gray-600 mb-6">No properties match your search criteria.</p>
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              Try Different Filters
            </Link>
          </div>
        )}

        {/* Search Again Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-200"
          >
            ← Search Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading results...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
