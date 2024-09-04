import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuth: React.FC<P> = (props) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);

    if (!user) {
      return null;
    }

    return React.createElement(WrappedComponent, props);
  };

  return WithAuth;
};

// Add other auth-related utility functions here
