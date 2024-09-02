import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useClientContext } from '../context/ClientContext';
import { loginUser } from '../redux/slices/authSlice';
import { AppDispatch } from '../redux/store';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useClientContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!client) {
      setError('Client information not available');
      return;
    }

    try {
      await dispatch(loginUser({ email, password, clientId: client.id })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Login to {client.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
