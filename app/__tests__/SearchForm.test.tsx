import { render, screen } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('SearchForm', () => {
  it('should render search form component', () => {
    const { container } = render(<SearchForm />);
    expect(container).toBeInTheDocument();
  });

  it('should render select fields', () => {
    render(<SearchForm />);
    const selects = screen.getAllByRole('combobox');
    expect(selects.length).toBeGreaterThanOrEqual(3);
  });

  it('should render year inputs', () => {
    render(<SearchForm />);
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('should render search button', () => {
    render(<SearchForm />);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('should have form elements present', () => {
    const { container } = render(<SearchForm />);
    expect(container.querySelector('select')).toBeInTheDocument();
  });

  it('should render without errors', () => {
    const { container } = render(<SearchForm />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
