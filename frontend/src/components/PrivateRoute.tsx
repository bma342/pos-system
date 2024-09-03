import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useClientContext } from '../context/ClientContext';
import { UserRole } from '../types/userTypes';

interface PrivateRouteProps {
  allowedRoles: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const { client, isLoading } = useClientContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!client) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const hasAllowedRole = user.roles.some((role) => allowedRoles.includes(role));

  if (!hasAllowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
