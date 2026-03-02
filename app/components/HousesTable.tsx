'use client';

import { useState, useMemo } from 'react';
import { House } from '@/app/lib/calcStats';

type SortColumn = 'location' | 'layout' | 'price' | 'age' | 'floor' | null;
type SortDirection = 'asc' | 'desc';

interface HousesTableProps {
  data: House[];
}

export default function HousesTable({ data }: HousesTableProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and reset to ascending
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    const sorted = [...data].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortColumn) {
        case 'location':
          aVal = a.location;
          bVal = b.location;
          break;
        case 'layout':
          aVal = a.layout;
          bVal = b.layout;
          break;
        case 'price':
          aVal = a.price_million_yen;
          bVal = b.price_million_yen;
          break;
        case 'age':
          aVal = a.age_years;
          bVal = b.age_years;
          break;
        case 'floor':
          aVal = a.floor;
          bVal = b.floor;
          break;
        default:
          return 0;
      }

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  }, [data, sortColumn, sortDirection]);

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) {
      return <span className="text-gray-400 ml-1">↕</span>;
    }
    return <span className="text-blue-600 ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  const HeaderCell = ({ column, label }: { column: SortColumn; label: string }) => (
    <th
      onClick={() => handleSort(column)}
      className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-200 transition-colors"
    >
      <div className="flex items-center">
        {label}
        <SortIcon column={column} />
      </div>
    </th>
  );

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <p className="text-gray-600">No houses to display</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <HeaderCell column="location" label="Location" />
              <HeaderCell column="layout" label="Layout" />
              <HeaderCell column="price" label="Price (¥M)" />
              <HeaderCell column="age" label="Age (Years)" />
              <HeaderCell column="floor" label="Floor" />
            </tr>
          </thead>
          <tbody>
            {sortedData.map((house, index) => (
              <tr
                key={house.id}
                className={`border-b border-gray-200 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50`}
              >
                <td className="px-6 py-4 text-sm text-gray-900">{house.location}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{house.layout}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ¥{house.price_million_yen.toFixed(2)}M
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{house.age_years}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{house.floor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{data.length}</span> houses
        </p>
      </div>
    </div>
  );
}
