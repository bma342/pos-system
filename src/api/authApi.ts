import api from './axios';

export const register = async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
  return await api.post('/auth/register', userData);
};

// Add other auth-related API calls here