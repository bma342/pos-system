import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';
import { useClientContext } from '../context/ClientContext';
import { UserRole } from '../types/userTypes';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { client, subdomain } = useClientContext();

  if (!client) {
    return <div>Loading...</div>;
  }

  const handleLoginSuccess = (user: any) => {
    if (user.roles.includes(UserRole.CLIENT_ADMIN)) {
      navigate('/admin/dashboard');
    } else if (user.roles.includes(UserRole.GUEST)) {
      navigate('/guest/dashboard');
    } else {
      navigate('/');
    }
  };

  const handleLoginError = (err: any) => {
    setError('Invalid email or password');
    console.error(err);
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login to {client.name}
      </Typography>
      <LoginForm onSuccess={handleLoginSuccess} onError={handleLoginError} />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/register')}
          sx={{ mb: 1 }}
        >
          Register
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot Password?
        </Button>
      </Box>
    </Box>
  );
};

export default Login;