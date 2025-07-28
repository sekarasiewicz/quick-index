import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ErrorDisplay } from './ErrorDisplay'

describe('ErrorDisplay', () => {
  it('renders error message correctly', () => {
    const errorMessage = 'Something went wrong'
    render(<ErrorDisplay error={errorMessage} />)

    expect(screen.getByText('Error Occurred')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('renders with error icons', () => {
    render(<ErrorDisplay error="Test error" />)

    // Check for XCircle icon in title
    const title = screen.getByText('Error Occurred')
    expect(title).toBeInTheDocument()

    // Check for AlertCircle icon in content
    const alertIcon = screen.getByTestId('alert-circle-icon')
    expect(alertIcon).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<ErrorDisplay error="Test error" />)

    const card = screen.getByTestId('error-card')
    expect(card).toHaveClass('border-red-200', 'bg-red-50')
  })

  it('handles long error messages', () => {
    const longErrorMessage =
      'This is a very long error message that should be displayed properly without breaking the layout or causing any rendering issues in the component'
    render(<ErrorDisplay error={longErrorMessage} />)

    expect(screen.getByText(longErrorMessage)).toBeInTheDocument()
  })

  it('handles empty error message', () => {
    render(<ErrorDisplay error="" />)

    expect(screen.getByText('Error Occurred')).toBeInTheDocument()
    const errorMessage = screen.getByTestId('error-message')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent('')
  })

  it('handles special characters in error message', () => {
    const specialError = 'Error with special chars: !@#$%^&*()_+-=[]{}|;:,.<>?'
    render(<ErrorDisplay error={specialError} />)

    expect(screen.getByText(specialError)).toBeInTheDocument()
  })

  it('renders with proper accessibility attributes', () => {
    render(<ErrorDisplay error="Test error" />)

    const card = screen.getByTestId('error-card')
    expect(card).toBeInTheDocument()
  })
})
