import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { ClientProvider } from './context/ClientContext';
import AdminPanel from './components/admin/AdminPanel';
import Menu from './components/guest/Menu';
import Cart from './components/guest/Cart';
import Checkout from './components/guest/Checkout';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ClientProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menu/:locationId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route 
              path="/admin" 
              element={
                user && user.roles.includes('clientAdmin') 
                  ? <AdminPanel /> 
                  : <Navigate to="/login" replace />
              } 
            />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
};

export default App;
