declare module 'react-lazy-load-image-component' {
  import React from 'react';

  export interface LazyLoadComponentProps {
    children: React.ReactNode;
    threshold?: number;
    visibleByDefault?: boolean;
    // Add any other props that the LazyLoadComponent accepts
  }

  export const LazyLoadComponent: React.FC<LazyLoadComponentProps>;

  // If you use other exports from this package, declare them here as well
}