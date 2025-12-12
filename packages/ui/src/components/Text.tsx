import React, { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  variant?: 'default' | 'muted' | 'light';
  className?: string;
}

export function Text({
  children,
  size = 'base',
  variant = 'default',
  className,
  ...props
}: TextProps): JSX.Element {
  const baseStyles = 'leading-relaxed';
  
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  const variantStyles = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    light: 'text-gray-400',
  };

  return (
    <p
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </p>
  );
}
