import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { SearchResponse } from '@/types'
import { ResultMessage } from './ResultMessage'

describe('ResultMessage', () => {
  const exactMatchResult: SearchResponse = {
    value: 100,
    index: 10,
    message: 'Exact match found for value 100 at index 10',
  }

  const approximateMatchResult: SearchResponse = {
    value: 95,
    index: 9,
    message: 'Approximate match found for value 95 at index 9',
  }

  it('renders exact match message correctly', () => {
    render(<ResultMessage result={exactMatchResult} isExactMatch={true} />)

    expect(screen.getByText(exactMatchResult.message)).toBeInTheDocument()
  })

  it('renders approximate match message correctly', () => {
    render(
      <ResultMessage result={approximateMatchResult} isExactMatch={false} />
    )

    expect(screen.getByText(approximateMatchResult.message)).toBeInTheDocument()
  })

  it('applies correct styling for exact match message', () => {
    render(<ResultMessage result={exactMatchResult} isExactMatch={true} />)

    const message = screen.getByText(exactMatchResult.message)
    expect(message).toHaveClass('text-green-700', 'dark:text-green-300')
  })

  it('applies correct styling for approximate match message', () => {
    render(
      <ResultMessage result={approximateMatchResult} isExactMatch={false} />
    )

    const message = screen.getByText(approximateMatchResult.message)
    expect(message).toHaveClass('text-orange-700', 'dark:text-orange-300')
  })

  it('has correct layout structure', () => {
    render(<ResultMessage result={exactMatchResult} isExactMatch={true} />)

    const container = screen.getByText(exactMatchResult.message).closest('div')
    expect(container).toHaveClass('pt-4', 'border-t')
  })

  it('displays message with correct text styling', () => {
    render(<ResultMessage result={exactMatchResult} isExactMatch={true} />)

    const message = screen.getByText(exactMatchResult.message)
    expect(message).toHaveClass('text-sm', 'leading-relaxed')
  })

  it('handles long messages correctly', () => {
    const longMessageResult: SearchResponse = {
      value: 100,
      index: 10,
      message:
        'This is a very long message that should be displayed properly without breaking the layout or causing any rendering issues in the component',
    }

    render(<ResultMessage result={longMessageResult} isExactMatch={true} />)

    expect(screen.getByText(longMessageResult.message)).toBeInTheDocument()
  })

  it('handles special characters in message', () => {
    const specialMessageResult: SearchResponse = {
      value: 100,
      index: 10,
      message: 'Message with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
    }

    render(<ResultMessage result={specialMessageResult} isExactMatch={true} />)

    expect(screen.getByText(specialMessageResult.message)).toBeInTheDocument()
  })

  it('handles empty message', () => {
    const emptyMessageResult: SearchResponse = {
      value: 100,
      index: 10,
      message: '',
    }

    render(<ResultMessage result={emptyMessageResult} isExactMatch={true} />)

    // Use a more specific query to find the message paragraph element
    const messageElement = screen.getByRole('paragraph')
    expect(messageElement).toBeInTheDocument()
    expect(messageElement).toHaveClass(
      'text-sm',
      'leading-relaxed',
      'text-green-700',
      'dark:text-green-300'
    )
  })
})
