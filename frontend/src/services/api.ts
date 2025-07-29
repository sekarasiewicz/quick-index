import type { ApiError, SearchResponse, AppError, NetworkError, ServerError, SearchParams } from '../types'

const API_BASE_URL = 'http://localhost:8000/api/v1'

// Helper function to create specific error types
function createNetworkError(message: string, status?: number): NetworkError {
  return {
    type: 'network',
    message,
    status,
  }
}

function createServerError(message: string, status: number): ServerError {
  return {
    type: 'server',
    message,
    status,
  }
}

export const ApiService = {
  async searchValue(value: number): Promise<SearchResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/search/${value}`)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData: ApiError = await response.json()
          errorMessage = errorData.detail.message || errorMessage
        } catch {
          // If we can't parse the error response, use the default message
        }

        const appError: AppError = createServerError(errorMessage, response.status)
        throw appError
      }

      const data: SearchResponse = await response.json()
      return data
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError: AppError = createNetworkError('Network error: Unable to connect to the server')
        throw networkError
      }
      
      if (error && typeof error === 'object' && 'type' in error) {
        throw error as AppError
      }
      
      const unknownError: AppError = createNetworkError('An unexpected error occurred')
      throw unknownError
    }
  },

  async searchValueWithParams(params: SearchParams): Promise<SearchResponse> {
    const { value, tolerance } = params
    const url = tolerance 
      ? `${API_BASE_URL}/search/${value}?tolerance=${tolerance}`
      : `${API_BASE_URL}/search/${value}`
    
    try {
      const response = await fetch(url)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        
        try {
          const errorData: ApiError = await response.json()
          errorMessage = errorData.detail.message || errorMessage
        } catch {
          // If we can't parse the error response, use the default message
        }

        const appError: AppError = createServerError(errorMessage, response.status)
        throw appError
      }

      const data: SearchResponse = await response.json()
      return data
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError: AppError = createNetworkError('Network error: Unable to connect to the server')
        throw networkError
      }
      
      if (error && typeof error === 'object' && 'type' in error) {
        throw error as AppError
      }
      
      const unknownError: AppError = createNetworkError('An unexpected error occurred')
      throw unknownError
    }
  },
} 