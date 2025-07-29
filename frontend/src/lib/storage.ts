import type { StorageKey, StorageValue, Theme } from '@/types'

// Type-safe localStorage wrapper
export class StorageManager {
  private static instance: StorageManager
  private storage: Storage

  private constructor() {
    this.storage =
      typeof window !== 'undefined'
        ? window.localStorage
        : {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {},
            length: 0,
            key: () => null,
          }
  }

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager()
    }
    return StorageManager.instance
  }

  get<T extends StorageValue>(key: StorageKey): T | null {
    try {
      const item = this.storage.getItem(key)
      if (item === null) return null

      // Try to parse as JSON, fallback to string
      try {
        return JSON.parse(item) as T
      } catch {
        return item as T
      }
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error)
      return null
    }
  }

  set<T extends StorageValue>(key: StorageKey, value: T): boolean {
    try {
      const serializedValue =
        typeof value === 'string' ? value : JSON.stringify(value)
      this.storage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error)
      return false
    }
  }

  remove(key: StorageKey): boolean {
    try {
      this.storage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error)
      return false
    }
  }

  clear(): boolean {
    try {
      this.storage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }

  has(key: StorageKey): boolean {
    return this.get(key) !== null
  }
}

// Convenience functions for common storage operations
export const storage = StorageManager.getInstance()

// Theme-specific storage functions
export const themeStorage = {
  get(): Theme | null {
    return storage.get<Theme>('theme')
  },

  set(theme: Theme): boolean {
    return storage.set('theme', theme)
  },

  remove(): boolean {
    return storage.remove('theme')
  },

  has(): boolean {
    return storage.has('theme')
  },
}

// Search history storage functions
export const searchHistoryStorage = {
  get(): number[] {
    return storage.get<number[]>('searchHistory') || []
  },

  add(value: number): boolean {
    const history = this.get()
    const newHistory = [value, ...history.filter((v) => v !== value)].slice(
      0,
      10
    )
    return storage.set('searchHistory', newHistory)
  },

  clear(): boolean {
    return storage.remove('searchHistory')
  },

  has(): boolean {
    return storage.has('searchHistory')
  },
}

// User preferences storage functions
export const userPreferencesStorage = {
  get(): Record<string, unknown> {
    return storage.get<Record<string, unknown>>('userPreferences') || {}
  },

  set(preferences: Record<string, unknown>): boolean {
    return storage.set('userPreferences', preferences)
  },

  update(updates: Record<string, unknown>): boolean {
    const current = this.get()
    const updated = { ...current, ...updates }
    return storage.set('userPreferences', updated)
  },

  remove(): boolean {
    return storage.remove('userPreferences')
  },
}
