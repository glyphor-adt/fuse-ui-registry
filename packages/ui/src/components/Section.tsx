import React, { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Section({
  children,
  spacing = 'md',
  className,
  ...props
}: SectionProps): JSX.Element {
  const baseStyles = 'w-full';
  
  const spacingStyles = {
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16',
  };

  return (
    <section
      className={clsx(baseStyles, spacingStyles[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
