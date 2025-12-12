import React, { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  className,
  ...props
}: CardProps): JSX.Element {
  const baseStyles = 'rounded-lg bg-white';
  
  const variantStyles = {
    default: 'border border-gray-200',
    bordered: 'border-2 border-gray-300',
    elevated: 'shadow-lg',
  };

  return (
    <div
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
