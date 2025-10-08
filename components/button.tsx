import Link from 'next/link';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'ghost' | 'link';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant;
};

type AnchorProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-accent text-white shadow-lg shadow-accent/20 hover:bg-accent/90 focus-visible:outline-accent',
  ghost:
    'border border-muted/40 bg-transparent text-foreground hover:border-accent/40 hover:text-accent focus-visible:outline-accent',
  link: 'text-accent underline-offset-4 hover:underline focus-visible:outline-accent',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export const ButtonLink = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, variant = 'primary', ...props }, ref) => (
    <Link
      ref={ref}
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    />
  )
);
ButtonLink.displayName = 'ButtonLink';
