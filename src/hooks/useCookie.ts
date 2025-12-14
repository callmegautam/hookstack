import { useCallback, useState } from 'react';
import isBrowser from '../utils/isBrowser';

type CookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

function getCookie(key: string): string | null {
  if (!isBrowser()) return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${encodeURIComponent(key)}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(key: string, value: string, options: CookieOptions = {}) {
  if (!isBrowser()) return;

  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

  if (options.path) cookie += `; path=${options.path}`;
  if (options.domain) cookie += `; domain=${options.domain}`;
  if (options.maxAge !== undefined) cookie += `; max-age=${options.maxAge}`;
  if (options.expires) cookie += `; expires=${options.expires.toUTCString()}`;
  if (options.sameSite) cookie += `; samesite=${options.sameSite}`;
  if (options.secure) cookie += `; secure`;

  document.cookie = cookie;
}

function deleteCookie(key: string, path = '/') {
  setCookie(key, '', {
    path,
    expires: new Date(0),
  });
}

export function useCookie(
  key: string,
  initialValue: string | null = null,
  options: CookieOptions = {},
): [string | null, (value: string, opts?: CookieOptions) => void, () => void] {
  const [value, setValue] = useState<string | null>(() => {
    const cookie = getCookie(key);
    return cookie ?? initialValue;
  });

  const update = useCallback(
    (val: string, opts: CookieOptions = {}) => {
      setCookie(key, val, { ...options, ...opts });
      setValue(val);
    },
    [key, options],
  );

  const remove = useCallback(() => {
    deleteCookie(key, options.path);
    setValue(null);
  }, [key, options.path]);

  return [value, update, remove];
}
