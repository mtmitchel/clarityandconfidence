import { useState } from 'react';

// A more robust implementation of useLocalStorageState.
// This version avoids useEffect for synchronization and handles the saving logic
// directly within the returned setter function. It also includes more robust error handling.

export function useLocalStorageState<T>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return defaultValue
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      // If error also return defaultValue
      console.error(`Error reading localStorage key “${key}”:`, error);
      return defaultValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue] as const;
}
