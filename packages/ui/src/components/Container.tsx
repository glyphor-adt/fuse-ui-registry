import React, { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Container({
  children,
  size = 'lg',
  className,
  ...props
}: ContainerProps): JSX.Element {
  const baseStyles = 'mx-auto px-4 sm:px-6 lg:px-8';
  
  const sizeStyles = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={clsx(baseStyles, sizeStyles[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
