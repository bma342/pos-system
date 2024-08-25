import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; // Accept children as a prop
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>; // Render children within the layout
};

export default Layout;
