import { render, screen } from '@testing-library/react';
import PriceChart from '../components/PriceChart';

// Mock echarts to avoid DOM manipulation issues in tests
jest.mock('echarts', () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
  })),
}));

describe('PriceChart', () => {
  const mockData = [
    { price_million_yen: 10, layout: '1DK', year: 2020, location: 'Tokyo', floor: 1 },
    { price_million_yen: 15, layout: '2LDK', year: 2019, location: 'Tokyo', floor: 2 },
    { price_million_yen: 20, layout: '3LDK', year: 2021, location: 'Tokyo', floor: 3 },
  ];

  it('should render empty state when no data', () => {
    render(<PriceChart data={[]} />);
    expect(screen.getByText('No data available for the selected filters')).toBeInTheDocument();
  });

  it('should render chart container with data', () => {
    const { container } = render(<PriceChart data={mockData} />);
    expect(container.querySelector('div[style*="height: 300px"]')).toBeInTheDocument();
  });

  it('should display title', () => {
    render(<PriceChart data={mockData} />);
    expect(screen.getByText('Price Distribution')).toBeInTheDocument();
  });
});
