import type { SearchResponse } from '@/types'

export function isExactMatch(result: SearchResponse): boolean {
  return result.message.includes('Exact match')
}

export function getResultCardClasses(isExact: boolean): string {
  return isExact
    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
    : 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20'
}

export function getResultTitleClasses(isExact: boolean): string {
  return isExact
    ? 'text-green-700 dark:text-green-300'
    : 'text-orange-700 dark:text-orange-300'
}

export function getResultIconClasses(isExact: boolean): string {
  return isExact
    ? 'text-green-600 dark:text-green-400'
    : 'text-orange-600 dark:text-orange-400'
}

export function getResultTypeClasses(isExact: boolean): string {
  return isExact
    ? 'border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-200'
    : 'border-orange-200 bg-orange-100 text-orange-800 dark:border-orange-800 dark:bg-orange-900 dark:text-orange-200'
}

export function getResultMessageClasses(isExact: boolean): string {
  return isExact
    ? 'text-green-700 dark:text-green-300'
    : 'text-orange-700 dark:text-orange-300'
}
