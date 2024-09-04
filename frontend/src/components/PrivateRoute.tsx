import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useClientContext } from '../context/ClientContext';
import { UserRole } from '../types/userTypes';
import { CircularProgress, Box } from '@mui/material';

interface PrivateRouteProps {
  allowedRoles: UserRole[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { client, isLoading } = useClientContext();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!client) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const hasAllowedRole = user.roles.some((role) => allowedRoles.includes(role as UserRole));

  if (!hasAllowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
