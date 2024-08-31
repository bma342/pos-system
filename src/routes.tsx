import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDiscounts from './pages/AdminDiscounts';
import AdminLoyaltyManagement from './pages/AdminLoyaltyManagement';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin/discounts" element={<AdminDiscounts />} />
        <Route path="admin/loyalty" element={<AdminLoyaltyManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;