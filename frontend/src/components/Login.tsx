import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { useClientContext } from '../context/ClientContext';
import { AppDispatch } from '../redux/store';
import { UserRole } from '../types/userTypes';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { client, subdomain } = useClientContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!client || !subdomain) {
      setError('Client information not available');
      return;
    }

    try {
      const result = await dispatch(
        loginUser({ email, password, clientId: client.id, subdomain })
      ).unwrap();

      // Redirect based on user role
      if (result.user.roles.includes(UserRole.CLIENT_ADMIN)) {
        navigate('/admin/dashboard');
      } else if (result.user.roles.includes(UserRole.GUEST)) {
        navigate('/guest/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login">
      <h2>Login to {client.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div>
        <p>
          Don&apos;t have an account? <a href="/register">Register here</a>
        </p>
        <p>
          Forgot your password? <a href="/forgot-password">Reset it here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
