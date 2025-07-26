import { render, screen } from '@testing-library/react';
import { ResultDisplay } from '../components/ResultDisplay';
import type { SearchResponse } from '../types';

describe('ResultDisplay', () => {
  it('renders exact match result correctly', () => {
    const result: SearchResponse = {
      value: 500,
      index: 4,
      message: 'Exact match found'
    };

    render(<ResultDisplay result={result} />);

    expect(screen.getByText('Search Result')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Exact Match')).toBeInTheDocument();
    expect(screen.getByText('Exact match found')).toBeInTheDocument();
  });

  it('renders approximate match result correctly', () => {
    const result: SearchResponse = {
      value: 500,
      index: 4,
      message: 'Approximate match within 10% tolerance'
    };

    render(<ResultDisplay result={result} />);

    expect(screen.getByText('Search Result')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Approximate Match')).toBeInTheDocument();
    expect(screen.getByText('Approximate match within 10% tolerance')).toBeInTheDocument();
  });

  it('formats large numbers with commas', () => {
    const result: SearchResponse = {
      value: 1000000,
      index: 9999,
      message: 'Exact match found'
    };

    render(<ResultDisplay result={result} />);

    expect(screen.getByText('1,000,000')).toBeInTheDocument();
    expect(screen.getByText('9,999')).toBeInTheDocument();
  });

  it('shows correct badge class for exact match', () => {
    const result: SearchResponse = {
      value: 500,
      index: 4,
      message: 'Exact match found'
    };

    render(<ResultDisplay result={result} />);

    const badge = screen.getByText('Exact Match');
    expect(badge).toHaveClass('badge', 'exact');
  });

  it('shows correct badge class for approximate match', () => {
    const result: SearchResponse = {
      value: 500,
      index: 4,
      message: 'Approximate match within 10% tolerance'
    };

    render(<ResultDisplay result={result} />);

    const badge = screen.getByText('Approximate Match');
    expect(badge).toHaveClass('badge', 'approximate');
  });
}); 