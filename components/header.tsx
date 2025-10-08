'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/theme-toggle';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { href: '/', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur transition-shadow ${
        isScrolled ? 'shadow-lg shadow-black/5' : ''
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground">
          {`<${'Portfolio'}>`}
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/40 bg-background text-foreground shadow-sm transition hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-accent sm:hidden"
            aria-label="Open navigation menu"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          <ul className="hidden items-center gap-6 text-sm font-medium sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-1 py-1 transition ${
                      isActive
                        ? 'text-accent'
                        : 'text-foreground/80 hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    prefetch
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent"
                        aria-hidden
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
      <Dialog open={mobileOpen} onClose={setMobileOpen} className="sm:hidden">
        <div className="fixed inset-0 bg-black/50" aria-hidden />
        <Dialog.Panel className="fixed inset-y-0 right-0 flex w-64 flex-col gap-8 bg-background p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-foreground">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-muted/40 text-foreground transition hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-accent"
              aria-label="Close navigation menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 text-base font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-2 ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground/80 hover:bg-muted/10 hover:text-foreground'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div>
            <ThemeToggle />
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
