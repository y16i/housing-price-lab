'use client';

import { Stats } from '@/app/lib/calcStats';

interface SummaryCardProps {
  stats: Stats;
  filters: {
    layout?: string | null;
    minYear?: string | null;
    maxYear?: string | null;
    location?: string | null;
    floor?: string | null;
  };
}

export default function SummaryCard({ stats, filters }: SummaryCardProps) {
  const filterText = [
    filters.layout && `${filters.layout}`,
    filters.minYear && filters.maxYear && `${filters.minYear}-${filters.maxYear}y`,
    filters.location && `${filters.location}`,
    filters.floor && `${filters.floor}F`,
  ]
    .filter(Boolean)
    .join(' | ');

  return (
    <div className="mb-8">
      {filterText && <p className="text-sm text-gray-600 mb-4 font-medium">{filterText}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Average Price */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-600 font-medium mb-1">Average Price</p>
          <p className="text-2xl font-bold text-gray-800">¥{stats.avg.toFixed(1)}M</p>
        </div>

        {/* Median */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-600 font-medium mb-1">Median</p>
          <p className="text-2xl font-bold text-gray-800">¥{stats.median.toFixed(1)}M</p>
        </div>

        {/* Price Range */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-600 font-medium mb-1">Range</p>
          <p className="text-2xl font-bold text-gray-800">
            ¥{stats.min}M - ¥{stats.max}M
          </p>
        </div>

        {/* Count */}
        <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-600 font-medium mb-1">Count</p>
          <p className="text-2xl font-bold text-gray-800">{stats.count}</p>
        </div>
      </div>
    </div>
  );
}
