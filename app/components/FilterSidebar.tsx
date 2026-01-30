'use client';

import { useState, useEffect } from 'react';
<<<<<<< HEAD
import { FilterValues } from '@/app/types/filters';
=======
>>>>>>> 564451c (feat: add filter to result page)

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

interface FilterSidebarProps {
  layout: string;
  minYear: string;
  maxYear: string;
  location: string;
  floor: string;
<<<<<<< HEAD
  onFilterChange: (_filters: FilterValues) => void;
=======
>>>>>>> 564451c (feat: add filter to result page)
  onReset: () => void;
}

export default function FilterSidebar({
  layout,
  minYear,
  maxYear,
  location,
  floor,
  onFilterChange,
  onReset,
}: FilterSidebarProps) {
  const [localLayout, setLocalLayout] = useState(layout);
  const [localMinYear, setLocalMinYear] = useState(minYear);
  const [localMaxYear, setLocalMaxYear] = useState(maxYear);
  const [localLocation, setLocalLocation] = useState(location);
  const [localFloor, setLocalFloor] = useState(floor);

  useEffect(() => {
    setLocalLayout(layout);
    setLocalMinYear(minYear);
    setLocalMaxYear(maxYear);
    setLocalLocation(location);
    setLocalFloor(floor);
  }, [layout, minYear, maxYear, location, floor]);

  const handleChange = () => {
    onFilterChange({
      layout: localLayout,
      minYear: localMinYear,
      maxYear: localMaxYear,
      location: localLocation,
      floor: localFloor,
    });
  };

  const handleReset = () => {
    setLocalLayout('');
    setLocalMinYear('');
    setLocalMaxYear('');
    setLocalLocation('');
    setLocalFloor('');
    onReset();
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-sm p-6 sticky top-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Refine Filters</h2>

      {/* Layout */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
        <select
          value={localLayout}
          onChange={(e) => {
            setLocalLayout(e.target.value);
            handleChange();
          }}
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Min Year</label>
        <input
          type="number"
          value={localMinYear}
          onChange={(e) => {
            setLocalMinYear(e.target.value);
            handleChange();
          }}
          placeholder="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Max Year</label>
        <input
          type="number"
          value={localMaxYear}
          onChange={(e) => {
            setLocalMaxYear(e.target.value);
            handleChange();
          }}
          placeholder="50"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <select
          value={localLocation}
          onChange={(e) => {
            setLocalLocation(e.target.value);
            handleChange();
          }}
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
        <select
          value={localFloor}
          onChange={(e) => {
            setLocalFloor(e.target.value);
            handleChange();
          }}
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

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
}
