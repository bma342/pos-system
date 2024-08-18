import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeProvider from './components/ThemeProvider';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Orders from './components/Orders';
import Reports from './pages/Reports';
import RoleManagement from './components/RoleManagement';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/login" element={<Login />} />
            {user ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pos" element={<POS />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/roles" element={<RoleManagement />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
