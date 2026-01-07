'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LAYOUTS = ['1DK', '2LDK', '3DK', '3LDK', '4LDK', '5LDK'];
const LOCATIONS = [
  'Shibuya, Tokyo',
  'Kita, Osaka',
  'Chuo, Sapporo',
  'Kohoku, Yokohama',
  'Naka, Nagoya',
  'Hakata, Fukuoka',
  'Sakyo, Kyoto',
  'Aoba, Sendai',
  'Chuo, Kobe',
  'Omiya, Saitama',
];
const FLOORS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export default function SearchForm() {
  const router = useRouter();
  const [layout, setLayout] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');
  const [location, setLocation] = useState('');
  const [floor, setFloor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (layout) params.append('layout', layout);
      if (minYear) params.append('minYear', minYear);
      if (maxYear) params.append('maxYear', maxYear);
      if (location) params.append('location', location);
      if (floor) params.append('floor', floor);

      // Encode the state as JSON in query params
      const state = {
        layout,
        minYear,
        maxYear,
        location,
        floor,
      };

      router.push(
        `/results?${params.toString()}&state=${encodeURIComponent(JSON.stringify(state))}`
      );
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Filters</h2>

      {/* Layout */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All Layouts</option>
          {LAYOUTS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Year Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Year</label>
          <input
            type="number"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Year</label>
          <input
            type="number"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
            placeholder="30"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All Locations</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Floor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
        <select
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All Floors</option>
          {FLOORS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
