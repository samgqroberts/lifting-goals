import { useState } from 'react';

// Hook
export function useLocalStorage(
  key: string,
  initialValue: string | undefined = undefined,
  resetToInitialValue?: boolean,
): [string | undefined, (value: string | undefined) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (resetToInitialValue) {
        return initialValue;
      }
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item || initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string | undefined) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to local storage
      if (value === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };
  return [storedValue, setValue];
}
