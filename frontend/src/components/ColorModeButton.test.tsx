import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ColorModeButton } from './ColorModeButton'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

// Mock matchMedia
const matchMediaMock = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

describe('ColorModeButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })

    // Setup matchMedia mock to return false by default (light mode preference)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // Default to light mode preference
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    // Clear document classes
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('renders the color mode button', () => {
    render(<ColorModeButton />)

    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
  })

  it('shows moon icon in light mode', () => {
    render(<ColorModeButton />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })

  it('shows sun icon in dark mode', async () => {
    // Mock localStorage to return 'dark'
    localStorageMock.getItem.mockReturnValue('dark')

    render(<ColorModeButton />)

    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    })
  })

  it('toggles from light to dark mode', async () => {
    // Ensure we start in light mode
    localStorageMock.getItem.mockReturnValue(null)

    // Mock system preference for light mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false, // Light mode preference
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    render(<ColorModeButton />)

    const button = screen.getByRole('button')

    // Wait for initial state to be set
    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
    })

    // Click to toggle to dark mode
    fireEvent.click(button)

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
    })
  })

  it('toggles from dark to light mode', async () => {
    // Start in dark mode
    localStorageMock.getItem.mockReturnValue('dark')
    document.documentElement.classList.add('dark')

    render(<ColorModeButton />)

    const button = screen.getByRole('button')

    // Initially in dark mode
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode')

    // Click to toggle to light mode
    fireEvent.click(button)

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
    })
  })

  it('loads dark theme from localStorage on mount', async () => {
    localStorageMock.getItem.mockReturnValue('dark')

    render(<ColorModeButton />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })

  it('loads light theme from localStorage on mount', async () => {
    localStorageMock.getItem.mockReturnValue('light')

    render(<ColorModeButton />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  it('uses system preference when no localStorage value exists', async () => {
    // Ensure localStorage returns null (no saved preference)
    localStorageMock.getItem.mockReturnValue(null)

    // Mock system preference for dark mode
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })

    render(<ColorModeButton />)

    // Test that the button shows the correct icon for dark mode preference
    await waitFor(() => {
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
    })
  })

  it('uses light mode when no localStorage value and system prefers light', async () => {
    // Mock system preference for light mode
    matchMediaMock.mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    render(<ColorModeButton />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  it('prioritizes localStorage over system preference', async () => {
    // Mock localStorage to return 'light'
    localStorageMock.getItem.mockReturnValue('light')

    // Mock system preference for dark mode
    matchMediaMock.mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })

    render(<ColorModeButton />)

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  it('applies correct styling classes', () => {
    render(<ColorModeButton />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass('fixed', 'top-4', 'right-4', 'z-50')
  })

  it('handles multiple rapid clicks correctly', async () => {
    render(<ColorModeButton />)

    const button = screen.getByRole('button')

    // Click multiple times rapidly
    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    await waitFor(() => {
      // Should end up in the opposite state from initial
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })
  })
})
