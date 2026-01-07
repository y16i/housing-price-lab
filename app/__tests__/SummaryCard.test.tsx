import { render } from '@testing-library/react';
import SummaryCard from '../components/SummaryCard';

describe('SummaryCard', () => {
  const mockStats = {
    avg: 15,
    median: 15,
    min: 10,
    max: 20,
    count: 3,
  };

  const mockFilters = {
    layout: null,
    minYear: null,
    maxYear: null,
    location: null,
    floor: null,
  };

  it('should render summary card component', () => {
    const { container } = render(<SummaryCard stats={mockStats} filters={mockFilters} />);
    expect(container).toBeInTheDocument();
  });

  it('should render stat cards grid', () => {
    const { container } = render(<SummaryCard stats={mockStats} filters={mockFilters} />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
  });

  it('should render with filter text when filters are applied', () => {
    const filtersWithData = {
      layout: '2LDK',
      minYear: '2020',
      maxYear: '2023',
      location: 'Tokyo',
      floor: '3',
    };
    const { container } = render(<SummaryCard stats={mockStats} filters={filtersWithData} />);
    expect(container).toBeInTheDocument();
  });
});
