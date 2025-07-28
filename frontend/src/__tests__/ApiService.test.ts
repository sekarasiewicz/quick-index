import { ApiService } from '@/services/api'
import type { SearchResponse } from '@/types'

// Mock fetch globally
global.fetch = jest.fn()

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('searchValue', () => {
    it('should return search response on successful API call', async () => {
      const mockResponse: SearchResponse = {
        value: 500,
        index: 4,
        message: 'Exact match found',
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await ApiService.searchValue(500)

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/search/500'
      )
      expect(result).toEqual(mockResponse)
    })

    it('should throw error when API returns error response', async () => {
      const mockErrorResponse = {
        detail: {
          error: 'Value not found',
          message: 'No suitable match found for value 9999',
        },
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse,
      })

      await expect(ApiService.searchValue(9999)).rejects.toThrow(
        'No suitable match found for value 9999'
      )

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/v1/search/9999'
      )
    })

    it('should throw error when fetch fails', async () => {
      const networkError = new Error('Network error')
      ;(fetch as jest.Mock).mockRejectedValueOnce(networkError)

      await expect(ApiService.searchValue(500)).rejects.toThrow('Network error')
    })

    it('should handle non-Error exceptions', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce('String error')

      await expect(ApiService.searchValue(500)).rejects.toThrow('String error')
    })
  })
})
