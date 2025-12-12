import React, { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function Heading({
  children,
  level = 1,
  className,
  ...props
}: HeadingProps): JSX.Element {
  const baseStyles = 'font-bold text-gray-900';
  
  const levelStyles = {
    1: 'text-4xl sm:text-5xl lg:text-6xl',
    2: 'text-3xl sm:text-4xl lg:text-5xl',
    3: 'text-2xl sm:text-3xl lg:text-4xl',
    4: 'text-xl sm:text-2xl lg:text-3xl',
    5: 'text-lg sm:text-xl lg:text-2xl',
    6: 'text-base sm:text-lg lg:text-xl',
  };

  const combinedClassName = clsx(baseStyles, levelStyles[level], className);

  switch (level) {
    case 1:
      return <h1 className={combinedClassName} {...props}>{children}</h1>;
    case 2:
      return <h2 className={combinedClassName} {...props}>{children}</h2>;
    case 3:
      return <h3 className={combinedClassName} {...props}>{children}</h3>;
    case 4:
      return <h4 className={combinedClassName} {...props}>{children}</h4>;
    case 5:
      return <h5 className={combinedClassName} {...props}>{children}</h5>;
    case 6:
      return <h6 className={combinedClassName} {...props}>{children}</h6>;
    default:
      return <h1 className={combinedClassName} {...props}>{children}</h1>;
  }
}
