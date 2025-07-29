import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ResultHeader } from './ResultHeader'

describe('ResultHeader', () => {
  it('renders exact match header correctly', () => {
    render(<ResultHeader isExactMatch={true} />)

    expect(screen.getByText('Exact Match Found!')).toBeInTheDocument()
    expect(screen.getByTestId('check-circle-icon')).toBeInTheDocument()
  })

  it('renders approximate match header correctly', () => {
    render(<ResultHeader isExactMatch={false} />)

    expect(screen.getByText('Approximate Match Found')).toBeInTheDocument()
    expect(screen.getByTestId('alert-triangle-icon')).toBeInTheDocument()
  })

  it('applies correct styling for exact match', () => {
    render(<ResultHeader isExactMatch={true} />)

    const title = screen.getByText('Exact Match Found!')
    expect(title).toHaveClass('text-green-700', 'dark:text-green-300')

    const icon = screen.getByTestId('check-circle-icon')
    expect(icon).toHaveClass('text-green-600', 'dark:text-green-400')
  })

  it('applies correct styling for approximate match', () => {
    render(<ResultHeader isExactMatch={false} />)

    const title = screen.getByText('Approximate Match Found')
    expect(title).toHaveClass('text-orange-700', 'dark:text-orange-300')

    const icon = screen.getByTestId('alert-triangle-icon')
    expect(icon).toHaveClass('text-orange-600', 'dark:text-orange-400')
  })

  it('has correct layout structure', () => {
    render(<ResultHeader isExactMatch={true} />)

    // Look for the CardHeader element which should have pb-3 class
    const header = screen
      .getByText('Exact Match Found!')
      .closest('[class*="pb-3"]')
    expect(header).toBeInTheDocument()

    const title = screen.getByText('Exact Match Found!')
    expect(title).toHaveClass('flex', 'items-center', 'gap-2')
  })
})
