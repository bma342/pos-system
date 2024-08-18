import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './redux/store';

// Import your components
import Login from './components/Login';
import Orders from './components/Orders';
import RoleManagement from './components/RoleManagement';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/roles" element={<RoleManagement />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
