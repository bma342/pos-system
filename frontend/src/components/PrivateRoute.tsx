import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useClientContext } from '../context/ClientContext';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { client, isLoading } = useClientContext();

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  if (!client) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
