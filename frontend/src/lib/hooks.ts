import { useCallback, useState } from 'react'
import { ApiService } from '../services/api'
import type {
  AppError,
  LoadingState,
  LoadingStateWithData,
  SearchParams,
  SearchResponse,
} from '../types'

// Custom hook for managing loading states with data
export function useLoadingState<T>() {
  const [state, setState] = useState<LoadingStateWithData<T>>({
    state: 'idle',
  })

  const setLoading = useCallback(() => {
    setState({ state: 'loading' })
  }, [])

  const setSuccess = useCallback((data: T) => {
    setState({ state: 'success', data })
  }, [])

  const setError = useCallback((error: AppError) => {
    setState({ state: 'error', error })
  }, [])

  const reset = useCallback(() => {
    setState({ state: 'idle' })
  }, [])

  return {
    ...state,
    setLoading,
    setSuccess,
    setError,
    reset,
    isLoading: state.state === 'loading',
    isSuccess: state.state === 'success',
    isError: state.state === 'error',
    isIdle: state.state === 'idle',
  }
}

// Custom hook for search operations
export function useSearch() {
  const loadingState = useLoadingState<SearchResponse>()

  const searchValue = useCallback(
    async (value: number) => {
      loadingState.setLoading()

      try {
        const result = await ApiService.searchValue(value)
        loadingState.setSuccess(result)
        return result
      } catch (error) {
        const appError = error as AppError
        loadingState.setError(appError)
        throw appError
      }
    },
    [loadingState]
  )

  const searchWithParams = useCallback(
    async (params: SearchParams) => {
      loadingState.setLoading()

      try {
        const result = await ApiService.searchValueWithParams(params)
        loadingState.setSuccess(result)
        return result
      } catch (error) {
        const appError = error as AppError
        loadingState.setError(appError)
        throw appError
      }
    },
    [loadingState]
  )

  return {
    ...loadingState,
    searchValue,
    searchWithParams,
  }
}

// Custom hook for form state management
export function useFormState<T extends Record<string, unknown>>(
  initialData: T
) {
  const [data, setData] = useState<T>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setData((prev) => ({ ...prev, [field]: value }))
      setIsDirty(true)

      // Clear error for this field when user starts typing
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field as string]
          return newErrors
        })
      }
    },
    [errors]
  )

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }))
  }, [])

  const setAllErrors = useCallback((newErrors: Record<string, string>) => {
    setErrors(newErrors)
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const reset = useCallback(() => {
    setData(initialData)
    setErrors({})
    setIsDirty(false)
    setIsSubmitting(false)
  }, [initialData])

  const isValid = Object.keys(errors).length === 0

  return {
    data,
    errors,
    isDirty,
    isSubmitting,
    isValid,
    updateField,
    setFieldError,
    setAllErrors,
    clearErrors,
    reset,
    setIsSubmitting,
  }
}

// Custom hook for theme management
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const setLightTheme = useCallback(() => {
    setTheme('light')
  }, [])

  const setDarkTheme = useCallback(() => {
    setTheme('dark')
  }, [])

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  }
}
