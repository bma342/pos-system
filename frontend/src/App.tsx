import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { ClientProvider } from './context/ClientContext';
import { useClientContext } from './context/ClientContext';
import AdminPanel from './components/admin/AdminPanel';
import Menu from './components/guest/Menu';
import Cart from './components/guest/Cart';
import Checkout from './components/guest/Checkout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { subdomain, isLoading, error } = useClientContext();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/menu/:locationId" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* Other protected routes */}
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

const AppWithClientProvider: React.FC = () => (
  <ClientProvider>
    <App />
  </ClientProvider>
);

export default AppWithClientProvider;
