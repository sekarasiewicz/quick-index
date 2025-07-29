# TypeScript Type Definitions

This document describes the comprehensive type system implemented in the Quick Index project.

## Overview

The project uses strict TypeScript configuration with comprehensive type definitions to ensure type safety across all components and services.

## Core Types

### API Response Types

```typescript
// Basic search response
type SearchResponse = {
  value: number
  index: number
  message: string
}

// Enhanced search result with type information
type SearchResultType = 'exact' | 'approximate'
type SearchResult = {
  value: number
  index: number
  message: string
  type: SearchResultType
}
```

### Error Types

```typescript
// Comprehensive error handling
type NetworkError = {
  type: 'network'
  message: string
  status?: number
}

type ValidationError = {
  type: 'validation'
  message: string
  field?: string
}

type ServerError = {
  type: 'server'
  message: string
  status: number
}

type AppError = NetworkError | ValidationError | ServerError
```

### Theme Types

```typescript
type Theme = 'light' | 'dark' | 'system'
type ThemeState = {
  theme: Theme
  isDark: boolean
}
```

### Loading State Types

```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error'
type LoadingStateWithData<T> = {
  state: LoadingState
  data?: T
  error?: AppError
}
```

## Utility Types

### Component Props

```typescript
type BaseComponentProps = {
  className?: string
  'data-testid'?: string
}

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'
```

### Form Types

```typescript
type FormState<T> = {
  data: T
  errors: Record<string, string>
  isValid: boolean
  isDirty: boolean
  isSubmitting: boolean
}
```

### Storage Types

```typescript
type StorageKey = 'theme' | 'searchHistory' | 'userPreferences'
type StorageValue = string | number | boolean | object
```

## Custom Hooks

### useLoadingState

Manages loading states with data and error handling:

```typescript
const { state, data, error, setLoading, setSuccess, setError, isLoading } = useLoadingState<SearchResponse>()
```

### useSearch

Provides type-safe search operations:

```typescript
const { searchValue, searchWithParams, isLoading, error } = useSearch()
```

### useFormState

Manages form state with validation:

```typescript
const { data, errors, updateField, setFieldError, isValid, isDirty } = useFormState(initialData)
```

## Storage Utilities

### StorageManager

Type-safe localStorage wrapper with error handling:

```typescript
const storage = StorageManager.getInstance()
const value = storage.get<Theme>('theme')
const success = storage.set('theme', 'dark')
```

### Specialized Storage Functions

```typescript
// Theme storage
const theme = themeStorage.get()
themeStorage.set('dark')

// Search history
const history = searchHistoryStorage.get()
searchHistoryStorage.add(123)

// User preferences
const prefs = userPreferencesStorage.get()
userPreferencesStorage.update({ autoSave: true })
```

## Best Practices

1. **Never use `any`**: All types are explicitly defined
2. **Use union types**: For better type safety (e.g., `AppError`)
3. **Leverage generics**: For reusable components and hooks
4. **Type your functions**: Always specify return types for complex functions
5. **Use const assertions**: For immutable data structures
6. **Validate at runtime**: Use Zod schemas for runtime validation

## Error Handling

The project implements a comprehensive error handling system:

1. **Network errors**: Connection issues, timeouts
2. **Server errors**: HTTP status errors with proper typing
3. **Validation errors**: Form validation with field-specific errors
4. **Type guards**: Runtime type checking for error objects

## Constants

```typescript
const SEARCH_HISTORY_LIMIT = 10
const DEFAULT_SEARCH_TOLERANCE = 1
const MAX_SEARCH_VALUE = 1000000
const MIN_SEARCH_VALUE = 0
```

## Migration Guide

When adding new features:

1. Define types in `types/index.ts`
2. Create utility functions in `lib/` directory
3. Use custom hooks for complex state management
4. Implement proper error handling with typed errors
5. Add runtime validation with Zod schemas

## TypeScript Configuration

The project uses strict TypeScript configuration:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedSideEffectImports: true`

This ensures maximum type safety and catches potential issues at compile time. 