import { calcStats } from '../lib/calcStats';

describe('calcStats', () => {
  const mockHouses = [
    { price_million_yen: 10, layout: '1DK', year: 2020, location: 'Tokyo', floor: 1 },
    { price_million_yen: 15, layout: '2LDK', year: 2019, location: 'Tokyo', floor: 2 },
    { price_million_yen: 20, layout: '3LDK', year: 2021, location: 'Tokyo', floor: 3 },
  ];

  it('should calculate correct average', () => {
    const stats = calcStats(mockHouses);
    expect(stats.avg).toBe(15);
  });

  it('should calculate correct median', () => {
    const stats = calcStats(mockHouses);
    expect(stats.median).toBe(15);
  });

  it('should find correct minimum price', () => {
    const stats = calcStats(mockHouses);
    expect(stats.min).toBe(10);
  });

  it('should find correct maximum price', () => {
    const stats = calcStats(mockHouses);
    expect(stats.max).toBe(20);
  });

  it('should count correct number of houses', () => {
    const stats = calcStats(mockHouses);
    expect(stats.count).toBe(3);
  });

  it('should handle empty array', () => {
    const stats = calcStats([]);
    expect(stats.count).toBe(0);
    expect(stats.avg).toBe(0);
  });
});
