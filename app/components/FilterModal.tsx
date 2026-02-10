'use client';

import { useState, useEffect } from 'react';
import { FilterValues } from '@/app/types/filters';

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

interface FilterModalProps {
  isOpen: boolean;
  layout: string;
  minYear: string;
  maxYear: string;
  location: string;
  floor: string;
  onClose: () => void;
  onFilterChange: (_filters: FilterValues) => void;
  onReset: () => void;
}

export default function FilterModal({
  isOpen,
  layout,
  minYear,
  maxYear,
  location,
  floor,
  onClose,
  onFilterChange,
  onReset,
}: FilterModalProps) {
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

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Modal */}
      <div className="flex items-end lg:items-center justify-center min-h-screen px-4 py-4">
        <div
          className="relative bg-white rounded-t-3xl lg:rounded-2xl shadow-xl w-full lg:max-w-md max-h-[90vh] overflow-y-auto"
          onClick={handleModalClick}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ✕
            </button>
          </div>

          {/* Modal Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Layout */}
            <div>
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
            <div>
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

            <div>
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
            <div>
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
            <div>
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
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 space-y-3">
            <button
              onClick={handleReset}
              className="w-full bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Reset Filters
            </button>
            <button
              onClick={onClose}
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
