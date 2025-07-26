import type { SearchResponse, ApiError } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export class ApiService {
  static async searchValue(value: number): Promise<SearchResponse> {
    const response = await fetch(`${API_BASE_URL}/search/${value}`);
    
    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(errorData.detail.message);
    }
    
    return response.json();
  }
} 