import React from 'react';
import { AuthProvider } from './context/AuthContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { ClientProvider } from './context/ClientContext';
import { useClientContext } from './context/ClientContext';
import AdminPanel from './components/AdminPanel';
import Menu from './components/Menu';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import BusinessAdminDashboard from './pages/BusinessAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CheckoutPage from './pages/CheckoutPage';
import UserManagement from './pages/UserManagement';
import OrderConfirmation from './pages/OrderConfirmation';
import { UserRole } from './types/userTypes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu/:locationId" element={<Menu />} />

          <Route
            element={
              <PrivateRoute
                allowedRoles={[
                  UserRole.GUEST,
                  UserRole.CLIENT_ADMIN,
                  UserRole.GLOBAL_ADMIN,
                ]}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<CheckoutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/order-confirmation/:orderId"
              element={<OrderConfirmation />}
            />
          </Route>

          <Route
            element={
              <PrivateRoute
                allowedRoles={[UserRole.CLIENT_ADMIN, UserRole.GLOBAL_ADMIN]}
              />
            }
          >
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/business-admin" element={<BusinessAdminDashboard />} />
            <Route path="/user-management" element={<UserManagement />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const AppWithClientProvider: React.FC = () => (
  <ClientProvider>
    <App />
  </ClientProvider>
);

export default AppWithClientProvider;
