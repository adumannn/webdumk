'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-muted/10"
        aria-hidden
      >
        <span className="h-4 w-4 rounded-full bg-muted/40" />
      </span>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/40 bg-background text-foreground shadow-sm transition hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-accent"
      aria-label={`Activate ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
