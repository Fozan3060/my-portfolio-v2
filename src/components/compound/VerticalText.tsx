'use client';

import React from 'react';

type VerticalTextTypes = {
  children: React.ReactNode;
  className?: string;
};

const VerticalText = React.forwardRef<HTMLDivElement, VerticalTextTypes>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={`transform h-fit rotate-90 w-fit ${className}`}>
        {children}
      </div>
    );
  }
);

VerticalText.displayName = 'VerticalText';

export default VerticalText;
