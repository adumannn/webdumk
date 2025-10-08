import { ReactNode } from 'react';
import clsx from 'clsx';

const Card = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-muted/20 bg-background/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
