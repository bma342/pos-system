import axios from 'axios';
import { User } from '../types/userTypes';

export const userService = {
  fetchUsers: async (clientId?: string, locationId?: string): Promise<User[]> => {
    const response = await axios.get('/api/users', { params: { clientId, locationId } });
    return response.data;
  },

  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post('/api/users', userData);
    return response.data;
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    const response = await axios.put(`/api/users/${userId}`, userData);
    return response.data;
  },

  deleteUser: async (userId: string): Promise<void> => {
    await axios.delete(`/api/users/${userId}`);
  },

  updateUserProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await axios.put('/api/users/profile', userData);
    return response.data;
  },
};
