import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface RoleBasedAccessProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default RoleBasedAccess;