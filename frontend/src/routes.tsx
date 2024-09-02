import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientLogin from './pages/ClientLogin';
import Dashboard from './pages/Dashboard';
import BusinessAdminDashboard from './pages/BusinessAdminDashboard';
import PrivateRoute from './components/PrivateRoute';

// Import other components...

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<ClientLogin />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<BusinessAdminDashboard />} />
        {/* Add other private routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
