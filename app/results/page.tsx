'use client';

import { Suspense, useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SummaryCard from '@/app/components/SummaryCard';
import PriceChart from '@/app/components/PriceChart';
import FilterSidebar from '@/app/components/FilterSidebar';
import FilterModal from '@/app/components/FilterModal';
import { calcStats, House } from '@/app/lib/calcStats';
import { FilterValues } from '@/app/types/filters';

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [layout, setLayout] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [location, setLocation] = useState('');
  const [floor, setFloor] = useState('');

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
        setLayout(layout || '');
        setMinYear(minYear || '');
        setMaxYear(maxYear || '');
        setLocation(location || '');
        setFloor(floor || '');
        setFilters({ layout, minYear, maxYear, location, floor });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleFilterChange = (newFilters: FilterValues) => {
    setLayout(newFilters.layout);
    setMinYear(newFilters.minYear);
    setMaxYear(newFilters.maxYear);
    setLocation(newFilters.location);
    setFloor(newFilters.floor);

    const params = new URLSearchParams();
    if (newFilters.layout) params.append('layout', newFilters.layout);
    if (newFilters.minYear) params.append('minYear', newFilters.minYear);
    if (newFilters.maxYear) params.append('maxYear', newFilters.maxYear);
    if (newFilters.location) params.append('location', newFilters.location);
    if (newFilters.floor) params.append('floor', newFilters.floor);

    window.history.replaceState(null, '', `/results?${params.toString()}`);
    setFilters(newFilters);
  };

  const handleReset = () => {
    setLayout('');
    setMinYear('');
    setMaxYear('');
    setLocation('');
    setFloor('');
    setFilters({});
    window.history.replaceState(null, '', '/results');
  };

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
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header with Filter Button for Mobile */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-primary font-medium hover:underline">
              ← Back to Home
            </Link>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="lg:hidden bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Filter
            </button>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Analysis Results</h1>
        </div>

        {/* Results with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters (Hidden on Mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              layout={layout}
              minYear={minYear}
              maxYear={maxYear}
              location={location}
              floor={floor}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>

          {/* Right Side - Results */}
          <div className="lg:col-span-3">
            {/* Results Content */}
            {data.length > 0 ? (
              <div>
                {/* Summary Cards */}
                <SummaryCard stats={stats} filters={filters} />

                {/* Price Chart */}
                <div className="mt-8">
                  <PriceChart data={data} />
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  No data available for the selected filters.
                  <br />
                  Try different filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal (Mobile) */}
      <FilterModal
        isOpen={isFilterModalOpen}
        layout={layout}
        minYear={minYear}
        maxYear={maxYear}
        location={location}
        floor={floor}
        onClose={() => setIsFilterModalOpen(false)}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
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
