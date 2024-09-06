import axios from 'axios';
import { Role } from '../types/roleTypes';

export const roleService = {
  fetchRoles: async (): Promise<Role[]> => {
    try {
      const response = await axios.get('/api/roles');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch roles: ' + (error as Error).message);
    }
  },

  createRole: async (role: Omit<Role, 'id'>): Promise<Role> => {
    try {
      const response = await axios.post('/api/roles', role);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create role: ' + (error as Error).message);
    }
  },

  updateRole: async (id: string, role: Partial<Role>): Promise<Role> => {
    try {
      const response = await axios.put(`/api/roles/${id}`, role);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update role: ' + (error as Error).message);
    }
  },

  deleteRole: async (id: string): Promise<void> => {
    try {
      await axios.delete(`/api/roles/${id}`);
    } catch (error) {
      throw new Error('Failed to delete role: ' + (error as Error).message);
    }
  }
};