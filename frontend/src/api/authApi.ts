import axios from 'axios';
import { AuthResponse } from '../types/userTypes';

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>('/api/auth/login', { email, password });
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    await axios.post('/api/auth/logout');
  },
  
  register: async (email: string, password: string, firstName: string, lastName: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>('/api/auth/register', { email, password, firstName, lastName });
    return response.data;
  },
  
  // ... other auth-related API calls
};
