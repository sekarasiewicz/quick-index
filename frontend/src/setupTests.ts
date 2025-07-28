import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock fetch globally for tests
global.fetch = vi.fn()

// Ensure DOM is available
if (typeof document === 'undefined') {
  const { JSDOM } = require('jsdom')
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
  global.document = dom.window.document
  global.window = dom.window
  global.navigator = dom.window.navigator
}
