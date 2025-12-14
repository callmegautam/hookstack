import { useCallback, useEffect, useRef, useState } from 'react';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

type UseFetchOptions = RequestInit & {
  immediate?: boolean;
};

export function useFetch<T = unknown>(
  url: string | null,
  options: UseFetchOptions = {},
) {
  const { immediate = true, ...fetchOptions } = options;

  const controllerRef = useRef<AbortController | null>(null);

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');

  const execute = useCallback(async () => {
    if (!url) return;

    // Abort previous request
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = (await response.json()) as T;
      setData(result);
      setStatus('success');
      return result;
    } catch (err) {
      if ((err as any)?.name === 'AbortError') return;
      setError(err);
      setStatus('error');
    }
  }, [url, JSON.stringify(fetchOptions)]);

  useEffect(() => {
    if (!immediate) return;
    execute();

    return () => controllerRef.current?.abort();
  }, [execute, immediate]);

  return {
    data,
    error,
    status,
    loading: status === 'loading',
    success: status === 'success',
    errorOccurred: status === 'error',
    refetch: execute,
  };
}
