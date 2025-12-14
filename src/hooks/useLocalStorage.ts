import { useCallback, useEffect, useState } from 'react';

type SetValue<T> = T | ((prev: T) => T);

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: SetValue<T>) => void, () => void] {
  const readValue = useCallback((): T => {
    if (!isBrowser()) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: SetValue<T>) => {
      if (!isBrowser()) return;

      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        setStoredValue(valueToStore);
      } catch {}
    },
    [key, storedValue],
  );

  const remove = useCallback(() => {
    if (!isBrowser()) return;

    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {}
  }, [key, initialValue]);

  // Sync across tabs
  useEffect(() => {
    if (!isBrowser()) return;

    const handler = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
      }
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [key, initialValue]);

  return [storedValue, setValue, remove];
}
