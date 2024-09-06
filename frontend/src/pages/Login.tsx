import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useSelectedClient } from '../hooks/useSelectedClient';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const selectedClient = useSelectedClient();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClient) {
      const loginData = {
        email,
        password,
        clientId: selectedClient.id.toString(), // Convert to string
        subdomain: selectedClient.subdomain || '',
      };
      dispatch(login(loginData));
    } else {
      console.error('Client is not selected');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} aria-label="Login form">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <button type="submit" aria-label="Login">Login</button>
      </form>
      {error && <p className="error-message" role="alert">{error}</p>}
    </div>
  );
};

export default Login;
