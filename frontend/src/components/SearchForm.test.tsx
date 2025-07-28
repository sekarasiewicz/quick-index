import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ApiService } from '@/services/api'
import type { SearchResponse } from '@/types'
import { SearchForm } from './SearchForm'

// Mock the API service
vi.mock('@/services/api', () => ({
  ApiService: {
    searchValue: vi.fn(),
  },
}))

const mockApiService = vi.mocked(ApiService)

describe('SearchForm', () => {
  const mockOnResult = vi.fn()
  const mockOnError = vi.fn()
  const mockSetIsLoading = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the search form with title and input', () => {
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
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
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

    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: /searching/i })

    expect(input).toBeDisabled()
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Searching...')
  })

  it('validates required field', async () => {
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

    await waitFor(() => {
      expect(
        screen.getByText('Please enter a value to search for')
      ).toBeInTheDocument()
    })
  })

  it('validates numeric input', async () => {
    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: /search/i })

    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('Please enter a value to search for')
      ).toBeInTheDocument()
    })
  })

  it('validates value range (0-1000000)', async () => {
    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: /search/i })

    // Test negative value
    fireEvent.change(input, { target: { value: '-1' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('Value must be between 0 and 1,000,000')
      ).toBeInTheDocument()
    })

    // Test value too high
    fireEvent.change(input, { target: { value: '1000001' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(
        screen.getByText('Value must be between 0 and 1,000,000')
      ).toBeInTheDocument()
    })
  })

  it('submits form with valid data and calls API', async () => {
    const mockResponse: SearchResponse = {
      value: 100,
      index: 10,
      message: 'Exact match found',
    }
    mockApiService.searchValue.mockResolvedValue(mockResponse)

    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: /search/i })

    fireEvent.change(input, { target: { value: '100' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockSetIsLoading).toHaveBeenCalledWith(true)
      expect(mockApiService.searchValue).toHaveBeenCalledWith(100)
      expect(mockOnResult).toHaveBeenCalledWith(mockResponse)
      expect(mockSetIsLoading).toHaveBeenCalledWith(false)
    })
  })

  it('handles API errors and calls onError', async () => {
    const errorMessage = 'API Error'
    mockApiService.searchValue.mockRejectedValue(new Error(errorMessage))

    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: /search/i })

    fireEvent.change(input, { target: { value: '100' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockSetIsLoading).toHaveBeenCalledWith(true)
      expect(mockApiService.searchValue).toHaveBeenCalledWith(100)
      expect(mockOnError).toHaveBeenCalledWith(errorMessage)
      expect(mockSetIsLoading).toHaveBeenCalledWith(false)
    })
  })

  it('handles non-Error objects in catch block', async () => {
    mockApiService.searchValue.mockRejectedValue('String error')

    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const input = screen.getByRole('spinbutton')
    const button = screen.getByRole('button', { name: /search/i })

    fireEvent.change(input, { target: { value: '100' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalledWith('An error occurred')
    })
  })

  it('allows form submission with Enter key', async () => {
    const mockResponse: SearchResponse = {
      value: 50,
      index: 5,
      message: 'Exact match found',
    }
    mockApiService.searchValue.mockResolvedValue(mockResponse)

    render(
      <SearchForm
        onResult={mockOnResult}
        onError={mockOnError}
        isLoading={false}
        setIsLoading={mockSetIsLoading}
      />
    )

    const input = screen.getByRole('spinbutton')
    const form = screen.getByRole('button', { name: /search/i }).closest('form')
    fireEvent.change(input, { target: { value: '50' } })
    fireEvent.submit(form!)

    await waitFor(() => {
      expect(mockApiService.searchValue).toHaveBeenCalledWith(50)
    })
  })
})
