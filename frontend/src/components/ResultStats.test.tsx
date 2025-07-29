import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { SearchResponse } from '@/types'
import { ResultStats } from './ResultStats'

describe('ResultStats', () => {
  const exactMatchResult: SearchResponse = {
    value: 100,
    index: 10,
    message: 'Exact match found',
  }

  const approximateMatchResult: SearchResponse = {
    value: 95,
    index: 9,
    message: 'Approximate match found',
  }

  it('renders all stat fields correctly', () => {
    render(<ResultStats result={exactMatchResult} isExactMatch={true} />)

    expect(screen.getByText('Value:')).toBeInTheDocument()
    expect(screen.getByText('Index:')).toBeInTheDocument()
    expect(screen.getByText('Type:')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Exact Match')).toBeInTheDocument()
  })

  it('displays exact match type badge correctly', () => {
    render(<ResultStats result={exactMatchResult} isExactMatch={true} />)

    const typeBadge = screen.getByText('Exact Match')
    expect(typeBadge).toHaveClass(
      'border-green-200',
      'bg-green-100',
      'text-green-800',
      'dark:border-green-800',
      'dark:bg-green-900',
      'dark:text-green-200'
    )
  })

  it('displays approximate match type badge correctly', () => {
    render(<ResultStats result={approximateMatchResult} isExactMatch={false} />)

    const typeBadge = screen.getByText('Approximate Match')
    expect(typeBadge).toHaveClass(
      'border-orange-200',
      'bg-orange-100',
      'text-orange-800',
      'dark:border-orange-800',
      'dark:bg-orange-900',
      'dark:text-orange-200'
    )
  })

  it('formats large numbers with locale formatting', () => {
    const largeNumberResult: SearchResponse = {
      value: 1000000,
      index: 50000,
      message: 'Exact match found',
    }

    render(<ResultStats result={largeNumberResult} isExactMatch={true} />)

    // Test that numbers are formatted (with any locale format)
    expect(
      screen.getByText((_, element) => {
        return (
          element?.textContent === '1,000,000' ||
          element?.textContent === '1 000 000'
        )
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText((_, element) => {
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

    render(<ResultStats result={zeroResult} isExactMatch={true} />)

    const zeros = screen.getAllByText('0')
    expect(zeros).toHaveLength(2) // Both value and index
  })

  it('has correct layout structure', () => {
    render(<ResultStats result={exactMatchResult} isExactMatch={true} />)

    // Look for the grid container that wraps all the stat rows
    const statsContainer = screen.getByText('Value:').closest('[class*="grid"]')
    expect(statsContainer).toHaveClass('grid', 'gap-3')
  })

  it('displays labels with correct styling', () => {
    render(<ResultStats result={exactMatchResult} isExactMatch={true} />)

    const valueLabel = screen.getByText('Value:')
    const indexLabel = screen.getByText('Index:')
    const typeLabel = screen.getByText('Type:')

    expect(valueLabel).toHaveClass(
      'text-sm',
      'font-medium',
      'text-muted-foreground'
    )
    expect(indexLabel).toHaveClass(
      'text-sm',
      'font-medium',
      'text-muted-foreground'
    )
    expect(typeLabel).toHaveClass(
      'text-sm',
      'font-medium',
      'text-muted-foreground'
    )
  })

  it('displays values with correct styling', () => {
    render(<ResultStats result={exactMatchResult} isExactMatch={true} />)

    const valueElement = screen.getByText('100')
    const indexElement = screen.getByText('10')

    expect(valueElement).toHaveClass('font-mono', 'text-lg', 'font-semibold')
    expect(indexElement).toHaveClass('font-mono', 'text-lg', 'font-semibold')
  })
})
