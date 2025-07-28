import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchForm } from '@/components/SearchForm'

// Mock fetch globally
global.fetch = vi.fn()

describe('SearchForm', () => {
  const mockOnResult = vi.fn()
  const mockOnError = vi.fn()
  const mockSetIsLoading = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders search form with input and button', () => {
    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    expect(
      screen.getByText('Search for a value in the dataset')
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Enter a value (0-1000000)')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={true}
        setIsLoading={mockSetIsLoading}
      />
    )

    expect(
      screen.getByRole('button', { name: /searching/i })
    ).toBeInTheDocument()
    expect(screen.getByDisplayValue('')).toBeDisabled()
  })

  it('shows error for empty input', () => {
    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const button = screen.getByRole('button', { name: /search/i })
    fireEvent.click(button)

    expect(mockOnError).toHaveBeenCalledWith(
      'Please enter a value to search for'
    )
  })

  it('shows error for invalid number input', () => {
    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const input = screen.getByPlaceholderText('Enter a value (0-1000000)')
    const button = screen.getByRole('button', { name: /search/i })

    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.click(button)

    expect(mockOnError).toHaveBeenCalledWith('Please enter a valid number')
  })
})
