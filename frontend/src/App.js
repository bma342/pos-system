import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Orders from './components/Orders';
import RoleManagement from './components/RoleManagement';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import ThemeProvider from './components/ThemeProvider';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          {user ? (
            <>
              <Route path="/orders" element={<Orders />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/" element={<Navigate to="/orders" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
