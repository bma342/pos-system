import React, { Suspense, lazy, useMemo, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClientProvider } from './context/ClientContext';
import AppRoutes from './routes';
import Navbar from './components/layout/Navbar';

const App: React.FC = () => {
  const { isLoading: isClientLoading, error: clientError, clientId, isAuthenticated } = useClientContext();
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ... rest of the component
};

export default React.memo(App);