import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ErrorDisplay } from '@/components/ErrorDisplay'

describe('ErrorDisplay', () => {
  it('renders error message correctly', () => {
    const errorMessage = 'No suitable match found for value 9999'

    render(<ErrorDisplay error={errorMessage} />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('renders with different error messages', () => {
    const errorMessage = 'Network connection failed'

    render(<ErrorDisplay error={errorMessage} />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('renders with empty error message', () => {
    render(<ErrorDisplay error="" />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText('')).toBeInTheDocument()
  })
})
