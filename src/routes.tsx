import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientLogin from './pages/ClientLogin';
import BusinessAdminDashboard from './pages/BusinessAdminDashboard';
import { useClientContext } from './context/ClientContext';

const AppRoutes: React.FC = () => {
  const { client, isLoading } = useClientContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!client) {
    return <div>Invalid subdomain or client not found</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<ClientLogin />} />
      <Route path="/admin" element={<BusinessAdminDashboard />} />
      {/* Add more routes as needed */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;