import { describe, expect, it } from 'vitest'
import type { SearchResponse } from '@/types'
import {
  getResultCardClasses,
  getResultIconClasses,
  getResultMessageClasses,
  getResultTitleClasses,
  getResultTypeClasses,
  isExactMatch,
} from './resultUtils'

describe('resultUtils', () => {
  describe('isExactMatch', () => {
    it('returns true for exact match message', () => {
      const exactMatchResult: SearchResponse = {
        value: 100,
        index: 10,
        message: 'Exact match found for value 100 at index 10',
      }

      expect(isExactMatch(exactMatchResult)).toBe(true)
    })

    it('returns false for approximate match message', () => {
      const approximateMatchResult: SearchResponse = {
        value: 95,
        index: 9,
        message: 'Approximate match found for value 95 at index 9',
      }

      expect(isExactMatch(approximateMatchResult)).toBe(false)
    })

    it('returns false for message without "Exact match"', () => {
      const otherResult: SearchResponse = {
        value: 100,
        index: 10,
        message: 'Some other message',
      }

      expect(isExactMatch(otherResult)).toBe(false)
    })
  })

  describe('getResultCardClasses', () => {
    it('returns green classes for exact match', () => {
      const classes = getResultCardClasses(true)
      expect(classes).toContain('border-green-200')
      expect(classes).toContain('bg-green-50')
      expect(classes).toContain('dark:border-green-800')
      expect(classes).toContain('dark:bg-green-950/20')
    })

    it('returns orange classes for approximate match', () => {
      const classes = getResultCardClasses(false)
      expect(classes).toContain('border-orange-200')
      expect(classes).toContain('bg-orange-50')
      expect(classes).toContain('dark:border-orange-800')
      expect(classes).toContain('dark:bg-orange-950/20')
    })
  })

  describe('getResultTitleClasses', () => {
    it('returns green classes for exact match', () => {
      const classes = getResultTitleClasses(true)
      expect(classes).toContain('text-green-700')
      expect(classes).toContain('dark:text-green-300')
    })

    it('returns orange classes for approximate match', () => {
      const classes = getResultTitleClasses(false)
      expect(classes).toContain('text-orange-700')
      expect(classes).toContain('dark:text-orange-300')
    })
  })

  describe('getResultIconClasses', () => {
    it('returns green classes for exact match', () => {
      const classes = getResultIconClasses(true)
      expect(classes).toContain('text-green-600')
      expect(classes).toContain('dark:text-green-400')
    })

    it('returns orange classes for approximate match', () => {
      const classes = getResultIconClasses(false)
      expect(classes).toContain('text-orange-600')
      expect(classes).toContain('dark:text-orange-400')
    })
  })

  describe('getResultTypeClasses', () => {
    it('returns green classes for exact match', () => {
      const classes = getResultTypeClasses(true)
      expect(classes).toContain('border-green-200')
      expect(classes).toContain('bg-green-100')
      expect(classes).toContain('text-green-800')
      expect(classes).toContain('dark:border-green-800')
      expect(classes).toContain('dark:bg-green-900')
      expect(classes).toContain('dark:text-green-200')
    })

    it('returns orange classes for approximate match', () => {
      const classes = getResultTypeClasses(false)
      expect(classes).toContain('border-orange-200')
      expect(classes).toContain('bg-orange-100')
      expect(classes).toContain('text-orange-800')
      expect(classes).toContain('dark:border-orange-800')
      expect(classes).toContain('dark:bg-orange-900')
      expect(classes).toContain('dark:text-orange-200')
    })
  })

  describe('getResultMessageClasses', () => {
    it('returns green classes for exact match', () => {
      const classes = getResultMessageClasses(true)
      expect(classes).toContain('text-green-700')
      expect(classes).toContain('dark:text-green-300')
    })

    it('returns orange classes for approximate match', () => {
      const classes = getResultMessageClasses(false)
      expect(classes).toContain('text-orange-700')
      expect(classes).toContain('dark:text-orange-300')
    })
  })
})
