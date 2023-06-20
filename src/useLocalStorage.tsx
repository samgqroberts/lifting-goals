import { useState } from 'react';

// Hook
export function useLocalStorage<T = string>(
  key: string,
  initialValue: T | undefined = undefined,
  transformers?: [(raw: string) => T | undefined, (parsed: T) => string | undefined],
): [T | undefined, (value: T | undefined) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      let parsedItem: T | undefined = undefined;
      if (item !== null) {
        if (transformers) {
          parsedItem = transformers[0](item);
        } else {
          parsedItem = item as T;
        }
      }
      // Parse stored json or if none return initialValue
      return parsedItem || initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | undefined) => {
    try {
      // Save state
      setStoredValue(value);
      // (maybe) serialize value into storable string
      let serializedValue: string | undefined = undefined;
      if (value !== undefined) {
        if (transformers) {
          serializedValue = transformers[1](value);
        } else {
          serializedValue = value as string;
        }
      }
      // Save storable string to local storage
      if (serializedValue === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };
  return [storedValue, setValue];
}

export function useRequiredLocalStorage<T = string>(
  key: string,
  defaultValue: T,
  transformers?: [(raw: string) => T | undefined, (parsed: T) => string],
): [T, (value: T) => void] {
  const [value, setValue] = useLocalStorage<T>(key, defaultValue, transformers);
  return [value === undefined ? defaultValue : value, setValue];
}
