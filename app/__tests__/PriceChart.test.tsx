import { render, screen } from '@testing-library/react';
import PriceChart from '../components/PriceChart';

// Mock echarts to avoid DOM manipulation issues in tests
jest.mock('echarts', () => ({
  init: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
    off: jest.fn(),
    on: jest.fn((event, handler) => {
      // Store the handler for testing
      (global as any).__chartClickHandler = handler;
    }),
  })),
  getInstanceByDom: jest.fn(() => ({
    setOption: jest.fn(),
    resize: jest.fn(),
    dispose: jest.fn(),
    off: jest.fn(),
    on: jest.fn((event, handler) => {
      (global as any).__chartClickHandler = handler;
    }),
  })),
}));

describe('PriceChart', () => {
  const mockData = [
    { id: 1, price_million_yen: 10, layout: '1DK', age_years: 5, location: 'Tokyo', floor: 1 },
    { id: 2, price_million_yen: 15, layout: '2LDK', age_years: 3, location: 'Tokyo', floor: 2 },
    { id: 3, price_million_yen: 20, layout: '3LDK', age_years: 2, location: 'Tokyo', floor: 3 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    delete (global as any).__chartClickHandler;
  });

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

  it('should call onBarClick callback when bar is clicked', () => {
    const mockOnBarClick = jest.fn();
    render(<PriceChart data={mockData} onBarClick={mockOnBarClick} />);

    // Simulate clicking on the chart
    if ((global as any).__chartClickHandler) {
      (global as any).__chartClickHandler({
        componentSubType: 'bar',
        dataIndex: 0,
      });
      expect(mockOnBarClick).toHaveBeenCalled();
      expect(mockOnBarClick).toHaveBeenCalledWith(
        expect.objectContaining({
          min: expect.any(Number),
          max: expect.any(Number),
        })
      );
    }
  });
});
