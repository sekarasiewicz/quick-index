// API Response Types
export type SearchResponse = {
  value: number
  index: number
  message: string
}

// More specific search result types
export type SearchResultType = 'exact' | 'approximate'

export type SearchResult = {
  value: number
  index: number
  message: string
  type: SearchResultType
}

// Error Types
export type ErrorResponse = {
  error: string
  message: string
}

export type ApiError = {
  detail: ErrorResponse
}

// More comprehensive error types
export type NetworkError = {
  type: 'network'
  message: string
  status?: number
}

export type ValidationError = {
  type: 'validation'
  message: string
  field?: string
}

export type ServerError = {
  type: 'server'
  message: string
  status: number
}

export type AppError = NetworkError | ValidationError | ServerError

// Theme Types
export type Theme = 'light' | 'dark' | 'system'

export type ThemeState = {
  theme: Theme
  isDark: boolean
}

// Loading State Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type LoadingStateWithData<T> = {
  state: LoadingState
  data?: T
  error?: AppError
}

// Form Types
export type FormState<T> = {
  data: T
  errors: Record<string, string>
  isValid: boolean
  isDirty: boolean
  isSubmitting: boolean
}

// API Service Types
export type ApiServiceConfig = {
  baseUrl: string
  timeout?: number
  retries?: number
}

export type SearchParams = {
  value: number
  tolerance?: number
}

// Component Props Types
export type BaseComponentProps = {
  className?: string
  'data-testid'?: string
}

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Event Handler Types
export type EventHandler<T = Event> = (event: T) => void
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>

// Storage Types
export type StorageKey = 'theme' | 'searchHistory' | 'userPreferences'
export type StorageValue = string | number | boolean | object

// Constants
export const SEARCH_HISTORY_LIMIT = 10
export const DEFAULT_SEARCH_TOLERANCE = 1
export const MAX_SEARCH_VALUE = 1000000
export const MIN_SEARCH_VALUE = 0
