export interface House {
  id: number;
  age_years: number;
  layout: string;
  location: string;
  floor: number;
  price_million_yen: number;
}

export interface Stats {
  avg: number;
  median: number;
  min: number;
  max: number;
  count: number;
}

export function calcStats(filteredData: House[]): Stats {
  if (filteredData.length === 0) {
    return { avg: 0, median: 0, min: 0, max: 0, count: 0 };
  }

  const prices = filteredData.map((d) => d.price_million_yen);

  // Calculate average
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;

  // Calculate median
  const sorted = [...prices].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // Get min and max
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return { avg, median, min, max, count: prices.length };
}
