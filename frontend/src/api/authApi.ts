import apiClient from './apiClient';
import { User } from '../types/authTypes';

export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
