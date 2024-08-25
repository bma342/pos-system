import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsAuthenticated,
  selectPermissions,
} from '../redux/slices/authSlice';

interface PrivateRouteProps {
  requiredPermissions?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  requiredPermissions = [],
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userPermissions = useSelector(selectPermissions);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRequiredPermissions = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (requiredPermissions.length > 0 && !hasRequiredPermissions) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
