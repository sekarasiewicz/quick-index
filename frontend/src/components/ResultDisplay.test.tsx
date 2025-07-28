import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { SearchResponse } from '@/types'
import { ResultDisplay } from './ResultDisplay'

describe('ResultDisplay', () => {
  it('renders exact match result correctly', () => {
    const exactMatchResult: SearchResponse = {
      value: 100,
      index: 10,
      message: 'Exact match found for value 100 at index 10',
    }

    render(<ResultDisplay result={exactMatchResult} />)

    expect(screen.getByText('Exact Match Found!')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Exact Match')).toBeInTheDocument()
    expect(screen.getByText(exactMatchResult.message)).toBeInTheDocument()
  })

  it('renders approximate match result correctly', () => {
    const approximateMatchResult: SearchResponse = {
      value: 95,
      index: 9,
      message: 'Approximate match found for value 95 at index 9',
    }

    render(<ResultDisplay result={approximateMatchResult} />)

    expect(screen.getByText('Approximate Match Found')).toBeInTheDocument()
    expect(screen.getByText('95')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('Approximate Match')).toBeInTheDocument()
    expect(screen.getByText(approximateMatchResult.message)).toBeInTheDocument()
  })

  it('applies correct styling for exact match', () => {
    const exactMatchResult: SearchResponse = {
      value: 100,
      index: 10,
      message: 'Exact match found',
    }

    render(<ResultDisplay result={exactMatchResult} />)

    const card = screen.getByTestId('result-card')
    expect(card).toHaveClass('border-green-200', 'bg-green-50')
  })

  it('applies correct styling for approximate match', () => {
    const approximateMatchResult: SearchResponse = {
      value: 95,
      index: 9,
      message: 'Approximate match found',
    }

    render(<ResultDisplay result={approximateMatchResult} />)

    const card = screen.getByTestId('result-card')
    expect(card).toHaveClass('border-orange-200', 'bg-orange-50')
  })

  it('formats large numbers with locale formatting', () => {
    const largeNumberResult: SearchResponse = {
      value: 1000000,
      index: 50000,
      message: 'Exact match found',
    }

    render(<ResultDisplay result={largeNumberResult} />)

    // Test that numbers are formatted (with any locale format)
    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === '1,000,000' ||
          element?.textContent === '1 000 000'
        )
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText((content, element) => {
        return (
          element?.textContent === '50,000' || element?.textContent === '50 000'
        )
      })
    ).toBeInTheDocument()
  })

  it('handles zero values correctly', () => {
    const zeroResult: SearchResponse = {
      value: 0,
      index: 0,
      message: 'Exact match found at index 0',
    }

    render(<ResultDisplay result={zeroResult} />)

    const zeros = screen.getAllByText('0')
    expect(zeros).toHaveLength(2) // Both value and index
  })

  it('displays correct icons for exact match', () => {
    const exactMatchResult: SearchResponse = {
      value: 100,
      index: 10,
      message: 'Exact match found',
    }

    render(<ResultDisplay result={exactMatchResult} />)

    // Check for CheckCircle icon (exact match)
    const checkIcon = screen.getByTestId('check-circle-icon')
    expect(checkIcon).toBeInTheDocument()
  })

  it('displays correct icons for approximate match', () => {
    const approximateMatchResult: SearchResponse = {
      value: 95,
      index: 9,
      message: 'Approximate match found',
    }

    render(<ResultDisplay result={approximateMatchResult} />)

    // Check for AlertTriangle icon (approximate match)
    const alertIcon = screen.getByTestId('alert-triangle-icon')
    expect(alertIcon).toBeInTheDocument()
  })

  it('handles long messages correctly', () => {
    const longMessageResult: SearchResponse = {
      value: 100,
      index: 10,
      message:
        'This is a very long message that should be displayed properly without breaking the layout or causing any rendering issues in the component',
    }

    render(<ResultDisplay result={longMessageResult} />)

    expect(screen.getByText(longMessageResult.message)).toBeInTheDocument()
  })

  it('renders all required data fields', () => {
    const result: SearchResponse = {
      value: 123,
      index: 45,
      message: 'Test message',
    }

    render(<ResultDisplay result={result} />)

    expect(screen.getByText('Value:')).toBeInTheDocument()
    expect(screen.getByText('Index:')).toBeInTheDocument()
    expect(screen.getByText('Type:')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(screen.getByText('45')).toBeInTheDocument()
  })

  it('handles special characters in message', () => {
    const specialMessageResult: SearchResponse = {
      value: 100,
      index: 10,
      message: 'Message with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
    }

    render(<ResultDisplay result={specialMessageResult} />)

    expect(screen.getByText(specialMessageResult.message)).toBeInTheDocument()
  })
})
