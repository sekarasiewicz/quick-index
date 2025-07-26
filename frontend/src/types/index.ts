export interface SearchResponse {
  value: number;
  index: number;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface ApiError {
  detail: ErrorResponse;
} 