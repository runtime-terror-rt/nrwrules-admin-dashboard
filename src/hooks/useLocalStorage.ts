import { useState, useCallback } from 'react'

/**
 * Persist state in localStorage with type-safe get/set.
 * Lifts state so it survives reloads; use for preferences or simple app state.
 *
 * @param key - localStorage key
 * @param initialValue - value when key is missing
 * @returns [storedValue, setValue] - same API as useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value)
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // ignore quota / privacy errors
      }
    },
    [key]
  )

  return [storedValue, setValue]
}
