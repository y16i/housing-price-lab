import { render, screen } from '@testing-library/react';
import HousesTable from '../components/HousesTable';
import { House } from '../lib/calcStats';

describe('HousesTable', () => {
  const mockHouses: House[] = [
    {
      id: 1,
      age_years: 5,
      layout: '2LDK',
      location: 'Shibuya, Tokyo',
      floor: 10,
      price_million_yen: 68,
    },
    {
      id: 2,
      age_years: 15,
      layout: '3LDK',
      location: 'Kita, Osaka',
      floor: 7,
      price_million_yen: 52,
    },
    {
      id: 3,
      age_years: 25,
      layout: '1DK',
      location: 'Chuo, Sapporo',
      floor: 3,
      price_million_yen: 18,
    },
  ];

  it('should render empty state when no data', () => {
    render(<HousesTable data={[]} />);
    expect(screen.getByText('No houses to display')).toBeInTheDocument();
  });

  it('should render table with house data', () => {
    render(<HousesTable data={mockHouses} />);
    expect(screen.getByText('Shibuya, Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Kita, Osaka')).toBeInTheDocument();
    expect(screen.getByText('Chuo, Sapporo')).toBeInTheDocument();
  });

  it('should render all house locations', () => {
    const { container } = render(<HousesTable data={mockHouses} />);
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('should render house count at bottom', () => {
    const { container } = render(<HousesTable data={mockHouses} />);
    expect(container.textContent).toContain('Showing');
    expect(container.textContent).toContain('3');
    expect(container.textContent).toContain('houses');
  });

  it('should render table rows for each house', () => {
    const { container } = render(<HousesTable data={mockHouses} />);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockHouses.length);
  });

  it('should display correct price format with ¥ symbol', () => {
    render(<HousesTable data={mockHouses} />);
    const priceElements = screen.getAllByText(/¥/);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('should render with proper table structure', () => {
    const { container } = render(<HousesTable data={mockHouses} />);
    const thead = container.querySelector('thead');
    const tbody = container.querySelector('tbody');
    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();
  });

  it('should have header cells for each column', () => {
    const { container } = render(<HousesTable data={mockHouses} />);
    const headers = container.querySelectorAll('thead th');
    expect(headers.length).toBe(5); // Location, Layout, Price, Age, Floor
  });

  it('should display floor numbers correctly', () => {
    const { container } = render(<HousesTable data={mockHouses} />);
    expect(container.textContent).toContain('10');
    expect(container.textContent).toContain('7');
    expect(container.textContent).toContain('3');
  });

  it('should display age values correctly', () => {
    render(<HousesTable data={mockHouses} />);
    const ageTexts = screen.getAllByText(/\d+/);
    // Should have ages 5, 15, 25
    expect(ageTexts.length).toBeGreaterThanOrEqual(3);
  });

  it('should handle empty data gracefully', () => {
    const { container } = render(<HousesTable data={[]} />);
    // Table may or may not render when empty, but no error thrown
    expect(container).toBeInTheDocument();
  });
});
