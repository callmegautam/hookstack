import { useCallback, useRef, useState } from 'react';
import isBrowser from '../utils/isBrowser';

type CopyStatus = 'idle' | 'success' | 'error';

type CopyOptions = {
  resetAfter?: number; // ms
  onSuccess?: (text: string) => void;
  onError?: (error: unknown) => void;
};

async function copyText(text: string) {
  if (!isBrowser()) throw new Error('Not in browser');

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  // Fallback (old browsers)
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export function useCopyToClipboard() {
  const [value, setValue] = useState<string | null>(null);
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timeoutRef = useRef<number | null>(null);

  const reset = useCallback(() => {
    setValue(null);
    setStatus('idle');
  }, []);

  const copy = useCallback(
    async (text: string, options: CopyOptions = {}) => {
      try {
        await copyText(text);
        setValue(text);
        setStatus('success');
        options.onSuccess?.(text);

        if (options.resetAfter) {
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = window.setTimeout(reset, options.resetAfter);
        }

        return true;
      } catch (error) {
        setStatus('error');
        options.onError?.(error);
        return false;
      }
    },
    [reset],
  );

  return {
    copy,
    reset,
    value,
    status,
    success: status === 'success',
    error: status === 'error',
  };
}
